const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const fs = require("fs");

const getData = () => {
    const videos = fs.readFileSync('./data/videos-data.json')
    return JSON.parse(videos);
}

const getVideoData = () => {

}

router.route('/')
    .get((req, res) => {
        let formattedVideos = getData()[0].videos
        .map(video =>{
            return {
                "id": video.id,
                "title": video.title,
                "channel": video.channel,
                "image": video.image
            }
        })
        res.status(200).json(formattedVideos)
    })
    .post((req, res) => {
        //create a new video
    });
    

router.route('/:id')
    .get((req, res) => {
    //Send back data for specific video using req.params
    let formattedVideoData = getData()[1].videoData
    .map(video =>{
        return {
            "id": video.id,
            "title": video.title,
            "channel": video.channel,
            "image": video.image,
            "description": video.description,
            "views": video.views,
            "likes": video.likes,
            "duration": video.duration,
            "video": video.video,
            "timestamp": video.timestamp,
            "comments": video.comments
        }  
    })
    res.status(200).json(formattedVideoData.find(video=>video.id === req.params.id))
    
    });

router.route('/:id/comments')
    .post((req, res) => {
      
});

router.route('/:id/comments/:commendId')
    .delete((req, res) => {
       
    });

module.exports = router;