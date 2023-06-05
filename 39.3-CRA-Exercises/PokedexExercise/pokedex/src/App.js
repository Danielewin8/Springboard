import './App.css';
import pokemon from './pokemon';
import PokeDex from './Pokedex';


function App() {
  return (
    <div>
      <h1 className='title'>Pokedex</h1>
      <PokeDex pokemon={pokemon}/>
    </div>
  );
}

export default App;
