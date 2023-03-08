const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config.db");

const getMatchEvents = (request, response) => {
    connection.query("SELECT * FROM MatchEvents", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/MatchEvents")
.get(getMatchEvents);

const postMatchEvents = (request, response) => {
    const {MatchEventId, Description, EvenTypeId, MatchId, ReferencePlayerId} = request.body;
    connection.query("INSERT INTO MatchEvents(MatchEventId, Description, EvenTypeId, MatchId, ReferencePlayerId) VALUES (?,?,?,?,?) ", 
    [MatchEventId, Description, EvenTypeId, MatchId, ReferencePlayerId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"MatchEvents añadido correctamente": results.affectedRows});
    });
};

app.route("/MatchEvents")
.post(postMatchEvents);


const delMatchEvents = (request, response) => {
    const MatchEventId = request.params.MatchEventId;
    connection.query("Delete from MatchEvents where MatchEventId = ?", 
    [MatchEventId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"MatchEvents eliminado":results.affectedRows});
    });
};

app.route("/MatchEvents/:MatchEventId")
.delete(delMatchEvents);


module.exports = app;