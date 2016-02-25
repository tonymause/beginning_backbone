var express = require('express');
var bodyParser = require('body-parser');
var Twit = require('twit')

var app = express();


var client = null;

function connectToTwitter(){
   client = new Twit({
        consumer_key:         'oArpObGweDRhJN2Ys2RySEmGu',
        consumer_secret:      '7R9SvKExCItMzTOC9UZNqUTpqIK5S0Trp3ygATCHNdWe2L4Aox',
        access_token:         '52739523-GX5Xp45jsvHpg7Cci2An0mVr2pKlyDCM0bl9LxP9L',
        access_token_secret:  'O7hZITOq8EmTJu82ugItWQ7fpX5rKpjWzOb5jOyItmw5K'
});
}
//get the app to connect to twitter.
connectToTwitter();

//additional setup to allow CORS requests
var allowCrossDomain = function(req, response, next) {
    response.header('Access-Control-Allow-Origin', "http://localhost");
    response.header('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');

    if ('OPTIONS' == req.method) {
      response.sendStatus(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);
//Parses the JSON object given in the body request
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/**
 * Returns the twitter timeline for the current user
 **/
app.get('/timeline', function (request, response) {
  response.header('Access-Control-Allow-Origin', '*');
  client.get('statuses/home_timeline', { },  function (err, reply) {
    if(err){
      console.log('timeline err');
      response.sendStatus(404);
    }
    if(reply){
      console.log('timeline reply');
      response.json(reply);
    }
  });
});
/**
 * Get the account setting for 
 **/
 app.get('/profile/:id', function(request, response){
  response.header('Access-Control-Allow-Origin', '*');
  client.get('users/show', {screen_name: request.params.id}, function(err, reply){
    if (err) {
      console.log('error: '+err);
      response.sendStatus(404);
    }
    if (reply) {
      // console.log('Reply: ' + reply);
      response.json(reply);
    }
  });
 });

/**
 * Runs a search given a query
 **/
app.get('/search/:query', function (request, response) {
     
    response.header('Access-Control-Allow-Origin', '*');
    //search term is
    var searchTerm = request.params.query;
    console.log('searchTerm: '+ searchTerm);
    client.get('search/tweets', { q: searchTerm, count: 100 }, function(err, reply) {

      if(err){
        console.log('Error: ' + err);
        response.send(404);

      }
      if(reply){
        console.log('search Reply: ' + reply);
        response.json(reply);
      }

  });

});

//start up the app on port 8080
app.listen(8080);