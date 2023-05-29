const Person = ({name, age, hobbies}) => {
        let reply;

        if(age > 18) {
            reply = "Please go vote!"
        } else {
            reply = "You must be 18!"
        }

        return (
            <div>
                <p>Learn some information about this person!</p>
                <h2>Name: {name.slice(0,6)}</h2>
                <h3>Age: {age}. {reply}</h3>
                <h4>Hobbies: </h4>
                <ul>  
                    {hobbies.map(hobby => <li> {hobby} </li>)}
                </ul>
            </div>
        )
}