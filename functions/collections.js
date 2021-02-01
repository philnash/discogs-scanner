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
  const discogCollection = discogs.user().collection();
  discogCollection.getFolders(
    event.queryStringParameters.username,
    (err, userData) => {
      if (err) {
        console.error(err);
        callback(err);
      }
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  );
};
