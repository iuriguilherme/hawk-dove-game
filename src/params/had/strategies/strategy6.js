/**
 * @file strategy6.js Opposite strategy for Hawk Dove Game  
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
 * @description opposite strategy:
 * 
 * Choose the opposite of what the other subject chosen.
 */
export function strategy6(kwargs) {
  let f = kwargs["foods"].getChildren();
  let s = kwargs["subjects"].getChildren();
  let c, strategy;
  for (let i = 0; i < f.length; i++) {
    if (f[i].getData("leftBusy") > -1 && f[i].getData("rightBusy") > -1) {
      c = s[f[i].getData("rightBusy")];
      if ($fx.rand() > kwargs["gData"][c.getData("gene")][
        "abilityChooseHADStrategy"]) {
        switch (s[f[i].getData("leftBusy")].getData("strategy")) {
          case "dove":
            strategy = "hawk";
            break;
          case "hawk":
            strategy = "dove";
            break;
          default:
            strategy = "dove";
            break;
        }
        c.setData({
          "strategy": kwargs["names"]["strategies"][strategy],
          "state": "responding",
          "eating": false,
          "responding": true,
        });
        c.setTexture(kwargs["names"]["strategies"][strategy]);
      }
    }
  }
}
