const graphql = require('graphql');
const _ = require('lodash');
// const Book = require('../models/book.js');
// const Author = require('../models/author.js');
const DeAnzaStory = require('../models/deanzastory.js');
const FoothillStory = require('../models/foothillstory.js');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
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
        // author: {
        //     type: GraphQLScalarType,
        //     name: {
        //         type: GraphQLString,
        //     },
        //     directory: {
        //         type: GraphQLString
        //     }
        // },
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
        }
    }
});

// // Modifies the database
// const Mutation = new GraphQLObjectType({
//     name: "Mutation",
//     fields: {
//         addAuthor: {
//             type: AuthorType,
//             args: {
//                 name: {
//                     type: new GraphQLNonNull(GraphQLString)
//                 },
//                 age: {
//                     type: new GraphQLNonNull(GraphQLInt)
//                 }
//             },
//             resolve(parent, args) {
//                 let author = new Author({
//                     name: args.name,
//                     age: args.age
//                 });
//                 return author.save();
//             }
//         },
//         addBook: {
//             type: BookType,
//             args: {
//                 name: {
//                     type: new GraphQLNonNull(GraphQLString)
//                 },
//                 genre: {
//                     type: new GraphQLNonNull(GraphQLString)
//                 },
//                 authorId: {
//                     type: new GraphQLNonNull(GraphQLID)
//                 }
//             },
//             resolve(parent, args) {
//                 let book = new Book({
//                     name: args.name,
//                     genre: args.genre,
//                     authorId: args.authorId
//                 });
//                 return book.save();
//             }
//         }
//     }
// });

module.exports = new GraphQLSchema({
    query: RootQuery
    // , mutation: Mutation
});