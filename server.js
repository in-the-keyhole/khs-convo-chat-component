var static = require('node-static');

//
// Create a node-static server instance to serve the './public' folder
//
var file = new static.Server('./public', { cache: 0 });

var port = process.env.PORT || 3000;

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(port);

console.log('listening on 127.0.0.1:' + port);
