/**
 * @fileoverview Component for a single pokemon stat
 */

import React from 'react'
import '../../css/PokeInfo.css'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Maximum of each stat
const maxStats = {
  "hp": 255,
  "attack": 181,
  "defense": 230,
  "special-attack": 180,
  "special-defense": 230,
  "speed": 200,
  "total": 720
}

// Custom scale function for stat visual
function getScaleFactor(name, value) {
  let factor = value / maxStats[name]
  if (name === "total") factor **= 1.6
  return factor
}

// Calculate custom bar width for stat value
function getBarWidth(name, value) {
  // Make smaller bars a bit bigger
  const factor = getScaleFactor(name, value)
  return (factor + factor ** 0.7) * 50
}

// Compute bar colour given stat value
function getBarColour(name, value) {
  const thresholds = [0.2, 0.35, 0.5, 0.65, 0.8, 2]
  const colours = ["#ed1c1c", "#f28f16", "#ffe83b",
    "#21d121", "#80fc42", "#1bf1f5"]
  const factor = getScaleFactor(name, value)
  let colourInd = 0
  while (factor > thresholds[colourInd]) colourInd++
  return colours[colourInd]
}


function StatBar({ name, value }) {
  let displayName = name.replace("-", " ").toUpperCase()
  let barColour = getBarColour(name, value)

  return (<Box role="listitem">
    <Typography>{`${displayName}:`}</Typography>
    <Typography variant="body2">{value}</Typography>
    <Box className="stat-bar">
      <div style={{
        "--bar-width": `${getBarWidth(name, value)}%`,
        "--bar-colour": barColour,
      }} className="stat">
      </div>
    </Box>
  </Box>
  )
}

export default React.memo(StatBar);