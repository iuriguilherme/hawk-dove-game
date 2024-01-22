/**
 * @file rulesetPayoffMatrix3.js Primer's modified Hawks & Doves ruleset for 
 *  Hawk Dove Game  
 * @copyright Iuri Guilherme 2023  
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

/**
 * @description Primer's modified Hawks & Doves payoff:
 * https://youtu.be/YNMkADpvO4w?t=629s
 * 
 * This ruleset is the same as ruleset2 but hawk vs hawk has 25% chance of 
 *  survival instead of 0%.
 * 
 * Youtube channel Primer defines that eating 100% of the food is needed for 
 *  reproduction and 50% is needed for survival. If a bird gets 25% of the 
 *  food, it'll have a 50% chance of surival, and if it gets 75% of the food,
 *  it has 50% chance of reproduction;
 * If a Hawk and a Dove meet, the Dove will have 50% chance of survival, while 
 *  the Hawk will have 100% chance of survival and 50% chance of reproduction,
 *  because the Hawk will eat 75% of the food, and the Dove will eat 25%;
 * If two Hawks meet, both have 25% chance of survival, because they will fight,
 *  wasting all energy and whatever food they eat is irrelevant;
 * If two Doves meet, they both have 100% chance of survival and 0% of chance 
 *  of reproduction, because both will share the food equally;
 * If a Hawk or a Dove finds a food alone, they have 100% of chance of 
 *  reproduction, because they'll eat all the food alone;
 */
export function rulesetPayoffMatrix3() {
  return {
    "survival": {
      "dove": {
        "dove": 1.0,
        "hawk": 0.5,
        "alone": 1.0,
      },
      "hawk": {
        "dove": 1.0,
        "hawk": 0.25,
        "alone": 1.0,
      },
    },
    "reproduction": {
      "dove": {
        "dove": 0.0,
        "hawk": 0.0,
        "alone": 1.0,
      },
      "hawk": {
        "dove": 0.5,
        "hawk": 0.0,
        "alone": 1.0,
      },
    },
  };
}
