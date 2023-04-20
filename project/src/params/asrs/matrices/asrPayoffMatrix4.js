/**
 * @file asrPayoffMatrix4.js Curtis Reisinger's 6F for Hawk Dove Game  
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
 * @description Curtis Reisinger's 6F:
 * https://neuroclastic.com/the-6fs-of-trauma-responses/
 * 
 * Response Type; Definition; Other Clinical Terms Used
 * Flood; Being flooded with emotions in response to a perceived threat.; 
 *  Emotional flooding, emotional dysregulation  
 * Fatigue/Flop; Feeling tired or sleepy in response to a perceived threat.; 
 *  Disassociating, numbing  
 */
export function asrPayoffMatrix4() {
  return {
    "survival": {
      "fight": {
        "fight": 0.5,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 1.0,
        "flood": 1.0,
        "fatigue-flop": 1.0,
        "alone": 1.0,
      },
      "flight": {
        "fight": 1.0,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 1.0,
        "flood": 1.0,
        "fatigue-flop": 1.0,
        "alone": 1.0,
      },
      "freeze": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 1.0,
        "flood": 1.0,
        "fatigue-flop": 1.0,
        "alone": 1.0,
      },
      "fawn": {
        "fight": 1.0,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 1.0,
        "flood": 1.0,
        "fatigue-flop": 1.0,
        "alone": 1.0,
      },
      "flood": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 1.0,
        "flood": 1.0,
        "fatigue-flop": 1.0,
        "alone": 1.0,
      },
      "fatigue-flop": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 1.0,
        "flood": 1.0,
        "fatigue-flop": 1.0,
        "alone": 1.0,
      },
    },
    "reproduction": {
      "fight": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 0.5,
        "flood": 1.0,
        "fatigue-flop": 1.0,
        "alone": 1.0,
      },
      "flight": {
        "fight": 0.0,
        "flight": 0.0,
        "freeze": 0.0,
        "fawn": 0.0,
        "flood": 0.0,
        "fatigue-flop": 0.0,
        "alone": 1.0,
      },
      "freeze": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 0.5,
        "fawn": 0.25,
        "flood": 0.5,
        "fatigue-flop": 0.5,
        "alone": 1.0,
      },
      "fawn": {
        "fight": 0.5,
        "flight": 1.0,
        "freeze": 0.75,
        "fawn": 0.5,
        "flood": 0.75,
        "fatigue-flop": 0.75,
        "alone": 1.0,
      },
      "flood": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 0.5,
        "fawn": 0.25,
        "flood": 0.5,
        "fatigue-flop": 0.5,
        "alone": 1.0,
      },
      "fatigue-flop": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 0.5,
        "fawn": 0.25,
        "flood": 0.5,
        "fatigue-flop": 0.5,
        "alone": 1.0,
      },
    },
  };
}
