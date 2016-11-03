//
var Get_URL = ({
    //
    host_url: function (req, res) {
        return req.protocol + '://' + req.get('host');
    }
    //
});
//
module.exports = {
    url: Get_URL
}