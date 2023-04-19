/**
 * @file strategy9.js Genetic + best payoff strategy for Hawk Dove Game  
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
 * @description genetic + best payoff strategy:
 * 
 * Best payoff strategy means that each individual will attempt to use the 
 * strategy with the best payoff.
 * Genetic weights are applied.
 */
export function strategy9(kwargs) {
  let f = kwargs["foods"].getChildren();
  let s = kwargs["subjects"].getChildren();
  let p = kwargs["rulesetPayoffMatrix"]();
  let c, strategy;
  for (let i = 0; i < f.length; i++) {
    if (f[i].getData("leftBusy") > -1 && f[i].getData("rightBusy") > -1) {
      c = s[f[i].getData("rightBusy")];
      let leftStrategy = s[f[i].getData("leftBusy")].getData("strategy");
      let dovePayoff = p["survival"]["dove"][leftStrategy] + 
        p["reproduction"]["dove"][leftStrategy];
      let hawkPayoff = p["survival"]["hawk"][leftStrategy] + 
        p["reproduction"]["hawk"][leftStrategy];
      let doveTendency = kwargs["gData"][c.getData("gene")][
        "strategyDoveTendency"];
      let hawkTendency = kwargs["gData"][c.getData("gene")][
        "strategyHawkTendency"];
      let strategies = [doveTendency, hawkTendency];
      let doveWeight = 0;
      let hawkWeight = 0;
      switch (kwargs["math"].max(strategies)) {
        case doveTendency:
          doveWeight++;
          break;
        case hawkTendency:
          hawkWeight++;
          break;
        default:
          break;
      }
      switch (kwargs["math"].max(dovePayoff, hawkPayoff)) {
        case dovePayoff:
          doveWeight++;
          break;
        case hawkPayoff:
          hawkWeight++;
          break;
        default:
          break;
      }
      switch (kwargs["math"].max(doveWeight, hawkWeight)) {
        case doveWeight:
          strategy = "dove";
          break;
        case hawkWeight:
          strategy = "hawk";
          break;
        default:
          break;
      }
      c.setData({"strategy": kwargs["names"]["strategies"][strategy]});
      c.setTexture(kwargs["names"]["strategies"][strategy]);
    }
  }
}
