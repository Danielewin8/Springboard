// Write a function called twoArrayObject which accepts two arrays of varying lengths.The first array consists of keys and the second one consists of values. Your function should return an object created from the keys and values. If there are not enough values, the rest of keys should have a value of null. If there are not enough keys, just ignore the rest of values.

function twoArrayObject(arr1, arr2) {
    // Create an empty object
    const resultObj = {};
    
    // Iterate over the first array
    for (let i = 0; i < arr1.length; i++) {
      // If there are not enough values, set the values to null
      const value = i < arr2.length ? arr2[i] : null;
  
      // Create a key-value pair in the result object
      resultObj[arr1[i]] = value;
    }  
    return resultObj;
  }
  