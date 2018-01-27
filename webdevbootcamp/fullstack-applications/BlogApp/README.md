## Blog
* This is a simple blogging application
* Dependencies - express, body-parser, mongoose, ejs, properties-reader, method-override, express-sanitizer
## version 0.0.1
1. Create a blog post with title, image url and text content
2. A blog post can be created, viewed, deleted, updated.
3. Blog posts are sanitized using express-sanitizer and router middleware by intercepting and cleaning requests of dangerous components such as script tags.
4. This has GET, POST, PUT and DELETE endpoints for the blog posts(/blogs)
5. [Semantic UI](https://semantic-ui.com/) is used in the UI templates.

## Pattern
1. express for routing
2. body-parser for parsing the requests and extracting data
3. mangoose as the interface for data persistence
4. ejs for ui templates
5. properties-reader to keep the properties separate from the code
6. method-override to overcome the in-ability of html forms to send delete, put requests.
7. express-sanitizer to sanitize the user content of dangerous scripts and through express.Router() setting up the routes that need to be sanitized.