## EJS Demo
A demo express application that uses the EJS template engine.
EJS template engine helps with server side rendering.

To use ejs,
* Install it
npm install ejs
* Set EJS as the view engine
app.set("view engine","ejs");
* Set up templates
Create a directory named "views" in the root directory of the application and put the .ejs templates there.

The application has the following end points
1. /greet/:name
2. /products