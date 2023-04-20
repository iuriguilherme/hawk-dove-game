/**
 * @file asrs.js Flight or Flight Response for Hawk Dove Game  
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
 * https://en.wikipedia.org/wiki/Fight-or-flight_response
 * https://en.wikipedia.org/wiki/Post-traumatic_stress_disorder
 * https://en.wikipedia.org/wiki/Acute_stress_disorder
 * https://neuroclastic.com/the-6fs-of-trauma-responses/
 */

import { asrRuleset1, asrAvailable1 } from "./asrs/rulesets/asrRuleset1.js";
import { asrRuleset2, asrAvailable2 } from "./asrs/rulesets/asrRuleset2.js";
import { asrRuleset3, asrAvailable3 } from "./asrs/rulesets/asrRuleset3.js";
import { asrRuleset4, asrAvailable4 } from "./asrs/rulesets/asrRuleset4.js";

import { asrPayoffMatrix1 } from "./asrs/matrices/asrPayoffMatrix1.js";
import { asrPayoffMatrix2 } from "./asrs/matrices/asrPayoffMatrix2.js";
import { asrPayoffMatrix3 } from "./asrs/matrices/asrPayoffMatrix3.js";
import { asrPayoffMatrix4 } from "./asrs/matrices/asrPayoffMatrix4.js";

import { asrStrategy2 } from "./asrs/strategies/asrStrategy2.js";
import { asrStrategy3 } from "./asrs/strategies/asrStrategy3.js";
import { asrStrategy4 } from "./asrs/strategies/asrStrategy4.js";
import { asrStrategy5 } from "./asrs/strategies/asrStrategy5.js";

export const getAsrRulesetMap = function() {
  return {
    "Walter Bradford Cannon's fight or flight response": asrRuleset1,
    "Stephen Porges' polyvagal theory": asrRuleset2,
    "Pete Walker's complex PTSD": asrRuleset3,
    "Curtis Reisinger's 6F": asrRuleset4,
  };
}

export const getAsrAvailableMap = function() {
  return {
    "Walter Bradford Cannon's fight or flight response": asrAvailable1,
    "Stephen Porges' polyvagal theory": asrAvailable2,
    "Pete Walker's complex PTSD": asrAvailable3,
    "Curtis Reisinger's 6F": asrAvailable4,
  };
}

export const getAsrPayoffMatrixMap = function() {
  return {
    "Walter Bradford Cannon's fight or flight response": asrPayoffMatrix1,
    "Stephen Porges' polyvagal theory": asrPayoffMatrix2,
    "Pete Walker's complex PTSD": asrPayoffMatrix3,
    "Curtis Reisinger's 6F": asrPayoffMatrix4,
  };
}

export const getAsrStrategiesMap = function() {
  return {
    "Hereditary (no strategy)": asrStrategy1,
    "Best payoff + genetics": asrStrategy2,
    "Best payoff": asrStrategy3,
    "Pure genetics": asrStrategy4,
    "Random": asrStrategy5,
  }
}

function asrStrategy1(kwargs) {}
