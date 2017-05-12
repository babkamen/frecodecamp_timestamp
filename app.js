var express = require('express');
var app = express();
var moment = require('moment');

app.get('/:date', function(req, res) {
	res.send(convert(req.params.date));
});


var format = 'MMMM DD, YYYY';

function convert(data) {
	var isNum = /^\d+$/.test(data);
	var r = {
		unix: null,
		natural: null
	};
	if (isNum) {
		var timestamp = parseInt(data);
		var date = moment.unix(timestamp);
		if (date.isValid()) {
			r.unix = timestamp;
			r.natural = date.format(format);
		}
	} else {
		//set utc as by default moment gets timezone of system
		var timestamp = moment(data + " Z", format + " Z").unix();;

		if (!Number.isNaN(timestamp)) {
			r.unix = timestamp;
			r.natural = data;
		}
	}
	return r;
}

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function() {
	console.log('Server is running on port 3000!');
});