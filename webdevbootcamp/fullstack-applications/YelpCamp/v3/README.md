## YelpCamp version 3.0
1. Created the Comments collection and embedded that to the structure of Campgrounds
2. Moved the schema data(campground,comment) to separate files in models folder from app.js and used module.exports to use them in the app.js
3. Added a script(initDbSampleData.js) to create mock campground data and comment at the start of the server. Initially it cleans the database and recreates all the records from the mock data.
