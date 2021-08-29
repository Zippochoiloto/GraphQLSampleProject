const express = require("express");

const { ApolloServer } = require("apollo-server-express");
const mongoose = require('mongoose')
// Load schema & resolver
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

// Load db methods

const mongoDataMethods = require('./data/db')
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://theanh-web-dev:1234@cluster0.x7o1v.mongodb.net/graphql-server?retryWrites=true&w=majority', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    })

    console.log('Mongodb connected')
  } catch (error) {
    console.log(error)
    process.exit()
  }
}

connectDB()

async function startAppoloServer() {  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethods })
  });

  await server.start();
  const app = express();
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

startAppoloServer()

