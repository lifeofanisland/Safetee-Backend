var safetee_buffer = require('../../../models/Safetee_Head_Buffer');

module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function(req, res, next) {
        //
        safetee_buffer.safetee['records'].find({_id:req.body.caseid},function(err, record) {
            //
            console.log(record[0].record);
            //
            safetee_buffer.safetee_response.returnresponse['render'](req,'showrecord',
                {
                    recordlink: record[0].record
                },res);
        });
        //
    }
});