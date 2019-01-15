const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mongoURI: 'mongodb://admin:onix365@ds253889.mlab.com:53889/palyhacks',
    port: process.env.APP_PORT
}