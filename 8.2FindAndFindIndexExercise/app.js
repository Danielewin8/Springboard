const users = [
    {username: 'mlewis'},
    {username: 'akagen'},
    {username: 'msmith'}
  ];

// findUserByUsername 

function findUserByUsername(arr, name) {
    arr.find(function(user){
        return user.name === name
    });
};

// removeUser 

function removeUser(arr, name){
    let Idx = arr.findIndex(function(user){
        return user.name === name;
    });
    if(Idx === -1) return;
        return arr.splice(Idx, 1) [0];
};