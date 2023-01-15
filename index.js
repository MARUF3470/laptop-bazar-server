const express = require('express')
var cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.cv9zbqw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    const productCollection = client.db('laptopBazar').collection('products')
    try {
        app.post('/products', async (req, res) => {
            const product = req.body
            console.log(product)
            const result = await productCollection.insertOne(product)
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(err => console.log(err))



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})