process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db")
const Book = require("../models/book");

let book;

beforeEach(async () => {
    book = await Book.create({
        isbn: "0123456789",
        amazon_url: "http://a.co/eobPtX2",
        author: "Author Author",
        language: "English",
        pages: 150,
        publisher: "Pub Publisher",
        title: "Title Testington",
        year: 2023
    });
})
afterEach(async () => {
    await db.query("DELETE FROM books");
})
afterAll(async () => {
    await db.end();
})

// GET BOOKS LIST TEST
describe("GET /", () => {
    test("Get all books", async () => {
        const response = await request(app).get('/books');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            "books": [{
                isbn: "0123456789",
                amazon_url: "http://a.co/eobPtX2",
                author: "Author Author",
                language: "English",
                pages: 150,
                publisher: "Pub Publisher",
                title: "Title Testington",
                year: 2023
            }]
        })
    })
})

// GET SPECIFIC BOOK TEST
describe("GET /books/:isbn", () => {
    test("Get specific book", async () => {
        const response = await request(app).get(`/books/${book.isbn}`)
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            "book": {
                isbn: "0123456789",
                amazon_url: "http://a.co/eobPtX2",
                author: "Author Author",
                language: "English",
                pages: 150,
                publisher: "Pub Publisher",
                title: "Title Testington",
                year: 2023
            }
        })
    })
    test("404 Error for invalid book", async () => {
        const response = await request(app).get("/books/fakebook")
        expect(response.statusCode).toBe(404)
    })
})

// ADD NEW BOOK/VALIDATION TEST
describe("POST /", () => {
    test("Add new book", async () => {
        const response = await request(app).post("/books").send({
            isbn: "9876543210",
            amazon_url: "http://a.co/eobPtX3",
            author: "Author Author 2",
            language: "English",
            pages: 160,
            publisher: "Pub Publisher 2",
            title: "Title Testington 2",
            year: 2024
        })
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            "book": {
                isbn: "9876543210",
                amazon_url: "http://a.co/eobPtX3",
                author: "Author Author 2",
                language: "English",
                pages: 160,
                publisher: "Pub Publisher 2",
                title: "Title Testington 2",
                year: 2024
            }
        })
    })
    test("Validate schema when missing data", async () => {
        const response = await request(app).post("/books").send({
            isbn: "9876543210",
            amazon_url: "http://a.co/eobPtX3",
            author: "Author Author 2",
            language: "English",
            pages: 160,
        })
        expect(response.statusCode).toBe(400);
    })
})

// UPDATING BOOK/VALIDATION TEST

describe("PUT /books/:isbn", () => {
    test("Updating existing book", async () => {
        const response = await request(app).put(`/books/${book.isbn}`).send({
            isbn: `${book.isbn}`,
            amazon_url: "http://a.co/eobPtX2",
            author: "Author Author 2",
            language: "English",
            pages: 150,
            publisher: "Pub Publisher 2",
            title: "Title Testington 2",
            year: 2024
        })
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            "book": {
                isbn: `${book.isbn}`,
                amazon_url: "http://a.co/eobPtX2",
                author: "Author Author 2",
                language: "English",
                pages: 150,
                publisher: "Pub Publisher 2",
                title: "Title Testington 2",
                year: 2024
            }
        })
    })
    test("404 Error for invalid book", async () => {
        const response = await request(app).get("/books/fakebook")
        expect(response.statusCode).toBe(404)
    })
    test("Validate schema when update is missing data", async () => {
        const response = await request(app).put(`/books/${book.isbn}`).send({
            isbn: "9876543210",
            amazon_url: "http://a.co/eobPtX3",
            author: "Author Author 2",
            language: "English",
            pages: 160,
        })
        expect(response.statusCode).toBe(400);
    })
})

// DELETE BOOK TEST

describe("DELETE /", () => {
    test("Deleting a book", async () => {
        const response = await request(app).delete(`/books/${book.isbn}`)
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            message: "Book deleted"
        })
    })
    test("404 Error for invalid book", async () => {
        const response = await request(app).get("/books/fakebook")
        expect(response.statusCode).toBe(404)
    })
})