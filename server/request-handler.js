/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/


var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

const dataStorage = [];

var requestHandler = function(request, response) {
  //console.log(request);
  // save method, and url properties from request
  const { method, url } = request;


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
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  // -------var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'text/plain'; //application/JSON

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  // ----------response.writeHead(statusCode, headers);

// `http://127.0.0.1:3000`

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  const responseBody = JSON.stringify(dataStorage);

  // if request.method === 'POST && request.url === '/classes/messages
  if ( request.method === 'POST' && request.url === '/classes/messages') {
    dataStorage.unshift(request._postData);
    response.writeHead(201, headers);
    response.end();
  } else if (request.method === 'GET' && request.url === '/classes/messages') {
    response.writeHead(200, headers);
    console.log('dataStorage: ', dataStorage);
    response.end(JSON.stringify(dataStorage));
  } else if (request.url !== '/classes/messages') {
    response.writeHead(404, headers);
    response.end();
  }

    // create message object

  // else if request.method === 'GET' && request.url === ....
    // do this


  // ------- response.end(responseBody);
  // edited from response.end(JSON.stringify(responseBody));
    // we were double stringifying lol.

};



module.exports = {requestHandler, defaultCorsHeaders};
// console.log(module);
// How to view response/request?
// What needs to be done to add API endpoints...
// What array needs to be sent?

//

// request {
//   url: '/classes/messages',
//   method: 'POST',
//   _postData: { username: 'Jono', text: 'Do my bidding!' },
//   setEncoding: [Function (anonymous)],
//   on: [Function: bound ],
//   addListener: [Function: bound ]
// }