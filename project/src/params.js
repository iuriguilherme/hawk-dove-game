/**
 * @file params.js fx(params) for Hawk Dove Game  
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

import { getFindFoodAlgorithmMap } from "./params/findFood.js";
import {
  getFoodsPlacementAlgorithmMap,
  getSubjectsPlacementAlgorithmMap,
} from "./params/placement.js";
import { getRulesetMap, getPayoffMatrixMap } from "./params/rulesets.js";
import { getSpritesThemeMap } from "./params/sprites.js";
import { getStrategiesMap } from "./params/strategies.js";

const findFoodAlgorithmMap = getFindFoodAlgorithmMap();
const foodsPlacementAlgorithmMap = getFoodsPlacementAlgorithmMap();
const rulesetMap = getRulesetMap();
const payoffMatrixMap = getPayoffMatrixMap();
let spritesThemeMap;
let strategiesMap;
const subjectsPlacementAlgorithmMap = getSubjectsPlacementAlgorithmMap();

export function getFindFoodAlgorithm(key) {
  return findFoodAlgorithmMap[key];
}

export function getRuleset(key) {
  return rulesetMap[key];
}

export function getPayoffMatrix(key) {
  return payoffMatrixMap[key];
}

export function getFoodsPlacementAlgorithm(key) {
  return foodsPlacementAlgorithmMap[key];
}

export function getSubjectsPlacementAlgorithm(key) {
  return subjectsPlacementAlgorithmMap[key];
}

export function getStrategy(key) {
  return strategiesMap[key];
}

export function getSpritesTheme(key) {
  return spritesThemeMap[key];
}

export function getParamsStep4(params) {
  return {
    "spritesTheme": getSpritesTheme(params["spritesTheme"]),
    "ruleset": getRuleset(params["ruleset"]),
    "payoffMatrix": getPayoffMatrix(params["ruleset"]),
    "strategy": getStrategy(params["strategy"]),
    "growthRate": params["growthRate"],
    "gameOverGenetic": params["gameOverGenetic"],
    "gameOverPopulation": params["gameOverPopulation"],
    "gameOverStrategy": params["gameOverStrategy"],
    "initialFoodRate": params["initialFoodRate"],
    "lessFoods": params["lessFoods"],
    "maxAge": params["maxAge"],
    "moreDoves": params["moreDoves"],
    "moreFoods": params["moreFoods"],
    "moreHawks": params["moreHawks"],
    "moreSubjects": params["moreSubjects"],
    "startingDoves": params["startingDoves"],
    "startingHawks": params["startingHawks"],
    "startingSubjects": params["startingSubjects"],
    "findFoodAlgorithm": getFindFoodAlgorithm(params["findFoodAlgorithm"]),
    "foodsPlacementAlgorithm": 
      getFoodsPlacementAlgorithm(params["foodsPlacementAlgorithm"]),
    "subjectsPlacementAlgorithm": 
      getSubjectsPlacementAlgorithm(params["subjectsPlacementAlgorithm"]),
  };
}

function getParamsStep3(ruleset) {
  strategiesMap = getStrategiesMap(ruleset);
  return [
    {
      "id": "strategy",
      "name": "Strategy",
      "type": "select",
      "default": "Hereditary",
      "options": {
        "options": Object.keys(strategiesMap),
      },
    },
  ];
}

function getParamsStep2(names) {
  spritesThemeMap = getSpritesThemeMap(names);
  return [
    {
      "id": "sprites_theme",
      "name": "Sprites theme",
      "type": "select",
      "default": "Devils, Angels & Hearths",
      "options": {
        "options": Object.keys(spritesThemeMap),
      },
    },
    {
      "id": "ruleset",
      "name": "Ruleset",
      "type": "select",
      "default": "Classic Hawks & Doves",
      "options": {
        "options": Object.keys(rulesetMap),
      },
    },
  ];
}

export function getParamsStep1(names, ruleset) {
  return [
    {
      "id": "starting_subjects",
      "name": "Starting random individuals",
      "type": "number",
      "default": 0,
      "options": {
        "min": 0,
        "max": 58,
        "step": 1,
      },
    },
    {
      "id": "starting_hawks",
      "name": "Starting hawks",
      "type": "number",
      "default": 29,
      "options": {
        "min": 0,
        "max": 58,
        "step": 1,
      },
    },
    {
      "id": "starting_doves",
      "name": "Starting doves",
      "type": "number",
      "default": 29,
      "options": {
        "min": 0,
        "max": 58,
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
        "max": 3,
        "step": 1,
      },
    },
    {
      "id": "max_age",
      "name": "Longevity (zero is infinite)",
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
      "default": 0,
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
      "default": 0,
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
      "default": 0,
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
      "default": 0,
      "options": {
        "min": 0,
        "max": 100,
        "step": 1,
      },
    },
    {
      "id": "more_random_chance",
      "name": "Chance to spawn new random individual",
      "type": "number",
      "default": 0,
      "options": {
        "min": 0,
        "max": 100,
        "step": 1,
      },
    },
    {
      id: "food_color",
      name: "Food graph color",
      type: "color",
    },
    {
      id: "dove_color",
      name: "Dove graph color",
      type: "color",
    },
    {
      id: "hawk_color",
      name: "Hawk graph color",
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
      "id": "game_over_population",
      "name": "Population erradication causes game over?",
      "type": "boolean",
      "default": false,
    },
    {
      "id": "game_over_strategy",
      "name": "Strategy erradication causes game over?",
      "type": "boolean",
      "default": false,
    },
    {
      "id": "game_over_genetic",
      "name": "Single gene in gene pool causes game over?",
      "type": "boolean",
      "default": false,
    },
    {
      "id": "food_find",
      "name": "Food finding algorithm",
      "type": "select",
      "default": "random",
      "options": {
        "options": Object.keys(findFoodAlgorithmMap),
      },
    },
    {
      "id": "subjects_placement",
      "name": "Subject placement algorithm",
      "type": "select",
      "default": "circle",
      "options": {
        "options": Object.keys(subjectsPlacementAlgorithmMap),
      },
    },
    {
      "id": "foods_placement",
      "name": "Food placement algorithm",
      "type": "select",
      "default": "circle",
      "options": {
        "options": Object.keys(foodsPlacementAlgorithmMap),
      },
    },
  ].concat(getParamsStep2(names)).concat(getParamsStep3(ruleset));
}
