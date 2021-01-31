const Discogs = require("disconnect").Client;

exports.handler = function (event, _context, callback) {
  const oAuth = new Discogs().oauth();
  oAuth.getRequestToken(
    process.env.DISCOGS_CONSUMER_KEY,
    process.env.DISCOGS_CONSUMER_SECRET,
    `${event.headers.referer}/callback.html`,
    function (err, requestData) {
      if (err) {
        console.error(err);
        callback(err);
      } else {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            token: requestData.token,
            tokenSecret: requestData.tokenSecret,
            authorizeUrl: requestData.authorizeUrl,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    }
  );
};
