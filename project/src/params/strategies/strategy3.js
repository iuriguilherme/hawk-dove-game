/**
 * @file strategy3.js Strategy: Pure hawk for Hawk Dove Game  
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

let c;

/*
 * @description Strategy - Hawks:
 * https://college.holycross.edu/faculty/kprestwi/behavior/ESS/HvD_intro.html
 * https://youtu.be/YNMkADpvO4w?t=51s
 * 
 * This is the opposite of the "pure dove" strategy (everyone only chooses the 
 * dove strategy) for completeness;
 * Everyone chooses to be a Hawk.
 */
export function strategy3(subjects, foods, names, name, version) {
  let s = subjects.getChildren();
  let f = foods.getChildren();
  for (let i = 0; i < f.length; i++) {
    if (f[i].getData("leftBusy") > -1) {
      c = s[f[i].getData("leftBusy")];
      c.setData({"strategy": names["strategies"]["hawk"]});
      c.setTexture(names["strategies"]["hawk"]);
    }
    if (f[i].getData("rightBusy") > -1) {
      c = s[f[i].getData("rightBusy")];
      c.setData({"strategy": names["strategies"]["hawk"]});
      c.setTexture(names["strategies"]["hawk"]);
    }
  }
}
