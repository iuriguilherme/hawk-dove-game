/**
 * @file asrRuleset1.js Walter Bradford Cannon's Fight or Flight Response for 
 *  Hawk Dove Game  
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
 * @description Walter Bradford Cannon's fight or flight response:
 * https://en.wikipedia.org/wiki/Fight-or-flight_response
 * https://en.wikipedia.org/wiki/Special:BookSources/978-0393002058
 * 
 * The fight-or-flight response (also called hyperarousal or the acute stress 
 * response) is a physiological reaction that occurs in response to a perceived 
 * harmful event, attack, or threat to survival.  
 */
export function asrRuleset1(kwargs) {
  let f = kwargs["foods"].getChildren();
  let s = kwargs["subjects"].getChildren();
  let p = kwargs["asrPayoffMatrix"]();
  let cs, asr;
  for (let i = 0; i < f.length; i++) {
    if (f[i].getData("leftBusy") > -1 && f[i].getData("rightBusy") > -1) {
      let cs = [s[f[i].getData("leftBusy")], s[f[i].getData("rightBusy")]];
      for (let c of cs) {
        switch (c.getData("asr")) {
          case "freeze":
            asr = "flight";
            break;
          case "fawn":
            asr = "fight";
            break;
          case "flood":
            asr = "fight";
            break;
          case "fatigue-flop":
            asr = "flight";
            break;
          default:
            asr = c.getData("asr");
            break;
        }
        c.setData({"asr": kwargs["names"]["asr"][asr]});
      }
    }
  }
}

export function asrAvailable1() {
  return [
    "fight",
    "flight",
  ];
}
