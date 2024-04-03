const express  = require("express")
require('dotenv').config()
const workoutRoutes = require('./routes/workouts')
const mongoose = require("mongoose")

const app = express()
port = process.env.PORT


//middleware
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

app.use(express.json())

app.use('/api/workouts',workoutRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`listening to port ${port}`)
        })
    })
    .catch((err) => {console.log(err)})



