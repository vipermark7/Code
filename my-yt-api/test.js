const req = require('request');

req.get(`http://localhost:8000/yt?search_term=${process.argv[2]}`, (err, resp, bod) => {
    if (err)
        throw err;
    console.log(JSON.parse(bod).title);
});