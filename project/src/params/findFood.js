/**
 * @file findFood.js Food finding algorithms for Hawk Dove Game  
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

export const getFindFoodAlgorithmMap = function() {
  return {
    "random": findFoodAlgorithm1,
    "closest": findFoodAlgorithm2,
    "farthest": findFoodAlgorithm3,
  };
}

const minDistance = 20;

/*
 * @description Food finding method 1:
 *    Subject looks for a random free food until they find it, or an infinte 
 *    loop is reached.  
 */
function findFoodAlgorithm1(subjects, foods, math) {
  findFoodAlgorithmMain("random", subjects, foods, math);
}

/*
 * @description Food finding method 2:
 *    Subject looks for the closest free food.  
 */
function findFoodAlgorithm2(subjects, foods, math) {
  findFoodAlgorithmMain("closest", subjects, foods, math);
}

/*
 * @description Food finding method 3:
 *    Subject looks for the farthest free food.  
 */
function findFoodAlgorithm3(subjects, foods, math) {
  findFoodAlgorithmMain("farthest", subjects, foods, math);
}

function findFoodAlgorithmMain(selection, subjects, foods, math) {
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
        continue;
      }
      let metrics = {
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
      if (currentFood.getData("leftBusy") > -1) {
        if (currentFood.getData("rightBusy") > -1) {
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
