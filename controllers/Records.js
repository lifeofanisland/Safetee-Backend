var BaseController = require("./Base");
var safetee = require("../models/Safetee");
var safetee_response = require('../models/SafeteeResponse');
var globalname = "Records";

module.exports = BaseController.extend({
    //
    run: function(req, res, next) {
        //
        safetee['records'].find({sender:req.params.id},function(err, records) {
            safetee_response.returnresponse['send'](records);
        });
        //
    }
});