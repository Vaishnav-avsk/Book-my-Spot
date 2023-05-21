const express = require("express");
const path = require("path");

// Running PORT is set automatically by App Engine
const port = process.env.PORT || 3000;
const app = express();

const f_Path = path.join(__dirname, "/dist/frontend");


app.use(express.static(f_Path));

app.get(["**","/search","/bookings"], (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/frontend/index.html"));
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
