const express = require("express");
const Topics = require("../models/Topics");
const topicsRouter = express.Router();


// Index
topicsRouter.get("/", async (req, res) => {
    try {
        // send all topics
        const googleId = req.user.uid
        res.json(await Topics.find({googleId}))
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// Delete
topicsRouter.delete("/:id", async (req, res) => {
    try {
        // send all topics
        res.json(await Topics.findByIdAndRemove(req.params.id));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// Update
topicsRouter.put("/:id", async (req, res) => {
    try {
        // send all topics
        res.json(
            await Topics.findByIdAndUpdate(req.params.id, req.body, { new: true })
            );
        } catch (error) {
            //send error
            res.status(400).json(error);
        }
    });

// Create
topicsRouter.post("/", async (req, res) => {
    try {
        // send all topics
        req.body.googleId = req.user.uid
        res.json(await Topics.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
    });

module.exports = topicsRouter