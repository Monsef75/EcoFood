// 🔹 Consts SETUP
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
require('dotenv').config({ path: envFile })
const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const http = require("http")
// const { Server } = require("socket.io")
const server = http.createServer(app)
const FrontUrl = process.env.FRONT_URL

// Serve the files
app.use('/uploads', express.static('uploads'));

// 🔹 SOCKET.IO SETUP
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}))
app.use(bodyParser.json())

// const io = new Server(server, {
//     cors: {
//         origin: FrontUrl,
//         methods: ["GET", "POST", "PUT", "DELETE"],
//     },
// })

// 🔹 MongoClient SETUP
const client = new MongoClient(process.env.STRING, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

async function run() {
    try {
        await client.connect();
        console.log('Connected to MongoDB!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err)
    }
}
run()

const db = client.db('EcoFood')
const members = db.collection('Members')
const products = db.collection('Products')
const orders = db.collection('Orders')

require('./src/router.js')( app, members, products, orders )
async function expireProducts(products) {
    try {
        const now = new Date()

        await products.updateMany(
            {
                active: true,
                expiresAt: { $lte: now }
            },
            {
                $set: { active: false }
            }
        )
    } catch (err) {
        console.log('expireProducts failed', err)
    }
}


server.listen(process.env.PORT, async () => {

    expireProducts(products)
    setInterval(() => {
        expireProducts(products)
    }, 5 * 60 * 1000)

    if (process.env.NODE_ENV === 'development') {
        console.log(`Server Running locally on ${process.env.PORT}`)
    } else {
        console.log("Server Running in production")
    }
})