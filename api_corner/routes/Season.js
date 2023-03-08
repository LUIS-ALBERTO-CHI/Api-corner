const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config.db");

const getSeason = (request, response) => {
    connection.query("SELECT * FROM Season", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/Season")
.get(getSeason);


const postSeason = (request, response) => {
    const {SeasonId, TournamentId, Name, UrlLogo, DateFrom, DateTo, Status} = request.body;
    connection.query("INSERT INTO Season(SeasonId, TournamentId, Name, UrlLogo, DateFrom, DateTo, Status) VALUES (?,?,?,?,?,?,?) ", 
    [SeasonId, TournamentId, Name, UrlLogo, DateFrom, DateTo, Status],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Season añadido correctamente": results.affectedRows});
    });
};

app.route("/Season")
.post(postSeason);


const delSeason = (request, response) => {
    const SeasonId = request.params.SeasonId;
    connection.query("Delete from Season where SeasonId = ?", 
    [SeasonId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Season eliminado":results.affectedRows});
    });
};

app.route("/Season/:SeasonId")
.delete(delSeason);


module.exports = app;