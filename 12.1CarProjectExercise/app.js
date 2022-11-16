// Makes the class of Vehicle with two methods beep and toString.

class Vehicle {
    constructor(make, model, year){
        this.make = make,
        this.model = model,
        this.year = year;
    }
    beep(){
        return "Beep!";
    }
    toString(){
        return (`The vehicle is a ${this.make} ${this.model} from ${this.year} `);
    };   
}

// Makes a class of Car which inherits from Vehicle. Adds a property of numWheels to each instance 

class Car extends Vehicle{
    constructor(make, model, year){
        super(make, model, year);
        this.numWheels = 4;
    };
}

// Makes a class called Motorcycle which also inherits from Vehicle, but this time numWheels has a value of 2. An extra method called revEngine is added. 

class Motorcycle extends Vehicle{
    constructor(make, model, year){
        super(make, model, year);
        this.numWheels = 2;
    }
    revEngine(){
        return "VROOM!!!";
    };
}

// Makes a class called Garage, which will store an array and has a property called capacity. Added a method to add a vehicle, if the vehicle is not an instance of the previous class Vehicle, it is not a vehicle. If the capacity property is less than the length of the array of vehicles, the Garage is full. Otherwise a newVehicle can be added.

class Garage{
    constructor(capacity){
        this.vehicles = []
        this.capacity = capacity
    }
    addVehicle(newVehicle) {
        if (!(newVehicle instanceof Vehicle)) {
          return "Only vehicles are allowed in here!";
        }
        if(this.vehicles.length >= capacity) {
            return "Sorry we're full!";
        }
        this.vehicles.push(newVehicle);
            return "Vehicle added!";
    };
}