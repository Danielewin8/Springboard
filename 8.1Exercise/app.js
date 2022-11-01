// doubleValues 

function doubleValues(arr, callback){
    newArr = []
    arr.forEach(function(val){
        newArr.push(val * 2);
    });
    return newArr;
};

// onlyEvenValues 

function onlyEvenValues(arr, callback){
    newArr = []
    arr.forEach(function(evens){
        if(evens % 2 === 0){
            newArr.push(evens);
        };
    });
        return newArr; 
};
    
// showFirstAndLast 

function showFirstAndLast(arr, callback){
    newArr = []
    arr.forEach(function(fl){
        newArr.push(fl[0] + fl[fl.length - 1]);
    });
    return newArr;
};

// addKeyAndValue 

function addKeyAndValue(arr, key, value){
    arr.forEach(function(val){
        val[key] = value;
    });
    return arr;
};

// vowelCount 

function vowelCount(str){
    var splitArr = str.toLowerCase().split("");
    var obj = {};
    var vowels = "aeiou";

    splitArr.forEach(function(letter){
        if(vowels.indexOf(letter) !== -1){
            if(obj[letter]){
                obj[letter]++;
            } else{
                obj[letter] = 1;
            }
        };
    });
    return obj;
};

// doubleValuesWithMap

function doubleValuesWithMap(arr){
    return arr.map(function(val){
        return val * 2;
    });
};

// valTimesIndex 
function valTimesIndex(arr){
    return arr.map(function(num, index){
        return num * index;
    });
};

// extractKey 
function extractKey(arr, key){
    return arr.map(function(keys){
        return keys[key];
    });
};

// extractFullName
function extractFullName(arr){
    return arr.map(function(name){
        return name.first + name.last 
    });
};

// filterByValue
function filterByValue(arr, key){
    return arr.filter(function(yes){
        return yes[key] !== undefined
    });
};

// find 
function find(arr, value){
    return arr.filter(function(match){
        if(match === value){
            return true;
        };
    });
};

// findInObj
function findInObj(arr, key, value){
    return arr.filter(function(found){
        if(found[key] === value){
            return true
        };
    });
};

// removeVowels 
function removeVowels(str) {
    const vowels = "aeiou";
    return str
      .toLowerCase()
      .split("")
      .filter(function(val){
        return vowels.indexOf(val) === -1;
      })
      .join("");
  };

// doubleOddNumbers
function doubleOddNumbers(arr) {
    return arr.filter(function(odds){
        return odds % 2 !== 0;
      })
      .map(function(odds) {
        return odds * 2;
      });
    };