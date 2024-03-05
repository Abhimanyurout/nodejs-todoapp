const mongoose = require('mongoose');

module.exports.connectDB=()=>{
    mongoose.connect(process.env.MONGO_URL)
   .then(() => console.log('Connected!'));
};