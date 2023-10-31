import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : false
    },
    author : {
        type : String,
        required : true
    },
    password : {
        type : Number,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    status : {
        type : String,
        required : true,
    }
})

export default mongoose.model('Store', storeSchema);