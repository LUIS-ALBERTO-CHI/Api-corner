const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config.db");

const getSeasonSettings = (request, response) => {
    connection.query("SELECT * FROM SeasonSettings", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/SeasonSettings")
.get(getSeasonSettings);


const postSeasonSettings = (request, response) => {
    const {SeasonSettingId, SeasonId, LocalWinnerScore, VisitantWinnerScore, LocalLooseScore, VisitandLooseScore} = request.body;
    connection.query("INSERT INTO SeasonSettings(SeasonSettingId, SeasonId, LocalWinnerScore, VisitantWinnerScore, LocalLooseScore, VisitandLooseScore) VALUES (?,?,?,?,?,?) ", 
    [SeasonSettingId, SeasonId, LocalWinnerScore, VisitantWinnerScore, LocalLooseScore, VisitandLooseScore],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"SeasonSettings añadido correctamente": results.affectedRows});
    });
};

app.route("/SeasonSettings")
.post(postSeasonSettings);


const delSeasonSettings = (request, response) => {
    const SeasonSettingId = request.params.SeasonSettingId;
    connection.query("Delete from SeasonSettings where SeasonSettingId = ?", 
    [SeasonSettingId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"SeasonSettings eliminado":results.affectedRows});
    });
};

app.route("/SeasonSettings/:SeasonSettingId")
.delete(delSeasonSettings);


module.exports = app;