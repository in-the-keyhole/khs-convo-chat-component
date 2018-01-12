var express = require('express');
var app = express();

app.use('/', function (req, res, next) {
	console.log(req.originalUrl);
	next();
});

app.use(express.static('build/'));

app.use('/in-the-keyhole/khs-convo-emulator/', express.static('build/'));

app.listen(3000, function () {
	console.log('listening on port 3000');
});

