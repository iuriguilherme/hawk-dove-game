/**
 * @file asrRuleset4.js Curtis Reisinger's 6F for Hawk Dove Game  
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
 * @description Curtis Reisinger's 6F:
 * https://neuroclastic.com/the-6fs-of-trauma-responses/
 * 
 * Response Type; Definition; Other Clinical Terms Used
 * Flood; Being flooded with emotions in response to a perceived threat.; 
 *  Emotional flooding, emotional dysregulation  
 * Fatigue/Flop; Feeling tired or sleepy in response to a perceived threat.; 
 *  Disassociating, numbing  
 */
export function asrRuleset4(kwargs) {}

export function asrAvailable4() {
  return [
    "fight",
    "flight",
    "freeze",
    "fawn",
    "flood",
    "fatigue-flop",
  ];
}
