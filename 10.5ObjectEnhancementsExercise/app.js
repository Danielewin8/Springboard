// Same Keys and Values 

function createInstructor(firstName, lastName){
    return{
        firstName,
        lastName
    }
}

// Computed Property Names 

let favoriteNumber = 42;

// const instructor = {
//     firstName: "Colt",
//     [favoriteNumber]: "That is my favorite!"
// }

// Object Methods 

const instructor = {
    firstName: "Colt",
    sayHi() {
        return "Hi!"
    },
    sayBye() {
        return this.firstName + " says bye!"
    }
}

// createAnimal function 

function createAnimal(animal, verb, noise){
    return {
        animal,
        [verb](){
            return noise;
        }
    }
}