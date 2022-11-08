const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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
    const serviceCollection = client.db('dreamArchitects').collection('services');
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