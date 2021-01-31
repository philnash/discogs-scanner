const Discogs = require("disconnect").Client;
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
