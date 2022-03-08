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

//Diving deeper routes
app.post('/videos/:id/comments', (req, res) => {

})

app.delete('/videos/:id/comments/:commendId', (req, res) => {

})

app.listen(8080, () => {
    console.log('listening on port 8080')
}) 
