const yt = require("youtube-search");
const express = require("express");
const secretboi = require("./secret.json");

// Port our API runs on
const port = 8000;

// How to initiate express
const app = express();

// Our rout, "localhost:8000/yt"
// If this was "/hello" it would be 
// localhost:8000/hello
app.get("/yt", (req, res) => {
    // Options for YouTube search module
    var opts = {
        maxResults: 1,
        key: secretboi.secret
    };
    // Our param
    // If it was req.query.blah
    // It would look like localhost:8000/yt?blah=whatever
    var usrQuery = req.query.search_term;

    // Run the YouTube search module
    yt(usrQuery, opts, (err, results) => {
        // Handle error
        if (err) return console.log(err);

        // Send JSON over to out API
        // Results is an array, since we have maxResults set to 1,
        // we only have 1 element in our array
        // Hense results[0]
        // If we had maxResults set to 3
        // We would have: results[0], results[1], results[2] etc.
        res.json({
            "link": results[0].link,
            "title": results[0].title
        });

    });
});

// Setup Express webserver
app.listen(port, (req, res) => {
    console.log("Listening on port " + port);
});