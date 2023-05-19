const mongoose = require ("mongoose")

const TopicsSchema = new mongoose.Schema({
    name: String,
    icon: String,
    description: String,
    googleId: String,
})

const Topics = mongoose.model("Topics", TopicsSchema)

module.exports = Topics