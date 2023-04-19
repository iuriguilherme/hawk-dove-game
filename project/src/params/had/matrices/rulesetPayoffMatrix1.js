/**
 * @file rulesetPayoffMatrix1.js Classic ruleset for Hawk Dove Game  
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
 * @description Classic ruleset:
 * https://college.holycross.edu/faculty/kprestwi/behavior/ESS/HvD_intro.html
 * 
 * If two Hawks met, one of them eats all the food and reproduce, while the 
 *  other one dies;
 * If two Doves met, they share the food and don't reproduce;
 * If one Hawk and one Dove met, the Hawk eats all the food alone and 
 *  reproduce, while the Dove flees, surviving but not reproducing;
 * If only one Bird finds a food, then it eats all of it and reproduce;
 * Food suply is constant and fixed;
 * If a bird is alone in it's group (only one hawk or dove), it reproduces 
 *  once.
 */
export function rulesetPayoffMatrix1() {
  return {
    "survival": {
      "dove": {
        "dove": 1.0,
        "hawk": 1.0,
        "alone": 1.0,
      },
      "hawk": {
        "dove": 1.0,
        "hawk": 0.5,
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
        "dove": 1.0,
        "hawk": 0.5,
        "alone": 1.0,
      },
    },
  };
}
