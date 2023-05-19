////////////////////////////////
// DEPENDENCIES
////////////////////////////////
require("dotenv").config();
const { PORT = 4000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const admin = require("firebase-admin")


const serviceAccount = require("./curate-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
// Connection Events
mongoose.connection
.on("open", () => console.log("You are connected to mongoose"))
.on("close", () => console.log("You are disconnected from mongoose"))
.on("error", (error) => console.log(error));

/////////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies
app.use(express.urlencoded({extended:true}))

app.use(async (req, res, next) => {
    const token = req.get('Authorization')
    if(token) {
        const user = await admin.auth().verifyIdToken(token.replace('Bearer ', ''))
        req.user = user
    } else {
        req.user = null
    }
    next()
})

const isAuthenticated = (req, res, next) => {
    if(!req.user) {
        return res.status(401).json({message: 'You must be logged in to continue!'})
    } else {
        return next()
    }
}

app.use(isAuthenticated)

// Controllers
const topicsController = require("./controllers/topicsController")
app.use('/topics', topicsController)

// Test route
app.get("/", (req, res) => {
    res.send("hello world");
});
    
///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
