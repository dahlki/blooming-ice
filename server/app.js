var http = require('http');
var fs = require('fs');
var path = require('path')
var app = fs.readFileSync(path.join(__dirname, '../client/bloomingice.js'));

http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", null);
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.write(app);
    res.end();
}).listen(process.env.PORT || 8000, () => {
    console.log('tiny server listening on port 8000.')
});
