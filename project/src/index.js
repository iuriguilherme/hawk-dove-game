/**!
 * @file Hawk Dove Game  
 * @version 0.8.0  
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
export const version = "0.8.0";

import { create as mcreate, all as mall } from "mathjs";
const math = mcreate(mall, {});
import Phaser from "phaser";

import {
  findFoodAlgorithmMap,
  foodsPlacementAlgorithmMap,
  rulesetAlgorithmMap,
  subjectsPlacementAlgorithmMap,
} from "./params.js";

import {
  getSpritesThemeMap,
} from "./sprites.js";

export var hawkAndDove = ["hawk", "dove"];

let spritesThemeMap = getSpritesThemeMap(hawkAndDove);

$fx.params([
  {
    "id": "starting_subjects",
    "name": "Starting individuals",
    "type": "number",
    "default": 58,
    "options": {
      "min": 1,
      "max": 174,
      "step": 1,
    },
  },
  {
    "id": "growth_rate",
    "name": "Reproduction multiplier",
    "type": "number",
    "default": 1,
    "options": {
      "min": 0,
      "max": 10,
      "step": 1,
    },
  },
  {
    "id": "max_age",
    "name": "Longevity (max age) (zero is infinite)",
    "type": "number",
    "default": 0,
    "options": {
      "min": 0,
      "max": 10000,
      "step": 100,
    },
  },
  {
    "id": "starting_food",
    "name": "Starting food (relative to population)",
    "type": "number",
    "default": 100,
    "options": {
      "min": 0,
      "max": 200,
      "step": 1,
    },
  },
  {
    "id": "more_food_chance",
    "name": "Chance to create new food",
    "type": "number",
    "default": 1,
    "options": {
      "min": 0,
      "max": 100,
      "step": 1,
    },
  },
  {
    "id": "less_food_chance",
    "name": "Chance to destroy one food",
    "type": "number",
    "default": 1,
    "options": {
      "min": 0,
      "max": 100,
      "step": 1,
    },
  },
  {
    "id": "more_dove_chance",
    "name": "Chance to spawn new dove",
    "type": "number",
    "default": 1,
    "options": {
      "min": 0,
      "max": 100,
      "step": 1,
    },
  },
  {
    "id": "more_hawk_chance",
    "name": "Chance to spawn new hawk",
    "type": "number",
    "default": 1,
    "options": {
      "min": 0,
      "max": 100,
      "step": 1,
    },
  },
  {
    id: "hawk_color",
    name: "Hawk graph color",
    type: "color",
  },
  {
    id: "dove_color",
    name: "Dove graph color",
    type: "color",
  },
  {
    id: "age_color",
    name: "Age graph color",
    type: "color",
  },
  {
    id: "gen_color",
    name: "Generation graph color",
    type: "color",
  },
  {
    id: "population_color",
    name: "Population graph color",
    type: "color",
  },
  {
    "id": "hawk_string",
    "name": "Hawk label",
    "type": "string",
    "default": "hawk",
    "options": {
      "minLength": 1,
      "maxLength": 24,
    },
  },
  {
    "id": "dove_string",
    "name": "Dove label",
    "type": "string",
    "default": "dove",
    "options": {
      "minLength": 1,
      "maxLength": 24,
    },
  },
  {
    "id": "infinite",
    "name": "Keep simulating (no game over)",
    "type": "boolean",
    "default": false,
  },
  {
    "id": "ruleset",
    "name": "Ruleset (see token description)",
    "type": "select",
    "options": {
      "options": Object.keys(rulesetAlgorithmMap),
    },
  },
  {
    "id": "food_find",
    "name": "Food finding algorithm",
    "type": "select",
    "options": {
      "options": Object.keys(findFoodAlgorithmMap),
    },
  },
  {
    "id": "subjects_placement",
    "name": "Subject placement algorithm",
    "type": "select",
    "options": {
      "options": Object.keys(subjectsPlacementAlgorithmMap),
    },
  },
  {
    "id": "foods_placement",
    "name": "Food placement algorithm",
    "type": "select",
    "options": {
      "options": Object.keys(foodsPlacementAlgorithmMap),
    },
  },
  {
    "id": "sprites_theme",
    "name": "Sprites theme",
    "type": "select",
    "options": {
      "options": Object.keys(spritesThemeMap),
    },
  },
]);

$fx.features({
  //~ "A random feature": Math.floor($fx.rand() * 10),
  //~ "A random boolean": $fx.rand() > 0.5,
  //~ "A random string": ["A", "B", "C", "D"].at(Math.floor($fx.rand()*4)),
  //~ "Feature from params, its a number": $fx.getParam("number_id"),
  "Ruleset": $fx.getParam("ruleset"),
  "Sprites theme": $fx.getParam("sprites_theme"),
  "Starting individuals": $fx.getParam("starting_subjects"),
  "Reproduction multiplier": $fx.getParam("growth_rate"),
  "Longevity": $fx.getParam("max_age"),
  "Starting food rate": $fx.getParam("starting_food") + "%",
  "Food destruction chance": $fx.getParam("less_food_chance") + "%",
  "Food creation chance": $fx.getParam("more_food_chance") + "%",
  "Hawk creation chance": $fx.getParam("more_hawk_chance") + "%",
  "Dove creation chance": $fx.getParam("more_dove_chance") + "%",
  "Subject placement algorithm": $fx.getParam("subjects_placement"),
  "Food placement algorithm": $fx.getParam("foods_placement"),
  "Food finding algorithm": $fx.getParam("food_find"),
  "Infinite generation": $fx.getParam("infinite"),
});

//~ export const startingSubjects = fxArray.length;
export const startingSubjects = $fx.getParam("starting_subjects");
export const initialFoodRate = $fx.getRawParam("starting_food");
export const growthRate = $fx.getRawParam("growth_rate");
export const maxAge = $fx.getRawParam("max_age");
export const moreDove = $fx.getRawParam("more_dove_chance");
export const moreFood = $fx.getRawParam("more_food_chance");
export const moreHawk = $fx.getRawParam("more_hawk_chance");
export const lessFood = $fx.getRawParam("less_food_chance");
export const rulesetAlgorithm = rulesetAlgorithmMap[$fx.getRawParam("ruleset")];
export const findFoodAlgorithm = 
  findFoodAlgorithmMap[$fx.getRawParam("food_find")];
export const subjectsPlacementAlgorithm = 
  subjectsPlacementAlgorithmMap[$fx.getRawParam("subjects_placement")];
export const foodsPlacementAlgorithm = 
  foodsPlacementAlgorithmMap[$fx.getRawParam("foods_placement")];
hawkAndDove = [$fx.getRawParam("hawk_string"), $fx.getRawParam("dove_string")];
spritesThemeMap = getSpritesThemeMap(hawkAndDove);

$fx.params($fx.getDefinitions().slice(0,
  $fx.getDefinitions().indexOf($fx.getRawParam("sprites_theme"))).concat([{
  "id": "sprites_theme",
  "name": "Sprites theme",
  "type": "select",
  "options": {
    "options": Object.keys(spritesThemeMap),
  }
}]));

export const graphColors = {
  "hawkAndDove": [
    $fx.getParam("hawk_color").hex.rgb,
    $fx.getParam("dove_color").hex.rgb,
  ],
  "population": $fx.getParam("population_color").hex.rgb,
  "age": $fx.getParam("age_color").hex.rgb,
  "gen": $fx.getParam("gen_color").hex.rgb,
};
export const spritesTheme = spritesThemeMap[$fx.getRawParam("sprites_theme")];

import {
  fxArray,
} from "./util.js";

import {
  phaserGame,
} from "./game.js";

window.addEventListener("resize", phaserGame.scale.setMaxZoom());

document.body.style.background = "#e8e8e8";

console.log(
  `[${name} v${version}]:\nfx(hash): ${fxhashTrunc}\n`,
  `fx(params) Current ruleset: ${$fx.getParam("ruleset")} `,
  `(${rulesetAlgorithm.name})\n`,
  `fx(params) Sprites theme: ${$fx.getParam("sprites_theme")}\n`,
  `fx(params) Starting individuals: ${$fx.getParam("starting_subjects")}%\n`,
  `fx(params) Reproduction multiplier: ${$fx.getParam("growth_rate")}\n`,
  `fx(params) Longevity: ${$fx.getParam("max_age")}\n`,
  `fx(params) Starting food rate: ${$fx.getParam("starting_food")}%\n`,
  `fx(params) Chance of less food: ${$fx.getParam("less_food_chance")}%\n`,
  `fx(params) Chance of new food: ${$fx.getParam("more_food_chance")}%\n`,
  `fx(params) Chance of new hawk: ${$fx.getParam("more_hawk_chance")}%\n`,
  `fx(params) Chance of new dove: ${$fx.getParam("more_dove_chance")}%\n`,
  `fx(params) Food finding algorithm: ${$fx.getParam("food_find")} `,
  `(${findFoodAlgorithm.name})\n`,
  `fx(params) Subject placing algorithm: `,
  `${$fx.getParam("subjects_placement")} `,
  `(${subjectsPlacementAlgorithm.name})\n`,
  `fx(params) Food placing algorithm: ${$fx.getParam("foods_placement")} `,
  `(${foodsPlacementAlgorithm.name})\n`,
  `fx(params) Keep simulating: ${$fx.getParam("infinite")}\n`,
);

console.log(`[${name} v${version}] fully loaded and working properly!`);
