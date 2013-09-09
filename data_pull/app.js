var foursquare = (require('foursquarevenues'))("HPRVYZP1WZ2KRHKAHZRIGAW51LPWW3JDO3SF5NPMIXS2LFFG", "Y2RCE2LUI1FUJKO2UD01PUNYOJMXWQQZMFTAZRYKXAR0AGFV"),
    mongo = require('mongodb').MongoClient,
    strftime = require('strftime'),
    _ = require('underscore');


// TODO: pull these from db?
var query_inputs = ['cocktails', 'bar', 'speakeasy', 'wine bar', 'pub', 'nightlife', 'lounge'];
var near_inputs = ['los angeles', '90401'];


var COL_API = 'api_data',
    COL_VENUE = 'venue_data',
    near = "90401",
    query = "cocktails",
    page = "1",
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
    mongo.connect('mongodb://le-secret-admin:FCEseCVD@ds043338.mongolab.com:43338/le-secret-venu', function(err, db){
      if (err) throw err;
      //console.log('venues: ', venues);
      //process.exit();

      // if (!venues || !venues.response || !venues.response.groups || !venues.response.groups.item)
      // {
      //   console.log('no venue data');
      //   throw new Error('There is no venue data!');
      // }

      // console.log('connected successfully!');


      // insert results into api data
      // insert individual venue data

      console.log('saving api results...');

      //"4sq_90401_cocktails_1_yyyymmdd_hhmmss" 
      var timestamp = strftime('%Y%m%d_%H%M%S');
      var key = "fsq_" + near + "_" + query + "_" + page + "_" +  timestamp;
      var input = {};
      input[key] = venues;
      db.collection(COL_API).insert(input, {w:1}, function(err, result){
        if (err) console.log('Error inserting api result data: ', err);
      });

      console.log('building venue data...');
      var venue_data = _.map(venues.response.groups[0].items, function(x){
        var item = {};
        item.fsq_id = x.venue.id;
        item.name = x.venue.name;
        item.data = [];
        
        var temp = {};
        temp[timestamp] = {};
        temp[timestamp] = x.venue;
        item.data.push(temp);

        return item;
      });

      console.log('saving venue data...');
      _.each(venue_data, function(x){
        db.collection(COL_VENUE).update({fsq_id: x.fsq_id}, { $push: { data: { $each: x.data } } }, {w:1, upsert:true}, function(err, result){
          if (err)
          {
            console.log('Error inserting venue data: ', err);
            throw err;
          }
        });
      });

      console.log('this is the end');
    });
  }
});

