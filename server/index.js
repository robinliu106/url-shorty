const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const randomWords = require("random-words");
const { response } = require("express");

//middleware
app.use(cors());
app.use(express.json()); //gives us access to request.body

//routes

//test
// console.log("hi", randomWords({ exactly: 1, wordsPerString: 5 }));

const generateShortUrl = async () => {
    let shortUrl = "";
    let unique = false;

    while (!unique) {
        shortUrl = randomWords({ exactly: 1, wordsPerString: 5 });
        shortUrl = shortUrl[0].split(" ").join("-");

        //check that short url doesn't exist already
        const findShortUrl = await pool.query("SELECT count(*) FROM urlstore WHERE shortUrl=$1", [shortUrl]);
        const { count } = findShortUrl.rows[0];

        if (parseInt(count) == 0) {
            unique = true;
            break;
        }
    }
    return shortUrl;
};

//create a new url
app.post("/shorty", async (req, res) => {
    try {
        const { longUrl } = req.body;
        let shortUrl = "";

        //check if long url exists in database first
        const findLongUrl = await pool.query("SELECT * FROM urlstore WHERE longUrl=$1 LIMIT 1", [longUrl]);

        if (findLongUrl.rows[0]) {
            res.json(findLongUrl.rows[0]);
        } else {
            shortUrl = await generateShortUrl();

            //post
            const newUrl = await pool.query("INSERT INTO urlstore (longUrl,shortUrl) VALUES ($1,$2) RETURNING *", [
                longUrl,
                shortUrl,
            ]);

            res.json(newUrl.rows[0]);
        }
    } catch (error) {
        console.log(error.message);
    }
});

//get all urls
app.get("/shorty", async (req, res) => {
    try {
        const allUrls = await pool.query("SELECT * FROM urlstore");
        res.json(allUrls.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//get a long url from a short url
app.get("/shorty/:shortUrl", async (req, res) => {
    try {
        const { shortUrl } = req.params;
        console.log("server shortUrl ", shortUrl);
        const urlResult = await pool.query("SELECT longUrl FROM urlstore WHERE shortUrl=$1", [shortUrl]);
        if (urlResult.rows[0]) {
            console.log(urlResult.rows[0]);
            const { longurl } = urlResult.rows[0];
            res.json(longurl);
            console.log("url result found ", longurl);
        } else {
            res.json(404);
        }
    } catch (error) {
        console.log(error.message);
    }
});

//update a todo
// app.put("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { description } = req.body;

//         const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id=$2", [description, id]);
//         res.json("TODO was updated");
//     } catch (error) {
//         console.log(error.message);
//     }
// });
// ``;
// delete a url
app.delete("/shorty/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUrl = await pool.query("DELETE FROM urlstore WHERE url_id=$1", [id]);
        res.json("url was deleted!");
    } catch (error) {
        console.log(error.message);
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`server is up on ${port}`);
});
