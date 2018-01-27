// ----- IMPORTING AND SETTING UP LIBRARIES/FRAMEWORKS -----

const express = require('express'),
    app = express(),    
    bodyParser = require('body-parser'),
    router = express.Router(),
    mongoose = require('mongoose'),
    propertiesReader = require('properties-reader'),
    properties = propertiesReader('app.properties'),
    methodOverride = require('method-override'),
    sanitizer = require('express-sanitizer');// express-sanitizer removes risky content such as script tag
    
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// We are telling express to look for the query parameter _method
// Whatever value is present in the _method parameter, that is value considered to be the HTTP verb of that request
// If it is _method=PUT then it is PUT request. This is necessary since the form tag does not PUT requests in HTML
app.use(methodOverride("_method"));
app.use(sanitizer());
app.use("/",router);

// ----- MONGOOSE SETUP -----

const databaseHost = properties.get("db.host");
const databaseName = properties.get("db.database");
mongoose.connect(databaseHost+databaseName);

// SCHEMA SETUP

const blogSchema = new mongoose.Schema({
    title : String,
    image : String,
    content:String,
    created:{type:Date,default:Date.now()}
});
const Blog = mongoose.model('Blog',blogSchema);

// ----- MIDDLEWARES -----

function sanitizerMiddleware(req,res,next){
    req.body.blog.content = req.sanitize(req.body.blog.content);
    console.log("Sanitizing the request");
    next();
}
router.put("/blogs/:id", sanitizerMiddleware);
router.post("/blogs", sanitizerMiddleware);

// ----- ROUTING -----

// ----- THE INDEX PAGE -----

app.get("/",(req,res)=>{
    res.redirect("/blogs")
});

// ----- ERROR PAGE -----

app.get("/error",(req,res)=>{
    res.render("error");
});

// ----- GET ALL BLOGPOSTS -----

app.get("/blogs",(req,res)=>{
    Blog.find({},(err,blogsData)=>{
        if(err){
            console.log('Error finding blogs [',err,']');
            res.redirect("/error");
        } else {
            res.render("blogs",{blogsData});
        }
    });
});

// ----- GET CREATE PAGE A BLOG POST -----

app.get("/blogs/new",(req,res) => {
    res.render("new")
});

// ----- CREATE A BLOG POST -----

app.post("/blogs",(req,res) => {
    let blogObj = {
      title:req.body.blog.title,
      image:req.body.blog.image,
      content:req.body.blog.content
    };
    Blog.create(blogObj,(err,result)=>{
        if(err){
            console.log('Error creating[',blogObj,'] [',err,']');
            res.redirect("/error");
        } else {
            console.log("Blogpost is created with id",result.id,' and title',result.title);
            res.redirect("/blogs");
        }
    });
});

// ----- GET A BLOG POST BY ID-----

app.get("/blogs/:id",(req,res)=>{
    let id = req.params.id;
    Blog.findById(id,(err,blog)=>{
        if(err){
            console.log("Error finding blog with id",id);
            res.redirect("/error");
        }else{
            res.render("show",{blog});            
        }
    });
});

// ----- GET THE EDIT PAGE FOR A BLOG POST -----

app.get("/blogs/:id/edit",(req,res)=>{
    let id = req.params.id;
    Blog.findById(id,(err,blog)=>{
        if(err){
            console.log("Error finding blog with id",id);
            res.redirect("/error");
        }else{
            res.render("edit",{blog});            
        }
    });
});

// ----- UPDATE A BLOG POST -----

app.put("/blogs/:id",(req,res)=>{
    let id = req.params.id;
    let blogPost = req.body.blog;
    Blog.findByIdAndUpdate(id, blogPost, (err,updatedBlog)=>{
        if(err){
            console.log("Error updating the blog post",blogPost);
            res.redirect("/error");
        }else{
            console.log("Updated the blog post with id",id,' and title',blogPost.title);
            res.redirect("/blogs/"+id);            
        }
    });
});

// ----- DELETE A BLOG POST -----

app.delete("/blogs/:id",(req,res)=>{
    let id = req.params.id;
    Blog.findByIdAndRemove(id,err=>{
        if(err){
            console.log("Error delete the blog post with id",id,'failed with error[',err,']');
            res.redirect("/error");
        }else{
            console.log("Delete the blog post with the id",id);
            res.redirect("/blogs");            
        }
    });
});

// -----STARTING THE SERVER-----

app.listen(8000, ()=> console.log("Blog app v0.0.1 has started and listening at 8000"));