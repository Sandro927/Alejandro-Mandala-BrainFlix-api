const express = require('express');
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const fetchData = () => {
    const videos = fs.readFileSync('./data/videos-data.json')
    return JSON.parse(videos);
}

const getVideos = () => {
    return fetchData()[0].videos;
}

const getVideoData = () => {
    return fetchData()[1].videoData;
}

const createData = (videoData) => {
    fs.writeFileSync('./data/videos-data.json', JSON.stringify(videoData))
}

router.route('/')
    .get((req, res) => {
        let formattedVideos = getVideos()
        .map(video =>{
            return {
                id: video.id,
                title: video.title,
                channel: video.channel,
                image: video.image
            }
        })
        res.status(200).json(formattedVideos)
    })
    .post((req, res) => {
        let videos = getVideos();
        let videoData = getVideoData();
        
        const newVideo = {
            id: uuidv4(),
            title: req.body.title,
            channel: req.body.channel,
            image: req.body.image
        }

       
       
        videos.push(newVideo);
        createData([{videos}, {videoData}])

        res.status(201).send({
            id: newVideo.id,
            status: "Success"
        })
    });
    

router.route('/:id')
    .get((req, res) => {
    let formattedVideoData = getVideoData()
    .map(video =>{
        return {
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image,
            description: video.description,
            views: video.views,
            likes: video.likes,
            duration: video.duration,
            video: video.video,
            timestamp: video.timestamp,
            comments: video.comments.map(comment => {
                return {
                    name: comment.name,
                    comment: comment.comment,
                    id: uuidv4(),
                    likes: comment.likes,
                    timestamp: comment.timestamp
                }
            })
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