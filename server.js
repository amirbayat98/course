const express = require("express");
const connectDB = require('./config/db');

const app = express();
// connect to database
connectDB();

// init middleware
app.use(express.json({extended: false}));   //allow us to get data in req.body

app.get("/", (req, res) => {
   res.send("hello there!");
});

app.use("/videos", require('./routes/api/videos'));
app.use("/courses", require('./routes/api/courses'));

PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port : ${PORT}`));