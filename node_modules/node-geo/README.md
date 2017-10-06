Google Maps Geo Lookup for Node.js
===============


## Usage


```javascript
var geocoder = require('node-geo');

// Geocoding
geocoder.geocode("Atlanta, GA", function ( err, data ) {
  // ...
});

// Reverse Geocoding
geocoder.reverseGeocode( 33.7489, -84.3789, function ( err, data ) {
  // ...
});

// Setting sensor to true
geocoder.reverseGeocode( 33.7489, -84.3789, { sensor: true }, function ( err, data ) {
  // ...
});

// Setting language to German
geocoder.reverseGeocode( 33.7489, -84.3789, { language: 'de' }, function ( err, data ) {
  // ...
});

// Using a Google API key
geocoder.reverseGeocode( 33.7489, -84.3789, { key: 'your-api-key' }, function ( err, data ) {
  // ...
});

// Passing arbitrary options to the Google API
geocoder.reverseGeocode( 33.7489, -84.3789, { foo: 'bar' }, function ( err, data ) {
  // ...
});
```
