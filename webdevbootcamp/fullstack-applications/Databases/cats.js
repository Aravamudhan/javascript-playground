const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/demo');

const catSchema = new mongoose.Schema(
    {
        name:String,
        age:Number
    
    }
);
// Returns an object with the necessary method such as create,find modeled after the provided schema
const Cat = mongoose.model('Cat',catSchema);
const ran1 = Math.floor(Math.random()*2000);
const ran2 = Math.floor(Math.random()*2000);
Cat.create({name:'Snowy'+ran1,age:ran2},(err,rec)=>{
    if(err){
        console.log("Save failed with error",err);
    } else {
        console.log("Save succeeded",rec);
    }
    return;
});

Cat.find({},(err,res)=>{
    if(err){
        console.log("Find failed");
    }else{
        console.log(res);
    }
    return;
});