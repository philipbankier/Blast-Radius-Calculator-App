var express = require('express');
var NodeGeocoder = require('node-geocoder');
var app = express();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
const ejsLint = require('ejs-lint');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// set linter
ejsLint('views/home.ejs'); 

// set the view engine to ejs
app.set('view engine', 'ejs')

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

// - Home page
app.get('/', (req, res) => {

  // render `home.ejs` with the list of posts
  res.render('home')
})

// post request gets user input from address form 
app.post('/address', function(req, res) {

  // Tester code
  console.log(req.body.address); 
  res.send(req.body.address);

  function scrape() {
    url = 'http://api.dronestre.am/data';
    request(url, function(error, response, body){
      if(!error){
        var $ = cheerio.load(body);
      };

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

  var options = { 
    provider: 'google',
    httpAdapter: 'https', // Default
    // apiKey: 'options.clientIdand options.apiKey', 
    formatter: null         // 'gpx', 'string', ...
  };
 
  var geocoder = NodeGeocoder(options);
   
  // Using callback
  geocoder.geocode(req.body.address, function(err, res) {
    console.log(res);
    // console.log(res.body.longitude);
    // var res = JSON.parse(res, function(data){
    //   console.log(data);
    // })
  });

//   // render the `home.ejs` template with coordinate data
//   res.render('home', {
//     address: home.address
//   }) 
});

// start the server
app.listen(port, function() {
  console.log('Server started! At http://localhost:' + port);
});