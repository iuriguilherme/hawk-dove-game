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

/* 
 * FIXME: fx(lens) e032c762 (or me) made it stop being able to change some 
 * fx(params) that have a "default" value. Like the ruleset, placement 
 * algorithms, and infinite here for example.
 */

import { findFoodAlgorithmMap } from "./params/findFood.js";
import {
  foodsPlacementAlgorithmMap,
  subjectsPlacementAlgorithmMap,
} from "./params/placement.js";
import { rulesetMap } from "./params/rulesets.js";

import { getSpritesThemeMap } from "./params/sprites.js";
import { getStrategiesMap } from "./params/strategies.js";

let spritesThemeMap;
let strategiesMap;

export function getFindFoodAlgorithm(key) {
  return findFoodAlgorithmMap[key];
}

export function getRuleset(key) {
  return rulesetMap[key];
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

export function getParamsStep3(ruleset) {
  strategiesMap = getStrategiesMap(ruleset);
  return [
    {
      "id": "strategy",
      "name": "Strategy (select and submit ruleset to refresh)",
      "type": "select",
      "default": "Hereditary",
      "options": {
        //~ "options": Object.keys(strategiesMap),
        "options": ["Hereditary", "Doves", "Hawks", "Nash equilibrium"],
      },
    },
  ];
}

export function getParamsStep2(names) {
  spritesThemeMap = getSpritesThemeMap(names);
  return [
    {
      "id": "sprites_theme",
      "name": "Sprites theme",
      "type": "select",
      "options": {
        "options": Object.keys(spritesThemeMap),
      }
    },
    {
      "id": "ruleset",
      "name": "Ruleset (submit to change available strategies)",
      "type": "select",
      "default": "Classic Hawks & Doves",
      "options": {
        //~ "options": Object.keys(rulesetMap),
        "options": [
          "Classic Hawks & Doves",
          "Primer's Hawks & Doves",
          "Primer's modified Hawks & Doves",
        ],
      },
    },
  ];
}

export function getParamsStep1(names) {
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
      "id": "hawk_string",
      "name": "Hawk name",
      "type": "string",
      "default": "hawk",
      "options": {
        "minLength": 1,
        "maxLength": 16,
      },
    },
    {
      "id": "dove_string",
      "name": "Dove name",
      "type": "string",
      "default": "dove",
      "options": {
        "minLength": 1,
        "maxLength": 16,
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
        //~ "options": Object.keys(findFoodAlgorithmMap),
        "options": ["random", "closest", "farthest"],
      },
    },
    {
      "id": "subjects_placement",
      "name": "Subject placement algorithm",
      "type": "select",
      "default": "circle",
      "options": {
        //~ "options": Object.keys(subjectsPlacementAlgorithmMap),
        "options": ["random", "circle"],
      },
    },
    {
      "id": "foods_placement",
      "name": "Food placement algorithm",
      "type": "select",
      "default": "circle",
      "options": {
        //~ "options": Object.keys(foodsPlacementAlgorithmMap),
        "options": ["random", "circle"],
      },
    },
  ].concat(getParamsStep2(names)).concat(getParamsStep3("static"));
}
