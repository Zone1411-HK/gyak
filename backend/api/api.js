const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.post('/addKaja', upload.none(), async (req, res) => {
    try {
        let { nev, ar, finomsag, datum, mennyiseg } = req.body;
        await database.addKaja(nev, ar, finomsag == 'true' ? true : false, datum, mennyiseg);
        res.status(200).json({
            status: 'success'
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
});

router.get('/kajak', async (req, res) => {
    let kajak = await database.selectKaja();
    res.status(200).json({
        kajak: kajak
    });
});

router.post('/removeKaja/:id', async (req, res) => {
    try {
        let id = req.params.id;
        console.log(id);
        await database.removeKaja(id);
        res.status(200).json({
            status: 'success'
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
});

module.exports = router;
