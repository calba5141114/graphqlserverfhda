const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema.js');
const configuration = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const storest = require('./controllers/storest.js');

// connect to DB
mongoose.connect(configuration.mongoURI, {
    useNewUrlParser: true
});
mongoose.connection.once('open', () => {
    console.log("Connected to the database");
});

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

// rest controller
storest(app);

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

//404
app.get('*', (req, res) => {
    res.json({
            message: 404
        })
        .status(404)
});



app.listen(process.env.APP_PORT, () => {
    console.log(`Running on ${process.env.APP_PORT} 🚀`);
});