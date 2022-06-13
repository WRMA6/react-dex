/**
 * @fileoverview Custom label-value component
 */

import React from 'react'

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


function Label({ label, value }) {
  return (<Stack role="listitem" mt={1} spacing={1} direction={"row"} >
    <Typography>
      {label}
    </Typography >
    <Typography color="gray">
      {value}
    </Typography>
  </Stack>)
}

export default Label;