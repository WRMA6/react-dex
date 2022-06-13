/**
 * @fileoverview Component for the list of loaded pokemon
 */

import React from 'react'
import PokeThumbnail from './PokeThumbnail';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { useSelector, } from 'react-redux'

function getFilteredList(list, filter) {
  if (filter === "") return list
  return list.filter(pokemon => pokemon.name.includes(filter))
}

function PokeList() {
  const pokemons = useSelector((state) =>
    getFilteredList(state.pokemons.list, state.pokemons.filter))
  const numLoaded = useSelector((state) => state.pokemons.numLoaded)

  return (
    <div style={{ paddingTop: "2%" }}>
      <Container maxWidth="md">
        <Grid container spacing={{ xs: 3 }}>
          {pokemons.map(p => (
            <Grid item xs={4} sm={3} l={2} xl={1} key={p.name}>
              <PokeThumbnail info={p} doTransition={p.id > numLoaded} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export default React.memo(PokeList);