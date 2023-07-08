function addCommas(num) {
    const numString = num.toString();
    let result = '';
  
    for (let i = numString.length - 1, count = 0; i >= 0; i--, count++) {
      if (count !== 0 && count % 3 === 0) {
        result = ',' + result;
      }
      result = numString[i] + result;
    }
  
    return result;
}

module.exports = addCommas;