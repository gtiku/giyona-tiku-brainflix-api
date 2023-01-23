const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const videosData = require("../data/videos.json");
const fileUpload = require("../middleware/file-upload");

router.get("/", (req, res, next) => {
  const firstVideo = videosData[0];

  const nextVideos = videosData
    .filter((video) => video.id !== firstVideo.id)
    .map(
      ({
        description,
        views,
        likes,
        duration,
        video,
        timestamp,
        comments,
        ...item
      }) => item
    );

  res.status(201).json({ video: firstVideo, nextVideos: nextVideos });
});

router.get("/:videoID", fileUpload.single("image"), (req, res, next) => {
  const videoID = req.params.videoID;
  if (!videoID) {
    const error = new Error("No video with that id exists");
    error.code = 404;
    next(error);
  }
  const video = videosData.filter((video) => video.id === videoID)[0];

  const nextVideos = videosData
    .filter((video) => video.id !== videoID)
    .map(
      ({
        description,
        views,
        likes,
        duration,
        video,
        timestamp,
        comments,
        ...item
      }) => item
    );

  res.status(201).json({ video: video, nextVideos: nextVideos });
});

router.post("/", fileUpload.single("image"), (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const dateTime = new Date();
  const timestamp = dateTime.getTime();

  if (req.file) {
    const newPath = `http://localhost:8080/images/${req.file.filename}`;
    console.log(newPath);
  }

  const newVideoOjb = {
    id: uuid(),
    title: title,
    channel: "BrainStation",
    image: !req.file
      ? "http://localhost:8080/images/default-video-image.jpg"
      : newPath,
    description: description,
    views: "1,001,023",
    likes: "110,985",
    duration: "4:01",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: timestamp,
    comments: [
      {
        id: "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
        name: "Micheal Lyons",
        comment:
          "They BLEW the ROOF off at their last event, once everyone started figuring out they were going. This is still simply the greatest opening of an event I have EVER witnessed.",
        likes: 0,
        timestamp: 1628522461000,
      },
      {
        id: "091de676-61af-4ee6-90de-3a7a53af7521",
        name: "Gary Wong",
        comment:
          "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
        likes: 0,
        timestamp: 1626359541000,
      },
      {
        id: "66b7d3c7-4023-47f1-a02c-520c9ca187a6",
        name: "Theodore Duncan",
        comment:
          "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Every time I see him I feel instantly happy! He’s definitely my favorite ever!",
        likes: 0,
        timestamp: 1626011132000,
      },
    ],
  };

  let updatedVideoData = videosData.push(newVideoOjb);

  fs.writeFile(
    "../data/videos.json",
    JSON.stringify(updatedVideoData),
    (err) => {
      if (err) {
        const error = new Error(
          "There was an error uploading the video.\nPlease try again."
        );
        error.code = 500;
        next(error);
      }

      res.status(201).json(newVideoOjb);
    }
  );
});

module.exports = router;
