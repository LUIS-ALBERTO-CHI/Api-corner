const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config.db");

const getSeasonTeam = (request, response) => {
    connection.query("SELECT * FROM SeasonTeam", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/SeasonTeam")
.get(getSeasonTeam);


const postSeasonTeam = (request, response) => {
    const {SeasonId, TeamId} = request.body;
    connection.query("INSERT INTO SeasonTeam(SeasonId, TeamId) VALUES (?,?) ", 
    [SeasonId, TeamId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"SeasonTeam añadido correctamente": results.affectedRows});
    });
};

app.route("/SeasonTeam")
.post(postSeasonTeam);


const delSeasonTeam = (request, response) => {
    const SeasonId = request.params.SeasonId;
    connection.query("Delete from SeasonTeam where SeasonId = ?", 
    [SeasonId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"SeasonTeam eliminado":results.affectedRows});
    });
};

app.route("/SeasonTeam/:SeasonId")
.delete(delSeasonTeam);


module.exports = app;