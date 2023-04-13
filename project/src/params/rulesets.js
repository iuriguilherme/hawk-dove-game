/**
 * @file rulesets.js Rulesets for Hawk Dove Game  
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

import { ruleset1, payoffMatrix1 } from "./rulesets/ruleset1.js";
import { ruleset2, payoffMatrix2 } from "./rulesets/ruleset2.js";
import { ruleset3, payoffMatrix3 } from "./rulesets/ruleset3.js";
//~ import { ruleset4, payoffMatrix4 } from "./rulesets/ruleset4.js";

export const getRulesetMap = function() {
  return {
    "Classic Hawks & Doves": ruleset1,
    "Primer's Hawks & Doves": ruleset2,
    "Primer's modified Hawks & Doves": ruleset3,
    //~ "Primer's Youtube comments": ruleset4,
  };
}

export const getPayoffMatrixMap = function() {
  return {
    "Classic Hawks & Doves": payoffMatrix1,
    "Primer's Hawks & Doves": payoffMatrix2,
    "Primer's modified Hawks & Doves": payoffMatrix3,
    //~ "Primer's Youtube comments": payoffMatrix4,
  };
}
