const express = require("express");
const app = express();
const dbconnect = require("./config/dbConnection");
const dotenv = require("dotenv");
const cors = require("cors");
const routers = require("./routes/routes")
const errorHandlers = require("./middleWares/errorHandlers")

dbconnect.dbconnect();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/backend", routers);
app.use(errorHandlers)

app.listen(process.env.PORTNO, () => {
  console.log("server started listening to port 5000");
});
