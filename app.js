const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema.js');
const configuration = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');

// connect to DB
mongoose.connect(configuration.mongoURI, {
    useNewUrlParser: true
});
mongoose.connection.once('open', () => {
    console.log("Connected to the database");
});

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(configuration.port, () => {
    console.log("Running on 3000 🚀");
});