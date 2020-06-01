var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

//no need to add name and password 
var User = new Schema({
    admin:   {
        type: Boolean,
        default: false
    }
});

//passport automatically adds it to schema
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);