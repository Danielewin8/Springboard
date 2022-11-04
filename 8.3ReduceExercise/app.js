// extractValue 

function extractValue(arr, key){
    return arr.reduce(function(accum, val){
        accum.push(val[key]);
        return accum;
    },[]);
}; 

// vowelCount

function vowelCount(str){
    const vowels = 'aeiou';
    return str.split('').reduce(function(accum, val){
        let lowerCased = val.toLowerCase()
        if(vowels.indexOf(lowerCased) !== -1){
            if(accum[lowerCased]){
                accum[lowerCased]++;
            } else {
                accum[lowerCased] = 1;
            }
        }
        return accum;
    },{});
};

// addKeyAndValue

function addKeyAndValue(arr, key, value){
    return arr.reduce(function(accum,val,idx){
        accum[idx][key] = value;
        return accum;
    },arr);
};

// partition 

function partition(arr, cb){
    return arr.reduce(function(accum,val){
        if(cb(next)){
            accum[0].push(val);
        } else {
            accum[1].push(val);
        }
        return accum;
    }, [[],[]]);
};