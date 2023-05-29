const App = () => (
    <div>
        <Person name="Bob" age={19} hobbies= {["Running", "Eating", "Jumping"]} />
        <Person name="Bobby" age={17} hobbies= {["Swimming", "Eating", "Diving"]}/>
        <Person name="Bobalina" age={20} hobbies= {["Dancing", "Eating", "Singing"]}/>
    </div>
)

ReactDOM.render(<App />, document.getElementById("root"))