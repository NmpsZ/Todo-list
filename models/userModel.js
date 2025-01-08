const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true

    },
    confirmPassword:{
        type:String,
        required:true
    },
    profileImage: {
        type: String,
        default: 'uploads/defaultprofile.jpg' 
    }
})

userSchema.pre('save',function(next){
    const user = this
    bcrypt.hash(user.password,10)
    .then(hash=>{
        user.password = hash
        next()
    }).catch(err=>{
        console.err(err)
    })
})

let User = mongoose.model("user",userSchema)

module.exports = User

module.exports.saveUser = async function(model, data) {
    try {
        const savedData = await model.save(data);
        console.log('User saved successfully');
        return savedData;  // ส่งคืนข้อมูลที่ถูกบันทึก
    } catch (err) {
        console.error('Error saving user:', err);
        throw err;  // ส่งข้อผิดพลาดกลับไป
    }
};
