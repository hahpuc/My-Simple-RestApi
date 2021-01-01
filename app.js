// Load our app server using express.....
const express = require('express') 
const app = express() 
const morgan = require('morgan') 
const bodyParser = require('body-parser')

// To Get ID of component from HTML file
app.use(bodyParser.urlencoded({extended: false}))

// Console Log GET/UPDATE/... 
app.use(morgan('short'))

// Access From.html in localhost
app.use(express.static('./public'))

// Router 
const router = require('./routes/user.js')
app.use(router)

// Don't use Router
app.get("/", (req, res) => { 
    console.log("Respond to root route") 

    res.send("Hello from NTLONG")
}) 
 

// localhost:3000
app.listen(3000, () => { 
    console.log("Server is started on 3000...")
})