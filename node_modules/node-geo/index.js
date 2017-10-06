var request = require('request'),
    _       = require('lodash-node');

function makeRequest(url, options, callback) {

  if (options.hasOwnProperty('key'))
    url = url.replace('http://', 'https://'); // api_key requests require SSL

  request({
    json: true,
    uri : url,
    qs  : options
  }, function(err, resp, body) {

    if (err)
      callback(err);
    else
      return callback(null, body);
  });

}

exports.geocode = function (query, options, callback) {

  if (typeof options === 'function') {
    callback = options;
    options  = {};
  }

  var options = _.extend({
    sensor  : false,
    address : query
  }, options || {});

  makeRequest('http://maps.googleapis.com/maps/api/geocode/json', options, function(err, resp) {
    if (err)
      callback(err)
    else
      return callback(null, resp);
  });

};

exports.reverseGeocode = function (lat, lng, options, callback) {

  if (typeof options === 'function') {
    callback = options;
    options  = {};
  }

  var options = _.extend({
    sensor: false,
    latlng: lat + ',' + lng
  }, options || {});

  makeRequest('http://maps.googleapis.com/maps/api/geocode/json', options, function(err, resp) {
    if (err)
      callback(err)
    else
      return callback(null, resp);
  });

};