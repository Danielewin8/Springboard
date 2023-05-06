"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError, ExpressError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs. */

class Job {
    /** Create a job (from data), update db, return new job data.
     *
     * data should be { title, salary, equity, companyHandle }
     *
     * Returns { id, title, salary, equity, companyHandle }
     * 
     * Throws BadRequestError if company already in database.
     **/

    static async create({ title, salary, equity, companyHandle }) {
        const duplicateCheck = await db.query(
            `SELECT title
                FROM jobs
                WHERE title = $1`,
            [title]);
        if (duplicateCheck.rows[0])
            throw new BadRequestError(`Duplicate job: ${title}`);

        const result = await db.query(
            `INSERT INTO jobs
                (title, salary, equity, company_handle)
                VALUES ($1, $2, $3, $4)
                RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
            [title, salary, equity, companyHandle],
        );
        const job = result.rows[0];

        return job;
    }

    /** Find all jobs. Additionaly filters through query string optionally
     * 
     * Returns [{ id, title, salary, equity, companyHandle, companyName }, ...]
     * */

    static async findAll(filters = {}) {
        let query = `SELECT j.id, j.title, j.salary, j.equity, j.company_handle AS "companyHandle", c.name AS "companyName"
                    FROM jobs j
                      LEFT JOIN companies AS c ON c.handle = j.company_handle`;
        let queryValues = [];
        let whereValues = [];

        const { title, minSalary, hasEquity } = filters;

        // Add to queryValues and whereValues for each possible search.

        if (title !== undefined) {
            queryValues.push(`%${title}%`);
            whereValues.push(`title ILIKE $${queryValues.length}`);
        }

        if (minSalary !== undefined) {
            queryValues.push(minSalary);
            whereValues.push(`salary >= $${queryValues.length}`)
        }

        if (hasEquity === true) {
            whereValues.push(`equity > 0`)
        }

        if (whereValues.length > 0) {
            query += " WHERE " + whereValues.join(" AND ")
        }

        query += " ORDER BY title ";
        const jobRes = await db.query(query, queryValues);
        return jobRes.rows;
    }

    /** Given a job title, return data about that job.
    *
    * Returns { id, title, salary, equity, company_handle, company }
    *   where company is { handle, name, description, numEmployees, logoUrl }
    *
    * Throws NotFoundError if not found.
    **/

    static async get(id) {
        const jobRes = await db.query(
            `SELECT id, title, salary, equity, company_handle AS "companyHandle"
            FROM jobs
            WHERE id = $1`,
            [id]);

        const job = jobRes.rows[0];

        if (!job) throw new NotFoundError(`No job: ${id}`)

        return job;
    }

    /** Update job data with `data`.
    *
    * This is a "partial update" --- it's fine if data doesn't contain
    * all the fields; this only changes provided ones.
    *
    * Data can include: { title, salary, equity }
    *
    * Returns { id, title, salary, equity, companyHandle }
    *
    * Throws NotFoundError if not found.
    */

    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data, {
            title: "title",
            salary: "salary",
            equity: "equity"
        });
        const handleIdIdx = "$" + (values.length + 1);

        const querySql = `
            UPDATE jobs
            SET ${setCols}
            WHERE id = ${handleIdIdx}
            RETURNING id, title, salary, equity, company_handle AS "companyHandle"`;
        const result = await db.query(querySql, [...values, id]);
        const job = result.rows[0];

        if (!job) throw new NotFoundError(`No job: ${id}`)

        return job;
    }

    /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if job not found.
   **/

    static async remove(id) {
        const result = await db.query(
            `DELETE FROM jobs
            WHERE id = $1
            RETURNING id`,
            [id]);
        const job = result.rows[0]

        if (!job) throw new NotFoundError(`No job: ${id}`)
    }
}

module.exports = Job;