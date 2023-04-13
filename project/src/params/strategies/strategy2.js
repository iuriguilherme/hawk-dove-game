/**
 * @file strategy2.js Strategy: Pure dove for Hawk Dove Game  
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

/*
 * @description Strategy - Doves:
 * https://college.holycross.edu/faculty/kprestwi/behavior/ESS/HvD_intro.html
 * https://youtu.be/YNMkADpvO4w?t=51s
 * 
 * This is the "pure dove" strategy (everyone only chooses the dove strategy) 
 * as described on Primer Youtube channel;
 * Everyone chooses to be a Dove.
 */
export function strategy2(kwargs) {
  let f = kwargs["foods"].getChildren();
  let s = kwargs["subjects"].getChildren();
  let c;
  for (let i = 0; i < f.length; i++) {
    if (f[i].getData("leftBusy") > -1) {
      c = s[f[i].getData("leftBusy")];
      c.setData({"strategy": kwargs["names"]["strategies"]["dove"]});
      c.setTexture(kwargs["names"]["strategies"]["dove"]);
    }
    if (f[i].getData("rightBusy") > -1) {
      c = s[f[i].getData("rightBusy")];
      c.setData({"strategy": kwargs["names"]["strategies"]["dove"]});
      c.setTexture(kwargs["names"]["strategies"]["dove"]);
    }
  }
}
