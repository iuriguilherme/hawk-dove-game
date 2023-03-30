/**
 * @file strategy3.js Nash equilibirum strategy for Hawk Dove Game  
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

/*
 * @description Nash equilibrium strategy:
 * https://en.wikipedia.org/wiki/Nash_equilibrium
 * https://youtu.be/YNMkADpvO4w?t=281s
 * 
 * Nash equilibrium is when no one has anything to gain by changing strategy;
 * TODO: this needs to take into account the ruleset's payoff matrix. For now, 
 * it just assumes Primer's Hawk & Dove ruleset, and therefore the Nash 
 * equilibrium means to play the opposite of the opponent.
 */
export function strategy4(subjects, foods, names, name, version) {
  let s = subjects.getChildren();
  let f = foods.getChildren();
  for (let i = 0; i < f.length; i++) {
    if (f[i].getData("leftBusy") > -1) {
      if (f[i].getData("rightBusy") > -1) {
        if (s[f[i].getData("leftBusy")].getData("strategy") == names[1]) {
          s[f[i].getData("rightBusy")].setData({"strategy": names[2]});
        }
        else if (s[f[i].getData("leftBusy")].getData("strategy") == names[2]) {
          s[f[i].getData("rightBusy")].setData({"strategy": names[1]});
        }
      }
    }
  }
}
