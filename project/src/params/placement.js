/**
 * @file placement.js Sprites placement algorithms for Hawk Dove Game  
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

import Phaser from "phaser";

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
function subjectsPlacementAlgorithm1(
  subjects,
  foods,
  subjectsCircle,
  foodsCircle,
) {
  Phaser.Actions.PlaceOnCircle(subjects.getChildren(), subjectsCircle);
}

/*
 * @description Subjects placement method 2:
 *    Subjects are placed randomly inside the subject circle.  
 */
function subjectsPlacementAlgorithm2(
  subjects,
  foods,
  subjectsCircle,
  foodsCircle,
) {
  Phaser.Actions.RandomCircle(subjects.getChildren(), subjectsCircle);
}

/*
 * @description Food placement method 1:
 *    Foods are placed distributed in a inner circle, smaller than the 
 *    subjects circle.  
 */
function foodsPlacementAlgorithm1(
  subjects,
  foods,
  subjectsCircle,
  foodsCircle,
) {
  Phaser.Actions.PlaceOnCircle(foods.getChildren(), foodsCircle);
}

/*
 * @description Food placement method 2:
 *    Foods are placed randomly inside the subject circle.  
 */
function foodsPlacementAlgorithm2(
  subjects,
  foods,
  subjectsCircle,
  foodsCircle,
) {
  Phaser.Actions.RandomCircle(foods.getChildren(), foodsCircle);
}
