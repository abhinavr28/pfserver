const express = require ('express')
const router = new express.Router()
const userController = require('../Controller/userController')
const projectController = require('../Controller/projectController')
const jwtMiddileware = require("../Middilewares/jwtMiddileware")
const multerConfig = require("../Middilewares/multerMiddlileware")


// register

router.post('/user/register',userController.register)


// login

router.post('/user/login',userController.login)

// addprojects
router.post('/addprojects',jwtMiddileware,multerConfig.single("projectImage"),projectController.addProjects)

// get home projects
router.get('/homeprojects',projectController.getHomeProjects)

// getAllUserProjects
router.get('/alluserprojects',jwtMiddileware,projectController.getAllUserProjects)

// getUserProject
router.get('/userProjects',jwtMiddileware,projectController.getUserProjects)

// editProject

router.put('/projects/edit/:pid',jwtMiddileware,multerConfig.single('projectImage'),projectController.editUserProjects)

// deleteProject

router.delete('/projects/remove/:pid',jwtMiddileware,projectController.deleteProjects)

module.exports=router