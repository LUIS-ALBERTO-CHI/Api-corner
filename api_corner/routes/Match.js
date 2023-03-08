const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config.db");

const getMatch = (request, response) => {
    connection.query("SELECT * FROM Match", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/Match")
.get(getMatch);


const postMatch = (request, response) => {
    const {MatchId, LocalTeamId, VisitTeamId, MatchDate, StatusGame, RefereeId, StadiumId} = request.body;
    connection.query("INSERT INTO Match(MatchId, LocalTeamId, VisitTeamId, MatchDate, StatusGame, RefereeId, StadiumId) VALUES (?,?,?,?,?,?,?) ", 
    [MatchId, LocalTeamId, VisitTeamId, MatchDate, StatusGame, RefereeId, StadiumId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Match añadido correctamente": results.affectedRows});
    });
};

app.route("/Match")
.post(postMatch);


const delMatch = (request, response) => {
    const MatchId = request.params.MatchId;
    connection.query("Delete from Match where MatchId = ?", 
    [MatchId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Match eliminado":results.affectedRows});
    });
};

app.route("/Match/:MatchId")
.delete(delMatch);


module.exports = app;