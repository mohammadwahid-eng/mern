require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const UserRoutes = require("./routes/UserRoutes");


//Database Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Database Successfully Connected.");

    //Application Listening
    app.listen(process.env.PORT, () => {
        console.log("Application listening at port " + process.env.PORT);
    });
}).catch((error) => {
    console.log(error)
});


//Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/users", UserRoutes);


// Requests
app.get("/", (req, res) => {
    res.send("Hello World")
});