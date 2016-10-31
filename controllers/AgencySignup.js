var BaseController = require("./Base");
var View = require("../views/Base");
var mongoose = require('mongoose');
var crypto = require("crypto");
var fs = require("fs");
var globalname = "Sign up";

module.exports = BaseController.extend({
    name: globalname,
    run: function(req, res, next) {
            var self = this;
            var v = new View(res, 'signup');
            self.form(req, res, function(formMarkup) {
                v.render({
                    title: globalname,
                    form:formMarkup,
                    showformornot:'block'
                });
            });
    },
    form: function(req, res, callback) {
        var returnResponse = function(response,showform) {
            if(response == ''){
                res.render('signup', {title:globalname});
            }else {
                res.render('signup', {title:"Account Created",returninfo:response,showformornot:showform});
            }
        };
        var returnError = function(response,showform) {
            if(response == ''){
                res.render('signup', {title:globalname});
            }else {
                res.render('signup', {title:"Ooops",returninfo:response,showformornot:showform});
            }
        };
        if(req.body && req.body.formsubmitted && req.body.formsubmitted == 'yes') {
           //collect form data
            var type = req.body.agencytype,
            title = req.body.agencytitle,
            name = req.body.agencyname,
            phone_no = req.body.agencyphone,
            email = req.body.agencyemail,
            password = req.body.agencypassword,
            address = req.body.agencyaddress,
            about = req.body.agencyabout,
            website = req.body.website,
            facebook = req.body.facebook,
            currentdate = new Date(),
            datetimenow = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + "  "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds(),
            created = datetimenow;
            mongoose.model('agents').find({contact_email:email}, function(err, checkuser) {
                if (checkuser != "") {
                    returnError('<font color="red">Agency with the submitted email address, '+email+' exists already</font>','block');
                }else{
                    var data = {type:type,
                        name:title,
                        contact_person:name,
                        contact_email:email,
                        contact_phone:phone_no,
                        website:website,
                        facebook:facebook,
                        about:about,
                        address:address,
                        password:password,
                        created:Date.now(),
                        auth:0
                    };
                    mongoose.model('agents').create(data, function(err, response) {
                        if(err){
                            console.log(response);
                            returnResponse('<b>An error occurred, please try again later.</b>', 'none');

                        }else {
                            console.log(response);
                            returnResponse('<b>Account was successfully created, we will get in touch as soon as we are done reviewing your submitted data.</b>', 'none');
                        }
                        });
                    //account create end
                }
            });

        }else{
            //show full page
            returnResponse('');
        }
    }
});