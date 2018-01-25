var express = require('express');
var app = express();
var fakeData = require('faker');

// By default express serves the files from the view directory
// We have to explicitly tell express where the static resources such as CSS are located
// Once configured, express will check the said directory for any static resource
app.use(express.static("public"));
// Telling express what view engine we are going to use
// Once specified, the file names can be simply "home" instead of "home.ejs"
app.set("view engine","ejs");
// Express will automatically look in the 'view' directory for the file
// EJS stands for embedded java script
app.get("/", (req,res) => res.render("home"));

app.get("/greet/:name",(req,res)=> {
    let name = req.params.name;
    res.render("greet", {name})
});

app.get("/products",(req,res) =>{
    let products = [];
    for(let i=0;i<10;i++){
        let product = {
            name : fakeData.commerce.productName(),
            price : fakeData.commerce.price(),
            category : fakeData.commerce.department() 
        }
        products.push(product);
    }
    res.render("products", {products})
});

app.listen(8000,
    ()=> console.log("Server started and listening at 8000"));