import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default: 'user'
    }
   /* verificationToken: {
        type: String
      },
      verified: {
        type: Boolean,
        default: false
      }*/
});

const User = mongoose.model('User', userSchema);
export default User;