var e = require('../../models/Safetee_Head_Buffer');
var c = require('../../models/Admin_Contents');
var m = require('../../models/Menu');
//
module.exports = e.safetee_base_controller.extend({
    //
    username: "admin",
    password: "admin",
    //
    run: function (req, res, next) {
        //
        var self = this;
        //
        if (this.auth(req)) {
            //
            req.session.loggedin = true;
            req.session.save();
            //
            if (typeof req.body.form !== 'undefined' && typeof req.body.type !== 'undefined') {
                //
                var type = req.body.type;
                //
                self.save(req, type, function (result) {
                    //
                    self.exit(req, result, res);
                    //
                });

            } else {
                //
                self.exit(req, '', res);
                //
            }
            //
        } else {
            //
            res.render('admin/login');
        }
    },
    //
    auth: function (req) {
        return (
                req.session &&
                req.session.loggedin &&
                req.session.loggedin === true
            ) || (
                req.body &&
                req.body.username === this.username &&
                req.body.password === this.password
            );
    },
    //
    exit: function (req, result, res) {
        //
        var self = this;
        //
        self.del(req, function (delres) {
            //
            self.content(req, res, function (response) {
                //
                res.render('admin/dashboard.hjs', {
                    utitle: self.username,
                    result: result || delres,
                    body: response['body'],
                    title: req.query.s || response['title'],
                    menu: m.admin()
                });
            });
        });
    },
    //
    save: function (req, type, callback) {
        //
        var self = this;
        //
        var data;
        //
        if (type == "tips") {
            //
            data = this.tip(req);
            //
        }
        //
        e.safetee[type].create(data, function (err, response) {
            //
            if (err) {
                //
                callback('An error has occured');
            } else {
                //
                callback(self.returnsave(type));
            }

        });
        //
    },
    //
    returnsave: function (type) {
        //
        switch (type) {
            case "tips":
                return 'Tip successfully saved';
                break;
        }

    },
    //
    del: function (req, callback) {
        //
        if (req.query && req.query.action === "delete" && req.query.id && typeof req.query.type !== 'undefined') {
            //
            e.safetee[req.query.type].remove({_id: req.query.id}, function (err, action) {
                //
                callback('Item Deleted');
                //
            });
            //
        } else {
            //
            callback();
            //
        }
        //
    },
    //
    tip: function (req) {
        //
        var data = {
            //
            sender: this.username,
            title: req.body.title,
            body: req.body.body,
            category: req.body.category,
            created: e.safetee.datetimenow
        }
        //
        return data;
    },
    //
    content: function (req, res, callback) {
        //
        var data;
        //
        var page = req.params.id;
        //
        if (page == "home") {
            //
            data = {
                body: c.overview(),
                title: 'Overview'
            }
            //
            callback(data);
            //
        } else if (page == "records") {
            //
            c.records(req, function (response) {
                //
                data = {
                    body: response,
                    title: 'Records'
                }
                //
                callback(data);
            });
            //
        } else if (page == "users") {
            //
            c.users(req, function (response) {
                //
                data = {
                    body: response,
                    title: 'Users'
                }
                //
                callback(data);
            });
            //
        } else if (page == "agencies") {
            //
            c.agencies(req, function (response) {
                //
                data = {
                    body: response,
                    title: 'Agencies'
                }
                //
                callback(data);
            });
            //
        } else if (page == "tips") {
            //
            c.tips(req, function (response) {
                //
                data = {
                    body: response + c.addtip(),
                    title: 'Tips'
                };
                //
                callback(data);
            });
            //
        } else if (page == "subscribers") {
            //
            c.subscribers(req, function (response) {
                //
                data = {
                    body: response + c.sendnewsletter(),
                    title: 'Subscribers'
                };
                //
                callback(data);
            });
            //
        } else if (page == "donations") {
            //
            c.donations(req, function (response) {
                //
                data = {
                    body: response,
                    title: 'Donations'
                };
                //
                callback(data);
            });
            //
        } else if(page == "logout"){
            //
            req.session.destroy();
            //
            data = {
                body: '',
                title: ''
            }
            res.redirect('../home');
            //
        } else {
            //
            data = {
                body: "<h3>The page you are looking for is either missing or broken</h3>",
                title: "404"
            }
            //
            callback(data);
        }
        //
    }
});
