/**
 * @file strategy5.js Best payoff strategy for Hawk Dove Game  
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
 * @description best payoff strategy:
 * 
 * Best payoff strategy means that each individual will attempt to use the 
 * strategy with the best payoff.
 */
export function strategy5(kwargs) {
  let f = kwargs["foods"].getChildren();
  let s = kwargs["subjects"].getChildren();
  let p = kwargs["payoffMatrix"]();
  let c, strategy;
  for (let i = 0; i < f.length; i++) {
    if (f[i].getData("leftBusy") > -1 && f[i].getData("rightBusy") > -1) {
      c = s[f[i].getData("rightBusy")];
      let leftStrategy = s[f[i].getData("leftBusy")].getData("strategy");
      /*
       * TODO: Learn better javascript to do like python list comprehensions
       * in case there's more strategies
       */
      let dovePayoff = p["survival"]["dove"][leftStrategy] + 
        p["reproduction"]["dove"][leftStrategy];
      let hawkPayoff = p["survival"]["hawk"][leftStrategy] + 
        p["reproduction"]["hawk"][leftStrategy];
      switch (kwargs["math"].max(dovePayoff, hawkPayoff)) {
        case dovePayoff:
          strategy = "dove";
          break;
        case hawkPayoff:
          strategy = "hawk";
          break;
        default:
          strategy = "dove";
          break;
      }
      c.setData({"strategy": kwargs["names"]["strategies"][strategy]});
      c.setTexture(kwargs["names"]["strategies"][strategy]);
    }
  }
}
