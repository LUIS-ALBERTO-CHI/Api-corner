const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config.db");

const getTournament = (request, response) => {
    connection.query("SELECT * FROM Tournament", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/Tournament")
.get(getTournament);


const postTournament = (request, response) => {
    const {TournamentId, Name, Description, Level, UrlLogo, Mision} = request.body;
    connection.query("INSERT INTO Tournament(TournamentId, Name, Description, Level, UrlLogo, Mision) VALUES (?,?,?,?,?,?) ", 
    [TournamentId, Name, Description, Level, UrlLogo, Mision],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Tournament añadido correctamente": results.affectedRows});
    });
};

app.route("/Tournament")
.post(postTournament);


const delTournament = (request, response) => {
    const TournamentId = request.params.TournamentId;
    connection.query("Delete from Tournament where TournamentId = ?", 
    [TournamentId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Tournament eliminado":results.affectedRows});
    });
};

app.route("/Tournament/:TournamentId")
.delete(delTournament);


module.exports = app;