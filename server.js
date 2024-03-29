const express = require('express')

const connectDB = require('./config/db')

const app = express()

// DB Connection
connectDB()

// Init Middleware
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/user'))
app.use('/api/contacts', require('./routes/contact'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server started on port: ' + PORT))
