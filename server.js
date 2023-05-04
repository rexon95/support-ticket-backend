const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const ticketRoutes = require('./routes/ticketRoutes')

const PORT = process.env.PORT || 8000

//db  connect
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.use('/api/users', userRoutes)
app.use('/api/tickets', ticketRoutes)

if (process.env.NODE_ENV === 'production') {

  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  )
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' })
  })
}


app.use(errorHandler)

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT} `.magenta.bgBlue)
})