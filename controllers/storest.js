const DeAnzaStory = require("../models/deanzastory.js")
const FoothillStory = require('../models/foothillstory.js');


module.exports = (app) => {

    /**
     * All stories
     */
    app.get('/old/rest/deanza', (req, res) => {
        DeAnzaStory.find({}, (err, docs) => {
            if (err) {
                console.log(err);
                return res.status(500);
            }
            return res.json(docs);
        });
    });

    app.get('/old/rest/foothill', (req, res) => {
        FoothillStory.find({}, (err, docs) => {
            if (err) {
                console.log(err);
                return res.status(500);
            }
            return res.json(docs);
        })
    });


    /**
     *  Limited Returns of Stories 
     */

    app.get('/old/rest/deanza/:number', (req, res) => {
        DeAnzaStory.find({}, (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(500);
                }
                return res.json(docs);
            })
            .limit(parseInt(req.params.number));
    });

    app.get('/old/rest/foothill/:number', (req, res) => {
        FoothillStory.find({}, (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(500);
                }
                return res.json(docs);
            })
            .limit(parseInt(req.params.number));
    });

    /**
     * Document counts 
     */

    app.get('/old/rest/count/deanza', (req, res) => {
        DeAnzaStory
            .estimatedDocumentCount()
            .exec((err, count) => {
                if (err) {
                    return res.status(500)
                }
                return res.json({
                    count,
                    lastupdated: Date(Date.now())
                });
            });
    });

    app.get('/old/rest/count/foothill', (req, res) => {
        FoothillStory
            .estimatedDocumentCount()
            .exec((err, count) => {
                if (err) {
                    return res.status(500)
                }
                return res.json({
                    count,
                    lastupdated: Date(Date.now())
                });
            });
    });

}