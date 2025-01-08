const User = require('../models/userModel.js');
const multer = require('multer');
const path = require('path');

// ดึงข้อมูล Profile
exports.getProfile = async (req, res) => {
    console.log('get Profile has requested');
    if (req.session.login) {
        const email = req.session.email;
        let data = await User.findOne({ email: email });
        if (data) {
            return res.render('profile', { data: data });
        } else {
            return res.status(500).send({ error: 'Internal Server Error' });
        }
    } else {
        res.redirect('login');
    }
};

// ตั้งค่า multer สำหรับอัปโหลดไฟล์
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // โฟลเดอร์สำหรับเก็บรูปภาพ
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    },
});


// แก้ไข Profile
exports.editProfile = async (req, res) => {
    console.log('edit profile has requested');
    const data_id = req.body.edit_profile_id;
    const data = await User.findById(data_id);
    res.render('editProfile', { data: data });
};

// อัปเดต Profile (พร้อมอัปโหลดรูปภาพ)
exports.updateProfile = [
    upload.single('profileImage'), // Middleware สำหรับอัปโหลดรูปภาพ
    async (req, res) => {
        console.log('update profile has requested');
        const profile_id = req.body.update_id;

        // สร้างเอกสารข้อมูลใหม่สำหรับอัปเดต
        let document = {
            username: req.body.username,
            email: req.body.email,
        };

        // ถ้ามีการอัปโหลดรูปภาพ ให้เพิ่ม path ของรูปภาพลงใน document
        if (req.file) {
            document.profileImage = `/uploads/${req.file.filename}`;
        }

        try {
            // อัปเดตข้อมูลผู้ใช้ในฐานข้อมูล
            const data = await User.findByIdAndUpdate(profile_id, document, { new: true, useFindAndModify: false });
            console.log(`ข้อมูลใหม่ : ${JSON.stringify(document)}`);
            if (data) {
                return res.redirect('/profile');
            } else {
                return res.status(500).send({ error: 'Internal Server Error' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    },
]; 