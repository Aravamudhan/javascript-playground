var fakeData = require('faker');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/", (req,res) => res.render("home"));

let products = [];
for(let i=0;i<2;i++){
    let product = {
        name : fakeData.commerce.productName(),
        price : fakeData.commerce.price(),
        category : fakeData.commerce.department() 
    }
    products.push(product);
}
app.get("/products",(req,res)=>{
    res.render("products", {products})
});

app.post("/createProduct",(req,res)=>{
    let newProduct = {
        name:req.body.productname,
        price:req.body.productprice,
        category:req.body.productcategory
    };
    products.push(newProduct);
    res.redirect("/products")
});

app.listen(8000,
    ()=> console.log("Server started and listening at 8000"));