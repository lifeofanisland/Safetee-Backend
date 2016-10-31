var BaseController = require("./Base");
var safetee = require("../models/Safetee");
var safetee_response = require('../models/SafeteeResponse');
var globalname = "Articles";

module.exports = BaseController.extend({
    //
    run: function(req, res, next) {
        //
        safetee['articles'].find({},function(err, articles) {
            safetee_response.returnresponse['send'](articles);
        });
        //
    }
});