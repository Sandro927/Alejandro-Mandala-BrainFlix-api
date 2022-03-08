const express = require('express');
const app = express();

app.get('/videos', (req, res) => {
    //Send back videos data
});

app.post('/videos', (req, res) => {
    //Create a new video from upload form
});

app.get('/videos/:id', (req, res) => {
    //Send back data for specific video using req.params
});



app.listen(8080, () => {
    console.log('listening on port 8080')
}) 
