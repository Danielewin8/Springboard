"use strict";

const request = require("supertest");

const db = require("../db");
const app = require("../app");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token,
    adminToken,
    testJobIds
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /jobs */

describe("POST /jobs", () => {
    const newJob = {
        title: 'new',
        salary: 500,
        equity: '0.2',
        companyHandle: 'c1'
    };

    test("ok if admin", async () => {
        const resp = await request(app)
            .post("/jobs")
            .send(newJob)
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            job: {
                id: expect.any(Number),
                title: 'new',
                salary: 500,
                equity: '0.2',
                companyHandle: 'c1'
            }
        });
    });

    test("bad request with missing data", async () => {
        const resp = await request(app)
            .post("/jobs")
            .send({
                title: 'new'
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(400);
    })

    test("bad request with invalid data", async () => {
        const resp = await request(app)
            .post("/jobs")
            .send({
                title: 'new',
                salary: "500",
                equity: 0.2,
                companyHandle: 'c1'
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(400);
    })
})

/************************************** GET /jobs */

describe("GET /jobs", () => {
    test("ok for anon", async () => {
        const resp = await request(app).get(`/jobs`);
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
            jobs: [
                {
                    id: expect.any(Number),
                    title: 'j1',
                    salary: 500,
                    equity: '0.2',
                    companyHandle: 'c1',
                    companyName: "C1"
                },
                {
                    id: expect.any(Number),
                    title: 'j2',
                    salary: 600,
                    equity: '0.3',
                    companyHandle: 'c1',
                    companyName: "C1"
                }
            ]
        })
    })

    test("fails: test next() handler", async function () {
        await db.query("DROP TABLE jobs CASCADE");
        const resp = await request(app)
            .get("/jobs")
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(500);
    });
});

/************************************** GET /jobs/:id */

describe("GET /jobs/:id", () => {
    test("works for anon", async () => {
        const resp = await request(app).get(`/jobs/${testJobIds[0]}`)
        expect(resp.body).toEqual({
            job: {
                id: expect.any(Number),
                title: 'j1',
                salary: 500,
                equity: '0.2',
                companyHandle: 'c1',
            }
        });
    });

    test("not found for no such job", async () => {
        const resp = await request(app).get(`/jobs/0`);
        expect(resp.statusCode).toEqual(404);
    });
});

/************************************** PATCH /jobs/:id */

describe("PATCH /jobs/:id", () => {
    test("works for admin", async () => {
        const resp = await request(app)
            .patch(`/jobs/${testJobIds[0]}`)
            .send({
                title: 'j3'
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.body).toEqual({
            job: {
                id: expect.any(Number),
                title: 'j3',
                salary: 500,
                equity: '0.2',
                companyHandle: 'c1',
            }
        });
    });

    test("does not work for unauth", async () => {
        const resp = await request(app)
        .patch(`/jobs/${testJobIds[0]}`)
        .send({
            title: 'j3'
        });
        expect(resp.statusCode).toEqual(401);
    })

    test("not found for no such job", async () => {
        const resp = await request(app).get(`/jobs/0`);
        expect(resp.statusCode).toEqual(404);
    });

    test("bad request with invalid data", async () => {
        const resp = await request(app)
            .patch(`/jobs/${testJobIds[0]}`)
            .send({
                salary: "500"
            })
            .set("authorization", `Bearer ${adminToken}`);        
        expect(resp.statusCode).toEqual(400);
    })
})

/************************************** DELETE /jobs/:id */

describe("DELETE /jobs/:id", () => {
    test("works for admin", async () => {
        const resp = await request(app)
            .delete(`/jobs/${testJobIds[0]}`)
            .set("authorization", `Bearer ${adminToken}`)
        expect(resp.body).toEqual({ deleted: `${testJobIds[0]}`})
    })

    test("does not work for unauth", async () => {
        const resp = await request(app)
            .delete(`/jobs/${testJobIds[0]}`)
        expect(resp.statusCode).toEqual(401);
    })

    test("not found for no such job", async () => {
        const resp = await request(app).get(`/jobs/0`);
        expect(resp.statusCode).toEqual(404);
    });
})