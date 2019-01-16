const graphql = require('graphql');
const _ = require('lodash');
const DeAnzaStory = require('../models/deanzastory.js');
const FoothillStory = require('../models/foothillstory.js');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLInt
} = graphql;


// need to fix the author type which is a JSON object
const DeAnzaStoryType = new GraphQLObjectType({
    name: "DeAnzaStory",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        header: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        }
    })
});

const FoothillStoryType = new GraphQLObjectType({
    name: "FoothillStory",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        header: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        }
    })
});

const InformationType = new GraphQLObjectType({
    name: "InformationType",
    fields: () => ({
        count: {
            type: GraphQLInt
        },
        lastupdated: {
            type: GraphQLString
        }
    })
});



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        deanzastory: {
            type: DeAnzaStoryType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return DeAnzaStory.findById(args.id);
            }
        },
        foothillstory: {
            type: FoothillStoryType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return FoothillStory.findById(args.id);
            }
        },
        foothillstories: {
            type: new GraphQLList(DeAnzaStoryType),
            resolve(parent, args) {
                return FoothillStory.find({});
            }
        },
        deanzastories: {
            type: new GraphQLList(FoothillStoryType),
            resolve(parent, args) {
                return DeAnzaStory.find({});
            }
        },
        deanzastorieslimit: {
            type: new GraphQLList(DeAnzaStoryType),
            args: {
                first: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                return DeAnzaStory.find({}).limit(args.first)
            }
        },
        foothillstorieslimit: {
            type: new GraphQLList(FoothillStoryType),
            args: {
                first: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                return FoothillStory.find({}).limit(args.first)
            }
        },
        getStoryCount: {
            type: InformationType,
            args: {
                school: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                /**
                 * Gets information from Deanza and Foothill
                 */
                if (args.school === "deanza") {
                    return {
                        count: DeAnzaStory.estimatedDocumentCount(),
                        lastupdated: Date(Date.now())
                    }
                } else if (args.school === "foothill") {
                    return {
                        count: FoothillStory.estimatedDocumentCount(),
                        lastupdated: Date(Date.now())
                    }
                }
            }
        }
    }
});



module.exports = new GraphQLSchema({
    query: RootQuery

});