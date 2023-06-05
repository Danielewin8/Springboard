import logo from './logo.svg';
import './App.css';
import answers from './Answers';
import EightBall from './Eightball';

function App() {
  return (
    <EightBall answers={answers} />
  )
}



export default App;
