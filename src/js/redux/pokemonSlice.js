/**
 * @fileoverview Redux slice for pokemon list related state
 */

import { createSlice } from '@reduxjs/toolkit'

var globalVars = require("../Globals").vars
var pokeApi = require("../Globals.js").pokeApi

export const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState: {
    list: [],
    filter: "",
    filteredList: [],
    nextPage: pokeApi + `?offset=0&limit=${globalVars.pokemonPerPage}`,
    loading: false,
    // Tells pokemon list items if they should fade in (ie. first render)
    numLoaded: 0,
  },
  reducers: {
    append: (state, action) => {
      state.list = [...state.list, ...action.payload]
    },
    filter: (state, action) => {
      state.filter = action.payload
      state.numLoaded = state.list.length
    },
    setNextPage: (state, action) => {
      state.nextPage = action.payload
    },
    toggleLoad: (state, action) => {
      state.loading = !state.loading
    },
    refreshLoaded: (state, action) => {
      state.numLoaded = state.list.length
    },
  },
})

export const { append, filter, setNextPage,
  toggleLoad, refreshLoaded } = pokemonSlice.actions

export default pokemonSlice.reducer