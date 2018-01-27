## YelpCamp version 1.0
* In v1 of the YelpCamp users can add campgrounds and view the existing campgrounds.
* There is no database and mock data is used.
* Dependencies used express, body-parser, ejs.
* express - an unopinionated routing framework(i.e.) it does not set any default options for lot of things(like spring boot). Express is in a way like lego block. If one needs a certain option, they have to explcitly add to express. The advantage of such approach is, there is less magic in understanding how things are wired together.
* body-parser - express provides raw http request for incoming requests. It does not know about the format of the body. It could be form data or json or in any encoding format. The body is simply empty. body-parser parses the incoming request data(could be form data, json object, or even multi part data like an image) and makes it available in the "request.body" object. body-parser is a middleware(like an aspect or interceptor)
## Pattern
1. Get the express and body-parser dependency.
2. Set the ejs view engine
3. Create a views directory in the root directory of the project and put all the ejs templates there. 
4. Create a public(or could be any name like assert) directory and let the express know that the static resources are served from there(remember, express is unopinionated. We got to tell, even, where the static assets are)
5. Create routes.
## Boilerplate
* For body-parser
```
    var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended:true}));
```
* For ejs
```
    app.set("view engine","ejs");
```
* Once ejs engine is set and views directory is created, the templates can simply be mentioned by name, ignoring the .ejs extension. Like
```
    res.render("landing") // Render a template
        ...
    res.render("campgrounds", {campData}) // campData will be available in the template
        ...
    res.redirect("/campgrounds") // Redirect to an another endpoint
```
* To use an object(like the campData above)from the router file(app.js) in a template in the views directory
```
    <% campData.forEach(value=> { %>
        <p><%= value.name %></p>
    <% } %>
```
* Anything between <% %> is considered to be a valid javascript.
* The tags <%=  %> with = symbols suggests that the code is an expression and the value should be extracted from that. Like <%= value.name %>
* For static assets
```
    app.use(express.static("public"));
```