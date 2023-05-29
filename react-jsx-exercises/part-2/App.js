const App = () => (
    <div>
        <Tweet username="User1" name="Bob" date={new Date().toDateString()}
        message= "This is Bob's first tweet!" />
        <Tweet username="User2" name="Bobby" date={new Date().toDateString()}
        message= "This is Bobby's second tweet!" />
        <Tweet username="User3" name="Bobalina" date={new Date().toDateString()}
        message= "This is Bobalina's third tweet!" />
    </div>
)

ReactDOM.render(<App />, document.getElementById("root"))