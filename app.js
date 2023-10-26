const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// const users = require("./routes/userRoutes");

// app.set("view engin", "ejs");
// midleware
app.use(express.static("./public"));
// علشان اقدر احصل على الداتا في الصفحة
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);
// app.use("/api/v1/users", users);

// incorrect route
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
