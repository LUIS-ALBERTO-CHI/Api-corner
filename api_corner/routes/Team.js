const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config.db");

const getTeam = (request, response) => {
    connection.query("SELECT * FROM Team", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/Team")
.get(getTeam);


const postTeam = (request, response) => {
    const {TeamId, Name, Description, UrlProfile, Captain} = request.body;
    connection.query("INSERT INTO Team(TeamId, Name, Description, UrlProfile, Captain) VALUES (?,?,?,?,?) ", 
    [TeamId, Name, Description, UrlProfile, Captain],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Team añadido correctamente": results.affectedRows});
    });
};

app.route("/Team")
.post(postTeam);


const delTeam = (request, response) => {
    const TeamId = request.params.TeamId;
    connection.query("Delete from Team where TeamId = ?", 
    [TeamId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Team eliminado":results.affectedRows});
    });
};

app.route("/Team/:TeamId")
.delete(delTeam);


module.exports = app;