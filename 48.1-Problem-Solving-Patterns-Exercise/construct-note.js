// Write a function called constructNote, which accepts two strings, a message and some letters. The function should return true if the message can be built with the letters that you are given; otherwise, it should return false.

// A function to create a simple frequency counter using an object
function makeFreqCounter(str) {
    const freqCounter = {};

    for (let el of str) {
        freqCounter[el] = (freqCounter[el] + 1) || 1;
    }
    return freqCounter;
}

// Inputs are two strings(the desired message, and the letters given)
// Output is True or False
function constructNote(msg, letters) {
    // First check that the letters string is either the same length or longer than the desired msg string, if shorter msg cannot be written, return false
    if (msg.length !== letters.length) {
        return false;
    }

    // Use freq counter for both strings to compare
    const msgCount = makeFreqCounter(msg)
    const lettersCount = makeFreqCounter(letters)

    // Iterate over keys, if there is a key in msg that is not in letters, return false
    for (let key in msgCount) {
        // check if key exists in lettersFreq, and check if count of a letter in msgCount is more, return false
        if (!(key in lettersCount) || msgCount[key] > lettersCount[key]) {
            return false;
        }
    }
    return true;
}
