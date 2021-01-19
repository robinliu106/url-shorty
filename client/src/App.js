import React, { Fragment, useEffect } from "react";
import InputUrl from "./components/InputUrl";

function App() {
    const getLongUrl = async () => {
        console.log("get long url is running");
        let shortUrl = window.location.pathname;
        shortUrl = shortUrl.substring(1, shortUrl.length);
        console.log("short url", shortUrl);
        if (shortUrl == "") {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/shorty/${shortUrl}`);
            const foundUrl = await response.json();
            console.log("hi hi", foundUrl);

            if (foundUrl != 404) {
                window.location.href = foundUrl;
                // window.location.reload()
            } else {
                window.location = "/";
            }
            return false;
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getLongUrl();
    }, []);

    return (
        <Fragment>
            <div className="container">
                <InputUrl />
            </div>
        </Fragment>
    );
}

export default App;
