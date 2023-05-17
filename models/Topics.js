const mongoose = require ("mongoose")

const TopicsSchema = new mongoose.Schema({
    name: {String, required: true},
    icon: String,
    description: String,
})

const Topics = mongoose.model("Topics", TopicsSchema)

module.exports = Topics