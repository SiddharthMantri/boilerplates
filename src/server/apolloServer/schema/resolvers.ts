import { books, authors } from "./data";

export default {
  Query: {
    books: (parent, args, context) => {
      return books;
    },
    // handling arguments with queries, query variables are accessible
    // on the args object. Here, the id will be provided as a query variable
    book: (parent, args, context) => {
      return books.find((book) => book.id === args.id);
    },
    authors: (parent, args, context) => {
      return authors;
    },
    // Here, the name will be provided as a query variable
    author: (parent, args, context) => {
      return authors.find((author) => author.name === args.name);
    },
  },

  // resolve nested author field on Book type
  Book: {
    author: (parent, args, context) => {
      return authors.find((author) => author.name === parent.author);
    },
  },
};
