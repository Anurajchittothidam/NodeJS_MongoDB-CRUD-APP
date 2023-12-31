const mongoose=require('mongoose');
const LogInSchema=mongoose.Schema({
    firstname:{ type:String,
        required:true
    },
    lastname:{ type:String,
        required:true
    },
    email:{ type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    }, 
},{timestamps:true})

module.exports =mongoose.model('users',LogInSchema)