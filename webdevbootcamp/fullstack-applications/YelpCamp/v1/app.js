var express = require('express');
var app = express();

app.set("view engine","ejs");

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/",(req,res)=>res.render("landing"));

let campData = [
        {name:"Mountain creeks",image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
        {name:"Horneater's peak",image:"https://farm7.staticflickr.com/6085/6037590541_19248d41f0.jpg"},
        {name:"Green meadow",image:"https://farm5.staticflickr.com/4044/4175370953_5488caf554.jpg"},
        {name:"Mountain creeks",image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
        {name:"Horneater's peak",image:"https://farm7.staticflickr.com/6085/6037590541_19248d41f0.jpg"},
        {name:"Green meadow",image:"https://farm5.staticflickr.com/4044/4175370953_5488caf554.jpg"},
        {name:"Mountain creeks",image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
        {name:"Horneater's peak",image:"https://farm7.staticflickr.com/6085/6037590541_19248d41f0.jpg"},
        {name:"Green meadow",image:"https://farm5.staticflickr.com/4044/4175370953_5488caf554.jpg"}
    ];
app.get("/campgrounds",(req,res) => {
    res.render("campgrounds", {campData});
});
app.post("/campgrounds",(req,res)=>{
    let camp = {
        name:req.body.campName,
        image:req.body.campImage
    };
    campData.push(camp);
    res.redirect("/campgrounds");
});
app.get("/campgrounds/new",(req,res) => {
    res.render("campground_new");
});
app.listen(8000, ()=> console.log("YelpCamp v1.0 has started and listening at 8000"));