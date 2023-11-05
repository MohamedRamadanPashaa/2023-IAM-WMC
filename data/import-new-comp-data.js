const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Task = require("../modals/Task");

dotenv.config({ path: "./.env" });

const DB = process.env.MONGO_URI;

// connect with database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection successful"));

// Read json file
const test = JSON.parse(fs.readFileSync(`${__dirname}/test.json`, "utf-8"));

// import data to database
const importData = async () => {
  try {
    await Task.create(test);

    console.log("Data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// delete all data from DB

const deleteData = async () => {
  try {
    await Task.deleteMany();
    console.log("Data successfully deleted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

// process.argv => return 2 things 1) where command located and the file that we read
