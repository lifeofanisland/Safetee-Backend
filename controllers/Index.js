var BaseController = require("./Base");
var safetee = require("../models/Safetee");
var safetee_response = require('../models/SafeteeResponse');
var globalname = safetee_response.getresponse['page_title']('index');

module.exports = BaseController.extend({
    //
    run: function(req, res, next) {
        //
        safetee_response.returnresponse['render'](req,'test',{
            title: globalname
        },res);
        //
    }
});