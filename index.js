const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eluedpr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const servicesCollection = client.db('dreamArchitects').collection('services');
    const reviewCollection = client.db('dreamArchitects').collection('review');


    // collect all data from database
    app.get('/services', async (req, res) => {
      const query = {};
      const cursor = servicesCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await servicesCollection.findOne(query);
      res.send(service);
    });

    // grt review api
    app.get('/review', async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = {
          email: req.query.email
        };
      }
      const cursor = reviewCollection.find(query);
      const review = await cursor.toArray();
      res.send(review);
    });

    // get service review api
    app.get('/reviews', async (req, res) => {
      // console.log(req.query);
      let query = {};
      if (req.query.service) {
        query = {
          service: req.query.service
        };
      }
      const cursor = reviewCollection.find(query);
      const review = await cursor.toArray();
      res.send(review);
    });

    // review api
    app.post('/review', async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });

    // delete
    app.delete('/review/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });

    // update
    app.get('/review/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const review = await reviewCollection.findOne(query);
      res.send(review);
    });

    app.put('/review/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const previousReview = req.body;
      const option = { upsert: true };
      const updatedReview = {
        $set: {
          review: previousReview.review
        }
      };
      const result = await reviewCollection.updateOne(filter, updatedReview, option);
      res.send(result);
    });


  }
  finally {

  }
}

run().catch(error => console.error(error));




app.get('/', (req, res) => {
  res.send('dream architects server is running');
});

app.listen(port, () => {
  console.log(`Dream architects server is running on ${port}`);
});