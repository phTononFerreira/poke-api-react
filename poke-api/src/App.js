import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([])

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    async function loadApi(pokemonQtd) {
      let pokemons = []
      for (let id = 1; id <= pokemonQtd; id++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`
        const response = await fetch(url);
        const data = await response.json();
        pokemons.push(data);
      }
      setPokemons(pokemons);
    }
    console.log(pokemons)
    loadApi(150)
  }, [])

  return (
    <div className="app">
      <div className="title">
        <img width="150px" src="https://www.freeiconspng.com/thumbs/pokeball-png/file-pokeball-png-0.png"/>
        <h1>Poke API</h1>
        <span>by pH</span>
      </div>
      <div className="grade">
        {pokemons.map((p, index) => {
          return (
            <div className="pokemon" key={index}>
              <img alt={p.name + " sprite"} src={p.sprites.front_default} />
              <p className='highlight'>[{p.id}] {capitalizeFirstLetter(p.name)}</p>
              <span className='highlight'>Types: {p.types.map(t => capitalizeFirstLetter(t.type.name)).toString().replace(",", " ")}</span>
              <div className="stats">
                <span className='stat'>HP: {p.stats[0].base_stat}</span>
                <span className='stat'>ATTACK: {p.stats[1].base_stat}</span>
                <span className='stat'>DEFENSE: {p.stats[2].base_stat}</span>
                <span className='stat'>SPEED: {p.stats[5].base_stat}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
