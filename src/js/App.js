/**
 * @fileoverview Default route for the app
 * 
 * Displays the list of loaded pokemon and a searchbar
 */

import { useState, useEffect } from 'react';

import PokeList from './PokeList';
import Searchbar from './Searchbar';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useSelector, useDispatch } from 'react-redux'
import { append, setNextPage, toggleLoad } from './redux/pokemonSlice'

var pokeApi = require("./Globals.js").pokeApi

// Create single typography theme
const theme = createTheme({
  typography: {
    fontFamily: 'Staatliches',
    caption: {
      fontSize: 18
    }
  }
});

// Get the names of the next 20 pokemon in the pokedex
function getNextPokemon(nextPage, dispatch,
  setPokemonToLoad) {
  if (!nextPage) return null
  dispatch(toggleLoad())
  fetch(nextPage)
    .then(response => response.json())
    .then((data) => {
      dispatch(setNextPage(data.next))
      setPokemonToLoad(data.results.map(p => p.name))
    })
}

// Get the info for the newly loaded pokemon names
async function getPokemonInfo(pokemonToLoad,
  setPokemonToLoad, dispatch) {
  // Async batch results to save time
  let results = await Promise.all(pokemonToLoad.map(p =>
    fetch(pokeApi + p)
      .then(response => response.json())
  ))
  dispatch(append(results))
  setPokemonToLoad([])
  dispatch(toggleLoad())
}

function App() {
  const [pokemonToLoad, setPokemonToLoad] = useState([])

  const pokemons = useSelector((state) => state.pokemons.list)
  const nextPage = useSelector((state) => state.pokemons.nextPage)
  const loading = useSelector((state) => state.pokemons.loading)
  const dispatch = useDispatch()

  // Initial render: load first 20 pokemon
  useEffect(() => {
    if (pokemons.length === 0) {
      getNextPokemon(nextPage, dispatch, setPokemonToLoad)
    }
    // eslint-disable-next-line
  }, [])

  // Update state when async fetches finish
  useEffect(() => {
    if (pokemonToLoad.length === 0) return
    getPokemonInfo(pokemonToLoad,
      setPokemonToLoad, dispatch)
  }, [pokemonToLoad, dispatch])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Searchbar></Searchbar>
        <PokeList />
        <Stack direction="row" justifyContent="center"
          sx={{ pt: 3, pb: 2 }}>
          {<Button pt={4} disabled={loading} variant="outlined"
            sx={{ fontFamily: 'Staatliches' }}
            onClick={() => getNextPokemon(
              nextPage, dispatch, setPokemonToLoad)}>
            Load More Pokemon
          </Button>}
        </Stack>
      </ThemeProvider>
    </div>
  );
}

export default App;
