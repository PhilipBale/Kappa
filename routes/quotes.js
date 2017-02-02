var express = require('express'); 
var router = express.Router(); 
var OAuth = require('oauth').OAuth;
var config = require('../config');

console.log("Loaded config:");
console.log(JSON.stringify(config, null, 4));

var oa = new OAuth(null, null, config.credentials.consumer_key, config.credentials.consumer_secret, "1.0", null, "HMAC-SHA1");

var streamQuote = function(ticker, callback) {
  var url = "https://stream.tradeking.com/v1/market/quotes?symbols=" + ticker;
  console.log("Attempting to stream: " + url);
  var request = oa.get(url, config.credentials.access_token, config.credentials.access_secret);
  request.on('response', function (response) {
    response.setEncoding('utf8');
    response.on('data', function(data) {
        console.log(data);
    })
  });
  request.end();
} 
/* GET chat apps listing */
router.get('/:ticker', function(req, res, next) {
  var ticker = req.params.ticker;
  console.log("Streaming result for ticker: "  + ticker);

  streamQuote(ticker, null);
  res.json({'ticker': ticker});
});

module.exports = router;
