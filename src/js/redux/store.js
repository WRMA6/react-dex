/**
 * @fileoverview Redux store for state
 */

import { configureStore } from '@reduxjs/toolkit'
import pokemonListReducer from './pokemonSlice'

export default configureStore({
  reducer: {
    pokemons: pokemonListReducer,
  },
  // ~80% reduction in render time without this middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})