const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config.db");

const getMatchLog = (request, response) => {
    connection.query("SELECT * FROM MatchLog", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/MatchLog")
.get(getMatchLog);


const postMatchLog = (request, response) => {
    const {MatchLog, Description, Leading, Event, MatchId} = request.body;
    connection.query("INSERT INTO MatchLog(MatchLogId, Description, Leading, Event, MatchId) VALUES (?,?,?,?,?) ", 
    [MatchLog, Description, Leading, Event, MatchId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"MatchLog añadido correctamente": results.affectedRows});
    });
};

app.route("/MatchLog")
.post(postMatchLog);


const delMatchLog = (request, response) => {
    const MatchLogId = request.params.MatchLogId;
    connection.query("Delete from MatchLog where MatchLogId = ?", 
    [MatchLogId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"MatchLog eliminado":results.affectedRows});
    });
};

app.route("/MatchLog/:MatchLogId")
.delete(delMatchLog);


module.exports = app;