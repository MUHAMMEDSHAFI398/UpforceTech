const express = require('express');
const controller = require('../Controllers/controller');
const Router = express();
const uploadImage = require('../middleWares/cloudinary')

 
Router.post('/register',uploadImage, controller.login)

module.exports=Router