const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const fs = require("fs");

const getVideos = () => {
    const videos = fs.readFileSync('./data/videos.json')
    return JSON.parse(videos);
}

router.route('/')
    .get((req, res) => {
        let formattedVideos = getVideos()[0].videos
        .map(video =>{
            return {
                "id": video.id,
                "title": video.title,
                "channel": video.channel,
                "image": video.image
            }
        })
        res.status(200).json(formattedVideos)
    });
    

router.route('/:id')
    .get((req, res) => {
    //Send back data for specific video using req.params
    res.send('videos/:id route');
    });

router.route('/:id/comments')
    .post((req, res) => {
      
});

router.route('/:id/comments/:commendId')
    .delete((req, res) => {
       
    });

module.exports = router;