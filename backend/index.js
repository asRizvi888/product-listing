require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/db");

const app = express();
const port = process.env.PORT;

// connect to DB
connectDB();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

// routes
app.get("/", (_, res) => {
  res.send("<center><h3>Hello World👋</h3></center>");
});

require("./src/routes/user")(app);
require("./src/routes/product")(app);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
