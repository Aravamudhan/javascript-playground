// To access a module.exports object in the current directory, use './jsFileName'
let main = require('./main'); 
main.createApp().listen(8000,()=>console.log('Application started at the port 8000'));