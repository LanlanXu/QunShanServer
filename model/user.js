var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = new Schema({
    phone: String,
    password: String
},
{
    timestamps: true
});
module.exports = mongoose.model('users', blogSchema);
