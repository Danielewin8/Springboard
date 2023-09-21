// Given an array of integers, and a number, find the number of pairs of integers in the array whose sum is equal to the second parameter. You can assume that there will be no duplicate values in the array.

// Inputs are the array of nums and a matching integer after finding a pair
// Output is the number of pairs
function countPairs(arr, int) {
    arr.sort((a, b) => a - b);
    // Create two pointers starting at the beginning and end of the array
    let left = 0;
    let right = arr.length - 1;
    // Create a pairs variable to track the total of pairs
    let pairs = 0;

    // Iterate over the array while left is less than right
    while (left < right) {
        const sum = arr[left] + arr[right];
        // Check if sum is equal to int
        if (sum === int) {
            pairs++;
            left++;
            right--;
        } else if (sum < int) {
            left++;
        } else {
            right--; // Fix this line to decrement the right pointer
        }
    }
    // Return the total number of found pairs
    return pairs;
}



countPairs([3, 1, 5, 4, 2], 6) // 2 (1,5 and 2,4)