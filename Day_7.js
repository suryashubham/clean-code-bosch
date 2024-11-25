class Action {
    performAction() {
        throw "performAction() should be implemented";
    }
}

class Spinner extends Action {
    performAction() {
        console.log("Spinning...");
    }
}

class Slider extends Action {
    performAction() {
        console.log("Sliding...");
    }
}

class Hopper extends Action {
    performAction() {
        console.log("Hopping...");
    }
}

class Icon {
    constructor(value) {
        this.speed = 0;
        this.glow = 0;
        this.energy = 0;
        this.x = 0;
        this.y = 0;
        this.setStrategy(value);
    }

    setStrategy(subtype) {
        switch (subtype) {
            case 1:
                this.strategy = new Spinner();
                break;
            case 2:
                this.strategy = new Slider();
                break;
            case 3:
                this.strategy = new Hopper();
                break;
            default:
                throw "Unknown subtype";
        }
    }

    move() {
        this.strategy.performAction();
    }
}

const spinnerIcon = new Icon(1);
spinnerIcon.move(); 

const sliderIcon = new Icon(2); 
sliderIcon.move();

const hopperIcon = new Icon(3);
hopperIcon.move();
