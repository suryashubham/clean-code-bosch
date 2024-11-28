class SpeedMonitor {
    constructor(speedThreshold, speedSensorInstance, logger, cloudCommunicatorInstance) {
        this._speedThreshold = speedThreshold;
        this._speedSensorInstance = speedSensorInstance;
        this._logger = logger;
        this._cloudCommunicatorInstance = cloudCommunicatorInstance;
    }

    monitor() {
        if (this._speedThreshold < 1 || this._speedThreshold > 100) {
            this._logger.write(`_speedThreshold value must be in the range {1-100} ${this._speedThreshold}`);
        }

        let currentSpeedInKmph = this._speedSensorInstance.getCurrentSpeed();
        this._logger.write(`Current Speed In Kmph ${currentSpeedInKmph}`);

        if (currentSpeedInKmph > this._speedThreshold) {
            let mph = currentSpeedInKmph * 0.621371;
            let message = `Current Speed in Miles ${mph}`;
            let statusCode = this._cloudCommunicatorInstance.pushMessage(message);
            if (statusCode > 400) {
                // Log Message to Console
                this._logger.write(`Error In Communication Unable to Contact Server ${message}`);
            }
        }
    }
}
