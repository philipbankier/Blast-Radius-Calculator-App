var express = require('express');
var NodeGeocoder = require('node-geocoder');
var app = express();
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// add middleware 
app.use(function(req, res, next) {

// allow any origin to access the server
res.header("Access-Control-Allow-Origin", "*");

// indicates available HTTP response headers
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

app.use(express.static(__dirname + '/staticFiles'));

// ROUTES 
app.get('/', function(req, res) {
  console.log(req.body);
  res.send(req.body);
});

app.post('/search', function(req, res) {
  console.log(req.body[address]); 
  res.send(req.body[address]);

  function scrape() {
    url = 'http://api.dronestre.am/data';
    request(url, function(error, response, body){
      if(!error){
        var $ = cheerio.load(body);
      }
      ;
    var obj = JSON.parse(body);
    console.log(obj[0].country);
    var options = {
      noColor: false
      };
    fs.writeFile('output.json', body , function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check the terminal')
    })
  }

  // if (true) {}
  var options = { 
    provider: 'google',
 
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    // apiKey: 'options.clientIdand options.apiKey', 
    formatter: null         // 'gpx', 'string', ...
  };
 
  var geocoder = NodeGeocoder(options);
   
  // Using callback
  geocoder.geocode('29 champs elysée paris', function(err, res) {
    console.log(res);
  });
   
  // // Or using Promise
  // geocoder.geocode('29 champs elysée paris')
  //   .then(function(res) {
  //     console.log(res);
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   });
});


// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
