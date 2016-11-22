var s = require('./Safetee');
//
exports.overview = function () {
    //
    return '';
}
//
exports.addtip= function () {
    //
    return '<br/><br/>' +
        '<div class="" style="background:white;padding:20px;"> <form class="form-horizontal" action="./tips" method="post"> ' +
        '<input type="text" name="title" class="form-control" placeholder="Title" required>' +
        '<br/><textarea name="body" class="form-control jqte-test" rows="4" cols="5" placeholder="Description" required></textarea>' +
        '<input type="hidden" name="form" value="go"><input type="hidden" name="type" value="tips"><button type="submit" class="btn btn-primary">Save</button></form> </div>';

}
//
exports.sendnewsletter= function () {
    //
    return '<br/><br/>' +
        '<div class="" style="background:white;padding:20px;"> <form class="form-horizontal" action="./subscribers" method="post"> ' +
        '<input type="text" name="title" class="form-control" placeholder="Title" required>' +
        '<br/><textarea name="body" class="form-control jqte-test" rows="4" cols="5" placeholder="Description" required></textarea>' +
        '<input type="hidden" name="form" value="go"><input type="hidden" name="type" value="subscribers"><button type="submit" class="btn btn-primary">Send</button></form> </div>';

}
//
exports.records = function (req, callback) {
    //
    var data, sort, limit;
    //
    if (typeof req.query.s !== 'undefined') {
        //
        var squery = req.query.s;
        //
        var regsearch = new RegExp(squery, "i");
        data = {
            $and: [{
                $or: [
                    {"location": regsearch}, {"created": regsearch},
                    {"category": regsearch}, {"share": regsearch}
                ]
            }
            ]
        }
        sort = {_id: -1}
        limit = 200;
    }else{
        //
        data = {}
        sort = {_id: -1}
        limit = 200;
    }
    s['records'].find(data).sort(sort).limit(limit).exec(function(err, records) {
        //
        console.log(records);
        //
        if(records.length > 0) {
            //
            var markup = '';
            //
            markup += ' <table data-ride="datatables" style="max-width:100% !important;border-left:2px solid greenyellow;" class="activity-log__content table table-striped m-b-none">\
                <thead>\
                <tr>\
                <th width="60%">Location</th>\
                <th width="25%">Time</th>\
                <th width="15%">Action</th>\
                </tr>\
                </thead>\
                <tbody>';
                    //
            var record;
            //
            for (var i = 0; record = records[i]; i++) {
               //
                markup += '\
                    <tr>\
                        <td>' + record.location + '</td>\
                        <td>' + record.created + '</td>\
                        <td><a href="#" id="rep1'+i+'" class="fa fa-play pointercursor" onclick="getrecord(\'Record stream\',\''+record._id+'\');"></a>\
                        &nbsp;&nbsp;<a href="#"><i class="fa fa-info-circle"></i> </a>\
                        &nbsp;&nbsp;<a href="#"><i class="fa fa-trash"></i> </a> \
                        <span id="case1'+record._id+'"></span>\
                        </td>\
                        <tr>\
			';
            }
            markup += '</tbody>\
                       </table>';
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
    });
    //
}
//
exports.users = function (req, callback) {
    //
    var data, sort, limit;
    //
    if (typeof req.query.s !== 'undefined') {
        //
        var squery = req.query.s;
        //
        var regsearch = new RegExp(squery, "i");
        data = {
            $and: [{
                $or: [
                    {"location": regsearch}, {"created": regsearch},
                    {"name": regsearch}, {"email": regsearch},
                    {"sex": regsearch}, {"phone_number": regsearch}
                ]
            }
            ]
        }
        sort = {_id: -1}
        limit = 200;
    }else{
        //
        data = {}
        sort = {_id: -1}
        limit = 200;
    }
    s['users'].find(data).sort(sort).limit(limit).exec(function(err, records) {
        //
        console.log(records);
        //
        if(records.length > 0) {
            //
            var markup = '';
            //
            markup += ' <table data-ride="datatables" style="max-width:100% !important;border-left:2px solid greenyellow;" class="activity-log__content table table-striped m-b-none">\
                <thead>\
                <tr>\
                <th width="20%">Name</th>\
                <th width="15%">Phone</th>\
                <th width="15%">Email</th>\
                <th width="15%">Sex</th> \
                <th width="15%">Location</th>\
                <th width="15%">Action</th>\
                </tr>\
                </thead>\
                <tbody>';
            //
            var record;
            //
            for (var i = 0; record = records[i]; i++) {
                //
                markup += '\
                    <tr>\
                        <td>' + record.name + '</td>\
                        <td>' + record.phone_no + '</td>\
                        <td>' + record.email + '</td>\
                        <td>' + record.sex + '</td>\
                        <td>' + record.location + '</td>\
                        <td><a href="#"><i class="fa fa-info-circle"></i> </a>\
                        &nbsp;&nbsp;<a href="#"><i class="fa fa-trash"></i> </a> </td>\
                        <tr>\
			';
            }
            markup += '</tbody>\
                       </table>';
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
    });
    //
}
//
exports.agencies = function (req, callback) {
    //
    var data, sort, limit;
    //
    if (typeof req.query.s !== 'undefined') {
        //
        var squery = req.query.s;
        //
        var regsearch = new RegExp(squery, "i");
        data = {
            $and: [{
                $or: [
                    {"type": regsearch}, {"created": regsearch},
                    {"name": regsearch}, {"contact_email": regsearch},
                    {"contact_person": regsearch}, {"contact_phone": regsearch}
                ]
            }
            ]
        }
        sort = {_id: -1}
        limit = 200;
    }else{
        //
        data = {}
        sort = {_id: -1}
        limit = 200;
    }
    s['agents'].find(data).sort(sort).limit(limit).exec(function(err, records) {
        //
        console.log(records);
        //
        if(records.length > 0) {
            //
            var markup = '';
            //
            markup += ' <table data-ride="datatables" style="max-width:100% !important;border-left:2px solid greenyellow;" class="activity-log__content table table-striped m-b-none">\
                <thead>\
                <tr>\
                <th width="5%">Type</th>\
                <th width="25%">Name</th>\
                <th width="25%">Representative</th>\
                <th width="15%">Email</th>\
                <th width="15%">Phone</th> \
                <th width="10%">Action</th>\
                </tr>\
                </thead>\
                <tbody>';
            //
            var record;
            //
            for (var i = 0; record = records[i]; i++) {
                //
                markup += '\
                    <tr>\
                        <td>' + record.type + '</td>\
                        <td>' + record.name + '</td>\
                        <td>' + record.contact_person + '</td>\
                        <td>' + record.contact_email + '</td>\
                        <td>' + record.contact_phone + '</td>\
                        <td><a href="#"><i class="fa fa-info-circle"></i> </a>\
                        &nbsp;&nbsp;<a href="#"><i class="fa fa-trash"></i> </a> </td>\
                        <tr>\
			';
            }
            markup += '</tbody>\
                       </table>';
            //
        }else {
            //
            markup = '\
                    No record available\
			';

        }
        callback(markup);
    });
    //
}
//
exports.tips = function (req, callback) {
    //
    var data, sort, limit;
    //
    if (typeof req.query.s !== 'undefined') {
        //
        var squery = req.query.s;
        //
        var regsearch = new RegExp(squery, "i");
        data = {
            $and: [{
                $or: [
                    {"title": regsearch}, {"created": regsearch},
                    {"body": regsearch}
                ]
            }
            ]
        }
        sort = {_id: -1}
        limit = 200;
    }else{
        //
        data = {}
        sort = {_id: -1}
        limit = 200;
    }
    s['tips'].find(data).sort(sort).limit(limit).exec(function(err, records) {
        //
        console.log(records);
        //
        if(records.length > 0) {
            //
            var markup = '';
            //
            markup += ' <table data-ride="datatables" style="max-width:100% !important;border-left:2px solid greenyellow;" class="activity-log__content table table-striped m-b-none">\
                <thead>\
                <tr>\
                <th width="20%">Title</th>\
                <th width="75%">Description</th>\
                <th width="5%">Action</th>\
                </tr>\
                </thead>\
                <tbody>';
            //
            var record;
            //
            for (var i = 0; record = records[i]; i++) {
                //
                markup += '\
                    <tr>\
                        <td>' + record.title + '</td>\
                        <td>' + record.body + '</td>\
                        <td><a href="#" onclick="delitem(\'tips\',\'' + record._id + '\');return false;"><i class="fa fa-trash"></i> </a> </td>\
                        <tr>\
			';
            }
            markup += '</tbody>\
                       </table>';
            //
        }else {
            //
            markup = '\
                    No record available\
			';

        }
        callback(markup);
    });
    //
}
//
exports.subscribers = function (req, callback) {
    //
    var data, sort, limit;
    //
    if (typeof req.query.s !== 'undefined') {
        //
        var squery = req.query.s;
        //
        var regsearch = new RegExp(squery, "i");
        data = {
            $and: [{
                $or: [
                    {"name": regsearch}, {"created": regsearch},
                    {"email": regsearch}
                ]
            }
            ]
        }
        sort = {_id: -1}
        limit = 200;
    }else{
        //
        data = {}
        sort = {_id: -1}
        limit = 200;
    }
    s['subscribers'].find(data).sort(sort).limit(limit).exec(function(err, records) {
        //
        console.log(records);
        //
        if(records.length > 0) {
            //
            var markup = '';
            //
            markup += ' <table data-ride="datatables" style="max-width:100% !important;border-left:2px solid greenyellow;" class="activity-log__content table table-striped m-b-none">\
                <thead>\
                <tr>\
                <th width="20%">Name</th>\
                <th width="75%">Phone</th>\
                <th width="5%">Action</th>\
                </tr>\
                </thead>\
                <tbody>';
            //
            var record;
            //
            for (var i = 0; record = records[i]; i++) {
                //
                markup += '\
                    <tr>\
                        <td>' + record.name + '</td>\
                        <td>' + record.email + '</td>\
                        <td><input type="checkbox"> \
                        <a href="#" onclick="delitem(\'subscribers\',\'' + record._id + '\');return false;"><i class="fa fa-trash"></i> </a> </td>\
                        <tr>\
			';
            }
            markup += '</tbody>\
                       </table>';
            //
        }else {
            //
            markup = '\
                    No record available\
			';

        }
        callback(markup);
    });
    //
}
//
exports.donations = function (req, callback) {
    //
    var data, sort, limit;
    //
    if (typeof req.query.s !== 'undefined') {
        //
        var squery = req.query.s;
        //
        var regsearch = new RegExp(squery, "i");
        data = {
            $and: [{
                $or: [
                    {"created": regsearch},{"recipient": regsearch},
                    {"amount": regsearch}
                ]
            }
            ]
        }
        sort = {_id: -1}
        limit = 200;
    }else{
        //
        data = {}
        sort = {_id: -1}
        limit = 200;
    }
    s['donations'].find(data).sort(sort).limit(limit).exec(function(err, records) {
        //
        console.log(records);
        //
        if(records.length > 0) {
            //
            var markup = '';
            //
            markup += ' <table data-ride="datatables" style="max-width:100% !important;border-left:2px solid greenyellow;" class="activity-log__content table table-striped m-b-none">\
                <thead>\
                <tr>\
                <th width="30%">Donor</th>\
                <th width="35%">Recipient</th>\
                <th width="30%">Amount</th>\
                <th width="5%">Action</th>\
                </tr>\
                </thead>\
                <tbody>';
            //
            var record;
            //
            for (var i = 0; record = records[i]; i++) {
                //
                markup += '\
                    <tr>\
                        <td>' + record.donor + '</td>\
                        <td>' + record.recipient + '</td>\    \
                        <td>' + record.amount + '</td>\
                        <td><a href="#"><i class="fa fa-info-circle"></i> </a></td>\
                        <tr>\
			';
            }
            markup += '</tbody>\
                       </table>';
            //
        }else {
            //
            markup = '\
                    No record available\
			';

        }
        callback(markup);
    });
    //
}