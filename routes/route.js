const express = require('express')
const registercontroller = require('../controllers/registercontroller.js')
const logincontroller = require('../controllers/logincontroller.js')
const todocontroller = require('../controllers/todocontroller.js')
const profilecontroller = require('../controllers/profilecontroller.js') 
const router = express.Router()


router.get('/register',registercontroller.getRegister)
router.post('/register',registercontroller.postRegister)

router.get('/login',logincontroller.getLogin)
router.post('/login',logincontroller.postLogin)
router.get('/logout',logincontroller.Logout)

router.get('/todos',todocontroller.getallTodo)
router.post('/todos',todocontroller.postTodo)
router.post('/edit',todocontroller.editTodo)
router.post('/update',todocontroller.updateTodo)
router.post('/delete/:id',todocontroller.deleteTodo)


router.get('/profile',profilecontroller.getProfile)
router.post('/profile/edit',profilecontroller.editProfile)
router.post('/profile/update',profilecontroller.updateProfile)



//โหลดหน้าหลัก
router.get('/',(req,res)=>{
    res.render('register')
})

module.exports = router;
