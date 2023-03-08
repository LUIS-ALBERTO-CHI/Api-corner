const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config.db");

const getDocumentPlayer = (request, response) => {
    connection.query("SELECT * FROM DocumentPlayer", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/DocumentPlayer")
.get(getDocumentPlayer);


const postDocumentPlayer = (request, response) => {
    const {DocumentId, PlayerId, Name, Extension, UrlLocation} = request.body;
    connection.query("INSERT INTO DocumentPlayer(DocumentId, PlayerId, Name, Extension, UrlLocation) VALUES (?,?,?,?,?) ", 
    [DocumentId, PlayerId, Name, Extension, UrlLocation],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"DocumentPlayer añadido correctamente": results.affectedRows});
    });
};

app.route("/DocumentPlayer")
.post(postDocumentPlayer);


const delDocumentPlayer = (request, response) => {
    const DocumentId = request.params.DocumentId;
    connection.query("Delete from DocumentPlayer where DocumentId = ?", 
    [DocumentId],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"DocumentPlayer eliminado":results.affectedRows});
    });
};

app.route("/DocumentPlayer/:DocumentId")
.delete(delDocumentPlayer);


module.exports = app;