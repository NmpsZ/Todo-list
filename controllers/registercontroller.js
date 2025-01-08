const User = require('../models/userModel.js')

// แสดง Form Register
exports.getRegister = (req,res) => {
    res.render('register')
}

// จัดการ Form Register
exports.postRegister = (req,res) => {

    console.log("Post register requested")
    let document = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    })
    
    // บันทึกข้อมูลผู้ใช้ลงในฐานข้อมูล
    document.save()
    .then(()=>{
        console.log('save success')
        return res.redirect('login')
    }).catch((err)=>{
        return res.status(500).send(err)
    })
}