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
import { rulesetAlgorithmMap } from "./params/rulesets.js";

import { getSpritesThemeMap } from "./params/sprites.js";
import { getStrategiesMap } from "./params/strategies.js";

let spritesThemeMap;
let strategiesMap;

export function getFindFoodAlgorithm(key) {
  return findFoodAlgorithmMap[key];
}

export function getRulesetAlgorithm(key) {
  return rulesetAlgorithmMap[key];
}

export function getFoodsPlacementAlgorithm(key) {
  return foodsPlacementAlgorithmMap[key];
}

export function getSubjectsPlacementAlgorithm(key) {
  return subjectsPlacementAlgorithmMap[key];
}

export function getStrategies(key) {
  return strategiesMap[key];
}

export function getSpritesTheme(key) {
  return spritesThemeMap[key];
}

export function getDynamicParams(keys) {
  strategiesMap = getStrategiesMap(keys);
  spritesThemeMap = getSpritesThemeMap(keys);
  return [
    {
      "id": "strategies",
      "name": "Available strategies",
      "type": "select",
      //~ "default": "hereditary",
      "options": {
        "options": Object.keys(strategiesMap),
      },
    },
    {
      "id": "sprites_theme",
      "name": "Sprites theme",
      "type": "select",
      "options": {
        "options": Object.keys(spritesThemeMap),
      }
    },
  ];
}

export function getStaticParams() {
  return [
    {
      "id": "starting_subjects",
      "name": "Starting random individuals",
      "type": "number",
      "default": 58,
      "options": {
        "min": 1,
        "max": 174,
        "step": 1,
      },
    },
    {
      "id": "starting_hawks",
      "name": "Starting hawks",
      "type": "number",
      "default": 58,
      "options": {
        "min": 1,
        "max": 174,
        "step": 1,
      },
    },
    {
      "id": "starting_doves",
      "name": "Starting doves",
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
      "name": "Hawk name",
      "type": "string",
      "default": "hawk",
      "options": {
        "minLength": 1,
        "maxLength": 24,
      },
    },
    {
      "id": "dove_string",
      "name": "Dove name",
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
        "maxLength": 24,
      },
    },
    {
      "id": "infinite",
      "name": "Keep simulating (no game over)",
      "type": "boolean",
      //~ "default": false,
    },
    {
      "id": "ruleset",
      "name": "Ruleset (see token description)",
      "type": "select",
      //~ "default": "classic",
      "options": {
        "options": Object.keys(rulesetAlgorithmMap),
      },
    },
    {
      "id": "food_find",
      "name": "Food finding algorithm",
      "type": "select",
      //~ "default": "random",
      "options": {
        "options": Object.keys(findFoodAlgorithmMap),
      },
    },
    {
      "id": "subjects_placement",
      "name": "Subject placement algorithm",
      "type": "select",
      //~ "default": "circle",
      "options": {
        "options": Object.keys(subjectsPlacementAlgorithmMap),
      },
    },
    {
      "id": "foods_placement",
      "name": "Food placement algorithm",
      "type": "select",
      //~ "default": "circle",
      "options": {
        "options": Object.keys(foodsPlacementAlgorithmMap),
      },
    },
  ];
}
