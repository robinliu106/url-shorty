CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
)

CREATE TABLE urlstore(
    url_id SERIAL PRIMARY KEY,
    longUrl VARCHAR(255),
    shortUrl VARCHAR(255)
);