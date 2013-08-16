/*var config = {
  "secrets": {
    "clientId": "HPRVYZP1WZ2KRHKAHZRIGAW51LPWW3JDO3SF5NPMIXS2LFFG",
    "clientSecret": "Y2RCE2LUI1FUJKO2UD01PUNYOJMXWQQZMFTAZRYKXAR0AGFV",
    "redirectUrl": "/"
  }
};*/

//var foursquare = require("node-foursquare")(config);

var foursquare = (require('foursquarevenues'))("HPRVYZP1WZ2KRHKAHZRIGAW51LPWW3JDO3SF5NPMIXS2LFFG", "Y2RCE2LUI1FUJKO2UD01PUNYOJMXWQQZMFTAZRYKXAR0AGFV");


exports.running = function(req, res){
  res.send("api is running");
};

exports.test = function(req, res){
  // foursquare.Venues.explore('40.7', '-74', {"near":"90293", "query":"drinks", "intent":"browse"}, {}, function(error, data){
  //   console.log('error: ', error);
  //   console.log('data: ', data);
  //   if (error) { 
  //     res.send(error); 
  //   }
  //   else {
  //     res.send(data);
  //   }
  // });

  var params = {
    "near":"90401", 
    "query":"drinks", 
    "intent":"browse"
  };

  foursquare.exploreVenues(params, function(error, venues){
    console.log('error: ', error);
    console.log('data: ', venues);
    if (error) { 
      res.send(error); 
    }
    else {
      res.send(venues);
    }
  });
};

exports.explore = function(req, res){
  // foursquare.Venues.explore('40.7', '-74', {"near":"90293", "query":"drinks", "intent":"browse"}, {}, function(error, data){
  //   console.log('error: ', error);
  //   console.log('data: ', data);
  //   if (error) { 
  //     res.send(error); 
  //   }
  //   else {
  //     res.send(data);
  //   }
  // });

  console.log('request: ', req.params);
  console.log('request.near', req.params.near);

  var params = {
    "near": req.params.near,
    "query":"cocktails",
    "intent":"browse"
  };

  foursquare.exploreVenues(params, function(error, venues){
    console.log('error: ', error);
    console.log('data: ', venues);
    if (error) { 
      res.send(error); 
    }
    else {
      res.send(venues);
    }
  });
};