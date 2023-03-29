/**
 * @file ruleset2.js Classic ruleset with starvation for Hawk Dove Game  
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
} from "../game.js";

import {
  hawkAndDove,
  name,
  version,
} from "../index.js";

/*
 * @description Ruleset 2:
 * If two Hawks met, one of them eats all the food and reproduce, while the 
 *  other one dies;
 * If two Doves met, they share the food and don't reproduce;
 * If one Hawk and one Dove met, the Hawk eats all the food alone and 
 *  reproduce, while the Dove flees, surviving but not reproducing;
 * If only one Bird finds a food, then it eats all of it and reproduce;
 * Food suply is constant and fixed;
 * If a bird is alone in it's group (only one hawk or dove), it reproduces 
 *  once.
 * In the end, the ones which don't find a food die. This is removed from 
 *  ruleset 1 because it creates an infinite hawk loop.
 * https://college.holycross.edu/faculty/kprestwi/behavior/ESS/HvD_intro.html
 */
export function rulesetAlgorithm2() {
  let s = subjects.getChildren();
  let f = foods.getChildren();
  for (let i = 0; i < f.length; i++) {
    //~ console.log(i);
    if (f[i].getData("leftBusy")) {
      //~ console.log("left populated");
      if (f[i].getData("rightBusy")) {
        //~ console.log("right populated");
        if (s[f[i].getData("leftBusy")].getData("r") == hawkAndDove[0]) {
          //~ console.log("left is hawk");
          if (s[f[i].getData("rightBusy")].getData("r") == hawkAndDove[0]) {
            //~ console.log("left and right two hawks. will fight...");
            if ($fx.rand() > 0.5) {
              //~ console.log("left hawk wins");
              s[f[i].getData("rightBusy")].setData({
                "dead": true,
                "eating": false
              });
              //~ s[f[i].getData("rightBusy")].setTexture("dead");
              s[f[i].getData("leftBusy")].setData({
                "strong": true,
                "eating": false
              });
              //~ s[f[i].getData("leftBusy")].setTexture("strong");
            } else {
              //~ console.log("right hawk wins");
              s[f[i].getData("leftBusy")].setData({
                "dead": true,
                "eating": false
              });
              //~ s[f[i].getData("leftBusy")].setTexture("dead");
              s[f[i].getData("rightBusy")].setData({
                "strong": true,
                "eating": false
              });
              //~ s[f[i].getData("rightBusy")].setTexture("strong");
            }
          } else {
            //~ console.log("right is dove, hawk and dove");
            s[f[i].getData("leftBusy")].setData({
              "strong": true,
              "eating": false
            });
            //~ s[f[i].getData("leftBusy")].setTexture("strong");
            s[f[i].getData("rightBusy")].setData({
              "fleeing": true,
              "eating": false
            });
            //~ s[f[i].getData("rightBusy")].setTexture("fleeing");
          }
        } else {
          //~ console.log("left is dove");
          if (s[f[i].getData("rightBusy")].getData("r") == hawkAndDove[0]) {
            //~ console.log("right is hawk, dove and hawk");
            s[f[i].getData("leftBusy")].setData({
              "fleeing": true,
              "eating": false
            });
            //~ s[f[i].getData("leftBusy")].setTexture("fleeing");
            s[f[i].getData("rightBusy")].setData({
              "strong": true,
              "eating": false
            });
            //~ s[f[i].getData("rightBusy")].setTexture("strong");
          } else {
            //~ console.log("right is dove, dove and dove");
            s[f[i].getData("leftBusy")].setData({
              "eating": false
            });
            s[f[i].getData("rightBusy")].setData({
              "eating": false
            });
          }
        }
      } else {
        //~ console.log("no one on right");
        if (s[f[i].getData("leftBusy")].getData("r") == hawkAndDove[0]) {
          //~ console.log("left is hawk, hawk alone");
          s[f[i].getData("leftBusy")].setData({
            "strong": true,
            "eating": false
          });
          //~ s[f[i].getData("leftBusy")].setTexture("strong");
        } else {
          //~ console.log("left is dove, dove alone");
          s[f[i].getData("leftBusy")].setData({
            "strong": true,
            "eating": false
          });
          //~ s[f[i].getData("leftBusy")].setTexture("strong");
        }
      }
    } else {
      //~ console.log("no one on left");
      if (f[i].getData("rightBusy")) {
        if (s[f[i].getData("rightBusy")].getData("r")) {
          //~ console.log("right is hawk, hawk alone");
          s[f[i].getData("rightBusy")].setData({
            "strong": true,
            "eating": false
          });
          //~ s[f[i].getData("rightBusy")].setTexture("strong");
        } else {
          //~ console.log("right is dove, dove alone");
          s[f[i].getData("rightBusy")].setData({
            "strong": true,
            "eating": false
          });
          //~ s[f[i].getData("rightBusy")].setTexture("strong");
        }
      } else {
        //~ console.log("Food is alone");
        f[i].setTint(0xff0000);
      }
    }
  }
  for (let i = 0; i < s.length; i++) {
    //~ console.log(`[${name} v${version}]: One ${s[i].getData("r")} died of`,
      //~ `hunger`);
    if (s[i].getData("eating")) {
      s[i].setData({
        "dead": true,
        "eating": false
      });
    }
  }
}
