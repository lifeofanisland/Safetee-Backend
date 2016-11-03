var BaseController = require("../controllers/Base");
var safetee_model = require("./Safetee");
var safetee_response_buffer = require('./SafeteeResponse');
var safetee_upload_dir = require('./Safetee_Upload_Dir');
var safetee_get_vars = require('./Safetee_Vars');
var crypto = require('crypto');
var fs = require('fs');
var return_data = '';
//
module.exports = {
    safetee_base_controller:BaseController,
    safetee:safetee_model,
    safetee_response:safetee_response_buffer,
    safetee_dir:safetee_upload_dir,
    safetee_var:safetee_get_vars,
    safetee_crypto:crypto,
    safetee_filesync:fs,
    safetee_return_data:return_data
}