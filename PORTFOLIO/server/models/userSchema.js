const mongoose = require("mongoose");
const validator = require("validator");

// schema definition
const userSchema = new mongoose.Schema({
   fname:{
    type:String,
    required:true,//fname must req

    trim:true // space around fname is removed
   } ,
   lname:{
    type:String,
    required:true,
    trim:true


   },
   // to validate email we need install a pacakage named as validator => npm i validator
   email:{
    type:String,
    required:true,
    unique:true,
     validate(value){
        if(!validator.isEmail(value)){
            throw new Error("invalid email")
        }

     }

   },

   mobile:{
    type:String,
    required:true,
   },
   messages:[]
})
// save message
userSchema.methods.MessageSave= async function(message){
   try {
      this.messages = this.messages.concat({message});
      
      await this.save();
      return message;
      
   } catch (error) {
      console.log(error)
   }
}

// create model
const users = new mongoose.model("users",userSchema);
module.exports= users;

//[].concat({message});
