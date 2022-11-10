// My answers are commented for problems 1-6, wjat is being returned or printed?

// 1. Object Destructuring 1 

let facts = {numPlanets: 8, yearNeptuneDiscovered: 1846};
let {numPlanets, yearNeptuneDiscovered} = facts;

console.log(numPlanets); 
// Would print 8
console.log(yearNeptuneDiscovered); 
// Would print 1846

// 2. Object Destructuring 2 

let planetFacts = {
    numPlanets2: 8,
    yearNeptuneDiscovered: 1846,
    yearMarsDiscovered: 1659
  };
  
  let {numPlanets2, ...discoveryYears} = planetFacts;

console.log(discoveryYears);
//   Would print {yearNeptuneDiscovered:1846, yearMarsDiscovered:1659} due to the rest operator
  
// 3. Object Destructuring 3

function getUserData({firstName, favoriteColor="green"}){
    return `Your name is ${firstName} and you like ${favoriteColor}`;
  }

getUserData({firstName: "Alejandro", favoriteColor: "purple"});
//   Would return 'Your name is Alejandro and you like purple'
getUserData({firstName: "Melissa"});
// Would return 'Your name is Melissa and you like green'
getUserData({});
// Would return 'Your name is undefined and you like green'; No value set to firstname but green remains

// 4. Array Destructuring 1

let [first, second, third] = ["Maya", "Marisa", "Chi"];

// Returns in order 
console.log(first);
// Would print 'Maya'
console.log(second);
// Would print 'Marisa'
console.log(third);
// Would print 'Chi'

// 5. Array Destructuring 2

let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
    "Raindrops on roses",
    "whiskers on kittens",
    "Bright copper kettles",
    "warm woolen mittens",
    "Brown paper packages tied up with strings"
  ]

console.log(raindrops);
// Would print 'Raindrops on roses'
console.log(whiskers);
// Would print 'whiskers on kittens'
console.log(aFewOfMyFavoriteThings);
// Would print the remaining three in an array ["Bright copper kettles","warm woolen mittens","Brown paper packages tied up with strings"]

// 6. Array Destructuring 3

let numbers = [10, 20, 30];
[numbers[1], numbers[2]] = [numbers[2], numbers[1]]

console.log(numbers);
// Would print [10,30,20], Index 1 and 2 are swapped

// 7. ES5 Assigning Variables to Object Properties, write a ES2015 version

var obj = {
    numbers: {
      a: 1,
      b: 2
    }
  };
  
  var a = obj.numbers.a;
  var b = obj.numbers.b;

// New version
  const { numbers: { a, b }} = obj

// 8. ES5 Array Swap, write a ES2015 version

var arr = [1, 2];
var temp = arr[0];
arr[0] = arr[1];
arr[1] = temp;

// New swap
[arr[1], arr[0]] = [arr[0], arr[1]]

// 9. raceResults()

const raceResults = ([first, second, third, ...others]) => ({first, second, third, others})