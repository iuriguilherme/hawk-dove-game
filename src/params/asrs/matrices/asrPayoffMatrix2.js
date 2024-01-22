/**
 * @file asrPayoffMatrix2.js Stephen Porges' polyvagal theory for Hawk Dove 
 *  Game  
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
 * @description Stephen Porges' polyvagal theory:
 * https://en.wikipedia.org/wiki/Polyvagal_theory
 * 
 * Response Type: Definition
 * Fight: Confronting the  perceived threat
 * Flight: Fleeing the perceived threat
 * Freeze: Immobilizing in light of the perceived threat
 */
export function asrPayoffMatrix2() {
  return {
    "survival": {
      "fight": {
        "fight": 0.5,
        "flight": 1.0,
        "freeze": 1.0,
        "alone": 1.0,
      },
      "flight": {
        "fight": 1.0,
        "flight": 1.0,
        "freeze": 1.0,
        "alone": 1.0,
      },
      "freeze": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 1.0,
        "alone": 1.0,
      },
    },
    "reproduction": {
      "fight": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 1.0,
        "alone": 1.0,
      },
      "flight": {
        "fight": 0.0,
        "flight": 0.0,
        "freeze": 0.0,
        "alone": 1.0,
      },
      "freeze": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 0.5,
        "alone": 1.0,
      },
    },
  };
}

