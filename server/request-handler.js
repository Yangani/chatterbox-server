/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
//var request = require("request");
var statusCode = null;
var headers = null;
//var database = {results:[{username:'Festus', text:"hey man!",roomname:'lobby'},{username:'David', text:"hey jude!",roomname:'lobby'}]};
var database = {results:[]};

var requestHandler = function(request, response) {
 // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.

  //Get Request
  /*console.log("Serving request type " + request.method + " for url " + request.url);

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = "application/json";

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  response.end(messages);*/

  //Post request
if(request.method === 'POST'){
  console.log("Serving request type " + request.method + " for url " + request.url);
  request.on("data", function(data) {
    console.log("messages data: ", JSON.parse(data));
    var input = JSON.parse(data);
    if(input.roomname === null){
      input.roomname = 'lobby';
    }
    database.results.push(input);
    headers = defaultCorsHeaders;
    statusCode = 201;
    response.writeHead(statusCode,headers);
    response.end(JSON.stringify("Message Submitted"));
  })
} else if(request.method === 'OPTIONS'){
  console.log("Serving request type " + request.method + " for url " + request.url);
  statusCode = 200;
  //console.log(statusCode);
  headers = defaultCorsHeaders;
  //console.log(headers);
  response.writeHead(statusCode, headers);
  response.end();
} else if(request.method === 'GET'){
  if (request.url === '/classes/messages'|| request.url ==='/classes/room1') {
    statusCode = 200;
    var messages = JSON.stringify(database);
  } else {
    statusCode = 404;
    messages = '';
  }
  console.log("Serving request type " + request.method + " for url " + request.url);
  headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";
  response.writeHead(statusCode, headers);
  response.end(messages);
 }
//  else if(request.method ==='GET' && request.url !== '/classes/messages'){
//   console.log("Serving request type " + request.method + " for url " + request.url);
//   statusCode = 404;
//   headers = defaultCorsHeaders;
//   headers['Content-Type'] = "application/json";
//   response.writeHead(statusCode, headers);
//   response.end();

// }



  // var statusCode = 200;
  // headers = defaultCorsHeaders;
  // headers['Content-Type'] = "application/json";
  // response.writeHead(statusCode, headers);
  // var messages = JSON.stringify(database);
  // response.end(messages);


};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};



module.exports.requestHandler = requestHandler;
