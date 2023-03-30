/**
 * @file ruleset3.js Strategist: Pure dove for Hawk Dove Game  
 * @copyright Iuri Guilherme 2023  
 * @license GNU AGPLv3  
 * @author Iuri Guilherme <https://iuri.neocities.org/>  
 * @description Source code available at 
 *    https://github.com/iuriguilherme/fxhash4  
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

import { create, all } from "mathjs";
const math = create(all, {});

import {
  subjects,
  foods,
} from "../../game.js";

import {
  names,
  name,
  version,
} from "../../index.js";

let subject;

/*
 * @description Strategist ruleset - Doves:
 * https://college.holycross.edu/faculty/kprestwi/behavior/ESS/HvD_intro.html
 * https://youtu.be/YNMkADpvO4w?t=51
 * 
 * This uses the classic rulest, however this one is different because the 
 * subjects are able to choose a strategy instead of getting stuck with the one 
 * they have been born with (hereditary strategies);
 * This version uses the pure dove strategy (everyone only chooses the dove 
 * strategy) as described on Primer Youtube channel;
 * In the end, the ones which don't find a food die.
 */
export function rulesetAlgorithm5() {
  let s = subjects.getChildren();
  let f = foods.getChildren();
  for (let i = 0; i < f.length; i++) {
    //~ console.log(i);
    if (f[i].getData("leftBusy") > -1) {
      //~ console.log("left populated");
      subject = s[f[i].getData("leftBusy")];
      subject.setData({
        "strategy": names[2],
        "eating": false,
      });
      subject.setTexture(names[2]);
      if (f[i].getData("rightBusy") > -1) {
        //~ console.log("right populated, two doves");
        subject = s[f[i].getData("rightBusy")];
        subject.setData({
          "strategy": names[2],
          "eating": false,
        });
        subject.setTexture(names[2]);
      } else {
        //~ console.log("no one on right, dove is alone");
        subject.setData({"strong": true});
      }
    } else {
      //~ console.log("no one on left");
      if (f[i].getData("rightBusy") > -1) {
        //~ console.log("right populated, dove is alone");
        subject = s[f[i].getData("rightBusy")];
        subject.setData({
          "strategy": names[2],
          "eating": false,
          "strong": true,
        });
        subject.setTexture(names[2]);
      } else {
        //~ console.log("no one on right, food is alone");
      }
    }
  }
  for (let i = 0; i < s.length; i++) {
    //~ console.log(`[${name} v${version}]: One ${s[i].getData("strategy")}`,
      //~ `died of hunger`);
    if (s[i].getData("eating") === true) {
      s[i].setData({
        "dead": true,
        "eating": false,
      });
    }
  }
}
