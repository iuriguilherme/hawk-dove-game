/**
 * @file ruleset5.js Strategist: Pure dove for Hawk Dove Game  
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

/*
 * @description Ruleset 5:
 * This uses the classic ruleset with starvation described on Ruleset #2;
 * However this one is different because the subjects are able to choose a 
 *  strategy instead of getting stuck with the one they have been born with;
 * This version uses the Pure dove strategy as described on Primer Youtube 
 *  channel;
 * https://youtu.be/YNMkADpvO4w?t=51
 */
export function rulesetAlgorithm5() {
  let s = subjects.getChildren();
  let f = foods.getChildren();
  for (let i = 0; i < f.length; i++) {
    //~ console.log(i);
    if (f[i].getData("leftBusy")) {
      //~ console.log("left populated");
      if (f[i].getData("rightBusy")) {
        //~ console.log("right populated");
        if (s[f[i].getData("leftBusy")].getData("strategy") == names[1]) {
          //~ console.log("left is hawk");
          if (s[f[i].getData("rightBusy")].getData("strategy") == names[1]) {
            //~ console.log("left and right two hawks. both die...");
            s[f[i].getData("rightBusy")].setData({
              "dead": true,
              "eating": false,
            });
            s[f[i].getData("leftBusy")].setData({
              "dead": true,
              "eating": false,
            });
          } else {
            //~ console.log("right is dove, hawk and dove");
            s[f[i].getData("leftBusy")].setData({"eating": false});
            if ($fx.rand() > 0.5) {
              s[f[i].getData("leftBusy")].setData({"strong": true});
            }
            s[f[i].getData("rightBusy")].setData({
              "fleeing": true,
              "eating": false,
            });
            if ($fx.rand() > 0.5) {
              s[f[i].getData("rightBusy")].setData({
                "fleeing": false,
                "dead": true,
              });
            }
          }
        } else {
          //~ console.log("left is dove");
          if (s[f[i].getData("rightBusy")].getData("strategy") == names[1]) {
            //~ console.log("right is hawk, dove and hawk");
            s[f[i].getData("rightBusy")].setData({"eating": false});
            if ($fx.rand() > 0.5) {
              s[f[i].getData("rightBusy")].setData({"strong": true});
            }
            s[f[i].getData("leftBusy")].setData({
              "fleeing": true,
              "eating": false,
            });
            if ($fx.rand() > 0.5) {
              s[f[i].getData("leftBusy")].setData({
                "fleeing": false,
                "dead": true,
              });
            }
          } else {
            //~ console.log("right is dove, dove and dove");
            s[f[i].getData("leftBusy")].setData({"eating": false});
            s[f[i].getData("rightBusy")].setData({"eating": false});
          }
        }
      } else {
        //~ console.log("no one on right");
        if (s[f[i].getData("leftBusy")].getData("strategy") == names[1]) {
          //~ console.log("left is hawk, hawk alone");
          s[f[i].getData("leftBusy")].setData({
            "strong": true,
            "eating": false
          });
        } else {
          //~ console.log("left is dove, dove alone");
          s[f[i].getData("leftBusy")].setData({
            "strong": true,
            "eating": false
          });
        }
      }
    } else {
      //~ console.log("no one on left");
      if (f[i].getData("rightBusy")) {
        if (s[f[i].getData("rightBusy")].getData("strategy")) {
          //~ console.log("right is hawk, hawk alone");
          s[f[i].getData("rightBusy")].setData({
            "strong": true,
            "eating": false
          });
        } else {
          //~ console.log("right is dove, dove alone");
          s[f[i].getData("rightBusy")].setData({
            "strong": true,
            "eating": false
          });
        }
      } else {
        //~ console.log("Food is alone");
        f[i].setTint(0xff0000);
      }
    }
  }
  for (let i = 0; i < s.length; i++) {
    //~ console.log(`[${name} v${version}]: One ${s[i].getData("strategy")} died of`,
      //~ `hunger`);
    if (s[i].getData("eating")) {
      s[i].setData({
        "dead": true,
        "eating": false
      });
    }
  }
}
