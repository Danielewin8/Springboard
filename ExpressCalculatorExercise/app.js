const express = require("express");
const ExpressError = require('./errors')
const app = express();

const { mean, median, mode } = require('./helpers')

// Mean query route
app.get('/mean', (req, res, next) => {
    try {
        // If no query given, throw error
        if (!req.query.nums) {
            throw new ExpressError('Please add a query of numbers', 400)
        }
        const stringNums = req.query.nums.split(',').map(function (num) {
            return Number(num)
        })
        // if the stringNums array contains anything but a number(NaN), throw error
        for (i = 0; i < stringNums.length; i++) {
            if (Number.isNaN(stringNums[i])) {
                throw new ExpressError("Query can only contain numbers!", 400)
            }
        }
        let response = {
            operation: "mean",
            value: mean(stringNums)
        }
        return res.send(response);
    } catch (error) {
        next(error)
    }
})
// Median query route
app.get('/median', (req, res, next) => {
    try {
        // If no query given, throw error
        if (!req.query.nums) {
            throw new ExpressError('Please add a query of numbers', 400)
        }
        const stringNums = req.query.nums.split(',').map(function (num) {
            return Number(num)
        })
        // if the stringNums array contains anything but a number(NaN), throw error
        for (i = 0; i < stringNums.length; i++) {
            if (Number.isNaN(stringNums[i])) {
                throw new ExpressError("Query can only contain numbers!", 400)
            }
        }
        let response = {
            operation: "median",
            value: median(stringNums)
        }
        return res.send(response);
    } catch (error) {
        next(error)
    }
})
// Mode query route
app.get('/mode', (req, res, next) => {
    try {
        // If no query given, throw error
        if (!req.query.nums) {
            throw new ExpressError('Please add a query of numbers', 400)
        }
        const stringNums = req.query.nums.split(',').map(function (num) {
            return Number(num)
        })
        // if the stringNums array contains anything but a number(NaN), throw error
        for (i = 0; i < stringNums.length; i++) {
            if (Number.isNaN(stringNums[i])) {
                throw new ExpressError("Query can only contain numbers!", 400)
            }
        }
        let response = {
            operation: "mode",
            value: mode(stringNums)
        }
        return res.send(response);
    } catch (error) {
        next(error)
    }
})

// Error Handlers
app.use((req, res, next) => {
    const error = new ExpressError("PAGE NOT FOUND", 404)
    next(error)
})

app.use((error, req, res, next) => {
    let status = error.status || 500;
    let message = error.message

    return res.status(error.status).send(error.message)
});

app.listen(3000, () => {
    console.log('App on port 3000');
});