require('dotenv').config({path: [".env.local"]})
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')
const express = require('express')
const cookieParser = require('cookie-parser')

const {db} = require('./db')
const routes = require('./routes/index.js')

const errorMiddleware = require('./middlewares/ErrorMiddleware')
 
const app = express()
const port = process.env.PORT || 3002
const host = process.env.HOST || 'localhost'

const corsOptions = {
    credentials: true,
    exposedHeaders: {
        "Access-Control-Allow-Origin": process.env.ADMIN_URL,
        "Access-Control-Allow-Credentials": true,
    },
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL]
}
app.use(cors(corsOptions)) 
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, './static')))
app.use(express.urlencoded({extended: false}))
app.use(fileUpload({}))
app.use("/api", routes)
app.use(errorMiddleware)

const start = async() => {
    try {
        await db.authenticate()
        await db.sync()
        app.listen(port, host, () => {
            console.log(`server started at <http://${host}:${port}>` )
        })
    } catch (error) {
        console.log(error)
    }
}

start()