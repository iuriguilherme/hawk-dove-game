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

const minDistance = 20;

export const rulesetAlgorithmMap = {
  "classic": rulesetAlgorithm1,
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
          "waiting": false
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

/*
 * @description Ruleset 1:
 * If two Hawks met, one of them eats all the food and reproduce, while the 
 *  other one dies;
 * If two Doves met, they share the food and don't reproduce;
 * If one Hawk and one Dove met, the Hawk eats all the food alone and 
 *  reproduce, while the Dove flees, surviving but not reproducing;
 * If only one Bird finds a food, then it eats all of it and reproduce;
 * Food suply is constant and fixed;
 * If a bird is alone in it's group (only one hawk or dove), it reproduces 
 *  once.
 * https://college.holycross.edu/faculty/kprestwi/behavior/ESS/HvD_intro.html
 */
function rulesetAlgorithm1() {
  let s = subjects.getChildren();
  let f = foods.getChildren();
  for (let i = 0; i < f.length; i++) {
    //~ console.log(i);
    if (f[i].getData("leftBusy")) {
      //~ console.log("left populated");
      if (f[i].getData("rightBusy")) {
        //~ console.log("right populated");
        if (s[f[i].getData("leftBusy")].getData("r") == "hawk") {
          //~ console.log("left is hawk");
          if (s[f[i].getData("rightBusy")].getData("r") == "hawk") {
            //~ console.log("left and right two hawks. will fight...");
            if (math.floor($fx.rand() * 2)) {
              //~ console.log("left hawk wins");
              s[f[i].getData("rightBusy")].setData({
                "dead": true,
                "eating": false
              });
              s[f[i].getData("rightBusy")].setTexture("dead");
              s[f[i].getData("leftBusy")].setData({
                "strong": true,
                "eating": false
              });
              s[f[i].getData("leftBusy")].setTexture("strong");
            } else {
              //~ console.log("right hawk wins");
              s[f[i].getData("leftBusy")].setData({
                "dead": true,
                "eating": false
              });
              s[f[i].getData("leftBusy")].setTexture("dead");
              s[f[i].getData("rightBusy")].setData({
                "strong": true,
                "eating": false
              });
              s[f[i].getData("rightBusy")].setTexture("strong");
            }
          } else {
            //~ console.log("right is dove, hawk and dove");
            s[f[i].getData("leftBusy")].setData({
              "strong": true,
              "eating": false
            });
            s[f[i].getData("leftBusy")].setTexture("strong");
            s[f[i].getData("rightBusy")].setData({
              "fleeing": true,
              "eating": false
            });
            s[f[i].getData("rightBusy")].setTexture("fleeing");
          }
        } else {
          //~ console.log("left is dove");
          if (s[f[i].getData("rightBusy")].getData("r") == "hawk") {
            //~ console.log("right is hawk, dove and hawk");
            s[f[i].getData("leftBusy")].setData({
              "fleeing": true,
              "eating": false
            });
            s[f[i].getData("leftBusy")].setTexture("fleeing");
            s[f[i].getData("rightBusy")].setData({
              "strong": true,
              "eating": false
            });
            s[f[i].getData("rightBusy")].setTexture("strong");
          } else {
            //~ console.log("right is dove, dove and dove");
            s[f[i].getData("leftBusy")].setData({
              "eating": false
            });
            s[f[i].getData("rightBusy")].setData({
              "eating": false
            });
          }
        }
      } else {
        //~ console.log("no one on right");
        if (s[f[i].getData("leftBusy")].getData("r") == "hawk") {
          //~ console.log("left is hawk, hawk alone");
          s[f[i].getData("leftBusy")].setData({
            "strong": true,
            "eating": false
          });
          s[f[i].getData("leftBusy")].setTexture("strong");
        } else {
          //~ console.log("left is dove, dove alone");
          s[f[i].getData("leftBusy")].setData({
            "strong": true,
            "eating": false
          });
          s[f[i].getData("leftBusy")].setTexture("strong");
        }
      }
    } else {
      //~ console.log("no one on left");
      if (f[i].getData("rightBusy")) {
        if (s[f[i].getData("rightBusy")].getData("r")) {
          //~ console.log("right is hawk, hawk alone");
          s[f[i].getData("rightBusy")].setData({
            "strong": true,
            "eating": false
          });
          s[f[i].getData("rightBusy")].setTexture("strong");
        } else {
          //~ console.log("right is dove, dove alone");
          s[f[i].getData("rightBusy")].setData({
            "strong": true,
            "eating": false
          });
          s[f[i].getData("rightBusy")].setTexture("strong");
        }
      } else {
        //~ console.log("Food is alone");
        f[i].setTint(0xff0000);
      }
    }
    //~ for (let j = 0; j < s.length; j++) {
      //~ if (s[j].getData("eating")) {
        //~ s[i].setData({
          //~ "dead": true,
          //~ "eating": false
        //~ });
      //~ }
    //~ }
  }
}
