// Will contain all of my users routes
const express = require('express')
const router = express.Router() 
const mysql = require('mysql')

// Configure your mySQL 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  
    password: '1234',
    database: 'test-rest-api'
})

router.get('/messages', (req, res) => { 
    console.log("Show some messages or whatever on router...") 
    res.end()
})

router.get("/users", (req, res) => { 
    const queryString = "Select * From Users" 

    connection.query(queryString, (err, rows, fields) => { 
        if (err) { 
            console.log("Failed to fetch Users") 
            res.end() 
        }

        res.json(rows)
    })

})


router.post('/user_create', (req, res) => { 
    console.log("Try to create new user") 


    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name

    console.log(firstName + lastName)

    const queryString = "INSERT INTO Users(first_name, last_name) VALUES(?, ?)"
 
    connection.query(queryString, [firstName, lastName], (error, results, fields) => { 
        if (error) { 
            console.log("Failed to create new user" + error) 
            res.sendStatus(500) 

            res.end() 
        }

        console.log("Created new user " + results.insertedId) 
        res.end()
    })

})


router.get('/users/:id', (req, res) => {
    console.log("Fetching user with id:" + req.params.id)

    const queryString = "Select * From Users Where ID = ?"
    const userID = req.params.id

    connection.query(queryString, [userID], (err, rows, fields) => { 

        if (err) { 
            console.log("Failed to query for users: " + err)
            res.sendStatus(500)
            res.end()
            throw err
        }

        console.log("Fetched user successfully")
        res.json(rows)
    })

    // // res.end()
})



module.exports = router