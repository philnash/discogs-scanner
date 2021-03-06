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
  const discogWantlist = discogs.user().wantlist();
  discogWantlist.removeRelease(
    event.queryStringParameters.username,
    event.queryStringParameters.release,
    (err) => {
      if (err) {
        console.error(err);
        callback(err);
      }
      callback(null, {
        statusCode: 201,
        body: "",
      });
    }
  );
};
