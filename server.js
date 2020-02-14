var http = require('http');
var url = require('url');
var fs = require('fs');

//Create a new server using the http module.
http.createServer(function (req, res) {
	/*Creates a new variable to hold the url. The url is then parsed, or read
	through, to determine what its parts are and what page the user has asked for.
	*/
	var a = url.parse(req.url, true);
	/*Creates a new "filename" variable to hold the requested filename.
	That filename is then concatenated at each "." to form a path to each of
	the requested files.
	*/
	var filename = "." + a.pathname;
	//Reads each filename in the url to determine if the server contains the requested page.
	fs.readFile(filename, function(err, image, data) {
		//If the requested page does not exist, return a 404 error message to the user.
		if (err) {
			res.writeHead(404, {'Content-Type' : 'text/html'});
			res.write("404 Error. Page Not Found.");
			return res.end();
		}
		//If an image is to be loaded with the page, return an image of content-type "jpg".
		if (image) {
			res.writeHead(200, {'Content-Type' : 'jpg'});
			res.write(image);
			return res.end();
		}
		//Locate the requested page and return it's contents to the user.
		else {
			res.writeHead(200, {'Content-Type' : 'text/html'});
			res.write(data);
			return res.end();
		}
	});
	//Listen on port 1337 for incoming requests.
}).listen(1337);
console.log("Server running on port 1337!")