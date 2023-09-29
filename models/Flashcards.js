const mongoose = require ("mongoose")

const FlashcardsSchema = new mongoose.Schema({
    topic: String,
    front: String,
    back: String,
    googleId: String,
    topic_id: String,
})

const Flashcards = mongoose.model("Flashcards", FlashcardsSchema)
module.exports = Flashcards