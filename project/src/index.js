/**!
 * @file Hawk Dove Game  
 * @version 0.15.1  
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

$fx.params([
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
  {
    "id": "sprites_theme",
    "name": "Sprites theme",
    "type": "select",
    "options": {
      "options": [
        "Boys, Girls & Hearths",
        "Devils, Angels & Hearths",
        "Gimps, Lyxes & Files",
        "Eagles, Doves & Apples",
        "Spiders, Ants & Leaves",
        "Hornet, Butterfly & Flowers",
        "Crow, Hummingbird & Blackberries",
        "Octopuses, Whales & Blowfishes",
        "Bears, Beavers & Acorns",
        "Goats, Elephants & Kiwis",
        "Owls, Penguins & Grapes",
        "Windows, Debian & Files",
        "Proprietary, Kopimi & Code",
      ],
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
]);

export const name = "hawk-dove-game";
export const version = "0.15.1";

import { create as mcreate, all as mall } from "mathjs";
const math = mcreate(mall, {});

import {
  getFindFoodAlgorithm,
  getFoodsPlacementAlgorithm,
  getParamsStep1,
  getParamsStep2,
  getParamsStep3,
  getRuleset,
  getSpritesTheme,
  getStrategy,
  getSubjectsPlacementAlgorithm,
} from "./params.js";

export const names = {
  //~ "food": $fx.getParam("food_string"),
  "food": "food",
  "strategies": {
    //~ "dove": $fx.getParam("dove_string"),
    "dove": "dove",
    //~ "hawk": $fx.getParam("hawk_string"),
    "hawk": "hawk",
  },
};
getParamsStep1(names);
getParamsStep2(names);
getParamsStep3("static");
//~ $fx.params(getParamsStep1(names));
export const strategiesNames = Object.keys(names["strategies"]);
export const graphColors = {
  "population": {
    [names["food"]]: $fx.getParam("food_color").hex.rgb,
    [names["strategies"]["dove"]]: $fx.getParam("dove_color").hex.rgb,
    [names["strategies"]["hawk"]]: $fx.getParam("hawk_color").hex.rgb,
  },
  "genetic": $fx.getParam("population_color").hex.rgb,
  "age": $fx.getParam("age_color").hex.rgb,
  "generation": $fx.getParam("gen_color").hex.rgb,
};
//~ $fx.params($fx.getDefinitions().concat(getParamsStep2(names)));

export const spritesTheme = getSpritesTheme($fx.getParam("sprites_theme"));
export const ruleset = getRuleset($fx.getParam("ruleset"));
//~ $fx.params($fx.getDefinitions().concat(getParamsStep3(
  //~ $fx.getParam("ruleset"))));

export const strategy = getStrategy($fx.getParam("strategy"));

export const findFoodAlgorithm = 
  getFindFoodAlgorithm($fx.getParam("food_find"));
export const foodsPlacementAlgorithm = 
  getFoodsPlacementAlgorithm($fx.getParam("foods_placement"));
export const growthRate = $fx.getParam("growth_rate");
export const gameOverGenetic = $fx.getParam("game_over_genetic");
export const gameOverPopulation = $fx.getParam("game_over_population");
export const gameOverStrategy = $fx.getParam("game_over_strategy");
export const initialFoodRate = $fx.getParam("starting_food");
export const lessFoods = $fx.getParam("less_food_chance");
export const maxAge = $fx.getParam("max_age");
export const moreDoves = $fx.getParam("more_dove_chance");
export const moreFoods = $fx.getParam("more_food_chance");
export const moreHawks = $fx.getParam("more_hawk_chance");
export const moreSubjects = $fx.getParam("more_random_chance");
export const startingDoves = $fx.getParam("starting_doves");
export const startingHawks = $fx.getParam("starting_hawks");
export const startingSubjects = $fx.getParam("starting_subjects");
export const subjectsPlacementAlgorithm = 
  getSubjectsPlacementAlgorithm($fx.getParam("subjects_placement"));

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

import {
  charts,
  phaserGame,
} from "./game.js";

import {
  graphsDivs,
} from "./html.js";

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
