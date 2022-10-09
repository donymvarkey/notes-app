require("dotenv").config();
const Server = require("./src/Server");

const options = {
  port: process.env.PORT,
  mongodb: {
    uri: process.env.MONGO_URL,
  },
  signature: process.env.SIGNATURE,
};

app = new Server(options);

app.startServer();
