/**
 * @file strategies.js Strategy map for Hawk Dove Game  
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

import { strategy2 } from "./strategies/strategy2.js";
import { strategy3 } from "./strategies/strategy3.js";
import { strategy4 } from "./strategies/strategy4.js";
import { strategy5 } from "./strategies/strategy5.js";
import { strategy6 } from "./strategies/strategy6.js";
import { strategy7 } from "./strategies/strategy7.js";
import { strategy8 } from "./strategies/strategy8.js";
import { strategy9 } from "./strategies/strategy9.js";

export const getStrategiesMap = function(ruleset) {
  return {
    "Hereditary (no strategy)": strategy1,
    "Always Dove": strategy2,
    "Always Hawk": strategy3,
    "Nash equilibrium (WIP)": strategy4,
    "Best payoff": strategy5,
    "Pure opposites": strategy6,
    "Pure random": strategy7,
    "Pure genetic": strategy8,
    "Genetics + Best payoff": strategy9,
  };
}

/* 
 * Subjects will remain with the strategies they were born with, therefore no
 * logic is required
 */
function strategy1(kwargs) {}
