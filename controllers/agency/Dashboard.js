var safetee_buffer = require('../../models/Safetee_Head_Buffer');
var globalname = "Dashboard";
var showrecords = '';
//
module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function(req, res, next) {
        //
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

        if(safetee_buffer.safetee_auth.auth['get_auth'](req)){
            //
                        self.list(req.session.uid, req.session.recordsort, function (records) {
                            //
                            safetee_buffer.safetee_response.returnresponse['render'](req,'agency/dashboard',{
                                title: globalname,
                                records: records,
                                utitle: req.session.utitle,
                                recordsortx: req.session.recordsort,
                                showrecords: showrecords,
                                showposts: showposts
                            },res);
                            //
                        });
        }else {
            //
            self.login(req, res, function (login) {
                //
                safetee_buffer.safetee_response.returnresponse['render'](req,'agency/signin',{
                    title: safetee_buffer.safetee_response.getresponse['user_signin']('title'),
                    login: login
                },res);
            });
        }
    },

    list: function(uid,recordtype,callback) {
        //
        var data = {
            share: "true"
        }
        safetee_buffer.safetee['records'].find({},function(err, records) {
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
                    <tr>\
                        <td>' + record.location + '</td>\
                        <td>' + record.created + '</td>\
                        <td><i id="rep1'+i+'" class="fa fa-play pointercursor" onclick="getrecord(\'Record stream\',\''+record._id+'\');"></i>\
                        &nbsp;&nbsp;\
                        <span id="case1'+record._id+'">'+agenciestocase+'</span>\
                        </td>\
                        <tr>\
			';
                }
                markup += '';
                //
            }else {
                //
                markup = '\
                    <tr>\
                        <td>No record available</td>\
                        <td></td>\
                        <td>\
                        </td>\
                        <tr>\
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
            password = safetee_buffer.safetee_crypto.createHash('md5').update(password).digest("hex");
            //
            var data = {
                "email":email,
                "password":password
            };
            //
            safetee_buffer.safetee['agents'].find({contact_email:data.email,password:data.password}, function(err, checkuser) {
                //
                if (checkuser.length > 0) {
                    //
                    safetee_buffer.safetee_auth.auth['set_auth'](req,checkuser);
                    //
                    safetee_buffer.safetee_response.returnresponse['redirect'](req,'/agency/dashboard',res);
                    //
                }else{
                    //
                    safetee_buffer. safetee_response.returnresponse['render'](req,'signin',{
                        title: globalname,
                        returninfo: safetee_buffer.safetee_response.getresponse['user_signin']('notfound')
                    },res);

                }
            });

        }else{
            //
            callback('');
        }
    }
});