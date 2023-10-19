const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createErrors = require("http-errors");
const rateLimit = require("express-rate-limit");
const app = express();
const cors = require('cors')
const jwt = require("jsonwebtoken")
const passport = require("passport")

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: "Too many request from this ip, please try again later!",
})




// router require start there
const userRouter = require("./routers/userRouter")
require("./config/passport")
// router require end there

// midlewers starting there
app.use(morgan('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimiter);
// midleware end there 


// routes logic start there
app.use("/api", userRouter)
// routes logic end there
// initial get request there
app.get('/', (req, res) => {
    res.status(200).send("Welcome to task-wave sever!")
})

// task home page route 
app.get('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.status(200).send({
            success: true,
            user:{
                id:req.user._id,
                username:req.user.username
            }
        })
    }
);
// error handling midleware  start there 
// this midleware for if anything bad request for any other routes
app.use((req, res, next) => {
    res.status(404).json({
        massage: "rout not found "
    })

})
// this midleware for if any unexpected error ocured in our aplication 
app.use((error, req, res, next) => {
    console.error(error.stack)
    res.status(500).json({
        massage: "somthing is brocken"
    })
})

// error hendaling midleware end there





module.exports = app;