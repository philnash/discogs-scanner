const Discogs = require("disconnect").Client;

exports.handler = function (event, _context, callback) {
  const oAuth = new Discogs({
    method: "oauth",
    level: 0,
    consumerKey: process.env.DISCOGS_CONSUMER_KEY,
    consumerSecret: process.env.DISCOGS_CONSUMER_SECRET,
    token: event.queryStringParameters.oauth_token,
    tokenSecret: event.queryStringParameters.oauth_token_secret,
    authorizeUrl:
      "https://www.discogs.com/oauth/authorize?oauth_token=" +
      event.queryStringParameters.oauth_token,
  }).oauth();
  oAuth.getAccessToken(
    event.queryStringParameters.oauth_verifier, // Verification code sent back by Discogs
    function (err, accessData) {
      if (err) {
        console.error("ERROR: ", err);
        return callback(err);
      }
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          token: accessData.token,
          tokenSecret: accessData.tokenSecret,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  );
};
