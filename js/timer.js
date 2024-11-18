class Timer {
    constructor(duration, display) {
        this.duration = duration;
        this.display = display;
        this.running = false;
        this.remainingTime = duration;
    }

    start(callback) {
        if (this.running) return;
        
        this.running = true;
        const startTime = Date.now();
        const initialTime = this.remainingTime;

        this.interval = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            this.remainingTime = initialTime - elapsedTime;

            if (this.remainingTime <= 0) {
                this.stop();
                callback();
            }

            this.display.textContent = this.remainingTime;
        }, 100);
    }

    stop() {
        clearInterval(this.interval);
        this.running = false;
    }

    reset() {
        this.stop();
        this.remainingTime = this.duration;
        this.display.textContent = this.duration;
    }
}
