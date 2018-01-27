const express = require('express'),
    app = express(),    
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    propertiesReader = require('properties-reader'),
    properties = propertiesReader('app.properties');

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const databaseHost = properties.get("db.host");
const databaseName = properties.get("db.database");
mongoose.connect(databaseHost+databaseName);
// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
    name : String,
    image : String,
    description:String
});
// The model name will pluralised and a collection named Campgrounds will be created by mongo
const Campground = mongoose.model('Campground',campgroundSchema);

app.get("/",(req,res)=>{
    res.render("landing");
});
app.get("/campgrounds",(req,res) => {
    Campground.find({},(err,campData)=>{
        if(err){
            console.log("Find failed");
            res.redirect("/error");
        }else{
            console.log(campData);
            res.render("index", {campData});
        }
    });
});
app.post("/campgrounds",(req,res)=>{
    let camp = {
        name:req.body.campName,
        image:req.body.campImage,
        description:req.body.campDescription
    };
    Campground.create(camp,(err,result)=>{
        if(err){
            console.log('Error saving[',camp,'] [',err,']');
            res.redirect("/error");
        } else {
            console.log('Campground is saved',result);
            res.redirect("/campgrounds");
        }
    });
});
app.get("/campgrounds/new",(req,res) => {
    res.render("new");
});
app.get("/campgrounds/:id",(req,res) => {
    let id = req.params.id;
    Campground.findById(id,(err,result)=>{
        if(err){
            console.log("Error finding campground with id",id);
            res.redirect("/error");
        }else{
            res.render("show",{result});            
        }
    });
});

app.listen(8000, ()=> console.log("YelpCamp v2.0 has started and listening at 8000"));