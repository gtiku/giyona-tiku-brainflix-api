const express = require("express");
const videoRoutes = require("./routes/videos");

const app = express();

app.use("/videos/", videoRoutes);
// app.use("/upload/", uploadRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error" });
});

app.listen(8080);
