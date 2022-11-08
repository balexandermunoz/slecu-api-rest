const express = require('express')
const routes = express.Router()

// Routes
routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM students', (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('INSERT INTO students set ?', [req.body], (err, rows) => {
            if (err) return res.send(err)
            res.send('Student added!')
        })
    })
})

routes.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('DELETE FROM students WHERE id = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err)
            res.send('Student deleted!')
        })
    })
})

routes.put('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('UPDATE students set ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
            if (err) return res.send(err)
            res.send('Student updated!')
        })
    })
})

module.exports = routes