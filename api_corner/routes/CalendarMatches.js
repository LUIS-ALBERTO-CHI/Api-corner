const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config.db");

const getCalendarMatches = (request, response) => {
    connection.query("SELECT * FROM CalendarMatches", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/CalendarMatches")
.get(getCalendarMatches);

const postCalendarMatches = (request, response) => {
    const {CalendarMatchId, Name, MatchDay, Status} = request.body;
    connection.query("INSERT INTO CalendarMatches(CalendarMatchId, Name, MatchDay, Status) VALUES (?,?,?,?) ", 
    [CalendarMatchId, Name, MatchDay, Status],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"CalendarMatches añadido correctamente": results.affectedRows});
    });
};

app.route("/CalendarMatches")
.post(postCalendarMatches);


const delCalendarMatches = (request, response) => {
    const CalendarMatchId = request.params.CalendarMatchId;
    connection.query("Delete from CalendarMatches where CalendarMatchId = ?", 
    [CalendarMatchId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"CalendarMatches eliminado":results.affectedRows});
    });
};

app.route("/CalendarMatches/:CalendarMatchId")
.delete(delCalendarMatches);


module.exports = app;