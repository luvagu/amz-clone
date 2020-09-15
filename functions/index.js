// Imports
const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')('sk_test_519LE50LWDjvp29BfZ9vtlUaZa7J8GXitFpNKSWwVpmVkCmmhE0hNsV8vbzGDl2w2w4f2c0hT7nRoCofzuEU32hKj00kDVqZr1M')

// API config
// const port = process.env.port || 5000
const app = express()

// Middlewares
app.use(cors())
// app.use(cors({ origin: true }))
app.use(express.json())

// Routes Req / Res
app.get('/', (req, res) => res.status(200).send('<h1>Welcome to AMZ Clone Backend</h1>'))

app.post('/payments/create', async (req, res) => {
    const total = req.query.total

    console.log('Payment Request Received, amount >>>> ', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd'
    })

    // console.log('clientSecret response >>> ', paymentIntent.client_secret)

    // OK created
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

// Listen commands
exports.app = functions.https.onRequest(app)


// Example enpoints
// http://localhost:5001/amz-react-clone/us-central1/app