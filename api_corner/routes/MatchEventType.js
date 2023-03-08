const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config.db");

const getMatchEventType = (request, response) => {
    connection.query("SELECT * FROM MatchEventType", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/MatchEventType")
.get(getMatchEventType);


const postMatchEventType = (request, response) => {
    const {MatchEventtypeId, Name, Description} = request.body;
    connection.query("INSERT INTO MatchEventType(MatchEventtypeId, Name, Description) VALUES (?,?,?) ", 
    [MatchEventtypeId, Name, Description],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"MatchEventType añadido correctamente": results.affectedRows});
    });
};

app.route("/MatchEventType")
.post(postMatchEventType);


const delMatchEventType = (request, response) => {
    const MatchEventTypeId = request.params.MatchEventTypeId;
    connection.query("Delete from MatchEventType where MatchEventTypeId = ?", 
    [MatchEventTypeId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"MatchEventType eliminado":results.affectedRows});
    });
};

app.route("/MatchEventType/:MatchEventTypeId")
.delete(delMatchEventType);


module.exports = app;