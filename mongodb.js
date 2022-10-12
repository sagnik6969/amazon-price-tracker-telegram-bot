import { MongoClient, ServerApiVersion } from "mongodb";
import Dotenv from "dotenv";
Dotenv.config();
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

function init() {
  return client.connect();
}

async function updateUser(chatId, url, price) {
  const collection = client.db("AmazonPriceTracker").collection("Users");

  const user = await collection.countDocuments({ chatId: chatId });

  if (user == 0) {
    let myObj = {
      chatId: chatId,
      url: url,
      prevPrice: price,
    };

    return collection.insertOne(myObj);
  }

  return collection.updateOne(
    { chatId: chatId },
    { $set: { url: url, prevPrice: price } }
  );
}

function getUsers() {

  const collection = client.db("AmazonPriceTracker").collection("Users");

  return collection.find().toArray();
}


function deleteUser(chatId) {

  const collection = client.db("AmazonPriceTracker").collection("Users");

  return collection.deleteOne({ "chatId": chatId });

}

const mongodb = {
  initializeApp: init,
  updateUser: updateUser,
  getUsers: getUsers,
  deleteUser: deleteUser
};


export default mongodb;
