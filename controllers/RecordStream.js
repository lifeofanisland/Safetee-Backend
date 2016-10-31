var BaseController = require("./Base");
var safetee = require("../models/Safetee");
var safetee_response = require('../models/SafeteeResponse');
var globalname = "Record Stream";

module.exports = BaseController.extend({
    //
    run: function(req, res, next) {
        //
        safetee['records'].find({_id:req.body.caseid},function(err, record) {
            safetee_response.returnresponse['send'](record);
        });
        //
    }
});