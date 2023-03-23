/**!
 * @file Hawk Dove Game  
 * @version 0.5.0  
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
const version = "0.5.0";

$fx.params([
  {
    id: "growth_rate",
    name: "Reproduction multiplier",
    type: "number",
    options: {
      min: 0,
      max: 10,
      step: 1,
    },
  },
  {
    id: "starting_food",
    name: "Starting Food Rate",
    type: "number",
    options: {
      min: 0,
      max: 100,
      step: 1,
    },
  },
  //~ {
    //~ id: "bigint_id",
    //~ name: "A bigint",
    //~ type: "bigint",
    //~ //default: BigInt(Number.MAX_SAFE_INTEGER * 2),
    //~ options: {
      //~ min: Number.MIN_SAFE_INTEGER * 4,
      //~ max: Number.MAX_SAFE_INTEGER * 4,
      //~ step: 1,
    //~ },
  //~ },
  //~ {
    //~ id: "color_id",
    //~ name: "A color",
    //~ type: "color",
    //~ //default: "ff0000",
  //~ },
  //~ {
    //~ id: "boolean_id",
    //~ name: "A boolean",
    //~ type: "boolean",
    //~ //default: true,
  //~ },
  //~ {
    //~ id: "string_id",
    //~ name: "A string",
    //~ type: "string",
    //~ //default: "hello",
    //~ options: {
      //~ minLength: 1,
      //~ maxLength: 64
    //~ }
  //~ },
  {
    id: "ruleset",
    name: "Ruleset",
    type: "select",
    options: {
      options: ["1"],
    }
  },
  {
    id: "food_find",
    name: "Food finding",
    type: "select",
    options: {
      options: [
        "random",
        "closest",
        "farthest",
      ],
    }
  },
  {
    id: "subjects_placement",
    name: "Subject placement",
    type: "select",
    options: {
      options: [
        "circle",
        "random",
      ],
    }
  },
  {
    id: "foods_placement",
    name: "Food placement",
    type: "select",
    options: {
      options: [
        "circle",
        "random",
      ],
    }
  },
]);

// this is how features can be defined
$fx.features({
  //~ "A random feature": Math.floor($fx.rand() * 10),
  //~ "A random boolean": $fx.rand() > 0.5,
  //~ "A random string": ["A", "B", "C", "D"].at(Math.floor($fx.rand()*4)),
  //~ "Feature from params, its a number": $fx.getParam("number_id"),
  "Ruleset": $fx.getRawParam("ruleset"),
  "Starting Food Rate": $fx.getRawParam("starting_food") + "%",
  "Reproduction Multiplier": $fx.getRawParam("growth_rate"),
  "Food finding algorithm": $fx.getRawParam("food_find"),
  "Subject placement algorithm": $fx.getRawParam("subjects_placement"),
  "Food placement algorithm": $fx.getRawParam("foods_placement"),
})

import Chart from "chart.js/auto";
import { create as mcreate, all as mall } from "mathjs";
const math = mcreate(mall, {});
import Phaser from "phaser";
//~ import p5 from "p5";
//~ import Plotly from "plotly.js-dist-min";

//~ import {
  //~ sleep,
  //~ properAlphabet,
  //~ alphabetArray,
  //~ hawkAndDove,
  //~ minDistance,
  //~ fxArray,
  //~ startingSubjects,
//~ } from "./config.js";

//~ import {
  //~ fxHashDecimal,
  //~ base58toDecimal,
  //~ fxHashToVariant,
//~ } from "./util.js";

import {
  foodsPlacementAlgorithmMap,
  subjectsPlacementAlgorithmMap,
  findFoodAlgorithmMap,
  rulesetAlgorithmMap,
} from "./params.js";

import {
  phaserGame,
} from "./game.js";

import {
  graphsCanvas,
} from "./charts.js";

export const initialFoodRate = $fx.getRawParam("starting_food");
export const growthRate = $fx.getRawParam("growth_rate");

//~ const rulesetNumber = math.max(1, fxHashToVariant(fxhashDecimal,
  //~ rulesetMap.length));
//~ const ruleset = rulesetMap[rulesetNumber];
export const rulesetAlgorithm = rulesetAlgorithmMap[$fx.getRawParam("ruleset")];
export const findFoodAlgorithm = 
  findFoodAlgorithmMap[$fx.getRawParam("food_find")];
export const subjectsPlacementAlgorithm = 
  subjectsPlacementAlgorithmMap[$fx.getRawParam("subjects_placement")];
export const foodsPlacementAlgorithm = 
  foodsPlacementAlgorithmMap[$fx.getRawParam("foods_placement")];

window.addEventListener(
  "resize",
  phaserGame.scale.setMaxZoom()
);

document.body.style.background = "#e8e8e8";

//~ console.log(fxhash)
//~ console.log(fxrand())

// log the parameters, for debugging purposes, artists won't have to do that
//~ console.log("Current param values:")
// Raw deserialize param values 
//~ console.log($fx.getRawParams())
// Added addtional transformation to the parameter for easier usage
// e.g. color.hex.rgba, color.obj.rgba.r, color.arr.rgb[0] 
//~ console.log($fx.getParams())

// how to read a single raw parameter
//~ console.log("Single raw value:")
//~ console.log($fx.getRawParam("color_id"));
// how to read a single transformed parameter
//~ console.log("Single transformed value:")
//~ console.log($fx.getParam("color_id"));

// update the document based on the parameters
//~ document.body.style.background = $fx.getParam("color_id").hex.rgba
//~ document.body.innerHTML = `
//~ <p>
//~ url: ${window.location.href}
//~ </p>
//~ <p>
//~ hash: ${$fx.hash}
//~ </p>
//~ <p>
//~ params:
//~ </p>
//~ <pre>
//~ ${$fx.stringifyParams($fx.getRawParams())}
//~ </pre>
//~ <pre style="color: white;">
//~ ${$fx.stringifyParams($fx.getRawParams())}
//~ </pre>
//~ `

console.log(
`[${name}] v${version}` + "\n",
"fx(hash): " + fxhashTrunc + "\n",
"fx(params) Current ruleset: " + 
  $fx.getParam("ruleset") + 
  ` (${rulesetAlgorithm.name})` + 
  "\n",
"fx(params) Starting Food Rate: " + 
  $fx.getParam("starting_food") + 
  "%" + 
  "\n",
"fx(params) Reproduction Multiplier: " + 
  $fx.getParam("growth_rate") + 
  "\n",
"fx(params) Food finding algorithm: " + 
  $fx.getParam("food_find") + 
  ` (${findFoodAlgorithm.name})` + 
  "\n",
"fx(params) Subject placing algorithm: " + 
  $fx.getParam("subjects_placement") + 
  ` (${subjectsPlacementAlgorithm.name})` + 
  "\n",
"fx(params) Food placing algorithm: " + 
  $fx.getParam("foods_placement") + 
  ` (${foodsPlacementAlgorithm.name})` + 
  "\n",
);

console.log(`[OK] ${name} v${version} fully loaded and working properly!`);
