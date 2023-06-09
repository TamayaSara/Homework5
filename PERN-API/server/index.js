const express = require('express')

const app = express()

const path = require('path')

const db = require('./queries')

const PORT = 9001

// Middleware

// host react app as static files
app.use(express.static(path.resolve(__dirname, '../client/build')))

// Routes
app.get('/', (req, res) => {
  // we'll do some stuff here
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

//CRUD
// CREATE - add data to db
app.get('/links', db.getLinks);
// READ - get data from db
app.post('/links', db.createLink); // Create - Add a new link
app.get('/links', db.getLinks)
app.put('/links/:id', db.updateLink); // Update - Update a link
app.delete('/links/:id', db.deleteLink); // Delete - Remove a link


// Starting Express on our PORT
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}.`)
})
