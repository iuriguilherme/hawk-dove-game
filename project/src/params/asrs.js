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

import { asr1, asrPayoffMatrix1 } from "./asrs/asr1.js";
import { asr2, asrPayoffMatrix2 } from "./asrs/asr2.js";
import { asr3, asrPayoffMatrix3 } from "./asrs/asr3.js";
import { asr4, asrPayoffMatrix4 } from "./asrs/asr4.js";

export const getAsrMap = function() {
  return {
    "Cannon's Fight or Flight Response": asr1,
    "Porges' 3F": asr2,
    "Walker's 4F": asr3,
    "Reisinger's 6F": asr4,
  };
}

export const getAsrPayoffMatrixMap = function() {
  return {
    "Cannon's Fight or Flight Response": asrPayoffMatrix1,
    "Porges' 3F": asrPayoffMatrix2,
    "Walker's 4F": asrPayoffMatrix3,
    "Reisinger's 6F": asrPayoffMatrix4,
  };
}
