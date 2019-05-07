var GTFSRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');

var requestSettings = {
    method: 'GET',
    url: 'http://developer.mbta.com/lib/GTRTFS/Alerts/TripUpdates.pb',
    encoding: null
};
request(requestSettings, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var feed = GTFSRealtimeBindings.FeedMessage.decode(body);
        feed.entity.forEach(function (entity) {
            if (entity.trip_update) {
                console.log(entity.trip_update);
            }
        });
    }
});
