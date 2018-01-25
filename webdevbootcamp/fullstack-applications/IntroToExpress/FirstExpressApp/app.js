console.log("App started");
var express = require("express");
var app = express();
app.get("/",(req,res)=>{
    res.send("Hi there");
});
app.get("/bye",(req,res)=>{
    res.send("Bye!!!!");
});
app.get("/dog/:dogName",(req,res)=>{
    console.log(req.params);
    res.send("Hello "+req.params.dogName);
});
app.get("/dog",(req,res)=>{
    console.log("Doggo is requested");
    res.send("Wofff woff!!!!");
});
app.get("*",(req,res)=>res.send("The resource not available"));
app.listen(8000,()=> console.log("Server started and listening at 8000"));