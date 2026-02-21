const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { connectDB } = require("./scripts/seed")

const app = express()
port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB()
    .then(() => {
        app.listen(port, () =>{
            console.log(`Listening on port ${port}`);
        });
    })
    .catch((err) =>{
        console.error("Database connection failed. Server not started.", err);
    })

    



