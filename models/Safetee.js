var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Model = require("./Base");
var crypto = require("crypto");
//
var currentdate = new Date();
var datetimenow_ = currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/"
    + currentdate.getFullYear() + " "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();
//
var UserSchema = new Schema ({
    name: String,
    phone_number: {type: Number, default: 0},
    email: String,
    sex: String,
    password: String,
    location: String,
    created: { type: Date, default: Date.now}

});
//
var ArticlesSchema = new Schema({
    uid: String,
    title: String,
    body: String,
    tag: String,
    created: { type: Date, default: Date.now },
    image_url: String
});
//
var AgentsSchema = new Schema({
    type: String,
    name: String,
    contact_person: String,
    contact_email: String,
    contact_phone: String,
    website: String,
    facebook: String,
    about: String,
    address: String,
    password: String,
    created: { type: Date, default: Date.now },
    auth: String
});
//
var RecordsSchema = new Schema({
    sender: String,
    location: String,
    record: String,
    created: String,
    category: String,
    agencies: String,
    share: String
});
//
var users_ = mongoose.model('users', UserSchema);
var agents_ = mongoose.model('agents', AgentsSchema);
var articles_ = mongoose.model('articles', ArticlesSchema);
var records_ = mongoose.model('records', RecordsSchema);
//
module.exports = {
    datetimenow:datetimenow_,
    users: users_,
    agents:agents_,
    articles:articles_,
    records:records_,
}