/**
 * @file genes.js Genetics data for Hawk Dove Game  
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

export const getGeneticData = function(kwargs) {
  let geneticParams;
  for (let i = 0; i < kwargs["properAlphabet"].length; i++) {
    kwargs["gData"][kwargs["properAlphabet"][i]] = {};
    let l = [
      "strategyDoveTendency",
      "strategyHawkTendency",
      "ASRFightTendency",
      "ASRFlightTendency",
      "ASRFreezeTendency",
      "ASRFawnTendency",
      "ASRFloodTendency",
      "ASRFatigueFlopTendency",
      "abilityChooseStrategy",
      "abilityChooseASR",
    ];
    geneticParams = {
      /*
       * This weight is a PRNG for each gene
       */
      "randomWeight": {
        "value": $fx.rand(),
        "length": 1,
      },
      /*
       * This weight is based on repeated numbers from the alphabet
       */
      "hashWeight": {
        "value": Array.from(fxhashTrunc).filter(
          n => n == kwargs["properAlphabet"][i]).length,
        "length": fxhashTrunc.length,
      },
      /*
       * This weight is based on the position of the current number in the 
       * base58 alphabet
       */
      "alphabetWeight": {
        "value": kwargs["properAlphabet"].indexOf(kwargs["properAlphabet"][i]),
        "length": kwargs["properAlphabet"].length,
      },
      /*
       * These two weights come from a random gene chosen by $fx.random PRNG
       */
      "crippleWeight": {"value": 0.5, "length": 1},
      "handicapWeight": {"value": 0.5, "length": 1},
    };
    switch (kwargs["properAlphabet"][i]) {
      case kwargs["geneticCripple"]:
        geneticParams["crippleWeight"]["value"] = 0.0;
        break;
      case kwargs["geneticHandicap"]:
        geneticParams["handicapWeight"]["value"] = 1.0;
        break;
      default:
        break;
    }
    for (let v in l) {
      kwargs["gData"][kwargs["properAlphabet"][i]][l[v]] = geneticFormula(
        geneticParams, kwargs["math"]);
    }
  }
}

function geneticFormula(geneticParams, math) {
  let values = [];
  for (let k in geneticParams) {
    values.push(($fx.rand() * geneticParams[k]["value"]) /
      geneticParams[k]["length"]);
  }
  return math.mean(values);
}
