/**
 * @file asrStrategy3.js Best payoff strategy for Hawk Dove Game  
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
 * @description Best payoff strategy:
 * 
 * Best payoff strategy means that each individual will attempt to use the 
 * strategy with the best payoff.
 */
export function asrStrategy3(kwargs) {
  let f = kwargs["foods"].getChildren();
  let s = kwargs["subjects"].getChildren();
  let p = kwargs["asrPayoffMatrix"]();
  let v = kwargs["asrAvailable"]();
  let c, asr;
  for (let i = 0; i < f.length; i++) {
    if (f[i].getData("leftBusy") > -1 && f[i].getData("rightBusy") > -1) {
      c = s[f[i].getData("rightBusy")];
      if ($fx.rand() > kwargs["gData"][c.getData("gene")][
        "abilityChooseASRStrategy"]) {
        let leftAsr = s[f[i].getData("leftBusy")].getData("asr");
        let weights = {};
        for (let asr of v) {
          weights[asr] = p["survival"][asr][leftAsr] + 
            p["reproduction"][asr][leftAsr];
        }
        asr = v[v.indexOf(Object.keys(weights)[Object.values(weights).indexOf(
          kwargs["math"].max(Object.values(weights)))])];
        c.setData({"asr": kwargs["names"]["asr"][asr]});
      }
    }
  }
}
