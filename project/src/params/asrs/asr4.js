/**
 * @file asr4.js Fight or Flight Response for Hawk Dove Game  
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
 * @description Resigner's 6F:
 * https://neuroclastic.com/the-6fs-of-trauma-responses/
 * 
 * Response Type; Definition; Other Clinical Terms Used
 * Flood; Being flooded with emotions in response to a perceived threat.; 
 *  Emotional flooding, emotional dysregulation  
 * Fatigue/Flop; Feeling tired or sleepy in response to a perceived threat.; 
 *  Disassociating, numbing  
 */
export function asr4(kwargs) {
  let f = kwargs["foods"].getChildren();
  let s = kwargs["subjects"].getChildren();
  let p = kwargs["asrPayoffMatrix"]();
  let c, asr;
  for (let i = 0; i < f.length; i++) {
    if (f[i].getData("leftBusy") > -1 && f[i].getData("rightBusy") > -1) {
      c = s[f[i].getData("rightBusy")];
      if ($fx.rand() > kwargs["gData"][c.getData("gene")]["abilityChooseASR"]) {
        let leftAsr = s[f[i].getData("leftBusy")].getData("asr");
        let fightPayoff = p["survival"]["fight"][leftAsr] + 
          p["reproduction"]["fight"][leftAsr];
        let flightPayoff = p["survival"]["flight"][leftAsr] + 
          p["reproduction"]["flight"][leftAsr];
        let freezePayoff = p["survival"]["freeze"][leftAsr] + 
          p["reproduction"]["freeze"][leftAsr];
        let fawnPayoff = p["survival"]["fawn"][leftAsr] + 
          p["reproduction"]["fawn"][leftAsr];
        let floodPayoff = p["survival"]["flood"][leftAsr] + 
          p["reproduction"]["flood"][leftAsr];
        let fatigueFlopPayoff = p["survival"]["fatigue-flop"][leftAsr] + 
          p["reproduction"]["fatigue-flop"][leftAsr];
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
        let asrs = [
          fightTendency,
          flightTendency,
          freezeTendency,
          fawnTendency,
          floodTendency,
          fatigueFlopTendency,
        ];
        let fightWeight = 0;
        let flightWeight = 0;
        let freezeWeight = 0;
        let fawnWeight = 0;
        let floodWeight = 0;
        let fatigueFlopWeight = 0;
        switch (kwargs["math"].max(asrs)) {
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
          fightPayoff,
          flightPayoff,
          freezePayoff,
          fawnPayoff,
          floodPayoff,
          fatigueFlopPayoff,
        )) {
          case fightPayoff:
            fightWeight++;
            break;
          case flightPayoff:
            flightWeight++;
            break;
          case freezePayoff:
            freezeWeight++;
            break;
          case fawnPayoff:
            fawnWeight++;
            break;
          case floodPayoff:
            floodnWeight++;
            break;
          case fatigueFlopPayoff:
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

export function asrPayoffMatrix4() {
  return {
    "survival": {
      "fight": {
        "fight": 0.5,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 1.0,
        "flood": 1.0,
        "fatigue-flop": 1.0,
        "alone": 1.0,
      },
      "flight": {
        "fight": 1.0,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 1.0,
        "flood": 1.0,
        "fatigue-flop": 1.0,
        "alone": 1.0,
      },
      "freeze": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 1.0,
        "flood": 1.0,
        "fatigue-flop": 1.0,
        "alone": 1.0,
      },
      "fawn": {
        "fight": 1.0,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 1.0,
        "flood": 1.0,
        "fatigue-flop": 1.0,
        "alone": 1.0,
      },
      "flood": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 1.0,
        "flood": 1.0,
        "fatigue-flop": 1.0,
        "alone": 1.0,
      },
      "fatigue-flop": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 1.0,
        "flood": 1.0,
        "fatigue-flop": 1.0,
        "alone": 1.0,
      },
    },
    "reproduction": {
      "fight": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 1.0,
        "fawn": 0.5,
        "flood": 1.0,
        "fatigue-flop": 1.0,
        "alone": 1.0,
      },
      "flight": {
        "fight": 0.0,
        "flight": 0.0,
        "freeze": 0.0,
        "fawn": 0.0,
        "flood": 0.0,
        "fatigue-flop": 0.0,
        "alone": 1.0,
      },
      "freeze": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 0.5,
        "fawn": 0.25,
        "flood": 0.5,
        "fatigue-flop": 0.5,
        "alone": 1.0,
      },
      "fawn": {
        "fight": 0.5,
        "flight": 1.0,
        "freeze": 0.75,
        "fawn": 0.5,
        "flood": 0.75,
        "fatigue-flop": 0.75,
        "alone": 1.0,
      },
      "flood": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 0.5,
        "fawn": 0.25,
        "flood": 0.5,
        "fatigue-flop": 0.5,
        "alone": 1.0,
      },
      "fatigue-flop": {
        "fight": 0.0,
        "flight": 1.0,
        "freeze": 0.5,
        "fawn": 0.25,
        "flood": 0.5,
        "fatigue-flop": 0.5,
        "alone": 1.0,
      },
    },
  };
}
