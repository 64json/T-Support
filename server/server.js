const http = require('http');
const https = require('https');
const express = require('express');

const fs = require('fs');
const request = require('request');
//const sqlite3 = require("sqlite3").verbose();
//const db = new sqlite3.Database("app.db");

const app = express();
app.use(express.bodyParser());

const server = http.createServer(app);

var question = "";
var solution = "";
var wavurl = "";

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

app.post('/savetext', function(request, response) {
  console.log('POST /savetext')
  
  // Save request.body
  console.log(request.body)
  question = request.body.text;
  
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end('thanks')
})

app.post('/saveans', function(request, response) {
  console.log('POST /saveans')
  
  // Save request.body
  console.log(request.body)
  wavurl = request.body.url + ".mp3";
  download(wavurl,'tmp.wav',read);

  
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end('thanks')
})

var read = () => {
  var options = {
    headers: {'content-type' : 'audio/mp3'},
    url: 'https://gateway-wdc.watsonplatform.net/speech-to-text/api/v1/recognize',
    body: fs.createReadStream('tmp.wav'),
    encoding: null,
    auth: {
        'user': 'apikey',
        'pass': 'Wk54vkGwPI8FlZAckH9j9KbNDtJ1dMwdqekaPk5_HxK_'
    }
  };
  request.post(options, (error, response, body) => {
    solution = "";
    if (error) {
        console.log('Error: ', error);
        return;
    }
    let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
    console.log('JSON Response\n');
    console.log(jsonResponse);
    var tmp = JSON.parse(body).results;
    for (var i = 0; i < tmp.length; ++i) {
      solution += tmp[i].alternatives[0].transcript;
    }
    
    console.log(question, solution);
  });
  
}

app.get('/get', function(request, response) {
  response.end("{\"question\": " + question + ", " + "\"solution\": " + solution + "}")
})

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
