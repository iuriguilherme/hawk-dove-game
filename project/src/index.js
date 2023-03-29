/**!
 * @file Hawk Dove Game  
 * @version 0.10.0  
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

export const name = "hawk-dove-game";
export const version = "0.10.0";

import { create as mcreate, all as mall } from "mathjs";
const math = mcreate(mall, {});

import {
  charts,
} from "./charts.js";

import {
  phaserGame,
  foodsCircle,
  subjectsCircle,
} from "./game.js";

import {
  graphsDivs,
} from "./html.js";

import {
  getRulesetAlgorithm,
  getFoodsPlacementAlgorithm,
  getFindFoodAlgorithm,
  getSubjectsPlacementAlgorithm,
  getStaticParams,
  getDynamicParams,
  getSpritesTheme,
  getStrategies,
} from "./params.js";

$fx.params(getStaticParams());

export const startingSubjects = $fx.getParam("starting_subjects");
export const initialFoodRate = $fx.getParam("starting_food");
export const growthRate = $fx.getParam("growth_rate");
export const maxAge = $fx.getParam("max_age");
export const moreDove = $fx.getParam("more_dove_chance");
export const moreFood = $fx.getParam("more_food_chance");
export const moreHawk = $fx.getParam("more_hawk_chance");
export const lessFood = $fx.getParam("less_food_chance");
export const rulesetAlgorithm = getRulesetAlgorithm($fx.getParam("ruleset"));
export const findFoodAlgorithm = 
  getFindFoodAlgorithm($fx.getParam("food_find"));
export const subjectsPlacementAlgorithm = 
  getSubjectsPlacementAlgorithm($fx.getParam("subjects_placement"));
export const foodsPlacementAlgorithm = 
  getFoodsPlacementAlgorithm($fx.getParam("foods_placement"));

export const hawkAndDove = [
  $fx.getParam("hawk_string"),
  $fx.getParam("dove_string"),
];
export const foodName = $fx.getParam("food_string");
let dynamicParams = {"hawkAndDove": hawkAndDove, "foodName": foodName};
$fx.params($fx.getDefinitions().concat(getDynamicParams(dynamicParams)));
export const graphColors = {
  "hawkAndDove": [
    $fx.getParam("hawk_color").hex.rgb,
    $fx.getParam("dove_color").hex.rgb,
  ],
  "population": $fx.getParam("population_color").hex.rgb,
  "age": $fx.getParam("age_color").hex.rgb,
  "generation": $fx.getParam("gen_color").hex.rgb,
};
export const spritesTheme = getSpritesTheme($fx.getParam("sprites_theme"));
export const strategies = getStrategies($fx.getParam("strategies"));

$fx.features({
  "Starting individuals": $fx.getParam("starting_subjects"),
  "Reproduction multiplier": $fx.getParam("growth_rate"),
  "Longevity": $fx.getParam("max_age"),
  "Starting food rate": $fx.getParam("starting_food") + "%",
  "Food destruction chance": $fx.getParam("less_food_chance") + "%",
  "Food creation chance": $fx.getParam("more_food_chance") + "%",
  "Hawk creation chance": $fx.getParam("more_hawk_chance") + "%",
  "Dove creation chance": $fx.getParam("more_dove_chance") + "%",
  "Infinite generation": $fx.getParam("infinite"),
  "Ruleset": $fx.getParam("ruleset"),
  "Food finding algorithm": $fx.getParam("food_find"),
  "Subject placement algorithm": $fx.getParam("subjects_placement"),
  "Food placement algorithm": $fx.getParam("foods_placement"),
  "Available strategies": $fx.getParam("strategies"),
  "Sprites theme": $fx.getParam("sprites_theme"),
});

window.addEventListener("resize", () => {
  for (const v of Object.values(charts)) {v.resize();}
  let graphsMaxWidth = 0;
  let graphsMaxHeight = 0;
  for (let i = 0; i < graphsDivs.length; i++) {
    graphsMaxWidth = math.max(graphsMaxWidth, graphsDivs[i].offsetWidth);
    graphsMaxHeight = math.max(graphsMaxHeight, graphsDivs[i].offsetHeight);
  }
  let newWidth = window.innerWidth - graphsMaxWidth - (window.innerWidth / 60);
  let newHeight = window.innerHeight - graphsMaxHeight - (window.innerHeight / 60);
  phaserGame.scale.resize(newWidth, newHeight);
  phaserGame.scale.setMaxZoom();
  subjectsCircle.setTo(
    subjectsCircle.x,
    subjectsCircle.y,
    (math.min(newWidth, newHeight) / 4.5),
  );
  foodsCircle.setTo(
    foodsCircle.x,
    foodsCircle.y,
    (math.min(newWidth, newHeight) / 3),
  );
});

document.body.style.background = "#e8e8e8";

console.log(
  `[${name} v${version}]:\nfx(hash): ${fxhashTrunc}\n`,
  `fx(params) Starting individuals: ${$fx.getParam("starting_subjects")}%\n`,
  `fx(params) Reproduction multiplier: ${$fx.getParam("growth_rate")}\n`,
  `fx(params) Longevity: ${$fx.getParam("max_age")}\n`,
  `fx(params) Starting food rate: ${$fx.getParam("starting_food")}%\n`,
  `fx(params) Chance of less food: ${$fx.getParam("less_food_chance")}%\n`,
  `fx(params) Chance of new food: ${$fx.getParam("more_food_chance")}%\n`,
  `fx(params) Chance of new hawk: ${$fx.getParam("more_hawk_chance")}%\n`,
  `fx(params) Chance of new dove: ${$fx.getParam("more_dove_chance")}%\n`,
  `fx(params) Keep simulating: ${$fx.getParam("infinite")}\n`,
  `fx(params) Current ruleset: ${$fx.getParam("ruleset")}`,
  `(${rulesetAlgorithm.name})\n`,
  `fx(params) Food finding algorithm: ${$fx.getParam("food_find")}`,
  `(${findFoodAlgorithm.name})\n`,
  `fx(params) Subject placing algorithm:`,
  `${$fx.getParam("subjects_placement")}`,
  `(${subjectsPlacementAlgorithm.name})\n`,
  `fx(params) Food placing algorithm: ${$fx.getParam("foods_placement")}`,
  `(${foodsPlacementAlgorithm.name})\n`,
  `fx(params) Available strategies: ${$fx.getParam("strategies")}\n`,
  `fx(params) Sprites theme: ${$fx.getParam("sprites_theme")}\n`,
);

console.log(`[${name} v${version}] fully loaded and working properly!`);
