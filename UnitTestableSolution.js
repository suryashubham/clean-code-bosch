class ISpeedSensor {
    getCurrentSpeed() {
        throw new Error("Method 'getCurrentSpeed()' must be implemented.");
    }
}

class ICloudCommunicator {
    pushMessage(message) {
        throw new Error("Method 'pushMessage()' must be implemented.");
    }
}

class ILog{
    logInfo(message){
        throw new Error("Method 'logInfo()' must be implemented.");
    }
}

class IOTCloudCommunicator extends ICloudCommunicator {
    // Simulate pushing a message to the cloud and return a random status code
    pushMessage(message) {
        // Simulate interaction with internet and push the message to MessageQueue
        // Returns a status code in the range of 200-500
        const statusCode = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
        return statusCode;
    }
}

class BNFSpeedSensor extends ISpeedSensor {
    // Simulate getting the current speed
    getCurrentSpeed() {
        // Returns a random speed between 1 and 100
        const currentSpeed = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
        return currentSpeed;
    }
}

class Logger extends ILog {
   logInfo(message){
        console.log(message)
   }   
}

class SpeedMonitor {
    constructor(speedThreshold, speedSensor = null, cloudCommunicator = null, logger=null) {
        if (!(speedSensor instanceof ISpeedSensor)) throw new Error("speedSensor must implement ISpeedSensor interface");
        if (!(cloudCommunicator instanceof ICloudCommunicator)) throw new Error("cloudCommunicator must implement ICloudCommunicator interface");
        if (!(logger instanceof ILog)) throw new Error("Logger must Implement ILog Interface");

        this._speedThreshold = speedThreshold;
        this._speedSensor = speedSensor;
        this._cloudCommunicator = cloudCommunicator;
        this._logger = logger
    }

    monitor() {
        
        this.reportThresholdSpeedCrossed(this._speedThreshold)

        const currentSpeedInKmph = this._speedSensor.getCurrentSpeed();

        this._logger.logInfo(`Current Speed In Kmph: ${currentSpeedInKmph}`);

        if (currentSpeedInKmph > this._speedThreshold) {
            const mph = this.getSpeedInMilesPerHour(currentSpeedInKmph)
            const message = `Current Speed in Miles: ${mph.toFixed(2)}`;
            const statusCode = this._cloudCommunicator.pushMessage(message);
            
            if (statusCode > 400) {
                this._logger.logInfo(`Error In Communication - Unable to Contact Server: ${message}`);
            }
        }
    }

    reportThresholdSpeedCrossed(threshold_speed){
        if (threshold_speed < 1 || threshold_speed > 100) {
            this._logger.logInfo(`_speedThreshold value must be in the range {1-100}: ${threshold_speed}`);
            return;
        }
    }

    getSpeedInMilesPerHour(currentSpeedInKmph){
        return currentSpeedInKmph * 0.621371;
    }
    
    getSpeedThreshold(){
        return this._speedThreshold
    }
}

// Usage example:
const speedMonitor = new SpeedMonitor(10, new BNFSpeedSensor(), new IOTCloudCommunicator(), new Logger());
speedMonitor.monitor();
speedMonitor.monitor();
speedMonitor.monitor();
speedMonitor.monitor();
speedMonitor.monitor();
