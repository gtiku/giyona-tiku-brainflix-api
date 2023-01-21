const express = require("express");
const cors = require("cors");
const videoRoutes = require("./routes/videos");
const app = express();

app.use(express.json());
app.use(express.static("./public"));
app.use(cors());

app.use("/api/v1/videos/", videoRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error" });
});

app.listen(8080);
