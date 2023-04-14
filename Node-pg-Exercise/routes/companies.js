// Company routes

const express = require("express")
const router = express.Router();
const db = require("../db");
const app = require("../app");
const ExpressError = require("../expressError");
const slugify = require("slugify");

// Returns list of companies.
router.get('/', async (req, res, next) => {
    try {
        const results = await db.query('SELECT * FROM companies');
        return res.json({ companies: results.rows })
    } catch (error) {
        return next(error);
    }
})

// Return obj of company, including their invoice ids. 404 if not found. 
router.get('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        const companyResults = await db.query('SELECT * FROM companies WHERE code=$1', [code]);
        const invoiceResults = await db.query('SELECT * FROM invoices WHERE comp_code=$1', [code]);

        if (companyResults.rows.length === 0) {
            throw new ExpressError(`Cannot find company with code of ${code}`, 404)
        }
        
        const company = companyResults.rows[0];
        const invoices = invoiceResults.rows;

        company.invoices = invoices.map(inv => inv.id);
        return res.json({"company": company});

    } catch (error) {
        return next(error);
    }
})

// Adds a company.
router.post('/', async (req, res, next) => {
    try {
        const { name, description } = req.body;
        let code = slugify(name, {lower:true});

        const results = await db.query('INSERT INTO companies (code,name, description) VALUES ($1, $2, $3) RETURNING code, name, description', [code, name, description]);
        return res.status(201).json({
            "company": results.rows[0]
        })
    } catch (error) {
        return next(error)
    }
})

// Edit existing company
router.put('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        const { name, description } = req.body;
        const results = await db.query('UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING code, name, description', [name, description, code]);
        if (results.rows.length === 0) {
            throw new ExpressError(`Cannot find company with code of ${code}`, 404)
        }
        return res.json({ "company": results.rows[0] })
    } catch (error) {
        return next(error);
    }
})

// Deletes a company
router.delete('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        const results = await db.query('DELETE FROM companies WHERE code = $1 RETURNING code', [code]);
        if (results.rows.length === 0) {
            throw new ExpressError(`Cannot find company with code of ${code}`, 404)
        }
        return res.json({ status: "DELETED!" })
    } catch (error) {
        return next(error)
    }
})

module.exports = router;