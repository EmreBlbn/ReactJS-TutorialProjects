const express = require('express')
const app = express()
const port = 3002

const backend = require('./postgreBackend')
const {response} = require("express");

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/users', (req, res) => {
    backend.getUsers()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/messages', (req, res) => {
    backend.getMessages()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/messages', (req, res) => {
    backend.createMessage(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})
//
// app.delete('/users/:id', (req, res) => {
//     backend.deleteMerchant(req.params.id)
//         .then(response => {
//             res.status(200).send(response);
//         })
//         .catch(error => {
//             res.status(500).send(error);
//         })
// })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})