const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoothillStorySchema = new Schema({
    header: String,
    date: String,
    content: String
}, {
    collection: "foothillclean"
});

module.exports = mongoose.model('FoothillStory', FoothillStorySchema);