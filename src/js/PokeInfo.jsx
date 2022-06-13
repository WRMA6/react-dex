/**
 * @fileoverview top-level component that displays info for a given pokemon
 */

import $ from 'jquery';
import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import PokeDesc from './pokeInfo/PokeDesc';
import PokeInfoBg from './pokeInfo/PokeInfoBg';
import PokeStats from './pokeInfo/PokeStats';

import { styled } from "@mui/material/styles";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { ThemeProvider, createTheme } from "@mui/material/styles";

var typeBgs = require("../assets/exports.js").lightColors
var pokeballBg = require("../assets/exports.js").pokeballBg
var getPokemonImgProp = require("./Globals.js").getPokemonImgProp

const CardContentNoMargin = styled(CardContent)(`
  padding: 0px;
  margin: 0px;
  &:last-child { padding-bottom: 0px; };
`);

// Typography theme for this route
const theme = createTheme({
  typography: {
    fontFamily: 'Ubuntu',
    fontSize: 16,
    h2: {
      fontFamily: 'Staatliches',
    },
    h4: {
      fontFamily: 'Staatliches',
    },
    body2: {
      color: "gray"
    },
  }
});

// Returns if DOM element is currently visible
function isElementInViewport(element) {
  let rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight ||
      document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth ||
      document.documentElement.clientWidth)
  );
}

// Returns the height difference between two DOM elements
function getHeightDifference(element1, element2) {
  let rect1 = element1.getBoundingClientRect();
  let rect2 = element2.getBoundingClientRect();
  return (rect1.top + rect1.bottom - rect2.top - rect2.bottom) / 2
}

// Check various conditions for dynamic layout
function checkShouldAnimate() {
  // Stat bar animations
  let stats = $('.stat');
  stats.each(function (ind) {
    if (isElementInViewport(this)) {
      $(this).addClass("animate-stat")
    }
    else {
      $(this).removeClass("animate-stat")
    }
  })

  // Image snap into place (large screens only)
  let container = document.querySelector('#info-container')
  let image = document.querySelector('.info-image-fixed')
  if (image && getHeightDifference(image, container) > 0) {
    image.classList.add("info-image-absolute")
    image.classList.remove("info-image-fixed")
  }
}

function PokeInfo() {
  window.scrollTo(0, 0)
  window.onscroll = checkShouldAnimate

  const navigate = useNavigate()
  const screenSize = useMediaQuery('(min-width:600px)') +
    useMediaQuery('(min-width:1000px)')
  const info = useLocation().state;
  if (!info) {
    return (
      <main style={{ padding: "1rem" }}>
        <p>There's nothing here :(</p>
      </main>)
  }

  // Type-based colouring variables
  const numTypes = info.types.length
  let typeBg = typeBgs[info.types[0].type.name]
  let typeBgSec = "#f7f7f5"
  if (numTypes > 1) {
    typeBgSec = typeBgs[info.types[numTypes - 1].type.name]
  }

  // Adjust size of pokemon image based on their height
  const sizeAdjustment = Math.round(Math.min(info.height / 2, 15))

  // Responsive sizing
  const headerSize = screenSize ? "h2" : "h4"
  const imageSizes = [80, 50, `${25 + sizeAdjustment}`]
  const cardMargins = [80, 50, 30]
  const percentSize = cardMargins[screenSize]

  return (
    <main style={{ display: "flex" }}>
      <ThemeProvider theme={theme}>
        <PokeInfoBg props={{
          info, typeBg, typeBgSec,
          percentSize, navigate
        }} />
        <Card className="bg" sx={{
          display: "block", zIndex: 2,
          position: "relative", marginTop: `${cardMargins[screenSize]}%`,
          width: "100%", padding: "3%", "--pokeball-bg": `url(${pokeballBg})`
        }}>
          <article id="info-container">
            <Grid container justifyContent="space-between" p={3}>
              <Typography variant={headerSize}>
                {info.name}
              </Typography >
              <Typography variant={headerSize}>
                # {info.id}
              </Typography >
            </Grid>
            <Grid container justifyContent="space-between" pl={3} pr={3}>
              <PokeDesc info={info} screenSize={screenSize}></PokeDesc>
              <PokeStats info={info} screenSize={screenSize}></PokeStats>
            </Grid>
            {screenSize === 2 && <CardContentNoMargin
              className="info-image-fixed"
              sx={{
                display: "inline-block", zIndex: 5, left: "50%",
                width: `${imageSizes[screenSize]}%`,
                "--image-top": `${15 - sizeAdjustment}%`
              }}>
              <CardMedia
                component="img"
                image={getPokemonImgProp(info)}
                alt={info.name}
                style={{ backgroundColor: 'transparent' }}
              />
            </CardContentNoMargin>}
          </article>
        </Card>
        {screenSize < 2 && <Box component="img" className="info-image-small"
          src={getPokemonImgProp(info)} alt={info.name}
          sx={{ width: `${imageSizes[screenSize]}%` }} />}
      </ThemeProvider>
    </main>
  )
}

export default React.memo(PokeInfo);