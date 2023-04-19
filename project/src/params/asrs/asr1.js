/**
 * @file asr1.js Fight or Flight Response for Hawk Dove Game  
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
 * @description Cannon's Fight or Flight Response:
 * https://en.wikipedia.org/wiki/Fight-or-flight_response
 * https://en.wikipedia.org/wiki/Special:BookSources/978-0393002058
 * 
 * The fight-or-flight response (also called hyperarousal or the acute stress 
 * response) is a physiological reaction that occurs in response to a perceived 
 * harmful event, attack, or threat to survival.  
 */
export function asr1(kwargs) {
  let f = kwargs["foods"].getChildren();
  let s = kwargs["subjects"].getChildren();
  let p = asrPayoffMatrix1();
  let c, asr;
  for (let i = 0; i < f.length; i++) {
    if (f[i].getData("leftBusy") > -1 && f[i].getData("rightBusy") > -1) {
      c = s[f[i].getData("rightBusy")];
      if (kwargs["gData"][c.getData("gene")]["abilityChooseASR"] > 
        kwargs["arsTreshold"]) {
        let leftAsr = s[f[i].getData("leftBusy")].getData("asr");
        let fightPayoff = p["survival"]["fight"][leftAsr] + 
          p["reproduction"]["fight"][leftAsr];
        let flightPayoff = p["survival"]["flight"][leftAsr] + 
          p["reproduction"]["flight"][leftAsr];
        let fightTendency = kwargs["gData"][c.getData("gene")][
          "ASRFightTendency"];
        let flightTendency = kwargs["gData"][c.getData("gene")][
          "ASRFlightTendency"];
        let asrs = [fightTendency, flightTendency];
        let fightWeight = 0;
        let flightWeight = 0;
        switch (kwargs["math"].max(asrs)) {
          case fightTendency:
            fightWeight++;
            break;
          case flightTendency:
            flightWeight++;
            break;
          default:
            break;
        }
        switch (kwargs["math"].max(fightPayoff, flightPayoff)) {
          case fightPayoff:
            fightWeight++;
            break;
          case flightPayoff:
            flightWeight++;
            break;
          default:
            break;
        }
        switch (kwargs["math"].max(fightWeight, flightWeight)) {
          case fightWeight:
            asr = "fight";
            break;
          case flightWeight:
            asr = "flight";
            break;
          default:
            break;
        }
        c.setData({"asr": kwargs["names"]["asr"][asr]});
      }
    }
  }
}

export function asrPayoffMatrix1() {
  return {
    "survival": {
      "fight": {
        "fight": 0.5,
        "flight": 0.5,
        "alone": 0.5,
      },
      "flight": {
        "fight": 0.5,
        "flight": 0.5,
        "alone": 0.5,
      },
    },
    "reproduction": {
      "fight": {
        "fight": 0.5,
        "flight": 0.5,
        "alone": 0.5,
      },
      "flight": {
        "fight": 0.5,
        "flight": 0.5,
        "alone": 0.5,
      },
    },
  };
}
