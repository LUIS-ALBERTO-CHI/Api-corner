const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config.db");

const getStadium = (request, response) => {
    connection.query("SELECT * FROM Stadium", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/Stadium")
.get(getStadium);


const postStadium = (request, response) => {
    const {StadiumId, Name, Description, Capacity, Direction, Manager, DataContacManager} = request.body;
    connection.query("INSERT INTO Stadium(StadiumId, Name, Description, Capacity, Direction, Manager, DataContacManager) VALUES (?,?,?,?,?,?,?) ", 
    [StadiumId, Name, Description, Capacity, Direction, Manager, DataContacManager],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Stadium añadido correctamente": results.affectedRows});
    });
};

app.route("/Stadium")
.post(postStadium);


const delStadium = (request, response) => {
    const StadiumId = request.params.StadiumId;
    connection.query("Delete from Stadium where StadiumId = ?", 
    [StadiumId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Stadium eliminado":results.affectedRows});
    });
};

app.route("/Stadium/:StadiumId")
.delete(delStadium);


module.exports = app;