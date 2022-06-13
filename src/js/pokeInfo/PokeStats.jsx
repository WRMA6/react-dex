/**
 * @fileoverview Implements layout component for pokemon stats
 */

import React from 'react'
import StatBar from './StatBar';

import Stack from '@mui/material/Stack';


function PokeStats({ info, screenSize }) {
  // Percent widths for different screen sizes
  let widths = [90, 45, 25]

  // Calculate and display total stats as well
  let totalStats = info.stats.reduce((s, stat) => s + stat.base_stat, 0)

  return (<Stack role="list" spacing={4} pr={2} pt={3} pb={3}
    sx={{ width: `${widths[screenSize]}%` }}>
    {info.stats.map(s => (<StatBar key={s.stat.name} name={s.stat.name}
      value={s.base_stat} />))}
    <StatBar name={"total"} value={totalStats} />
  </Stack>)
}

export default React.memo(PokeStats);