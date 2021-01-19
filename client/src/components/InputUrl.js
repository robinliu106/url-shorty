import React, { Fragment, useState, useEffect } from "react";

const InputToDo = () => {
    const [longUrl, setLongUrl] = useState("");
    const [displayShortUrl, setDisplayShortUrl] = useState("");
    const [copyStatus, setCopyStatus] = useState(false);

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
                <button className="btn btn-primary">Shorty</button>
            </form>
            <div className="d-flex mt-5">
                {displayShortUrl ? <p>{`localhost:3000/${displayShortUrl}`}</p> : " "}{" "}
                {displayShortUrl ? (
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => {
                            navigator.clipboard.writeText(`localhost:3000/${displayShortUrl}`);
                            setCopyStatus(true);
                        }}
                    >
                        {copyStatus == false ? "Copy" : "Copied!"}
                    </button>
                ) : (
                    " "
                )}
            </div>
        </Fragment>
    );
};

export default InputToDo;

/*onClick={() => {
                            window.location = `localhost:3000/${displayShortUrl}`;
                            return true;
                        }} */
