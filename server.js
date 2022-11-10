const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const cors = require('cors')

const routesStudents = require('./routesStudents')
const routesActivities = require('./routesActivities')
const routesStats = require('./routesStats')

const app = express()
app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: 'localhost',
    port: 3306, // Default port
    user: 'root',
    password: 'J853brayan777',
    database: 'slecudb'
}

// Middelwares
app.use(myconn(mysql, dbOptions, 'single')) // Pull or request
app.use(express.json())
app.use(cors())

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to my API')
})
app.use('/students', routesStudents)
app.use('/activities', routesActivities)
app.use('/stats', routesStats)

// Server running 
app.listen(app.get('port'), () => {
    console.log('server running on port', app.get('port'))
})
