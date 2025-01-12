const mongoose = require('mongoose');

module.exports = async () =>{
    try {
        const databaseUrl = `${process.env.MONGODB_URL}/${process.env.MONGO_DATABASE}`
        return await mongoose.connect(databaseUrl);
    } catch (e) {
        console.log('Could not connect to mongoDB', e);
    }
};