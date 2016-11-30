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
    phone_no: String,
    email: String,
    sex: String,
    password: String,
    location: String,
    circle: String,
    created: String,

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
    created: String,
    auth: String
});
//
var RecordsSchema = new Schema({
    uid: String,
    sender: String,
    location: String,
    record: String,
    created: String,
    category: String,
    agencies: String,
    share: String
});
//
var TipsSchema = new Schema({
    sender: String,
    title: String,
    body: String,
    category: String,
    created: String
});
//
var SubscribersSchema = new Schema({
    name: String,
    email: String,
    created: String
});
//
var DonationsSchema = new Schema({
    donor: String,
    recipient: String,
    amount: String,
    created: String
})
//
var users_ = mongoose.model('users', UserSchema);
var agents_ = mongoose.model('agents', AgentsSchema);
var articles_ = mongoose.model('articles', ArticlesSchema);
var records_ = mongoose.model('records', RecordsSchema);
var tips_ = mongoose.model('tips', TipsSchema);
var subscribers_ = mongoose.model('subscribers', SubscribersSchema);
var donations_ = mongoose.model('donations', DonationsSchema);
//
module.exports = {
    datetimenow:datetimenow_,
    users: users_,
    agents: agents_,
    articles: articles_,
    records: records_,
    tips: tips_,
    subscribers: subscribers_,
    donations: donations_

}