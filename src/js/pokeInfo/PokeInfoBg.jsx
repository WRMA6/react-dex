/**
 * @fileoverview Background theme component for PokeInfo component
 */

import React from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { ThemeProvider, createTheme } from "@mui/material/styles";

var typeIcons = require("../../assets/exports.js").icons
var typeColors = require("../../assets/exports.js").colors

function PokeInfoBg({ props }) {
  let { info, typeBg, typeBgSec, percentSize, navigate } = props
  let result = []
  // Back button custom theme
  const buttonTheme = createTheme({
    palette: {
      primary: {
        main: typeColors[info.types[0].type.name],
        contrastText: "#fff"
      },
    },
  });

  // Type images
  for (let i = 0; i < info.types.length; i++) {
    let styleObj = {
      "--type-color": i === 0 ? typeBg : typeBgSec,
      width: `${percentSize}%`,
    }
    if (i === 0) {
      styleObj["left"] = "0"
      styleObj["transform"] = "translate(-40%, 0)"
    }
    else {
      styleObj["right"] = "0"
      styleObj["transform"] = "translate(40%, 0)"
    }
    result.push(<Box key={i}
      className="type-emblem"
      component="img"
      src={typeIcons[info.types[i].type.name]}
      alt={`Type image: ${info.types[i].type.name}`}
      sx={styleObj}
    />)
  }

  // Back button
  result.push(<ThemeProvider key={"backButton"} theme={buttonTheme}>
    <Button pt={4} variant="contained"
      sx={{ fontFamily: 'Staatliches', left: "1vw", top: "1vw" }}
      onClick={() => navigate(-1)}>
      Return to main page
    </Button></ThemeProvider>)

  return (<div className="info-bg"
    style={{ '--type-bg': `${typeBg}`, '--type-bg-sec': `${typeBgSec}` }}>
    {result}
  </div>)
}

export default React.memo(PokeInfoBg);