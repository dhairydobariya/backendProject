const usermodel = require('../model/usermodel')
const userblog = require('../model/userblog');
const { render } = require('../route/route');
const fs = require('fs')
var u_id = null;
const indexPath =async (req , res) =>{

    let user;
    if(u_id == null){

        user = null

    }else{

        var singupdata =await usermodel.find();

        const u = singupdata.filter((user) =>{
            return user.id == u_id
        });
        console.log("this is a user" , u);

         user = u[0];

    }   
        let blogUpload = await userblog.find();
        console.log("blogUpload is here" , blogUpload);
        console.log("u_id " ,  u_id  );
    res.render('index', {user , blogUpload  , u_id});
}


let loginPath =  (req , res) =>{

    res.render('login')
}


let registerPath =  (req , res) =>{
    res.render('register')
}

let adddata =  (req , res) =>{
    try {
        const newuser =  new usermodel({
         userpath : req.file.path,
         username : req.body.username,
         useremail : req.body.useremail,
         password : req.body.password
        })      
        console.log("filepathsglasdkj",req.file.path);
        if(req.body.password === req.body.confpassword){

        
            newuser.save();
            console.log(newuser);
            res.redirect('/Login'); 
        }
        else{
            res.render("register")
        }
       
    } catch (error) {
        console.log("filepath" , req.file.path);
        console.log('dbc err' , error);        
    }
}




let adminpannnel =async (req , res) => {
  
    try {
        var singupdata =await usermodel.find();
 
        const user = singupdata.filter((user) =>{
            return user.useremail == req.body.useremail
        })
       

        if(user.length == 0){
            console.log("creater account");
            res.redirect('/register')
        }
        else{
            if(user[0].password == req.body.userpassword)
            {
                console.log('login success');
                u_id = user[0].id
                console.log("u_id = " , u_id);
                
                res.redirect('/');
                // res.render('index', {user : user[0]});
            }
            else{
                console.log('pass wrong');
                res.redirect('/register')
            }
        }
 
     } catch (error) {
         console.log("login err" , error);
     }

}

let viewblog = (req , res) => {
    res.render('blog'); 
}


let blogs = (req , res) => {
    res.render('blog-form'); 
}

let blogforms = (req , res) => {
    console.log("blog-form data", req.body);

    console.log("blog ing here" , req.file);

    const blogdata = new userblog({
        blog_discription : req.body.blog_description,
        blogtitle : req.body.blogtitle,
        blogpath : req.file.path,
        userId: u_id
    })

    blogdata.save();
    console.log("blogdata" , blogdata);

    res.redirect('/blogs')
}




const delteBlog =async (req , res) => {

   try {

    const delteblogs = await userblog.findByIdAndDelete(req.params.id);

    fs.unlink(delteblogs.blogpath, () => {
        console.log("success remove");
      });
    
    res.redirect('/')

   } catch (err) {
        console.log("delte blog err is" , err);
   }
    
}

const editBlog =async (req , res) => {

    try {
        
        const editblogs = await userblog.findById(req.params.id)
       
        res.render('editblog' , {editblogs})


    } catch (error) {
        console.log("this is a edit blog err"  , error);   
    }
   
}
const updateBlog =async (req , res) => {
    
    let { id, blogtitle , blog_description} = req.body
    let {path} = req.file

    try {
        let oldBlog = await userblog.findById(id);
        fs.unlink(oldBlog.blogpath, () => {
          console.log("success remove");
        });
        const updateblog = await userblog.findByIdAndUpdate(id , { blogtitle ,  blog_description , blogpath : path}) 
        res.redirect('/')
    } catch (error) {
        console.log("this is a our update blog err" , error);
    }

}
module.exports = { indexPath , loginPath , registerPath , adddata , viewblog , adminpannnel , blogforms , blogs , delteBlog , editBlog , updateBlog}