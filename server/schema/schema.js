const {gql} = require('apollo-server-express')

const typeDefs = gql`
    type Book {
        id: ID
        name: String
        genre: String
        author: Author
    }

    # ROOT TYPE
    type Query {
        books: [Book]
        authors: [Author]
        book(id: ID): Book
        author(id: ID!): Author
    }

    type Author{
        id: ID!
        name: String
        age: Int
        book: [Book]
    }

    type Mutation {
        createAuthor( name: String, age: Int): Author
        createBook( name: String, genre: String, authorId: ID!): Book
    }
`

module.exports = typeDefs