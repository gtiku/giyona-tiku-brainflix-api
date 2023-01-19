const express = require("express");
const router = express.Router();
const videosData = require("../data/videos.json");

router.get("/", (req, res, next) => {
  const allVideos = videosData[1].vid_player;
  res.json(allVideos);
});

router.get("/:videoID", (req, res, next) => {
  const videoID = req.params.videoID;
  if (!videoID) {
    const error = new Error("No video with that id exists");
    error.code = 404;
    next(error);
  }
  const video = videosData[1].vid_player.find((video) => video.id === videoID);
  const nextvideos = videosData[0].nextvideos.filter(
    (video) => video.id !== videoID
  );
  res.json({ video: video, nextvideos: nextvideos });
});

// router.post("/:videoID", (req, res, next) => {
// });

module.exports = router;
