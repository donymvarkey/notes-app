/**
 * DataBaseController.js
 * Includes controllers for MongoDB and MySQL
 * Add controller for other databases from here
 * Remove the controller code which you don't need and also remove the imports.
 */
const mongoose = require("mongoose");
const { logger } = require("../config");
// const mysql = require("mysql");

/**
 * connectMongodb: Connect to MongoDB instance
 */
connectMongodb = async (uri) => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.Promise = global.Promise;
  logger.info("Connected to MongoDB instance");
};

module.exports = {
  connectMongodb,
};
