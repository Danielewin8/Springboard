// Invoice Routes

const express = require("express")
const router = express.Router();
const db = require("../db");
const app = require("../app");
const ExpressError = require("../expressError");

// Return info on invoices
router.get('/', async (req, res, next) => {
    try {
        const results = await db.query('SELECT * FROM invoices');
        return res.json({ invoices: results.rows })
    } catch (error) {
        return next(error);
    }
})

// Returns obj on give invoice
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await db.query('SELECT * FROM invoices WHERE id=$1', [id]);
        if( results.rows.length === 0) {
            throw new ExpressError(`Cannot find invoice with id of ${id}`)
        }
        return res.json({ "invoice": results.rows[0] })
    } catch (error) {
        return next(error)
    }
})

// Adds an invoice
router.post('/', async (req, res, next) => {
    try {
        const { comp_code, amt } = req.body;
        const results = await db.query('INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date', [comp_code, amt])
        return res.status(201).json({
            "invoice": results.rows[0]
        })
    } catch (error) {
        return next(error)
    }
})

// Updates an invoice
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { amt, paid } = req.body;
        let paidDate = null;

        const firstResult = await db.query(`SELECT paid FROM invoices WHERE id = $1`, [id]);
        if (firstResult.rows.length === 0){
            throw new ExpressError(`No invoice with id of ${id}`)
        }

        const currentPaidDate = firstResult.rows[0].paid_date;

        if (!currentPaidDate && paid) {
            paidDate = new Date();
        } else if (!paid) {
            paidDate = null
        } else {
            paidDate = currentPaidDate;
        }

        const results = await db.query('UPDATE invoices SET amt=$1, paid=$2, paid_date=$3 WHERE id=$4 RETURNING id, comp_code, amt, paid, add_date', [amt, paid, paid_date, id]);
        if( results.rows.length === 0) {
            throw new ExpressError(`Cannot find invoice with id of ${id}`)
        }
        return res.json({ "invoice": results.rows[0] })
    } catch (error) {
        return next(error)
    }
})

// Deletes an invoice
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await db.query('DELETE FROM invoices WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            throw new ExpressError(`Cannot find invoice with id of ${id}`, 404)
        }
        return res.json({ status: "DELETED!" })
    } catch (error) {
        return next(error)
    }
})

module.exports = router;