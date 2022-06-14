/**
 * @fileoverview Component for the list of loaded pokemon
 */

import React from 'react'
import PokeThumbnail from './PokeThumbnail';

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
      <Grid container spacing={{ xs: 3 }}
        sx={{ paddingLeft: "5%", paddingRight: "5%" }}>
        {pokemons.map(p => (
          <Grid item xs={4} sm={3} lg={2} xl={1} key={p.name}>
            <PokeThumbnail info={p} doTransition={p.id > numLoaded} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default React.memo(PokeList);