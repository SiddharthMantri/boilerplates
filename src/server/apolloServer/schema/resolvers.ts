import { books, authors } from "./data";

export default {
    Query: {
        books: (parent, args, context) => {
            return books;
        },
        authors: (parent, args, context) => {
            return authors;
        }
    }
}