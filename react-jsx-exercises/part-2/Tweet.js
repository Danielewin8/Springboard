const Tweet = (props) => {
    return (
        <div>
            <span><b>{props.name}</b> </span>

            <span>@{props.username} </span>
            
            <p><b>{props.date}: </b>{props.message}</p>
        </div>    
    )
}