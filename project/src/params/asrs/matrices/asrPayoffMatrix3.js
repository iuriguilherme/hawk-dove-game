/**
 * @file asrPayoffMatrix3.js Pete Walker's complex PTSD for Hawk Dove Game  
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
 * @description Pete Walker's complex PTSD:
 * http://www.pete-walker.com/fourFs_TraumaTypologyComplexPTSD.htm
 * 
 * Response Type; Definition; May present as…; Mislabeled as…
 * Fight; posturing against or confronting the perceived threat.; explosive 
 *  outbursts, anger, defiance, or demanding.; Narcissistic  
 * Flight; fleeing or symbolically fleeing the perceived threat by way of a 
 *  “hyperactive” response.; anxiety, fidgeting, over-worrying, workaholic 
 *  tendencies, or fidgeting.; OCD  
 * Freeze; dissociating in response to the perceived threat.; spacing out, 
 *  losing time, feeling unreal, brain fog, or feeling numb.; Dissociative
 *  Disorder  
 * Fawn; Placating the perceived threat in an attempt to forestall imminent 
 *  danger.; People-pleasing, fear to express self, flattery, “yes” person, 
 *  exploitable, fear of fitting in; Codependent Disorder  
 */
export function asrPayoffMatrix3() {
  return {
    "survival": {
      "fight": {
        "fight": 0.5,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 1.0,
        "alone": 1.0,
      },
      "flight": {
        "fight": 1.0,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 1.0,
        "alone": 1.0,
      },
      "freeze": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 1.0,
        "alone": 1.0,
      },
      "fawn": {
        "fight": 1.0,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 1.0,
        "alone": 1.0,
      },
    },
    "reproduction": {
      "fight": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 0.5,
        "alone": 1.0,
      },
      "flight": {
        "fight": 0.0,
        "flight": 0.0,
        "freeze": 0.0,
        "fawn": 0.0,
        "alone": 1.0,
      },
      "freeze": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 0.5,
        "fawn": 0.25,
        "alone": 1.0,
      },
      "fawn": {
        "fight": 0.5,
        "flight": 1.0,
        "freeze": 0.75,
        "fawn": 0.5,
        "alone": 1.0,
      },
    },
  };
}

