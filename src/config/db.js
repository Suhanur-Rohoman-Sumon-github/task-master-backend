const mongoose = require("mongoose");
const { mongodbUrl } = require("../secret");


const connectDB = async(options = {}) => {
    try {
        await mongoose.connect(mongodbUrl, options);
        console.log("Connection to mongoDB is successful!");
        mongoose.connection.on("error", (error) => {
            console.error('DB connection error', error);
        })
    } catch (error) {
        console.error('Could not connect to DB', error);
    }
}

module.exports = connectDB;