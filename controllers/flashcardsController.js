const express = require("express");
const Flashcards = require("../models/Flashcards");
const cardsRouter = express.Router();


// Index
cardsRouter.get("/", async (req, res) => {
    try {
        // send all topics
        const googleId = req.user.uid
        res.json(await Flashcards.find({googleId}));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// Delete
cardsRouter.delete("/:id", async (req, res) => {
    try {
        // send all topics
        res.json(await Flashcards.findByIdAndRemove(req.params.id));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// Update
cardsRouter.put("/:id", async (req, res) => {
    try {
        // send all topics
        res.json(
            await Flashcards.findByIdAndUpdate(req.params.id, req.body, { new: true })
            );
        } catch (error) {
            //send error
            res.status(400).json(error);
        }
    });

// Create
cardsRouter.post("/", async (req, res) => {
    try {
        // send all topics
        req.body.googleId = req.user.uid
        res.json(await Flashcards.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
    });

module.exports = cardsRouter