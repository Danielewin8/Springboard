// Product of Nums

function product(nums, idx = 0) {
    if(idx === nums.length) {
        return 1;
    } else
    return nums[idx] * product(nums, idx + 1);
}

// Longest Word 

function longestWord(words, idx = 0, longest = 0) {
    if (idx === words.length) {
        return longest;
    } else {
        longest = Math.max(words[idx].length, longest);
        return longestWord(words, idx + 1, longest);
    }
}

// Every Other Character

function everyOther(char, idx = 0, newChar = "") {
    if (idx >= char.length) {
        return newChar;
    } else {
        newChar += char[idx];
        return everyOther(char, idx + 2, newChar);
    }
}

// Is Palindrome

function isPalindrome(str, idx = 0) {
    let leftIdx = idx;
    let rightIdx = str.length - idx - 1;

    if (leftIdx >= rightIdx) {
        return true;
    } else if (str[leftIdx] !== str[rightIdx]) {
        return false;
    } else {
        return isPalindrome(str, idx + 1)
    }      
}

//  Find Index

function findIdx(arr, val, idx = 0) {
    if (idx === arr.length) {
        return null;
    } else if (arr[idx] === val) {
        return idx;
    } else {
        return findIdx(arr, val, idx + 1);
    }
}

// Reverse String

function reverse(str, idx = 0, newStr = "") {
    if (newStr.length === str.length) {
        return newStr;
    } else {
        newStr += str[str.length - 1 - idx];
        return reverse(str, idx + 1, newStr);
    } 
}

// Gather Strings

function gatherStrings(obj) {
    let stringArr = [];
    for (let key in obj) {
      if (typeof obj[key] === "string") stringArr.push(obj[key]);
      if (typeof obj[key] === "object") stringArr.push(...gatherStrings(obj[key]));
    }
    return stringArr;
  }