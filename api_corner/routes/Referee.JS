const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config.db");

const getReferee = (request, response) => {
    connection.query("SELECT * FROM Referee", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/Referee")
.get(getReferee);


const postReferee = (request, response) => {
    const {RefereeId, FirstName, LastName, EnrollementDate, email, phone} = request.body;
    connection.query("INSERT INTO Referee(RefereeId, FirstName, LastName, EnrollementDate, email, phone) VALUES (?,?,?,?,?,?) ", 
    [RefereeId, FirstName, LastName, EnrollementDate, email, phone],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Referee añadido correctamente": results.affectedRows});
    });
};

app.route("/Referee")
.post(postReferee);


const delReferee = (request, response) => {
    const RefereeId = request.params.RefereeId;
    connection.query("Delete from Referee where RefereeId = ?", 
    [RefereeId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Referee eliminado":results.affectedRows});
    });
};

app.route("/Referee/:RefereeId")
.delete(delReferee);


module.exports = app;