var BaseController = require("./Base");
var crypto = require("crypto");
var safetee = require("../models/Safetee");
var safetee_response = require('../models/SafeteeResponse');
var safetee_auth = require("../models/SafeteeAuth");
var globalname = "Dashboard";
var showrecords = '';
//
module.exports = BaseController.extend({
    //
    run: function(req, res, next) {
        var self = this;
        //
        if(typeof(req.body.rtype) !== 'undefined'){
            req.session.recordsort = req.body.rtype;
        }
        //
            if (req.session.recordsort == 'Articles'){
                showposts = 'block';
                showrecords = 'none';
            }else{
                showposts = 'none';
                showrecords = 'block';
            }

        if(safetee_auth.auth['get_auth'](req)){
            //
                        self.list(req.session.uid, req.session.recordsort, function (recordsMarkup) {
                            //
                            safetee_response.returnresponse['render'](req,'dashboard',{
                                title: globalname,
                                records: recordsMarkup,
                                utitle: req.session.utitle,
                                recordsortx: req.session.recordsort,
                                showrecords: showrecords,
                                showposts: showposts
                            },res);
                            //
                        });
        }else {
            //
            self.login(req, res, function (loginMarkup) {
                //
                safetee_response.returnresponse['render'](req,'signin',{
                    title: safetee_response.getresponse['user_signin']('title'),
                    login: loginMarkup
                },res);
            });
        }
    },

    list: function(uid,recordtype,callback) {
        safetee['records'].find({share:"true"},function(err, records) {
            //
            console.log(records);
            //
            if(records.length > 0) {
                var markup = '';
                markup += '';
                var record;
                for (var i = 0; record = records[i]; i++) {
                    //setup join or leave case
                    var agenciesoncase = record.agencies;
                    var agenciestocase = '';
                    if(agenciesoncase.indexOf(uid) >= 0) {
                            agenciestocase = '<span onclick="leavecase(\''+record._id+'\');" class="fa fa-bookmark pointercursor orange" data-toggle="tooltip" href="#" alt="Leave Case" title="Leave Case"></span> <sup style="font-size:13px" class="fa fa-check-circle"></sup>';
                    }else{
                            agenciestocase = '<span onclick="takecase(\''+record._id+'\');" class="fa fa-bookmark pointercursor" data-toggle="tooltip" href="#" alt="Join Case" title="Join Case"></span> <sup style="font-size:13px" class="fa fa-plus-circle"></sup>';
                        }
                    markup += '\
				<div class="col-sm-4 reportsbody greyborderall lightblackbg clipmarginright clipmarginbottom">\
                    <div id="rep1'+i+'" class="reportsfa pointercursor" onclick="getrecord(\'Record stream\',\''+record._id+'\');" >\
                    <span class="fa fa-inbox"></span>\
                    </div>\
                    <div class="fullwidth smallfont bold" style="border-top:1px solid #ccc;text-align:left;padding-top:5px;">\
                    <span>\
                    ' + record.sender + '\
                </span>\
                <span class="pull-right">\
                    <span id="case1'+record._id+'">'+agenciestocase+'</span>\
                    </span>\
                    </div>\
                    <div style="text-align:left;" class="smallfont blue">\
                    <span><span class="fa fa-clock-o"></span> ' + record.created + '</span>\
                <span> &middot; </span>\
                <span><span class="fa fa-map-marker"></span> ' + record.location + '</span>\
                </div>\
                </div>\
			';
                }
                markup += '';
                //
            }else {
                //
                markup = '\
				<div class="col-sm-12 greyborderall clipmarginright clipmarginbottom">\
                    <div id="rep1" class="reportsfa">\
                    <span class="fa fa-info-circle"></span>\
                    </div>\
                    <div class="fullwidth smallfont bold" style="border-top:0px solid #ccc;padding-top:5px;margin-top:-40px">\
                    <span>\
                    No records available\
                </span>\
                  </div>\
                </div>\
			';

            }
            callback(markup);
        })
    },
    login: function(req, res, callback) {
        //
        if(req.body && req.body.formsubmitted && req.body.formsubmitted == 'yes') {
            //
            var email = req.body.loginemail;
            var password = req.body.loginpassword;
            //
            password = crypto.createHash('md5').update(password).digest("hex");
            //
            var data = {
                "email":email,
                "password":password
            };
            //
            safetee['agents'].find({contact_email:data.email,password:data.password}, function(err, checkuser) {
                //
                if (checkuser.length > 0) {
                    //
                    safetee_auth.auth['set_auth'](req,checkuser);
                    //
                    safetee_response.returnresponse['redirect'](req,'/agency/dashboard',res);
                    //
                }else{
                    //
                    safetee_response.returnresponse['render'](req,'signin',{
                        title: globalname,
                        returninfo:safetee_response.getresponse['user_signin']('notfound')
                    },res);

                }
            });

        }else{
            //
            callback('');
        }
    }
});