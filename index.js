const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

const db = process.env.DATABASE_URI;

const recipesRoute = require("./routes/recipes");

mongoose.connect(
  db,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => console.log("Database connection successful.")
);

app.use("/recipes", recipesRoute);

app.listen(port, () =>
  console.log(`ChefBox server is running on PORT: ${port}`)
);
