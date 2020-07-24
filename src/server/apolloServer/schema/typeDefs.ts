import { gql } from "@apollo/client";

export default gql`
  type Book {
    book: String!
    author: Author
    id: Int!
  }

  type Author {
    name: String!
    location: String!
    age: Int!
  }

  type Query {
    books: [Book]
    book(id: Int!): Book
    authors: [Author]
    author(name: String!): Author
  }
`;
