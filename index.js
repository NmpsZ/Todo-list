const express = require('express')
const ejs = require('ejs')
const router = require('./routes/route.js')
const todo = require('./models/todoModel.js')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const database = require('./database/database.js')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config() // โหลดค่าตัวแปรจากไฟล์ .env

const app = express()
const port = process.env.PORT

// กำหนดโฟลเดอร์ 'public' เป็นโฟลเดอร์สำหรับไฟล์ static 
app.use(express.static(path.join(__dirname,'public'))) 
// แปลงข้อมูลที่ส่งมาจากฟอร์มให้เป็น object ที่สามารถใช้งานได้
app.use(express.urlencoded({ extended: true }));  
// ตั้งค่า session โดยใช้ secret และไม่บันทึก session ที่ไม่ได้มีการเปลี่ยนแปลง
app.use(session({secret:"mysession",resave:false,saveUninitialized:false})) 
// เปิดใช้งาน cookie-parser เพื่อจัดการ cookies
app.use(cookieParser())
// ใช้ router ที่กำหนดใน route.js สำหรับจัดการเส้นทางต่าง ๆ
app.use(router)
// กำหนด EJS เป็น view engine สำหรับการเรนเดอร์หน้าเว็บ
app.set('view engine', 'ejs');

//Start Server
app.listen(port,(req,res)=>{
    console.log(`Server is running in port : ${port}`)  
})