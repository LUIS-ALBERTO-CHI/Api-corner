const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config.db");

const getAuth = (request, response) => {
    connection.query("SELECT * FROM Auth", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/Auth")
.get(getAuth);

