const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const fs = require("fs");

router.route('/')
    .get((req, res) => {
        //get videos
    });
    

router.route('/:id')
    .get((req, res) => {
    //Send back data for specific video using req.params
    });

router.route('/:id/comments')
    .post((req, res) => {

});

router.route('/:id/comments/:commendId')
    .delete((req, res) => {

    });

module.exports = router;