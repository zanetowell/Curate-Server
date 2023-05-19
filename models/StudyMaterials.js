const mongoose = require("mongoose")

const FlashcardsSchema = new mongoose.Schema({
    name: String,
    front: String,
    back: String,
    topicId: String,
})

const Flashcards = mongoose.model("Flashcards", FlashcardsSchema)

module.exports = Flashcards