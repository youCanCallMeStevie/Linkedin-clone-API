const express = require("express");
const server = express();
const cors = require("cors");
const error_handler = require("node-error-handler");
const PORT = process.env.PORT || 3001;
const apiRoutes = require("./services/index");
const mongoose = require("mongoose");
const listEndpoints = require("express-list-endpoints");
const cookieParser = require("cookie-parser");

//MIDDLEWARES
server.use(express.json());
server.use(
  cors({
    origin: [`${process.env.FRONT_URL}`, "http://localhost:3000"],
    credentials: true,
  })
);
server.use(cookieParser());

//ROUTE
server.use("/api", apiRoutes);

//ERROR HANDLERS
server.use(error_handler({ log: true, debug: true }));
console.log(listEndpoints(server))

// console.log("Endpoints:", listEndpoints(apiRoutes))

//Connect to DB and server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(PORT, () => {
      console.log("server connected at port ", PORT);
    })
  );
