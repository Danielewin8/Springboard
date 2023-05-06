"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testJobIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
    const newJob = {
        title: 'new',
        salary: 500,
        equity: .2,
        companyHandle: 'c1'
    };

    test("works", async function () {
        let job = await Job.create(newJob);
        expect(job).toEqual(
            {
                id: expect.any(Number),
                title: 'new',
                salary: 500,
                equity: '0.2',
                companyHandle: 'c1'
            });

        const result = await db.query(
            `SELECT id, title, salary, company_handle AS "companyHandle", equity
             FROM jobs
             WHERE title = 'new'`);
        expect(result.rows).toEqual([
            {
                id: expect.any(Number),
                title: 'new',
                salary: 500,
                equity: '0.2',
                companyHandle: 'c1'
            }
        ]);
    });

    test("bad request with dupe", async function () {
        try {
            await Job.create(newJob);
            await Job.create(newJob);
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

/************************************** findAll */

describe("findAll", () => {
    test("works: no filter", async () => {
        let jobs = await Job.findAll();
        expect(jobs).toEqual([
            {
                id: testJobIds[0],
                title: 'j1',
                salary: 500,
                equity: '0.2',
                companyHandle: 'c1',
                companyName: "C1"
            },
            {
                id: testJobIds[1],
                title: 'j2',
                salary: 600,
                equity: '0.3',
                companyHandle: 'c1',
                companyName: "C1"
            }
        ]);
    });

    test("works: title filter", async () => {
        let jobs = await Job.findAll({ title: "j1" });
        expect(jobs).toEqual([
            {
                id: testJobIds[0],
                title: 'j1',
                salary: 500,
                equity: '0.2',
                companyHandle: 'c1',
                companyName: "C1"
            }
        ])
    })

    test("works: minSalary filter", async () => {
        let jobs = await Job.findAll({ minSalary: 599 });
        expect(jobs).toEqual([         
            {
                id: testJobIds[1],
                title: 'j2',
                salary: 600,
                equity: '0.3',
                companyHandle: 'c1',
                companyName: "C1"
            }
        ])
    })

    test("works: hasEquity filter", async () => {
        let jobs = await Job.findAll({ hasEquity: true });
        expect(jobs).toEqual([
            {
                id: testJobIds[0],
                title: 'j1',
                salary: 500,
                equity: '0.2',
                companyHandle: 'c1',
                companyName: "C1"
            },
            {
                id: testJobIds[1],
                title: 'j2',
                salary: 600,
                equity: '0.3',
                companyHandle: 'c1',
                companyName: "C1"
            }
        ])
    })
});

/************************************** get */

describe("get", () => {
    test("works", async () => {
        let job = await Job.get(testJobIds[0]);
        expect(job).toEqual({
            id: testJobIds[0],
            title: 'j1',
            salary: 500,
            equity: '0.2',
            companyHandle: 'c1',
        })
    })

    test("not found error if no such job", async function () {
        try {
            await Job.get(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** update */

describe("update", () => {
    const updateData = {
        title: "Title Update",
        salary: 1,
        equity: '0.9'
    }

    test("works", async () => {
        let job = await Job.update(testJobIds[0], updateData);
        expect(job).toEqual({
            id: testJobIds[0],
            companyHandle: "c1",
            ...updateData,
        });
    })

    test("not found error if no such job", async function () {
        try {
            await Job.get(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** remove */

describe("remove", () => {
    test("works", async () => {
        await Job.remove(testJobIds[0]);
        const res = await db.query(
            "SELECT id FROM jobs WHERE id = $1",
            [testJobIds[0]]
        );
        expect(res.rows.length).toEqual(0);
    })

    test("not found error if no such job", async function () {
        try {
            await Job.get(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
})