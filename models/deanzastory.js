const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeAnzaStorySchema = new Schema({
    header: String,
    author: {
        name: String,
        directory: String
    },
    date: String,
    content: String
}, {
    collection: 'deanzaclean'
});

module.exports = mongoose.model('DeAnzaStory', DeAnzaStorySchema);