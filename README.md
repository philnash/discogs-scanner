# Discogs Scanner

A web application that can scan your record collection and add releases to your [Discogs](https://www.discogs.com/) collection.

## Running the application

To run this application, you will need:

* Node.js
* A [Discogs API](https://www.discogs.com/developers) application, which [you can create here](https://www.discogs.com/settings/developers)

This application uses the [Netlify CLI](https://docs.netlify.com/cli/get-started/) to run the server-side functions endpoints. You don't need a [Netlify](https://www.netlify.com/) account to run this locally, but you will if you choose to deploy it to Netlify.

### Clone the application

```
git clone https://github.com/philnash/discogs-scanner.git
cd discogs-scanner
```

### Add your environment variable

Copy the `.env.example` file to `.env`:

```
cp .env.example .env
```

Fill in the `.env` file with your Discogs application consumer key and secret.

### Start the application

```
npm run netlify
```

Running `npm start` will just start the Svelte front-end. Running `npm run netlify` also starts the local Netlify functions server.

## Bugs, questions, ideas?

Please [raise an issue](https://github.com/philnash/discogs-scanner/issues)!

## License

MIT (c) Phil Nash 2021