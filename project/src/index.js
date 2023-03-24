/**!
 * @file Hawk Dove Game  
 * @version 0.6.1  
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
export const version = "0.6.1";

$fx.params([
  {
    "id": "growth_rate",
    "name": "Reproduction multiplier",
    "type": "number",
    "options": {
      "min": 0,
      "max": 10,
      "step": 1,
    },
  },
  {
    "id": "starting_food",
    "name": "Starting Food Rate",
    "type": "number",
    "options": {
      "min": 0,
      "max": 100,
      "step": 1,
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
  {
    "id": "hawk_string",
    "name": "Hawk label",
    "type": "string",
    "default": "hawk",
    "options": {
      "minLength": 1,
      "maxLength": 24,
    }
  },
  {
    "id": "dove_string",
    "name": "Dove label",
    "type": "string",
    "default": "dove",
    "options": {
      "minLength": 1,
      "maxLength": 24,
    }
  },
  {
    "id": "infinite",
    "name": "Keep simulating",
    "type": "boolean",
    "default": false,
  },
  {
    "id": "ruleset",
    "name": "Ruleset",
    "type": "select",
    "options": {
      "options": ["1"],
    }
  },
  {
    "id": "food_find",
    "name": "Food finding",
    "type": "select",
    "options": {
      "options": [
        "random",
        "closest",
        "farthest",
      ],
    }
  },
  {
    "id": "subjects_placement",
    "name": "Subject placement",
    "type": "select",
    "options": {
      "options": [
        "circle",
        "random",
      ],
    }
  },
  {
    "id": "foods_placement",
    "name": "Food placement",
    "type": "select",
    "options": {
      "options": [
        "circle",
        "random",
      ],
    }
  },
  {
    "id": "sprites_theme",
    "name": "Sprites theme",
    "type": "select",
    "options": {
      "options": [
        "Boy and Girl",
        "Devil and Angel",
        "Gimp and Lyx",
      ],
    }
  },
]);

$fx.features({
  //~ "A random feature": Math.floor($fx.rand() * 10),
  //~ "A random boolean": $fx.rand() > 0.5,
  //~ "A random string": ["A", "B", "C", "D"].at(Math.floor($fx.rand()*4)),
  //~ "Feature from params, its a number": $fx.getParam("number_id"),
  "Ruleset": $fx.getRawParam("ruleset"),
  "Starting food rate": $fx.getRawParam("starting_food") + "%",
  "Reproduction multiplier": $fx.getRawParam("growth_rate"),
  "Food finding algorithm": $fx.getRawParam("food_find"),
  "Subject placement algorithm": $fx.getRawParam("subjects_placement"),
  "Food placement algorithm": $fx.getRawParam("foods_placement"),
  "Sprites theme": $fx.getRawParam("sprites_theme"),
});

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
  fxArray,
} from "./util.js";

export const initialFoodRate = $fx.getRawParam("starting_food");
export const growthRate = $fx.getRawParam("growth_rate");
export const rulesetAlgorithm = rulesetAlgorithmMap[$fx.getRawParam("ruleset")];
export const findFoodAlgorithm = 
  findFoodAlgorithmMap[$fx.getRawParam("food_find")];
export const subjectsPlacementAlgorithm = 
  subjectsPlacementAlgorithmMap[$fx.getRawParam("subjects_placement")];
export const foodsPlacementAlgorithm = 
  foodsPlacementAlgorithmMap[$fx.getRawParam("foods_placement")];
export const hawkAndDove = [
  $fx.getRawParam("hawk_string"),
  $fx.getRawParam("dove_string"),
];
export const minDistance = 20;
export const startingSubjects = fxArray.length;

export function updateInjection() {
  $fx.preview();
};

export function getFxParam(param) {
  return $fx.getRawParam(param);
};

const spritesThemeMap = {
  "Boy and Girl": [
    {
      "key": hawkAndDove[0],
      "type": "svg",
      "file": "boy.svg",
      "scale": "1",
    },
    {
      "key": hawkAndDove[1],
      "type": "svg",
      "file": "girl.svg",
      "scale": "1",
    },
    {
      "key": "food",
      "type": "svg",
      "file": "heart.svg",
      "scale": "1",
    },
  ],
  "Devil and Angel": [
    {
      "key": hawkAndDove[0],
      "type": "svg",
      "file": "face-devilish-2.svg",
      "scale": "0.5",
    },
    {
      "key": hawkAndDove[1],
      "type": "svg",
      "file": "face-angel-2.svg",
      "scale": "0.5",
    },
    {
      "key": "food",
      "type": "svg",
      "file": "emblem-favorite-2.svg",
      "scale": "0.5",
    },
    //~ {
      //~ "key": "food",
      //~ "type": "image",
      //~ "file": "food-strawberry_with_light_shadow.png",
    //~ },
  ],
  "Gimp and Lyx": [
    {
      "key": hawkAndDove[0],
      "type": "svg",
      "file": "gimp-3.svg",
      "scale": "0.08",
    },
    {
      "key": hawkAndDove[1],
      "type": "svg",
      "file": "lyx.svg",
      "scale": "0.25",
    },
    {
      "key": "food",
      "type": "svg",
      "file": "applications-other-3.svg",
      "scale": "0.6",
    },
  ],
};

export const spritesTheme = spritesThemeMap[$fx.getRawParam("sprites_theme")];

phaserGame.scale.setMaxZoom();

window.addEventListener(
  "resize",
  phaserGame.scale.setMaxZoom()
);

document.body.style.background = "#e8e8e8";

console.log(
`[${name} v${version}]` + "\n",
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
"fx(params) Keep simulating: " + 
  $fx.getParam("infinite") + 
  "\n",
);

console.log(`[${name} v${version}] fully loaded and working properly!`);
