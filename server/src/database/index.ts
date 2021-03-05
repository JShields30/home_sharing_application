import { MongoClient } from "mongodb";
import dotenv from "dotenv";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USERPASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/test?retryWrites=true&w=majority`;

export const connectDatabase = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = client.db("main");

  return {
    listings: db.collection("test_listings")
  };
};