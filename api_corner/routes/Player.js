const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config.db");

const getPlayer = (request, response) => {
    connection.query("SELECT * FROM Player", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/Player")
.get(getPlayer);


const postPlayer = (request, response) => {
    const {PlayerId, FirstName, LastName, MiddleName, Dorsal, NicName,
    UrlProfile, PositionId, TeamId} = request.body;
    connection.query("INSERT INTO Player(PlayerId, FirstName, LastName, MiddleName, Dorsal, NicName, UrlProfile, PositionId, TeamId) VALUES (?,?,?,?,?,?,?,?,?) ", 
    [PlayerId, FirstName, LastName, MiddleName, Dorsal, NicName, UrlProfile, PositionId, TeamId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Jugador añadido correctamente": results.affectedRows});
    });
};

app.route("/Player")
.post(postPlayer);


const delPlayer = (request, response) => {
    const PlayerId = request.params.PlayerId;
    connection.query("Delete from Player where PlayerId = ?", 
    [PlayerId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Jugador eliminado":results.affectedRows});
    });
};

//ruta
app.route("/Player/:PlayerId")
.delete(delPlayer);


module.exports = app;