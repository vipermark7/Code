Object.defineProperty(exports, "__esModule", { value: true });
var accManager;
var isListening = false;
var main_queue = dispatch_get_current_queue();
function getNativeDelay(options) {
    if (!options || !options.sensorDelay) {
        return 0.2;
    }
    switch (options.sensorDelay) {
        case "normal":
            return 0.2;
        case "ui":
            return 0.06;
        case "game":
            return 0.02;
        case "fastest":
            return 0.001;
    }
}
function startAccelerometerUpdates(callback, options) {
    if (isListening) {
        throw new Error("Already listening for accelerometer updates.");
    }
    var wrappedCallback = zonedCallback(callback);
    if (!accManager) {
        accManager = CMMotionManager.alloc().init();
    }
    accManager.accelerometerUpdateInterval = getNativeDelay(options);
    if (accManager.accelerometerAvailable) {
        var queue = NSOperationQueue.alloc().init();
        accManager.startAccelerometerUpdatesToQueueWithHandler(queue, function (data, error) {
            dispatch_async(main_queue, function () {
                wrappedCallback({
                    x: data.acceleration.x,
                    y: data.acceleration.y,
                    z: data.acceleration.z
                });
            });
        });
        isListening = true;
    }
    else {
        throw new Error("Accelerometer not available.");
    }
}
exports.startAccelerometerUpdates = startAccelerometerUpdates;
function stopAccelerometerUpdates() {
    if (!isListening) {
        throw new Error("Currently not listening for acceleration events.");
    }
    accManager.stopAccelerometerUpdates();
    isListening = false;
}
exports.stopAccelerometerUpdates = stopAccelerometerUpdates;
