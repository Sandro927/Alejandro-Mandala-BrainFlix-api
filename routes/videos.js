const express = require('express');
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const fillerData = {
    channel: "My New Channel",
    image: "https://i.imgur.com/5qyCZrD.jpg",
    views: 123456789,
    likes: 0,
    duration: "3:15",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: 1623071376800,
    comments: [
        {
            name: "Giovana Alpine",
            comment: "Wow! You can bet that we’ll be checking this place out when we’re in the area. The views look absolutely breathtaking. Thank you so much for sharing this with the world!",
            likes: 0,
            timestamp: 1623104591000,
            id: uuidv4()
        }
    ]
}

const fetchData = () => {
    const videos = fs.readFileSync('./data/video-details.json')
    return JSON.parse(videos);
}


const createData = (videoData) => {
    fs.writeFileSync('./data/video-details.json', JSON.stringify(videoData))
}

router.route('/')
    .get((req, res) => {
        let formattedVideos = fetchData()
            .map(video => {
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
        let videoData = fetchData();
        const newVideoData = {
            id: uuidv4(),
            title: req.body.title,
            channel: fillerData.channel,
            image: fillerData.image,
            description: req.body.description,
            views: fillerData.views,
            likes: fillerData.likes,
            duration: fillerData.duration,
            video: fillerData.video,
            timestamp: fillerData.timestamp,
            comments: fillerData.comments
        }

        videoData.push(newVideoData);
        createData(videoData);

        res.status(201).send({
            data: videoData,
            status: "Success"
        })
    });


router.route('/:id')
    .get((req, res) => {
        let formattedVideoData = fetchData()
            .map(video => {
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
                            id: comment.id,
                            likes: comment.likes,
                            timestamp: comment.timestamp
                        }
                    })
                }
        })
    res.status(200).json(formattedVideoData.find(video => video.id === req.params.id))
});

router.route('/:id/comments')
    .post((req, res) => {
        const newComment = {
            name: req.body.name,
            comment: req.body.comment,
            likes: 0,
            timestamp: Date.now(),
            id: uuidv4()
        }
        let videoData = fetchData();
        const currentVideoIndex = videoData.findIndex(video => video.id === req.params.id);
        videoData[currentVideoIndex].comments.push(newComment);
        createData(videoData);
        res.status(201).json(videoData);
    });

router.route('/:id/comments/:commentId')
    .delete((req, res) => {
        let videoData = fetchData();
        let currentVideotData = videoData.find(video => video.id === req.params.id);
        const currentVideoIndex = videoData.findIndex(video => video.id === req.params.id);
        const newComments = currentVideotData.comments.filter(comment => comment.id !== req.params.commentId);
        currentVideotData.comments = newComments;
        videoData[currentVideoIndex] = currentVideotData
        createData(videoData);
        res.status(200).send('deleted')
    });


module.exports = router;