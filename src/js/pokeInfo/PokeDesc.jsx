/**
 * @fileoverview Implements layout component for Pokemon descriptions
 */

import React from 'react'
import { useState, useEffect } from 'react';
import Label from './Label';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

var pokeApiBase = require("../Globals.js").pokeApiBase
var typeColors = require("../../assets/exports.js").colors
var capitalize = require("../Globals.js").capitalize


// Async fetch of pokemon species, given a pokemon
async function getSpeciesInfo(info, setSpecies) {
  let results = await fetch(pokeApiBase + "pokemon-species/" + info.id)
    .then(response => response.json())
  let species = {
    base_happiness: results.base_happiness,
    capture_rate: results.capture_rate,
    growth_rate: capitalize(results.growth_rate.name),
  }
  // Replace non-text characters with spaces, and properly capitalize
  let englishEntries = results.flavor_text_entries.filter(
    (r) => { return r.language.name === 'en' })
  species.descText = capitalize(englishEntries[0].flavor_text
    .replace("\n", " ").replace("\f", " "))
  setSpecies(species)
}

function PokeDesc({ info, screenSize }) {
  const [species, setSpecies] = useState({})

  // Percent widths for different screen sizes
  let widths = [90, 45, 25]

  let heightString = `${info.height / 10} m`
  if (info.height < 10) heightString = `${info.height * 10} cm`
  let weightString = `${info.weight / 10} kg`
  if (info.weight < 10) weightString = `${info.weight * 100} g`

  useEffect(() => {
    getSpeciesInfo(info, setSpecies)
    // eslint-disable-next-line
  }, [])

  return (<Stack role="list" pt={3} pb={3} spacing={3}
    sx={{ width: `${widths[screenSize]}%` }}>
    <Box role="listitem">
      <Stack mt={1} spacing={2} direction={"row"}
        sx={{ alignItems: "center" }}>
        <Typography>
          TYPING:
        </Typography>
        {info.types.map(t => (<Typography variant="caption"
          pl={1} pr={1} color={"white"}
          bgcolor={typeColors[t.type.name]} key={t.type.name}
          sx={{ borderRadius: '5px', display: "inline-block" }}>
          {t.type.name.toUpperCase()}</Typography>))}
      </Stack>
    </Box>
    <Box role="listitem">
      <Typography mt={1} mb={1}>
        DESCRIPTION:
      </Typography>
      <Typography variant="body2" ml={1}>
        {species.descText}
      </Typography>
    </Box>
    <Label label={"WEIGHT:"} value={weightString} />
    <Label label={"HEIGHT:"} value={heightString} />
    <Box role="listitem">
      <Typography mt={1} mb={1}>
        ABILITIES:
      </Typography >
      {info.abilities.map(a => (<Typography variant="body2" ml={1}
        key={a.ability.name}>{capitalize(a.ability.name) +
          (a.is_hidden ? " (Hidden)" : "")}</Typography>))}
    </Box>
    <Label label={"BASE HAPPINESS:"} value={species.base_happiness} />
    <Label label={"CAPTURE RATE:"} value={species.capture_rate} />
    <Label label={"GROWTH RATE:"} value={species.growth_rate} />
  </Stack>)
}

export default React.memo(PokeDesc);