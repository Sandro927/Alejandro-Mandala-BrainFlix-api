const express = require('express');
const app = express();
const cors = require("cors");

//serves static files from our public directory
app.use(express.static('./public'));
//allows us access request.body in our POST requests (replaces body-parser)
app.use(express.json())
//allow cross origin resource sharing
app.use(cors());
//Routes
const videoRoutes = require('./routes/videos');
app.use('/videos', videoRoutes);

app.listen(8080, () => {
    console.log('listening on port 8080')
}) 
