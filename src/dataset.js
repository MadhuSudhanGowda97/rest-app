"use strict";
exports.__esModule = true;
var express = require('express');
//import express from 'express';
var app = express();
var port = 2023;
// const db = require('./datasetqueries')
var datasetqueries_1 = require("./datasetqueries");
app.use(express.json());
//Getting all the data
app.get('/dataset1', datasetqueries_1.getUsers);
//Getting data by id
app.get('/dataset1/get/:id', datasetqueries_1.getUserById);
//Inserting data
app.post('/dataset1/create', datasetqueries_1.createUser);
//Updated data
app.put('/dataset1/update/:id', datasetqueries_1.updateUser);
//partially updating data
app.patch('/dataset1/partupdate/:id', datasetqueries_1.partialupdateUser);
//Deleting data
app["delete"]('/dataset1/delete/:id', datasetqueries_1.deleteUser);
app.all('*', function (req, res) {
    res.status(404).json({
        "status_code": 404.1,
        "error_code": "Page Not Found"
    });
});
app.listen(port, function () {
    console.log("App running on port ".concat(port, "."));
});
