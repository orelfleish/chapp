const mongoose = require('mongoose');


async function connectDB(uri) {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return mongoose;
}

async function closeDB() {
    await mongoose.disconnect();
}


module.exports = { connectDB, closeDB };