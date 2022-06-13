/**
 * @fileoverview compilation of global variables/functions
 */

exports.vars = {
  'pokemonPerPage': 20
}

exports.pokeApiBase = 'https://pokeapi.co/api/v2/'
exports.pokeApi = exports.pokeApiBase + 'pokemon/'

exports.getPokemonImgProp = (obj) => {
  // Get the url to the proper sprite version given pokemon info
  return obj.sprites.other['official-artwork'].front_default
}

exports.capitalize = (str) => {
  // Captialize only first letters of sentences
  let arr = str.split("")
  for (let i = 0; i < str.length; i++) {
    if (!arr[i].match(/\p{General_Category=Letter}/gu)) continue
    if (i === 0 || (i > 1 && arr[i - 2] === ".")) {
      arr[i] = arr[i].toUpperCase()
    }
    else {
      arr[i] = arr[i].toLowerCase()
    }
  }
  return arr.join("")
}