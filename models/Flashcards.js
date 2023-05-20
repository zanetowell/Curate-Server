const mongoose = require ("mongoose")

const FlashcardsSchema = new mongoose.Schema({
    front: String,
    back: String,
    googleId: String,
})

const Flashcards = mongoose.model("Flashcards", FlashcardsSchema)
module.exports = Flashcards