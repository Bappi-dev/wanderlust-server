import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URL);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
const mongodbclient = await connectToMongoDB();
const db = mongodbclient.db("wanderlust1");
const destinationCollection = db.collection("destinations");

app.post("/addDestination", async (req, res) => {
  const data = req.body;
  const result = await destinationCollection.insertOne(data);
  res.send(result);
});

app.get("/addDestination", async (req, res) => {
  const result = await destinationCollection.find().toArray();
  res.send(result);
});

app.get("/addDestination/:id", async (req, res) => {
  const { id } = req.params;
  const result = await destinationCollection.findOne({ _id: new ObjectId(id) });
  res.send(result);
});

app.patch("/addDestination/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await destinationCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: data },
  );
  res.json(result);
});

app.delete("/addDestination/:id", async (req, res) => {
  const { id } = req.params;
  const result = await destinationCollection.deleteOne({
    _id: new ObjectId(id),
  });
  res.json(result);
});

app.get("/", (req, res) => {
  res.send({ msg: "server is comming.." });
});

// http://localhost:5000/addDestination
app.listen(PORT, () => {
  console.log(`Server is running in port:${PORT}`);
});
