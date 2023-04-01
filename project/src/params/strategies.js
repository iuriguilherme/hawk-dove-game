/**
 * @file strategies.js Strategy map for Hawk Dove Game  
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

import { strategy2 } from "./strategies/strategy2.js";
import { strategy3 } from "./strategies/strategy3.js";
import { strategy4 } from "./strategies/strategy4.js";

export const getStrategiesMap = function(ruleset) {
  //~ console.log(ruleset);
  switch (ruleset) {
    case "static":
      return {
        "Hereditary": strategy1,
        "Doves": strategy2,
        "Hawks": strategy3,
        "Nash equilibrium": strategy4,
      };
    case "Classic Hawks & Doves":
      return {
        "Hereditary": strategy1,
      };
      break;
    case "Primer's Hawks & Doves":
      return {
        "Hereditary": strategy1,
        "Doves": strategy2,
        "Hawks": strategy3,
        "Nash equilibrium": strategy4,
      };
      break;
    case "Primer's modified Hawks & Doves":
      return {
        "Hereditary": strategy1,
        "Doves": strategy2,
        "Hawks": strategy3,
        "Nash equilibrium": strategy4,
      };
      break;
    default:
      return {
        "Hereditary": strategy1,
      };
  }
}

/* 
 * Subjects will remain with the strategies they were born with, therefore no
 * logic is required
 */
function strategy1() {}
