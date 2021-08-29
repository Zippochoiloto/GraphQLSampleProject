const { parseValue } = require("graphql");

const Author = require("../models/Author");
const Book = require("../models/Book");

const resolvers = {
  // Query
  Query: {
    books: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks(),
    authors: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllAuthors(),
    book: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getBookById(id),
    author: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(id),
  },

  Book: {
    author: async ({ authorId }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(authorId),
  },

  Author: {
    book: async ({ id }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks({authorId : id}),
  },

  // Mutation
  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createAuthor(args),
    createBook: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createBook(args),
  },
};

module.exports = resolvers;
