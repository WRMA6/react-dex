/**
 * @fileoverview search bar at root route
 */

import React from 'react'

import AppBar from '@mui/material/AppBar'
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { useSelector, useDispatch } from 'react-redux'
import { filter } from './redux/pokemonSlice'

var pokemonLogo = require("../assets/exports.js").pokemonLogo

function Searchbar() {
  const filterString = useSelector((state) => state.pokemons.filter)
  const dispatch = useDispatch()

  // Use MUI-provided AppBar and Autocomplete
  return (
    <AppBar sx={{ bgcolor: "#ffda69" }} position="sticky">
      <Stack direction="row" justifyContent="space-between" spacing={4}
        ml={2} mr={4} p={2}>
        <Box component="img" src={pokemonLogo} sx={{
          maxHeight: "3rem", maxWidth: "30%", objectFit: "contain"
        }} />
        <Autocomplete
          freeSolo={true}
          onInputChange={(event, newValue) => {
            dispatch(filter(newValue))
          }}
          value={filterString}
          options={[]}
          getOptionLabel={(p) => p}
          renderInput={(params) => <TextField {...params}
            label="Search for a Pokemon..." />}
          sx={{ width: "100%" }}
        ></Autocomplete>
      </Stack>
    </AppBar>
  )
}

export default React.memo(Searchbar);