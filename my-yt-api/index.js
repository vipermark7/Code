const yt = require("youtube-search");
=======
// Built in module to create, read files etc.
const fs = require("fs");
// What we use to make the API
const express = require("express");
const secretboi = require("./secret.json");

// Port our API runs on
const port = 8000;

// How to initiate express
const app = express();
const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
// Handles MultiPart Form data
const multer = require('multer');
const upload = multer();

app.use(express.static(__dirname));

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

// Post reuqest
// upload.single('form_boi') 
// ^ From extension called Multer
// Handles multipart form data
app.post("/sharex", upload.single('form_boi'), (req, res) => {
    // Key to check
    let clientKey = "123";

    // Key we recieve
    let key = req.body.key;
    // File name
    let name = req.body.name;
    // File buffer
    let file = req.file.buffer;

    // Check key
    if (clientKey !== key)
        return res.end("no");
    
    // If key correct, write to file
    fs.writeFileSync(`./Pics/${name}.png`, file);
    return res.end(`http://localhost:8000/Pics/${name}.png`);
});

// Setup Express webserver
app.listen(port, (req, res) => {
    console.log("Listening on port " + port);
});
