// Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing.

// Inputs are two strings
// Output is true or false
function isSubsequence(str1, str2) {
    // Create two pointers starting at the beginning of both strings
    let pointer1 = 0;
    let pointer2 = 0;

    // Iterate over both strings while pointer1 and 2 are within the bounds of their respective strings
    while (pointer1 < str1.length && pointer2 < str2.length) {
        if (str1[pointer1] === str2[pointer2]) {
            pointer1++;
            pointer2++;
        } else {
            pointer2++
        }
    }
    // If pointer1 is equal to the length of str1, return true
    if (pointer1 === str1.length) {
        return true;
    }
    // not a subsequence, return false
    return false;
}
