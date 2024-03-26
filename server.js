const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Note = require("./models/noteModel");
require("dotenv").config();

const port = 3000;

const app = express();
app.use(cors());

const noteRouter = require("./routes/noteRoute");
app.use("/notes", noteRouter);

app.get("/", (req, res) => {
  res.status(200).json({ status: "Server is running" });
});

async function main() {
  console.log("Waiting for database...");
  await mongoose.connect(process.env.DB_URL);
  console.log("Connected to database");

  app.listen(port, () => console.log(`listening on ${port}`));
}

main().catch((e) => console.error(e));
