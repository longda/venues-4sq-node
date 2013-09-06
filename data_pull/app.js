var foursquare = (require('foursquarevenues'))("HPRVYZP1WZ2KRHKAHZRIGAW51LPWW3JDO3SF5NPMIXS2LFFG", "Y2RCE2LUI1FUJKO2UD01PUNYOJMXWQQZMFTAZRYKXAR0AGFV");

var mongo = require('mongodb').MongoClient;


// TODO: pull these from db?
var query_inputs = ['cocktails', 'bar', 'speakeasy', 'wine bar', 'pub', 'nightlife', 'lounge'];
var near_inputs = ['los angeles', '90401'];


var near = "90401",
    query = "cocktails",
    params = {
  "near": near, 
  "query": query, 
  "intent":"browse"
};

foursquare.exploreVenues(params, function(error, venues){

  if (error){
    //console.log('error: ', error);
  }
  else {
    //console.log('data: ', venues);
    mongo.connect('mongodb://le-secret-admin:FCEseCVD@ds043338.mongolab.com:43338/le-secret-venu', function(err, db){
    if (err) throw err;

    console.log('connected successfully!');

    // db.stats(function(err, stats){
    //   if (err) console.error(err);
    //   console.log('retrieved stats successfully!');

    //   console.log('stats: ', stats);
    // });


    });
  }
});

