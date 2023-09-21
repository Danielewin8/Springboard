// Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.

// A function to create a simple frequency counter using an object
function makeFreqCounter(str) {
    const freqCounter = {};

    for (let el of str) {
        freqCounter[el] = (freqCounter[el] + 1) || 1;
    }
    return freqCounter;
}

// Inputs will be two positive integers
// Output will be true or false

function sameFrequency(num1, num2) {
    // Check first that both inputs are positive integers, if not return false
    if (num1 < 0 || num2 < 0) {
        return false;
    }

    // Convert nums to strings
    const str1 = num1.toString();
    const str2 = num2.toString();

    // Check if the lengths of the two strings are the same, if not return false
    if (str1.length !== str2.length) {
        return false;
    }

    // Then make a freqCounter of both integers
    const num1Freq = makeFreqCounter(str1);
    const num2Freq = makeFreqCounter(str2);

    // Compare and check if the digits in the first number exist in the second number, if not return false
    for (let key in num1Freq) {
        if (!(key in num2Freq)) {
            return false
        }
        // Then check if the counts are the same, if not return false
        if (num1Freq[key] !== num2Freq[key]) {
            return false
        }
    }
    // Return true if all checks pass
    return true;
}
