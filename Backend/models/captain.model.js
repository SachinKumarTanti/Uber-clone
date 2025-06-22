const mongoose = require('mongoose');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
        type:String,
        required:true,
        minlenth:[3,'first name must be at least 3 characters']
    },
    lastname:{
        type:String,
        required:true,
        minlenth:[3,'last name must be at least 3 characters']
    }
},
    password:{
        type:String,
        required:true,
        select:false
    },
    email:{
        type:String,
        required:true,
        minlenth:[5,'email must be at least 3 characters'],
        match: [/^\S+@\S+\.\S+$/,'please enter a valid email']
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    },

    vehicle:{
        color:{
            type:String,
            required:true,
            minlenth:[3,'plate must be at least 3 characters']
        },
        plate:{
            type:String,
            required:true,
            minlenth:[3,'plate must be at least 3 characters'],
        },
        
        capacity:{
            type:Number,
            required:true,
            minlenth:[1,'Capacity must be atleast 1']
        },

        vehicleType:{
            type:String,
            required:true,
            enum:['car','motorcyle','auto']
        }
    },

    location:{
        ltd:{
            type:Number
        },
        lng:{
            type:Number
        }
    }
});

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token;
}

captainSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

module.exports= mongoose.model('captain',captainSchema);