/**
 * @fileoverview single entry in the pokemon list
 */

import React from 'react'
import { useNavigate } from "react-router-dom";
import '../css/PokeThumbnail.css'

import { alpha } from '@material-ui/core/styles/colorManipulator';
import { styled } from "@mui/material/styles";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { useSelector, useDispatch } from 'react-redux'
import { refreshLoaded } from './redux/pokemonSlice'

var typeIcons = require("../assets/exports.js").icons
var typeBgs = require("../assets/exports.js").lightColors
var getPokemonImgProp = require("./Globals.js").getPokemonImgProp
var globalVars = require("./Globals.js").vars

const CardContentNoPadding = styled(CardContent)(`
  padding: 0px;
  margin: 0px;
  &:last-child { padding-bottom: 0px; };
  justify-content: center;
  display: flex;
`);

// Helper to generate layout for the typing icons
function generateTypeIconJsx(info) {
  const result = [];
  const iconSize = 15;
  // Position on top and absolutely
  for (let i = 0; i < info.types.length; i++) {
    result.push(<CardContentNoPadding key={i}>
      <CardMedia
        component="img"
        image={typeIcons[info.types[i].type.name]}
        alt={`Type image: ${info.types[i].type.name}`}
        sx={{
          position: 'absolute', width: `${iconSize}%`,
          top: `${iconSize * i + 3}%`, right: '1%'
        }}
      />
    </CardContentNoPadding>)
  }
  return <div> {result} </div>
}

// Use React Router to visit the info page for a pokemon
function navPokemon(navigate, dispatch, info) {
  dispatch(refreshLoaded())
  navigate("/" + info.name, { state: info });
}

function PokeThumbnail(props) {
  const loading = useSelector((state) => state.pokemons.loading)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  // Styling based on typing
  let info = props.info
  let numTypes = info.types.length
  let typeBg = typeBgs[info.types[0].type.name]
  let typeBgSec = "#f7f7e8"
  if (numTypes > 1) {
    typeBgSec = typeBgs[info.types[numTypes - 1].type.name]
  }
  let divStyle = {}
  // Sequential fade in transition
  if (props.doTransition) {
    divStyle = {
      '--transition-delay':
        `${((info.id - 1) % globalVars.pokemonPerPage) * 100}ms`
    }
  }

  return (
    <section className='fade' tabIndex="0"
      onKeyDown={(event) => {
        if (event.key === "Enter") navPokemon(navigate, dispatch, info)
      }}
      onClick={() => {
        if (!loading) navPokemon(navigate, dispatch, info)
      }}
      style={divStyle}>
      <Card sx={{
        position: "relative",
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
        background: `linear-gradient(120deg, ${typeBg}, ${typeBgSec})`
      }}>
        <Box pl={1} pr={1}
          sx={{ display: "inline-block", borderRadius: '10px' }}>
          <Typography color={alpha("#FFFFFF", 0.8)}
            variant="caption"
            component="div">
            # {info.id}
          </Typography >
        </Box>
        {generateTypeIconJsx(info)}
        <Box pt={1} pb={1}>
          <CardContentNoPadding>
            <CardMedia
              component="img"
              image={getPokemonImgProp(info)}
              alt={info.name}
              style={{ width: '70%', backgroundColor: 'transparent' }}
            />
          </CardContentNoPadding>
        </Box>
        <CardContentNoPadding
          sx={{ backgroundColor: alpha("#AAAAAA", 0.5) }}>
          <Typography color={alpha("#FFFFFF", 0.9)} variant="caption"
            component="div" align="center">
            {info.name}
          </Typography >
        </CardContentNoPadding>
      </Card>
    </section>
  )
}

export default React.memo(PokeThumbnail);