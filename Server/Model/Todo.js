const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    task:String,
    done:{
        type:Boolean,
        default:false
    }
},
{timestamps:true})

const TodoModel1 = mongoose.model('todos',TodoSchema)
module.exports = TodoModel1