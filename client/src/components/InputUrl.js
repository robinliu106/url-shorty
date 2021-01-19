import React, { Fragment, useState } from "react";

const InputToDo = () => {
    const [longUrl, setLongUrl] = useState("");
    const [displayShortUrl, setDisplayShortUrl] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = { longUrl };
            const response = await fetch("http://localhost:5000/shorty", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const { shorturl } = await response.json();
            setDisplayShortUrl(shorturl);
            // window.location = "/";
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">SHORTY</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
            <p>{displayShortUrl}</p>
        </Fragment>
    );
};

export default InputToDo;
