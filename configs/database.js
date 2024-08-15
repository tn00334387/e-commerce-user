const mongoose = require('mongoose');

const Mongo = {
    connectDB: async () => {
        try {
            await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DATABASE}`);
            console.log('MongoDB connected');
        } catch (error) {
            console.error('MongoDB connection failed', error);
            process.exit(1);
        }
    },
}

module.exports = Mongo;