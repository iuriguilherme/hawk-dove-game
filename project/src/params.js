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

import { create, all } from "mathjs";
const math = create(all, {});
import Phaser from "phaser";

import {
  subjects,
  foods,
  subjectsCircle,
  foodsCircle,
} from "./game.js";

import { rulesetAlgorithm1 } from "./rulesets/ruleset1.js";
import { rulesetAlgorithm2 } from "./rulesets/ruleset2.js";
import { rulesetAlgorithm3 } from "./rulesets/ruleset3.js";
import { rulesetAlgorithm4 } from "./rulesets/ruleset4.js";

const minDistance = 20;

export const rulesetAlgorithmMap = {
  "classic": rulesetAlgorithm1,
  "classic + starvation": rulesetAlgorithm2,
  "primer #1": rulesetAlgorithm3,
  "primer #1 + starvation": rulesetAlgorithm4,
};

export const findFoodAlgorithmMap = {
  "random": findFoodAlgorithm1,
  "closest": findFoodAlgorithm2,
  "farthest": findFoodAlgorithm3,
};

export const subjectsPlacementAlgorithmMap = {
  "circle": subjectsPlacementAlgorithm1,
  "random": subjectsPlacementAlgorithm2,
};

export const foodsPlacementAlgorithmMap = {
  "circle": foodsPlacementAlgorithm1,
  "random": foodsPlacementAlgorithm2,
};

/*
 * @description Subject placement method 1:
 *    Subjects are placed distributed in a circle.  
 */
function subjectsPlacementAlgorithm1() {
  Phaser.Actions.PlaceOnCircle(subjects.getChildren(), subjectsCircle);
}

/*
 * @description Subjects placement method 2:
 *    Subjects are placed randomly inside the subject circle.  
 */
function subjectsPlacementAlgorithm2() {
  Phaser.Actions.RandomCircle(subjects.getChildren(), subjectsCircle);
}

/*
 * @description Food placement method 1:
 *    Foods are placed distributed in a inner circle, smaller than the 
 *    subjects circle.  
 */
function foodsPlacementAlgorithm1() {
  Phaser.Actions.PlaceOnCircle(foods.getChildren(), foodsCircle);
}

/*
 * @description Food placement method 2:
 *    Foods are placed randomly inside the subject circle.  
 */
function foodsPlacementAlgorithm2() {
  Phaser.Actions.RandomCircle(foods.getChildren(), foodsCircle);
}

function findFoodAlgorithmMain(selection) {
  let s = subjects.getChildren();
  let f = foods.getChildren();
  let distances = [];
  for (let i = 0; i < s.length; i++) {
    distances[i] = [];
    for (let j = 0; j < f.length; j++) {
      distances[i][j] = Phaser.Math.Distance.Between(
        s[i].x, s[i].y, f[j].x, f[j].y);
    }
    while (s[i].getData("waiting")) {
      if (distances[i].length == 0) {
        s[i].setData({
          "dead": true,
          "waiting": false,
        });
        break;
      }
      let metrics = {
        //~ "random_old": distances[i].indexOf(math.pickRandom(distances[i])),
        "random": distances[i].indexOf(distances[i][math.floor($fx.rand() * 
          distances[i].length)]),
        "closest": distances[i].indexOf(math.min(distances[i])),
        "farthest": distances[i].indexOf(math.max(distances[i])),
      };
      let foodMap = {
        "random": f[metrics["random"]],
        "closest": f[metrics["closest"]],
        "farthest": f[metrics["farthest"]],
      };
      let currentFood = foodMap[selection];
      let currentMetric = metrics[selection];
      if (currentFood.getData("leftBusy")) {
        if (currentFood.getData("rightBusy")) {
          distances[i].splice(currentMetric, 1);
        } else {
          s[i].x = currentFood.x + minDistance;
          s[i].y = currentFood.y - minDistance;
          currentFood.setData({"rightBusy": i});
          s[i].setData({"waiting": false, "eating": true});
        }
      } else {
        s[i].x = currentFood.x - minDistance;
        s[i].y = currentFood.y - minDistance;
        currentFood.setData({"leftBusy": i});
        s[i].setData({"waiting": false, "eating": true});
      }
    }
  }
}

/*
 * @description Food finding method 1:
 *    Subject looks for a random free food until they find it, or an infinte 
 *    loop is reached.  
 */
function findFoodAlgorithm1() {
  findFoodAlgorithmMain("random");
}

/*
 * @description Food finding method 2:
 *    Subject looks for the closest free food.  
 */
function findFoodAlgorithm2() {
  findFoodAlgorithmMain("closest");
}

/*
 * @description Food finding method 3:
 *    Subject looks for the farthest free food.  
 */
function findFoodAlgorithm3() {
  findFoodAlgorithmMain("farthest");
}
