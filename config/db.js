const mongoose = require('mongoose');
const config = require('config'); // looks at default.json for global variables
const db = config.get('mongoURI');

// mongoose methods return promises so we use async here
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });

        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;