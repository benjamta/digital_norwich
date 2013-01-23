var mongoose = require('mongoose');


var schema = mongoose.Schema({
    ip: String,
    email: String,
    date: { type: Date, default: Date.now },
    data: String
});
mongoose.model('record', schema, 'record');

var db = mongoose.createConnection('localhost', 'digital_norwich');
var Record = db.model('record');

exports.addRecord = function(req, res) {
    console.log(req.body.email);

    var record = new Record();
    record.ip = "127.0.0.1";
    record.email = "ben@bentaylro.co.uk";

    record.save(function(err) {
        if(!err) {
            res.send("All Done");
        }
        else {
            res.send(0);
        }
    });
};