process.env.NODE_ENV = "test";

const request = require("supertest")

const app = require("../app");
let items = require("../fakeDb");

let item = { name: "Cereal", price: 1.00 }

beforeEach(function () {
    items.push(item);
})
afterEach(function () {
    items.length = 0;
})

// GET REQUEST TEST
describe("GET /items", () => {
    test("Get all items", async () => {
        const response = await request(app).get("/items");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ items: [item] });
    })
})
// GET REQUEST FOR ITEM BY NAME
describe("GET /items/:name", () => {
    test("Get item by name", async () => {
        const response = await request(app).get(`/items/${item.name}`)
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ item: item });
    })
    test("Get item by name where invalid", async () => {
        const response = await request(app).get('/items/burgers');
        expect(response.statusCode).toBe(404);
    })
})
// POST REQUEST TEST
describe("POST /items", () => {
    test("Adding new item", async () => {
        const response = await request(app).post("/items")
            .send({ name: "Waffles", price: 2.00 });
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ item: { name: "Waffles", price: 2.00 } });
    })
})
// PATCH REQUEST TEST
describe("PATCH /items/:name", () => {
    test("Editing existing item", async () => {
        const response = await request(app).patch(`/items/${item.name}`)
            .send({ name: "Waffles" });
        expect(response.statusCode).toBe(200);
        expect(response.body.item.name).toEqual("Waffles");
    })
    test("Responds with 404 for invalid item name", async () => {
        const response = await request(app).patch('/items/burgers')
            .send({ name: "Waffles" });
        expect(response.statusCode).toBe(404);
    })
})
// DELETE REQUEST TEST
describe("DELETE /items/:name", () => {
    test("Deleting an existing item", async () => {
        const response = await request(app).delete(`/items/${item.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: "DELETED" });
    })
    test("Responds with 404 for invalid item name", async () => {
        const response = await request(app).delete('/items/burgers')
        expect(response.statusCode).toBe(404);
    })
})