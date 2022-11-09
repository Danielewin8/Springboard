// function filterOutOdds() {
//     var nums = Array.prototype.slice.call(arguments);
//     return nums.filter(function(num) {
//       return num % 2 === 0
//     });
//   }

const filterOutOdds = (...arguments) => {
        arguments.filter(num => num % 2 === 0)
} 

// findMin

const findMin = (...args) => {
    Math.min(...args)
}

// mergeObjects 

// const ObjectOne = {}
// const ObjectTwo = {}

const mergeObjects = (objectOne, objectTwo) =>
    ({...objectOne, ...objectTwo})

// doubleAndReturnArgs

const doubleAndReturnArgs = (arr, ...args) => {
    [arr, ...args.map(num => num * 2)]
}

// Unsure about how this one works ^ 

// Slice and Dice 

const remove = items => {
    const index = Math.floor(Math.random() * items.length);
    return[...items.slice(0,index), ...items.slice(index + 1)]
}

const extend = (array1, array2) => {
    [...array1, ...array2]
}

const removeKey = (obj, key) => {
    const newObj = {...obj}
    delete newObj[key]
    return newObj
}

const combine = (obj1, obj2) => {
    ({ ...obj1, ...obj2})
}

const update = (obj, key, val) => {
    let newObj = {...obj}
    newObj[key] = val;
    return newObj
}