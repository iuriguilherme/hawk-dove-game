/**
 * @file strategy4.js Nash equilibirum strategy for Hawk Dove Game  
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
 * @description Nash equilibrium strategy:
 * https://en.wikipedia.org/wiki/Nash_equilibrium
 * https://youtu.be/YNMkADpvO4w?t=281s
 * 
 * Nash equilibrium is when no one has anything to gain by changing strategy;
 * TODO: this needs to take into account the ruleset's payoff matrix. For now, 
 * it just assumes Primer's Hawk & Dove ruleset, and therefore the Nash 
 * equilibrium means to play the opposite of the opponent.
 */
export function strategy4(kwargs) {
  let f = foods.getChildren();
  let s = subjects.getChildren();
  let p = rulesetPayoffMatrix();
  let c;
  for (let i = 0; i < f.length; i++) {
    if (f[i].getData("leftBusy") > -1 && f[i].getData("rightBusy") > -1) {
      c = s[f[i].getData("rightBusy")];
      if (s[f[i].getData("leftBusy")].getData("strategy") == 
        kwargs["names"]["strategies"]["dove"]) {
        c.setData({
          "strategy": kwargs["names"]["strategies"]["hawk"],
          "state": "responding",
          "eating": false,
          "responding": true,
        });
        c.setTexture(kwargs["names"]["strategies"]["hawk"]);
      } else if (s[f[i].getData("leftBusy")].getData("strategy") == 
        kwargs["names"]["strategies"]["hawk"]) {
        c.setData({
          "strategy": kwargs["names"]["strategies"]["dove"],
          "state": "responding",
          "eating": false,
          "responding": true,
        });
        c.setTexture(kwargs["names"]["strategies"]["dove"]);
      }
    }
  }
}
