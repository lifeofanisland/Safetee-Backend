var BaseController = require("./Base");
var safetee = require("../models/Safetee");
var safetee_response = require('../models/SafeteeResponse');
var globalname = "Article";

module.exports = BaseController.extend({
    //
    run: function(req, res, next) {
        //
        safetee['articles'].find({_id:req.params.id},function(err, article) {
            safetee_response.returnresponse['send'](article);
        });
        //
    }
});