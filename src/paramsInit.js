/**
 * @file paramsInit.js fx(params) for Hawk Dove Game  
 * @copyright Iuri Guilherme 2023-2024  
 * @license GNU AGPLv3  
 * @author Iuri Guilherme <https://iuri.neocities.org/>  
 * @description Source code available at 
 *    https://github.com/iuriguilherme/hawk-dove-game  
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
import {
  getHadRulesetMap,
  getHadPayoffMatrixMap,
  getHadStrategiesMap,
} from "./params/hawksanddoves.js";
import {
  getAsrAvailableMap,
  getAsrPayoffMatrixMap,
  getAsrRulesetMap,
  getAsrStrategiesMap,
} from "./params/asrs.js";
import { getSpritesThemeMap } from "./params/sprites.js";

const findFoodAlgorithmMap = getFindFoodAlgorithmMap();
const foodsPlacementAlgorithmMap = getFoodsPlacementAlgorithmMap();
const subjectsPlacementAlgorithmMap = getSubjectsPlacementAlgorithmMap();
const asrAvailableMap = getAsrAvailableMap();
const asrPayoffMatrixMap = getAsrPayoffMatrixMap();
const asrRulesetMap = getAsrRulesetMap();
const hadPayoffMatrixMap = getHadPayoffMatrixMap();
const hadRulesetMap = getHadRulesetMap();
let spritesThemeMap;
let hadStrategiesMap;
let asrStrategiesMap;

const maxStartingSubjects = $fx.hash.startsWith("oo") ? 58 : 64;

export function getFindFoodAlgorithm(key) {
  return findFoodAlgorithmMap[key];
}

export function getHadRuleset(key) {
  return hadRulesetMap[key];
}

export function getHadPayoffMatrix(key) {
  return hadPayoffMatrixMap[key];
}

export function getHadStrategy(key) {
  return hadStrategiesMap[key];
}

export function getAsrAvailable(key) {
  return asrAvailableMap[key];
}

export function getAsrPayoffMatrix(key) {
  return asrPayoffMatrixMap[key];
}

export function getAsrRuleset(key) {
  return asrRulesetMap[key];
}

export function getAsrStrategy(key) {
  return asrStrategiesMap[key];
}

export function getFoodsPlacementAlgorithm(key) {
  return foodsPlacementAlgorithmMap[key];
}

export function getSubjectsPlacementAlgorithm(key) {
  return subjectsPlacementAlgorithmMap[key];
}

export function getSpritesTheme(key) {
  return spritesThemeMap[key];
}

export function getParamsStep4(params) {
  return {
    "spritesTheme": getSpritesTheme(params["spritesTheme"]),
    "had_ruleset": getHadRuleset(params["had_ruleset"]),
    "had_payoff_matrix": getHadPayoffMatrix(params["had_ruleset"]),
    "had_strategy": getHadStrategy(params["had_strategy"]),
    "asr_ruleset": getAsrRuleset(params["asr_ruleset"]),
    "asr_available": getAsrAvailable(params["asr_ruleset"]),
    "asr_payoff_matrix": getAsrPayoffMatrix(params["asr_ruleset"]),
    "asr_strategy": getAsrStrategy(params["asr_strategy"]),
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

export function getParamsStep1(names, ruleset) {
  hadStrategiesMap = getHadStrategiesMap(ruleset);
  asrStrategiesMap = getAsrStrategiesMap(ruleset);
  spritesThemeMap = getSpritesThemeMap(names);
  return [
    {
      "id": "had_ruleset",
      "name": "Hawk-dove ruleset",
      "type": "select",
      //~ "default": "Classic Hawks & Doves",
      "default": "ASR for Hawks & Doves",
      "options": {
        "options": Object.keys(hadRulesetMap),
      },
      //~ "update": "code-driven",
    },
    {
      "id": "had_strategy",
      "name": "Hawk-dove strategy",
      "type": "select",
      //~ "default": "Hereditary (no strategy)",
      "default": "Best payoff + genetics",
      "options": {
        "options": Object.keys(hadStrategiesMap),
      },
      //~ "update": "code-driven",
    },
    {
      "id": "asr_ruleset",
      "name": "ASR variant",
      "type": "select",
      //~ "default": "Walter Bradford Cannon's fight or flight response",
      "default": "Curtis Reisinger's 6F",
      "options": {
        "options": Object.keys(asrRulesetMap),
      },
      //~ "update": "code-driven",
    },
    {
      "id": "asr_strategy",
      "name": "ASR strategy",
      "type": "select",
      //~ "default": "Hereditary (no strategy)",
      "default": "Best payoff + genetics",
      "options": {
        "options": Object.keys(asrStrategiesMap),
      },
      //~ "update": "code-driven",
    },
    {
      "id": "sprites_theme",
      "name": "Sprites theme",
      "type": "select",
      "default": "Devils, Angels & Hearths",
      "options": {
        "options": Object.keys(spritesThemeMap),
      },
      //~ "update": "code-driven",
    },
    {
      "id": "food_find",
      "name": "Food finding algorithm",
      "type": "select",
      "default": "random",
      "options": {
        "options": Object.keys(findFoodAlgorithmMap),
      },
      //~ "update": "code-driven",
    },
    {
      "id": "subjects_placement",
      "name": "Subject placement algorithm",
      "type": "select",
      "default": "circle",
      "options": {
        "options": Object.keys(subjectsPlacementAlgorithmMap),
      },
      //~ "update": "code-driven",
    },
    {
      "id": "foods_placement",
      "name": "Food placement algorithm",
      "type": "select",
      "default": "circle",
      "options": {
        "options": Object.keys(foodsPlacementAlgorithmMap),
      },
      //~ "update": "code-driven",
    },
    {
      "id": "game_over_population",
      "name": "Population erradication causes game over?",
      "type": "boolean",
      "default": true,
      //~ "update": "code-driven",
    },
    {
      "id": "game_over_strategy",
      "name": "Strategy erradication causes game over?",
      "type": "boolean",
      "default": true,
      //~ "update": "code-driven",
    },
    {
      "id": "game_over_asr",
      "name": "ASR erradication causes game over?",
      "type": "boolean",
      "default": true,
      //~ "update": "code-driven",
    },
    {
      "id": "game_over_genetic",
      "name": "Single gene in gene pool causes game over?",
      "type": "boolean",
      "default": true,
      //~ "update": "code-driven",
    },
    {
      "id": "starting_subjects",
      "name": "Starting random individuals",
      "type": "number",
      "default": maxStartingSubjects,
      "options": {
        "min": 0,
        "max": maxStartingSubjects,
        "step": 1,
      },
      //~ "update": "code-driven",
    },
    {
      "id": "starting_hawks",
      "name": "Starting hawks",
      "type": "number",
      "default": 0,
      "options": {
        "min": 0,
        "max": 58,
        "step": 1,
      },
      //~ "update": "code-driven",
    },
    {
      "id": "starting_doves",
      "name": "Starting doves",
      "type": "number",
      "default": 0,
      "options": {
        "min": 0,
        "max": 58,
        "step": 1,
      },
      //~ "update": "code-driven",
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
      //~ "update": "code-driven",
    },
    {
      "id": "max_age",
      "name": "Longevity (zero is infinite)",
      "type": "number",
      "default": 1e3,
      "options": {
        "min": 0,
        "max": 1e3,
        "step": 1e1,
      },
      //~ "update": "code-driven",
    },
    {
      "id": "starting_food",
      "name": "Starting food % (relative to population)",
      "type": "number",
      "default": 100,
      "options": {
        "min": 0,
        "max": 200,
        "step": 1,
      },
      //~ "update": "code-driven",
    },
    {
      "id": "less_food_chance",
      "name": "Chance % to destroy one food",
      "type": "number",
      "default": 1,
      "options": {
        "min": 0,
        "max": 100,
        "step": 1,
      },
      //~ "update": "code-driven",
    },
    {
      "id": "more_food_chance",
      "name": "Chance % to create new food",
      "type": "number",
      "default": 1,
      "options": {
        "min": 0,
        "max": 1e2,
        "step": 1,
      },
      //~ "update": "code-driven",
    },
    {
      "id": "more_dove_chance",
      "name": "Chance % to spawn new dove",
      "type": "number",
      "default": 0,
      "options": {
        "min": 0,
        "max": 1e2,
        "step": 1,
      },
      //~ "update": "code-driven",
    },
    {
      "id": "more_hawk_chance",
      "name": "Chance % to spawn new hawk",
      "type": "number",
      "default": 0,
      "options": {
        "min": 0,
        "max": 1e2,
        "step": 1,
      },
      //~ "update": "code-driven",
    },
    {
      "id": "more_random_chance",
      "name": "Chance % to spawn new random individual",
      "type": "number",
      "default": 1,
      "options": {
        "min": 0,
        "max": 1e2,
        "step": 1,
      },
      //~ "update": "code-driven",
    },
    {
      "id": "age_color",
      "name": "Age graph color",
      "type": "color",
      //~ "update": "code-driven",
    },
    {
      "id": "gen_color",
      "name": "Generation graph color",
      "type": "color",
      //~ "update": "code-driven",
    },
    {
      "id": "population_color",
      "name": "Genetic population graph color",
      "type": "color",
      //~ "update": "code-driven",
    },
    {
      "id": "food_color",
      "name": "Graph color: Food",
      "type": "color",
      //~ "update": "code-driven",
    },
    {
      "id": "had_dove_color",
      "name": "Graph color: Dove",
      "type": "color",
      //~ "update": "code-driven",
    },
    {
      "id": "had_hawk_color",
      "name": "Graph color: Hawk",
      "type": "color",
      //~ "update": "code-driven",
    },
    {
      "id": "asr_fight_color",
      "name": "Graph color: ASR Fight",
      "type": "color",
      //~ "update": "code-driven",
    },
    {
      "id": "asr_flight_color",
      "name": "Graph color: ASR Flight",
      "type": "color",
      //~ "update": "code-driven",
    },
    {
      "id": "asr_freeze_color",
      "name": "Graph color: ASR Freeze",
      "type": "color",
      //~ "update": "code-driven",
    },
    {
      "id": "asr_fawn_color",
      "name": "Graph color: ASR Fawn",
      "type": "color",
      //~ "update": "code-driven",
    },
    {
      "id": "asr_flood_color",
      "name": "Graph color: ASR Flood",
      "type": "color",
      //~ "update": "code-driven",
    },
    {
      "id": "asr_fatigue_flop_color",
      "name": "Graph color: ASR Fatigue-Flop",
      "type": "color",
      //~ "update": "code-driven",
    },
  ];
}
