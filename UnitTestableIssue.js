class IOTCloudCommunicator {
    // Simulate pushing a message to the cloud and return a random status code
    pushMessage(message) {
        // Simulate interaction with internet and push the message to MessageQueue
        // Returns a status code in the range of 200-500
        const statusCode = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
        return statusCode;
    }
}

class BNFSpeedSensor {
    // Simulate getting the current speed
    getCurrentSpeed() {
        // Returns a random speed between 1 and 100
        const currentSpeed = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
        return currentSpeed;
    }
}

class SpeedMonitor {
    constructor(speedThreshold) {
        this._speedThreshold = speedThreshold;
    }

    // Monitors the speed and sends messages if the speed exceeds the threshold
    monitor() {
        if (this._speedThreshold < 1 || this._speedThreshold > 100) {
            console.log(`_speedThreshold value must be in the range {1-100}: ${this._speedThreshold}`);
            return;
        }

        const speedSensorInstance = new BNFSpeedSensor();
        const cloudCommunicator = new IOTCloudCommunicator();
        const currentSpeedInKmph = speedSensorInstance.getCurrentSpeed();

        console.log(`Current Speed In Kmph: ${currentSpeedInKmph}`);

        if (currentSpeedInKmph > this._speedThreshold) {
            // Convert the speed to miles per hour (mph)
            const mph = currentSpeedInKmph * 0.621371;
            const message = `Current Speed in Miles: ${mph.toFixed(2)}`;
            
            const statusCode = cloudCommunicator.pushMessage(message);
            
            if (statusCode > 400) {
                // Log an error message to the console
                console.log(`Error In Communication - Unable to Contact Server: ${message}`);
            }
        }
    }
}

// Usage example:
const speedMonitor = new SpeedMonitor(10);
speedMonitor.monitor();
speedMonitor.monitor();
speedMonitor.monitor();
speedMonitor.monitor();
speedMonitor.monitor();
