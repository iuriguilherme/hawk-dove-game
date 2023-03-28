/**
 * @file genes.js Genetics data for Hawk Dove Game  
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

import {
  properAlphabet,
} from "./util.js";

export var gData = {};

for (let i = 0; i < properAlphabet.length; i++) {
  let weight = Array.from(fxhashTrunc).filter(
    n => n == properAlphabet[i]).length;
  gData[properAlphabet[i]] = {
    "S": $fx.rand() * weight,
    "P": $fx.rand() * weight,
    "E": $fx.rand() * weight,
    "C": $fx.rand() * weight,
    "I": $fx.rand() * weight,
    "A": $fx.rand() * weight,
    "L": $fx.rand() * weight,
  };
}
