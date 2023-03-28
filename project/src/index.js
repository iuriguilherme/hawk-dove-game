/**!
 * @file Hawk Dove Game  
 * @version 0.8.2  
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
export const version = "0.8.2";

import { create as mcreate, all as mall } from "mathjs";
const math = mcreate(mall, {});
import Phaser from "phaser";

import {
  phaserGame,
} from "./game.js";

import {
  findFoodAlgorithmMap,
  foodsPlacementAlgorithmMap,
  rulesetAlgorithmMap,
  subjectsPlacementAlgorithmMap,
} from "./params.js";

import {
  getSpritesThemeMap,
} from "./sprites.js";

import {
  fxArray,
} from "./util.js";

export var hawkAndDove = ["hawk", "dove"];
export var foodName = "food";

let spritesThemeMap = getSpritesThemeMap(hawkAndDove, foodName);

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
    "id": "food_string",
    "name": "Food label",
    "type": "string",
    "default": "food",
    "options": {
      "minLength": 1,
      "maxLength": 16,
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
  "Sprites theme": $fx.getParam("sprites_theme"),
});

//~ export const startingSubjects = fxArray.length;
export const startingSubjects = $fx.getParam("starting_subjects");
export const initialFoodRate = $fx.getParam("starting_food");
export const growthRate = $fx.getParam("growth_rate");
export const maxAge = $fx.getParam("max_age");
export const moreDove = $fx.getParam("more_dove_chance");
export const moreFood = $fx.getParam("more_food_chance");
export const moreHawk = $fx.getParam("more_hawk_chance");
export const lessFood = $fx.getParam("less_food_chance");
export const rulesetAlgorithm = rulesetAlgorithmMap[$fx.getParam("ruleset")];
export const findFoodAlgorithm = 
  findFoodAlgorithmMap[$fx.getParam("food_find")];
export const subjectsPlacementAlgorithm = 
  subjectsPlacementAlgorithmMap[$fx.getParam("subjects_placement")];
export const foodsPlacementAlgorithm = 
  foodsPlacementAlgorithmMap[$fx.getParam("foods_placement")];
hawkAndDove = [$fx.getParam("hawk_string"), $fx.getParam("dove_string")];
foodName = $fx.getParam("food_string");
spritesThemeMap = getSpritesThemeMap(hawkAndDove, foodName);

$fx.params($fx.getDefinitions().slice(0, -1).concat([{
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
export const spritesTheme = spritesThemeMap[$fx.getParam("sprites_theme")];

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
  `fx(params) Current ruleset: ${$fx.getParam("ruleset")} `,
  `(${rulesetAlgorithm.name})\n`,
  `fx(params) Food finding algorithm: ${$fx.getParam("food_find")} `,
  `(${findFoodAlgorithm.name})\n`,
  `fx(params) Subject placing algorithm: `,
  `${$fx.getParam("subjects_placement")} `,
  `(${subjectsPlacementAlgorithm.name})\n`,
  `fx(params) Food placing algorithm: ${$fx.getParam("foods_placement")} `,
  `(${foodsPlacementAlgorithm.name})\n`,
  `fx(params) Sprites theme: ${$fx.getParam("sprites_theme")}\n`,
);

window.addEventListener("resize", phaserGame.scale.setMaxZoom());

document.body.style.background = "#e8e8e8";

console.log(`[${name} v${version}] fully loaded and working properly!`);
