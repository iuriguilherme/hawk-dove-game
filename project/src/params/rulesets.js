/**
 * @file rulesets.js Rulesets for Hawk Dove Game  
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

import { rulesetAlgorithm1 } from "./rulesets/ruleset1.js";
import { rulesetAlgorithm2 } from "./rulesets/ruleset2.js";
import { rulesetAlgorithm3 } from "./rulesets/ruleset3.js";
import { rulesetAlgorithm4 } from "./rulesets/ruleset4.js";
import { rulesetAlgorithm5 } from "./rulesets/ruleset5.js";

export const rulesetAlgorithmMap = {
  "classic": rulesetAlgorithm1,
  "classic + starvation": rulesetAlgorithm2,
  "primer #1": rulesetAlgorithm3,
  "primer #1 + starvation": rulesetAlgorithm4,
};
