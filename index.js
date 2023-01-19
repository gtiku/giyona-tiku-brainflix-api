const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<p>Home</p>");
});

app.listen(8080, () => console.log("server running"));
