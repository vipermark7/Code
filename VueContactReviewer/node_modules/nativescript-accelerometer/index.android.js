Object.defineProperty(exports, "__esModule", { value: true });
var application = require("application");
var baseAcceleration = -9.81;
var sensorListener;
var sensorManager;
var accelerometerSensor;
function getNativeDelay(options) {
    if (!options || !options.sensorDelay) {
        return android.hardware.SensorManager.SENSOR_DELAY_NORMAL;
    }
    switch (options.sensorDelay) {
        case "normal":
            return android.hardware.SensorManager.SENSOR_DELAY_NORMAL;
        case "game":
            return android.hardware.SensorManager.SENSOR_DELAY_GAME;
        case "ui":
            return android.hardware.SensorManager.SENSOR_DELAY_UI;
        case "fastest":
            return android.hardware.SensorManager.SENSOR_DELAY_FASTEST;
    }
}
function startAccelerometerUpdates(callback, options) {
    if (sensorListener) {
        throw new Error("Already listening for accelerometer updates.");
    }
    var wrappedCallback = zonedCallback(callback);
    var activity = application.android.foregroundActivity;
    if (!activity) {
        throw Error("Could not get foregroundActivity.");
    }
    if (!sensorManager) {
        sensorManager = activity.getSystemService(android.content.Context.SENSOR_SERVICE);
        if (!sensorManager) {
            throw Error("Could not initialize SensorManager.");
        }
    }
    if (!accelerometerSensor) {
        accelerometerSensor = sensorManager.getDefaultSensor(android.hardware.Sensor.TYPE_ACCELEROMETER);
        if (!accelerometerSensor) {
            throw Error("Could get accelerometer sensor.");
        }
    }
    sensorListener = new android.hardware.SensorEventListener({
        onAccuracyChanged: function (sensor, accuracy) {
        },
        onSensorChanged: function (event) {
            wrappedCallback({
                x: event.values[0] / baseAcceleration,
                y: event.values[1] / baseAcceleration,
                z: event.values[2] / baseAcceleration
            });
        }
    });
    var nativeDelay = getNativeDelay(options);
    sensorManager.registerListener(sensorListener, accelerometerSensor, nativeDelay);
}
exports.startAccelerometerUpdates = startAccelerometerUpdates;
function stopAccelerometerUpdates() {
    if (!sensorListener) {
        throw new Error("Currently not listening for acceleration events.");
    }
    sensorManager.unregisterListener(sensorListener);
    sensorListener = undefined;
}
exports.stopAccelerometerUpdates = stopAccelerometerUpdates;
