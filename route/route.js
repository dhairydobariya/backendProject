const express = require('express');
const route = express();
const data = require('../controller/controller')
const userpath = require('../middle-var/user-icon');

route.get('/' ,data.indexPath )
route.get('/Login', data.loginPath)
route.get('/register' , data.registerPath)
route.post('/addData' ,userpath.single('userpath'), data.adddata)
route.get('/viewblog', data.viewblog)
route.post('/adminpannnel' , data.adminpannnel)
route.get('/blogs'  , data.blogs)
route.post('/blog-form' ,userpath.single('blogpath') ,  data.blogforms )
route.get('/delteBlog/:id' , data.delteBlog )
route.get('/editBlog/:id',userpath.single('blogpath'), data.editBlog )
route.post('/updateBlog',userpath.single('blogpath') , data.updateBlog )
module.exports = route;