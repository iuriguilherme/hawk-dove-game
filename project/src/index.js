/**!
 * @file Hawk Dove Game  
 * @version 0.16.0  
 * @copyright Iuri Guilherme 2023  
 * @license GNU AGPLv3  
 * @author Iuri Guilherme <https://iuri.neocities.org/>  
 * @description Source code available at 
 *    https://github.com/iuriguilherme/fxhash4  
 * 
 * This program is free software: you can redistribute it and/or modify it 
 * under the terms of the GNU Affero General Public License as published by the 
 * Free Software Foundation, either version 3 of the License, or (at your 
 * option) any later version.  
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT 
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or 
 * FITNESS FOR A PARTICULAR PURPOSE.  
 * See the GNU Affero General Public License for more details.  
 * 
 * You should have received a copy of the GNU Affero General Public License 
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.  
 * 
 */

const name = "hawk-dove-game";
const version = "0.16.0";

import Chart from "chart.js/auto";
import { create as mcreate, all as mall } from "mathjs";
const math = mcreate(mall, {});
import Phaser from "phaser";

import {
  getParamsStep1,
  getParamsStep4,
} from "./params.js";

import {
  createCharts,
} from "./charts.js";

import {
  getPhaserGame,
} from "./game.js";

import {
  getGeneticData,
} from "./genes.js";

import {
  graphsCanvas,
  graphsDivs,
} from "./html.js";

import {
  alphabetArray,
  fxArray,
  properAlphabet,
} from "./util.js";

const names = {
  "food": "food",
  "strategies": {
    "dove": "dove",
    "hawk": "hawk",
  },
};
const strategiesNames = Object.keys(names["strategies"]);

var charts = {};
var datasets = [];
var datasetsHistory = [];
var gData = {};
var foods;
var foodsCircle;
var iteration = 0;
var subjects;
var subjectsCircle;

$fx.params(getParamsStep1(names, "static"));
$fx.features({
  "Starting random individuals": $fx.getParam("starting_subjects"),
  "Starting hawks": $fx.getParam("starting_hawks"),
  "Starting doves": $fx.getParam("starting_doves"),
  "Reproduction multiplier": $fx.getParam("growth_rate"),
  "Longevity": $fx.getParam("max_age"),
  "Starting food rate": $fx.getParam("starting_food") + "%",
  "Food destruction chance": $fx.getParam("less_food_chance") + "%",
  "Food creation chance": $fx.getParam("more_food_chance") + "%",
  "Dove creation chance": $fx.getParam("more_dove_chance") + "%",
  "Hawk creation chance": $fx.getParam("more_hawk_chance") + "%",
  "Game over by genetic end": $fx.getParam("game_over_genetic"),
  "Game over by population end": $fx.getParam("game_over_population"),
  "Game over by strategy end": $fx.getParam("game_over_strategy"),
  "Food finding algorithm": $fx.getParam("food_find"),
  "Food placement algorithm": $fx.getParam("foods_placement"),
  "Subject placement algorithm": $fx.getParam("subjects_placement"),
  "Ruleset": $fx.getParam("ruleset"),
  "Strategy": $fx.getParam("strategy"),
  "Sprites theme": $fx.getParam("sprites_theme"),
});

const graphColors = {
  "population": {
    [names["food"]]: $fx.getParam("food_color").hex.rgb,
    [names["strategies"]["dove"]]: $fx.getParam("dove_color").hex.rgb,
    [names["strategies"]["hawk"]]: $fx.getParam("hawk_color").hex.rgb,
  },
  "genetic": $fx.getParam("population_color").hex.rgb,
  "age": $fx.getParam("age_color").hex.rgb,
  "generation": $fx.getParam("gen_color").hex.rgb,
};
const params = getParamsStep4({
  "spritesTheme": $fx.getParam("sprites_theme"),
  "ruleset": $fx.getParam("ruleset"),
  "strategy": $fx.getParam("strategy"),
  "growthRate": $fx.getParam("growth_rate"),
  "gameOverGenetic": $fx.getParam("game_over_genetic"),
  "gameOverPopulation": $fx.getParam("game_over_population"),
  "gameOverStrategy": $fx.getParam("game_over_strategy"),
  "initialFoodRate": $fx.getParam("starting_food"),
  "lessFoods": $fx.getParam("less_food_chance"),
  "maxAge": $fx.getParam("max_age"),
  "moreDoves": $fx.getParam("more_dove_chance"),
  "moreFoods": $fx.getParam("more_food_chance"),
  "moreHawks": $fx.getParam("more_hawk_chance"),
  "moreSubjects": $fx.getParam("more_random_chance"),
  "startingDoves": $fx.getParam("starting_doves"),
  "startingHawks": $fx.getParam("starting_hawks"),
  "startingSubjects": $fx.getParam("starting_subjects"),
  "findFoodAlgorithm": $fx.getParam("food_find"),
  "foodsPlacementAlgorithm": $fx.getParam("foods_placement"),
  "subjectsPlacementAlgorithm": $fx.getParam("subjects_placement"),
});

const phaserGame = getPhaserGame(
  params,
  graphColors,
  name,
  names,
  strategiesNames,
  version,
  createCharts,
  charts,
  math,
  Phaser,
  fxArray,
  graphsCanvas,
  alphabetArray,
  Chart,
  gData,
  iteration,
  foods,
  foodsCircle,
  subjects,
  subjectsCircle,
  datasets,
  datasetsHistory,
  getGeneticData,
  properAlphabet,
);

window.addEventListener("resize", () => {
  for (const v of Object.values(charts)) {v.resize();}
  let graphsMaxWidth = 0;
  let graphsMaxHeight = 0;
  for (let i = 0; i < graphsDivs.length; i++) {
    graphsMaxWidth = math.max(graphsMaxWidth, graphsDivs[i].offsetWidth);
    graphsMaxHeight = math.max(graphsMaxHeight, graphsDivs[i].offsetHeight);
  }
  let newWidth = window.innerWidth - graphsMaxWidth - (window.innerWidth / 60);
  let newHeight = window.innerHeight - graphsMaxHeight - 
    (window.innerHeight / 60);
  phaserGame.scale.resize(newWidth, newHeight);
  phaserGame.scale.setMaxZoom();
  //~ subjectsCircle.setTo(
    //~ subjectsCircle.x,
    //~ subjectsCircle.y,
    //~ (math.min(newWidth, newHeight) / 4.5),
  //~ );
  //~ foodsCircle.setTo(
    //~ foodsCircle.x,
    //~ foodsCircle.y,
    //~ (math.min(newWidth, newHeight) / 3),
  //~ );
});

document.body.style.background = "#e8e8e8";

console.log(
  `[${name} v${version}]:\nfx(hash): ${fxhashTrunc}\n`,
  `fx(params) Starting random individuals:`,
  `${$fx.getParam("starting_subjects")}\n`,
  `fx(params) Starting hawks: ${$fx.getParam("starting_hawks")}\n`,
  `fx(params) Starting doves: ${$fx.getParam("starting_doves")}\n`,
  `fx(params) Reproduction multiplier: ${$fx.getParam("growth_rate")}\n`,
  `fx(params) Longevity: ${$fx.getParam("max_age")}\n`,
  `fx(params) Starting food rate: ${$fx.getParam("starting_food")}%\n`,
  `fx(params) Chance of less food: ${$fx.getParam("less_food_chance")}%\n`,
  `fx(params) Chance of new food: ${$fx.getParam("more_food_chance")}%\n`,
  `fx(params) Chance of new random individual:`,
  `${$fx.getParam("more_random_chance")}%\n`,
  `fx(params) Chance of new dove: ${$fx.getParam("more_dove_chance")}%\n`,
  `fx(params) Chance of new hawk: ${$fx.getParam("more_hawk_chance")}%\n`,
  `fx(params) Game over by genetic end:`,
  `${$fx.getParam("game_over_genetic")}\n`,
  `fx(params) Game over by population end:`,
  `${$fx.getParam("game_over_population")}\n`,
  `fx(params) Game over by strategy end:`,
  `${$fx.getParam("game_over_strategy")}\n`,
  `fx(params) Food finding algorithm: ${$fx.getParam("food_find")}\n`,
  `fx(params) Food placing algorithm: ${$fx.getParam("foods_placement")}\n`,
  `fx(params) Subject placing algorithm:`,
  `${$fx.getParam("subjects_placement")}\n`,
  `fx(params) Current ruleset: ${$fx.getParam("ruleset")}\n`,
  `fx(params) Strategy: ${$fx.getParam("strategy")}\n`,
  `fx(params) Sprites theme: ${$fx.getParam("sprites_theme")}\n`,
);

console.log(`[${name} v${version}] fully loaded and working properly!`);
