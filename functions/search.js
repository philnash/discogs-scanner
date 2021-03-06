const Discogs = require("disconnect").Client;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

exports.handler = function (event, _context, callback) {
  const discogs = new Discogs({
    method: "oauth",
    level: 2,
    consumerKey: process.env.DISCOGS_CONSUMER_KEY,
    consumerSecret: process.env.DISCOGS_CONSUMER_SECRET,
    token: event.queryStringParameters.token,
    tokenSecret: event.queryStringParameters.secret,
  });
  const discogsDb = discogs.database();
  discogsDb.search(
    {
      barcode: event.queryStringParameters.barcode,
      type: "release",
      per_page: getRandomInt(90, 101), // busts cache on user_data
    },
    (err, searchResults) => {
      if (err) {
        console.error(err);
        callback(err);
      }
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(searchResults),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  );
};
