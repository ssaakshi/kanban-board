const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    col:{
        type: String,
        required:true
    }
})

const userSchemaForColumn= new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    col:{
        type: Number,
    }
})


exports.Task= mongoose.model('TASK', userSchema);
exports.ColName= mongoose.model("LIST" , userSchemaForColumn);

// module.exports=ColName;
// module.exports=Task;