const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// แสดงหน้า Form Login
exports.getLogin = (req, res) => {
    res.render('login',{ errorMessage: null });
};

// จัดการการ Login เมื่อผู้ใช้ส่งข้อมูล Form
exports.postLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        let data = await User.findOne({ email: email }); // ค้นหาผู้ใช้ในฐานข้อมูลโดยใช้ email ที่กรอก
        if (data) {
            let cmp = await bcrypt.compare(password, data.password);   // เปรียบเทียบรหัสผ่านที่กรอกกับรหัสผ่านที่ถูกเข้ารหัส (hash) ในฐานข้อมูล

            if (cmp) {
                req.session.email = email
                req.session.password = password
                req.session.login = true
                req.session.cookie.maxAge = 30 * 60 * 1000;
                console.log("Login success");
                return res.redirect('/todos');
            } else {
                console.log("Wrong password");
                return res.render('login', { errorMessage: "Wrong Password" });
            }
        } else {
            console.log("User not found");
            return res.render('login', { errorMessage: "User not found" });
        }
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).render('login', { errorMessage: "Internal server error" });
    }
};

// จัดการการ Logout
exports.Logout = (req, res) => {
     // ลบ session ของผู้ใช้งาน
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Failed to logout");
        }
        res.redirect('login'); 
    });
};
