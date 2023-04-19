/**
 * @file hawksanddoves.js Strategies and rulesets for Hawk Dove Game  
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

import { ruleset1 } from "./had/rulesets/ruleset1.js";
import { ruleset2 } from "./had/rulesets/ruleset2.js";
import { ruleset3 } from "./had/rulesets/ruleset3.js";
//~ import { ruleset4, rulesetPayoffMatrix4 } from "./had/rulesets/ruleset4.js";
import { ruleset5 } from "./had/rulesets/ruleset5.js";

import { rulesetPayoffMatrix1 } from "./had/matrices/rulesetPayoffMatrix1.js";
import { rulesetPayoffMatrix2 } from "./had/matrices/rulesetPayoffMatrix2.js";
import { rulesetPayoffMatrix3 } from "./had/matrices/rulesetPayoffMatrix3.js";

import { strategy2 } from "./had/strategies/strategy2.js";
import { strategy3 } from "./had/strategies/strategy3.js";
import { strategy4 } from "./had/strategies/strategy4.js";
import { strategy5 } from "./had/strategies/strategy5.js";
import { strategy6 } from "./had/strategies/strategy6.js";
import { strategy7 } from "./had/strategies/strategy7.js";
import { strategy8 } from "./had/strategies/strategy8.js";
import { strategy9 } from "./had/strategies/strategy9.js";

export const getHadRulesetMap = function() {
  return {
    "Classic Hawks & Doves": ruleset1,
    "Primer's Hawks & Doves": ruleset2,
    "Primer's modified Hawks & Doves": ruleset3,
    //~ "Primer's Youtube comments": ruleset4,
    "ASR for Hawks & Doves": ruleset5,
  };
}

export const getHadPayoffMatrixMap = function() {
  return {
    "Classic Hawks & Doves": rulesetPayoffMatrix1,
    "Primer's Hawks & Doves": rulesetPayoffMatrix2,
    "Primer's modified Hawks & Doves": rulesetPayoffMatrix3,
    //~ "Primer's Youtube comments": rulesetPayoffMatrix4,
    "ASR for Hawks & Doves": rulesetPayoffMatrix1,
  };
}

export const getHadStrategiesMap = function(ruleset) {
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
