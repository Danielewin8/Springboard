function unroll(squareArray) {
    let unrolled = [];
    while (squareArray.length) {
      // Move right
      unrolled = unrolled.concat(squareArray.shift());
  
      // Move down
      for (let i = 0; i < squareArray.length; i++) {
        unrolled.push(squareArray[i].pop());
      }
  
      // Move left
      if (squareArray.length) {
        unrolled = unrolled.concat(squareArray.pop().reverse());
      }
  
      // Move up
      for (let i = squareArray.length - 1; i >= 0; i--) {
        unrolled.push(squareArray[i].shift());
      }
    }
    return unrolled;
  }  

module.exports = unroll;
