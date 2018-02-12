let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
let User = mongoose.model('User', new Schema({
    id: ObjectId,
    firstName: {
        type: String,
        required: `{PATH} is required.`
    },
    lastName: {
        type: String,
        required: `{PATH} is required.`
    },
    email: {
        type: String,
        required: '{PATH} is required.',
        unique: true
    },
    password: {
        type: String,
        required: '{PATH} is required.'
    },
    data: Object,
}));

module.exports = User;