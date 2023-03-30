/**
 * @file ruleset1.js Classic ruleset for Hawk Dove Game  
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

/*
 * @description Classic ruleset:
 * https://college.holycross.edu/faculty/kprestwi/behavior/ESS/HvD_intro.html
 * 
 * If two Hawks met, one of them eats all the food and reproduce, while the 
 *  other one dies;
 * If two Doves met, they share the food and don't reproduce;
 * If one Hawk and one Dove met, the Hawk eats all the food alone and 
 *  reproduce, while the Dove flees, surviving but not reproducing;
 * If only one Bird finds a food, then it eats all of it and reproduce;
 * Food suply is constant and fixed;
 * If a bird is alone in it's group (only one hawk or dove), it reproduces 
 *  once.
 */
export function ruleset1(subjects, foods, names, name, version) {
  let s = subjects.getChildren();
  let f = foods.getChildren();
  for (let i = 0; i < f.length; i++) {
    //~ console.log(i);
    if (f[i].getData("leftBusy") > -1) {
      //~ console.log("left populated");
      if (f[i].getData("rightBusy") > -1) {
        //~ console.log("right populated");
        if (s[f[i].getData("leftBusy")].getData("strategy") == 
          names["strategies"]["hawk"]) {
          //~ console.log("left is hawk");
          if (s[f[i].getData("rightBusy")].getData("strategy") == 
            names["strategies"]["hawk"]) {
            //~ console.log("left and right two hawks. will fight...");
            if ($fx.rand() > 0.5) {
              //~ console.log("left hawk wins");
              s[f[i].getData("rightBusy")].setData({
                "dead": true,
                "eating": false,
              });
              s[f[i].getData("leftBusy")].setData({
                "strong": true,
                "eating": false,
              });
            } else {
              //~ console.log("right hawk wins");
              s[f[i].getData("leftBusy")].setData({
                "dead": true,
                "eating": false,
              });
              s[f[i].getData("rightBusy")].setData({
                "strong": true,
                "eating": false,
              });
            }
          } else {
            //~ console.log("right is dove, hawk and dove");
            s[f[i].getData("leftBusy")].setData({
              "strong": true,
              "eating": false,
            });
            s[f[i].getData("rightBusy")].setData({
              "fleeing": true,
              "eating": false,
            });
          }
        } else {
          //~ console.log("left is dove");
          if (s[f[i].getData("rightBusy")].getData("strategy") == 
            names["strategies"]["hawk"]) {
            //~ console.log("right is hawk, dove and hawk");
            s[f[i].getData("leftBusy")].setData({
              "fleeing": true,
              "eating": false,
            });
            s[f[i].getData("rightBusy")].setData({
              "strong": true,
              "eating": false,
            });
          } else {
            //~ console.log("right is dove, dove and dove");
            s[f[i].getData("leftBusy")].setData({"eating": false});
            s[f[i].getData("rightBusy")].setData({"eating": false});
          }
        }
      } else {
        //~ console.log("no one on right, bird is alone");
        s[f[i].getData("leftBusy")].setData({
          "strong": true,
          "eating": false,
        });
      }
    } else {
      //~ console.log("One food was alone");
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
