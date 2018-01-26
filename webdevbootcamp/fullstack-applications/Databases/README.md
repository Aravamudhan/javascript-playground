## Using mongodb
* [Download](https://www.mongodb.com/download-center#community) mongodb
* To start the database, go to the mongodb_version/bin folder and execute "./mongo" command
* By default mongodb stores its data in the /data/db folder[I am assuming a linux machine].
* To give a custom directory to store the data, do "./mongo --dbpath path_to_folder". Now the data will get stored there.
* If /data/db is inaccessible or --dbpath is not provided mongo won't start
* Mongodb provides a shell which can be accessed from the bin folder ./mongod(ofcourse mongo should be running by now)
## Taking the help of mangoose
* The [guide](http://mongoosejs.com/docs/index.html) to mangoose
* Mangoose provides easy to use interface for accessing mangodb through javascript/node.
* Install it through NPM by "npm install mongoose"
* Get the mangoose object and connect to a mongo database
```
    const mongoose = require('mongoose'); 
    mongoose.connect('mongodb://YOURHOST/YOURDATABASE');
```
* [Schemas](http://mongoosejs.com/docs/guide.html#definition) are (very roughly)like entities in Java Persistence API. They can be used model a data store.
```
    const catSchema = new mongoose.Schema(
    {
        name:String,
        age:Number
    
    }
);
const Cat = mongoose.model('Cat',catSchema);
```
## Pattern
1. Get the mangoose object(through require)
2. Connect to a mongodb database
3. Create a schema
4. Based on that schema create a model object
5. Perform the operations like creat, find on the model object