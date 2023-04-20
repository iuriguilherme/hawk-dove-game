/**
 * @file asrStrategy4.js Genetic strategy for Hawk Dove Game  
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
 * @description genetic strategy:
 * 
 * Strategy is chosen through genetic weights.
 */
export function asrStrategy4(kwargs) {
  let f = kwargs["foods"].getChildren();
  let s = kwargs["subjects"].getChildren();
  let p = kwargs["asrPayoffMatrix"]();
  let c, asr;
  for (let i = 0; i < f.length; i++) {
    if (f[i].getData("leftBusy") > -1 && f[i].getData("rightBusy") > -1) {
      c = s[f[i].getData("rightBusy")];
      if ($fx.rand() > kwargs["gData"][c.getData("gene")][
        "abilityChooseASRStrategy"]) {
        let leftAsr = s[f[i].getData("leftBusy")].getData("asr");
        let fightTendency = kwargs["gData"][c.getData("gene")][
          "ASRFightTendency"];
        let flightTendency = kwargs["gData"][c.getData("gene")][
          "ASRFlightTendency"];
        let freezeTendency = kwargs["gData"][c.getData("gene")][
          "ASRFreezeTendency"];
        let fawnTendency = kwargs["gData"][c.getData("gene")][
          "ASRFawnTendency"];
        let floodTendency = kwargs["gData"][c.getData("gene")][
          "ASRFloodTendency"];
        let fatigueFlopTendency = kwargs["gData"][c.getData("gene")][
          "ASRFatigueFlopTendency"];
        let fightWeight = 0;
        let flightWeight = 0;
        let freezeWeight = 0;
        let fawnWeight = 0;
        let floodWeight = 0;
        let fatigueFlopWeight = 0;
        switch (kwargs["math"].max([
          fightTendency,
          flightTendency,
          freezeTendency,
          fawnTendency,
          floodTendency,
          fatigueFlopTendency,
        ])) {
          case fightTendency:
            fightWeight++;
            break;
          case flightTendency:
            flightWeight++;
            break;
          case freezeTendency:
            freezeWeight++;
            break;
          case fawnTendency:
            fawnWeight++;
            break;
          case floodTendency:
            floodWeight++;
            break;
          case fatigueFlopTendency:
            fatigueFlopWeight++;
            break;
          default:
            break;
        }
        switch (kwargs["math"].max(
          fightWeight,
          flightWeight,
          freezeWeight,
          fawnWeight,
          floodWeight,
          fatigueFlopWeight,
        )) {
          case fightWeight:
            asr = "fight";
            break;
          case flightWeight:
            asr = "flight";
            break;
          case freezeWeight:
            asr = "freeze";
            break;
          case fawnWeight:
            asr = "fawn";
            break;
          case floodWeight:
            asr = "flood";
            break;
          case fatigueFlopWeight:
            asr = "fatigue-flop";
            break;
          default:
            break;
        }
        c.setData({"asr": kwargs["names"]["asr"][asr]});
      }
    }
  }
}
