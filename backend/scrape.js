import mongoose from "mongoose";

mongoose.connect("mongodb+srv://shachi03shukla_db_user:MmAfAa7Qi3kWcSQ5@cluster-et.4o7frgq.mongodb.net/?appName=Cluster-ET")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const pageSchema = new mongoose.Schema({
  url: String,
  content: String
});

const Page = mongoose.model("Page", pageSchema);


import axios from "axios";

async function fetchAndStore(url) {
  const res = await axios.get(url);

  const content = res.data; // raw HTML or processed text

  await Page.create({
    url,
    content
  });

  console.log("Saved:", url);
}

fetchAndStore("");