const express = require('express')
const mysql = require('mysql2')
const dotenv = require('dotenv')
const { error } = require('console')

dotenv.config()

const app = express()
app.use(express.json)

// Configure databaseconnection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})
// Test the database connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err)
        console.log('Database connected successfully.')
    }
})

// Question 1: Retrieve all patients
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM providers'
    db.query(query,(err, results) => {
        if (err) {
            res.status(500).json({ error: err.message})
        } else {
            res.json(results)
        }
    })
    })


// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_speciality FROM providers'
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message })
        } else {
            res.json(results)
        }
    })
})


// Question 3: Filter patients by First Name
app.get('/patients/filter', (req, res) => {
    const { first_name } = req.query
    const query = ' SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?'
    db.query(query, [first_name], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message})
        } else {
            res.json(results)
        }
    })
})


// Question 4: Retrieve all providers by their speciality
app.get('/providers/specialty', (req, res) => {
    const { specialty } = req.query
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?'
    db.query(query, [specialty], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message})
        } else {
            res.json(results)
        }
    })
})

//listen to the server
const PORT = 3000
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}')
})