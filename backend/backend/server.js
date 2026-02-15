const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Course API is running");
});

app.use("/api/courses", require("./routes/courses"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
