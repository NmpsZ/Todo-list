const Todo = require('../models/todoModel.js')

// ดึงข้อมูล Todo ทั้งหมดเพื่อเอามาแสดง
exports.getallTodo = async (req,res) =>{

    console.log("Get /todos has requested")
    if (req.session.login){
        const data = await Todo.find()
        res.render('index',{data:data})
    }
    else{
        res.redirect('login')
    }
}

// เพิ่ม Todo ใหม่ใน database
exports.postTodo = async (req,res)=>{
    console.log(`Post /todos/ has requested`)
    let document = new Todo({
        title:req.body.title,
        description:req.body.description,
        duedate:new Date(req.body.dueDate)
    })

    // บันทึกข้อมูล Todo ลงในฐานข้อมูล
    document.save()
    .then(() => {
        console.log('save success')
        res.redirect('todos');
    })
    .catch(err => {
        res.status(500).send(err);
    });
}

// ดึงข้อมูล Todo ที่ต้องการ edit
exports.editTodo = async(req,res) =>{

    console.log("edit has requested")
    const data_id = req.body.edit_id
    const data = await Todo.findById(data_id) // ค้นหา Todo ในฐานข้อมูลโดยใช้ id
    res.render('edit',{data:data})
}

// Update ข้อมูล Todo ใน database
exports.updateTodo = async(req,res) => {
        const data_id = req.body.update_id
        let document = { // สร้างข้อมูลใหม่สำหรับ update
            title:req.body.title,
            description:req.body.description,
            duedate:req.body.dueDate
        }
    
        // อัปเดต Todo ในฐานข้อมูล
        const data = await Todo.findByIdAndUpdate(data_id,document,{useFindandModify:false})  //ไอดีที่ต้องการอัพเดทและข้อมูลที่ต้องการเปลี่ยนแปลง
        console.log(`ไอดีที่มีการเปลี่ยนแปลง :${data_id}`)
        console.log(`ข้อมูลใหม่ : ${JSON.stringify(document)}`)
        if(data){
            return res.redirect('/todos')
        }
        else{
            return res.status(500).send({error:"Internal Server Error"})
        }
}

// ลบ Todo ออกจาก database
exports.deleteTodo = async(req,res) =>{
    const data_id = req.params.id
    const data = await Todo.findByIdAndDelete(data_id)  // ลบ Todo จาก database โดยใช้ id
        
    console.log(`Delete has requested`)
    if(data){
        console.log("ลบแล้ว")
        return res.redirect('/todos')
    }
    else{
        return res.status(500).send({error:"Internal Server error"})
    }
        
}