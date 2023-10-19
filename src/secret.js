require("dotenv").config();
const port = process.env.SERVER_PORT || 1005;
const mongodbUrl = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/taskwaveDB";


module.exports = { port, mongodbUrl };