const mongoose = require ("mongoose")

const TopicsSchema = new mongoose.Schema({
    name: String,
    icon: String,
    description: String,
    googleId: String,
    cards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Flashcards'}],
    archived: {type: Boolean, default: false},
})


const Topics = mongoose.model("Topics", TopicsSchema)
module.exports = Topics