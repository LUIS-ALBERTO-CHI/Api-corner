const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config.db");

const getMatchSquad = (request, response) => {
    connection.query("SELECT * FROM MatchSquad", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/MatchSquad")
.get(getMatchSquad);


const postMatchSquad = (request, response) => {
    const {MatchSquadId, MatchId, TeamId, PlayerId, Position} = request.body;
    connection.query("INSERT INTO MatchSquad(MatchSquadId, MatchId, TeamId, PlayerId, Position) VALUES (?,?,?,?,?) ", 
    [MatchSquadId, MatchId, TeamId, PlayerId, Position],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"MatchSquad añadido correctamente": results.affectedRows});
    });
};

app.route("/MatchSquad")
.post(postMatchSquad);


const delMatchSquad = (request, response) => {
    const MatchSquadId = request.params.MatchSquadId;
    connection.query("Delete from MatchSquad where MatchSquadId = ?", 
    [MatchSquadId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"MatchSquad eliminado":results.affectedRows});
    });
};

app.route("/MatchSquad/:MatchSquadId")
.delete(delMatchSquad);


module.exports = app;