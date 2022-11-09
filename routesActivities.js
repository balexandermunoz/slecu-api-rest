const express = require('express')
const routes = express.Router()

// Routes

// Get all activities: 
routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM activities', (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })
})

// Add activity:
routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('INSERT INTO activities set ?', [req.body], (err, rows) => {
            if (err) return res.send(err)
            res.send('Activity added!')
        })
    })
})

// Delete specific activity:
routes.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('DELETE FROM activities WHERE id = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err)
            res.send('Activity deleted!')
        })
    })
})

// Update specific activity:
routes.put('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('UPDATE activities set ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
            if (err) return res.send(err)
            res.send('Activity updated!')
        })
    })
})

// Get all the activities of a specific student
routes.get('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM activities WHERE studentid = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })
})

module.exports = routes