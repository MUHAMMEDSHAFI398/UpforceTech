const express = require('express');
const controller = require('../Controllers/controller');
const Router = express();
const uploadImage = require('../middleWares/cloudinary')

 
Router.post('/register',uploadImage, controller.login)

Router.get('/users/:id', controller.getUsers)

Router.patch('/edit-profile/:id',uploadImage,controller.editProfile)

Router.patch('/edit-status', controller.statusChange)

Router.patch('/delete', controller.deleteUser)

Router.patch('/edituser/:id',controller.edituser)

Router.get('/search/:id', controller.getSearchUsers)

Router.get('/export-csv',controller.exportToCsv)





module.exports=Router