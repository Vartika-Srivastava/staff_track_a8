const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    phone:{
        type:String,
        trim:true
    },
    cinh:{
        type:Number,
        min:0,
        max:23,
        required:true
    },
    cinm:{
        type:Number,
        min:0,
        max:59,
        required:true
    },
    couth:{
        type:Number,
        min:0,
        max:23
    },
    coutm:{
        type:Number,
        min:0,
        max:59
    },
    inOffice:{
        type: String,
        default:"true"
    }
})

const User=mongoose.model('User',userSchema);
module.exports=User;