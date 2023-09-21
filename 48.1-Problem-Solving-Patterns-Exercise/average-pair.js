// Write a function called averagePair. Given a sorted array of integers and a target average, determine if there is a pair of values in the array where the average of the pair equals the target average. There may be more than one pair that matches the average target.

// inputs are the sorted array, and a target average
// output will be true or false
function averagePair(arr, avg) {
    // Create two variable pointers, left and right indicating the start and finish of the array
    let left = 0;
    let right = arr.length - 1;

    // Iterate over array while left is less than right, then find the current average
    while (left < right) {
        const currentAvg = (arr[left] + arr[right]) / 2;
        // Compare currentAvg to target avg, if equal, return true
        if (currentAvg === avg) {
            return true;
            // While currentAvg is less than target avg, this means we need to consider larger values, increment left by one
        } else if (currentAvg < avg) {
            left++
            // Otherwise if currentAvg is greater than target avg, this means we need to consider smaller values, decrement right by one
        } else {
            right--
        }
    }
    // If no pair is found
    return false;
}
