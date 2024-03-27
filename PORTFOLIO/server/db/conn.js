const mongoose = require("mongoose");
const DB = process.env.DATABASE;

// connection mogodb database to node js

mongoose.connect(DB,{useUnifiedTopology:true,
useNewUrlParser:true
}).then(()=>console.log("database connected")).catch((err)=>{
    console.log(err)
})
