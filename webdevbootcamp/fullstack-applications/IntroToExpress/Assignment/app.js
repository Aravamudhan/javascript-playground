var express = require('express');
var app = express();

// ----- Routes -----

app.get("/", (req,res) => res.send("Hi there. Welcome to my assignment problem"));

app.get("/speak/:boi",(req,res)=>{
    let goodBoi = req.params.boi;
    let speech ={
        pig:"Oink",
        cow:"Moo",
        dog:"Woof woof"
    };
    let reply = speech[goodBoi];
    res.send(reply);
});

app.get("/repeat/:greet/:count",(req,res)=>{
    let greet = req.params.greet;
    let count = req.params.count;
    let reply="";
    for(let i=0;i<count;i++){
        reply = reply+greet;
        if(i!=count-1){
            reply = reply+" ";
        }
    }
    res.send(reply);    
});
// ----- ANY OHTER ROUTE EXCEPT THE SPECIFIED ROUTES -----
app.get("*",(req,res) => res.send("Sorry, page not found!!!"));

app.listen(8000,()=> console.log("Server started and listening at",8000));
