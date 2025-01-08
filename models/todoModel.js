//Use mongoose

const mongoose = require('mongoose')

//create schema
const todolistSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    duedate:{
        type:Date,
        require:true
    }
    
})

let Todo = mongoose.model("todo",todolistSchema)

module.exports = Todo

//save function
module.exports.saveTodo = function(model,data){
    model.save(data) //ให้ model ค่าที่ส่งเข้ามา
}