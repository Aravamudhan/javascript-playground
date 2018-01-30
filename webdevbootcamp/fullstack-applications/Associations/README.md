## Associations
* Associations are needed to describe/store data when multiple entities are related to each other.
## Embedding data
* When one model is inside another model
* For example,
```
    // POST
    const postSchema = new mongoose.Schema({
        title:String,
        content:String
    });
    // USER
    const userSchema = new mongoose.Schema({
        name:String,
        email:String,
        posts:[postSchema] // Embedded association
    });
```
## Referrencing data
* When one model references another model through an identifier
* For example,
```
    const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    posts:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post" // Referencing posts collection
            }
        ]
    });
```
