import { gql } from "@apollo/client";

export default gql`

type Book {
    book: String!
    author: String!
}

type Author {
    name: String!
    location: String!
    age: Int
}

type Query {
    books: [Book]
    authors: [Author]
}`;