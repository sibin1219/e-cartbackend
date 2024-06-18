const mongoose = require('mongoose')

const connectionString = process.env.database

mongoose.connect(connectionString).then((res)=>{
    console.log('Mongodb connection established...');
}).catch((err)=>{
    console.log(err.message);
})

