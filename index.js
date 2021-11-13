const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = 5005;
const ObjectId = require("mongodb").ObjectId;

const { MongoClient } = require("mongodb");
app.use(cors());
app.use(express.json());
const uri =
  "mongodb+srv://AsirFaisal:Dip123456@cluster0.epgax.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("supercars");
    const cars = database.collection("cars");
    const orders = database.collection("orders");
    //GET API
    app.get("/cars", async (req, res) => {
      const cursor = cars.find({});
      const car = await cursor.toArray();
      res.send(car);
      console.log("Hit");
    });

    //POST API
    app.post("/orders", async (req, res) => {
      const order = req.body;
      console.log("hit", order);
      const result = await orders.insertOne(order);
      console.log(result);
      res.json(result);
    });
    app.post("/cars", async (req, res) => {
      const car = req.body;
      console.log("hit", car);
      const result = await cars.insertOne(car);
      console.log(result);
      res.json(result);
    });
    //DELETE API
    app.delete("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orders.deleteOne(query);
      console.log("Deleted");
      res.json(result);
    });
    app.get("/orders", async (req, res) => {
      const cursor = orders.find({});
      const order = await cursor.toArray();
      res.send(order);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Running SuperCar Server");
});

app.listen(port, () => {
  console.log("Server Running", port);
});
