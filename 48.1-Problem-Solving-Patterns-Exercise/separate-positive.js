// Write a function called separatePositive which accepts an array of non-zero integers. Separate the positive integers to the left and the negative integers to the right. The positive numbers and negative numbers need not be in sorted order. The problem should be done in place (in other words, do not build a copy of the input array).

function separatePositive(arr) {
    // Create two variable pointers, left and right indicating the start and finish of the array
    let left = 0;
    let right = arr.length - 1;

    // Loop over while left is less than or equal to the right
    while(left <= right) {
        // Check if the element at left is positive, if it is leave it as is and increment left
        if (arr[left] > 0) {
            left++;
        // If negative swap it with the right element, and then decrement right
        } else {
            [arr[left], arr[right]] = [arr[right], arr[left]]
            right--;
        }
    }
    // Return newly sorted array
    return arr;
}


