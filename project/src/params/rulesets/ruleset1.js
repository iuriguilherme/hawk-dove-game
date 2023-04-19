/**
 * @file ruleset1.js Classic ruleset for Hawk Dove Game  
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
export function ruleset1(kwargs) {
  let f = kwargs["foods"].getChildren();
  let s = kwargs["subjects"].getChildren();
  let p = kwargs["rulesetPayoffMatrix"]();
  for (let i = 0; i < f.length; i++) {
    //~ console.log(i);
    if (f[i].getData("leftBusy") > -1) {
      //~ console.log("left populated");
      if (f[i].getData("rightBusy") > -1) {
        //~ console.log("right populated");
        if (s[f[i].getData("leftBusy")].getData("strategy") == 
          kwargs["names"]["strategies"]["hawk"]) {
          //~ console.log("left is hawk");
          if (s[f[i].getData("rightBusy")].getData("strategy") == 
            kwargs["names"]["strategies"]["hawk"]) {
            //~ console.log("left and right two hawks. will fight...");
            if ($fx.rand() > p["survival"]["hawk"]["hawk"]) {
              //~ console.log("left hawk wins");
              s[f[i].getData("rightBusy")].setData({
                "state": "dying",
                "responding": false,
                "dying": true,
              });
              s[f[i].getData("leftBusy")].setData({
                "state": "reproducing",
                "responding": false,
                "reproducing": true,
              });
            } else {
              //~ console.log("right hawk wins");
              s[f[i].getData("leftBusy")].setData({
                "state": "dying",
                "responding": false,
                "dying": true,
              });
              s[f[i].getData("rightBusy")].setData({
                "state": "reproducing",
                "responding": false,
                "reproducing": true,
              });
            }
          } else {
            //~ console.log("right is dove, hawk and dove");
            s[f[i].getData("leftBusy")].setData({
              "state": "reproducing",
              "responding": false,
              "reproducing": true,
            });
            s[f[i].getData("rightBusy")].setData({"responding": false});
          }
        } else {
          //~ console.log("left is dove");
          if (s[f[i].getData("rightBusy")].getData("strategy") == 
            kwargs["names"]["strategies"]["hawk"]) {
            //~ console.log("right is hawk, dove and hawk");
            s[f[i].getData("leftBusy")].setData({"responding": false});
            s[f[i].getData("rightBusy")].setData({
              "state": "reproducing",
              "responding": false,
              "reproducing": true,
            });
          } else {
            //~ console.log("right is dove, dove and dove");
            s[f[i].getData("leftBusy")].setData({
              "state": "waiting",
              "responding": false,
              "waiting": true,
            });
            s[f[i].getData("rightBusy")].setData({
              "state": "waiting",
              "responding": false,
              "waiting": true,
            });
          }
        }
      } else {
        //~ console.log("no one on right, bird is alone");
        s[f[i].getData("leftBusy")].setData({
          "state": "reproducing",
          "responding": false,
          "reproducing": true,
        });
      }
    } else {
      //~ console.log("One food was alone");
    }
  }
  for (let i = 0; i < s.length; i++) {
    //~ console.log(`[${kwargs["name"]} v${kwargs["version"]}]: One`, 
      //~ `${s[i].getData("strategy")} died of hunger`);
    if (s[i].getData("state") == "responding") {
      s[i].setData({
        "state": "dying",
        "responding": false,
        "dying": true,
      });
    }
  }
}

export function rulesetPayoffMatrix1() {
  return {
    "survival": {
      "dove": {
        "dove": 1.0,
        "hawk": 1.0,
        "alone": 1.0,
      },
      "hawk": {
        "dove": 1.0,
        "hawk": 0.5,
        "alone": 1.0,
      },
    },
    "reproduction": {
      "dove": {
        "dove": 0.0,
        "hawk": 0.0,
        "alone": 1.0,
      },
      "hawk": {
        "dove": 1.0,
        "hawk": 0.5,
        "alone": 1.0,
      },
    },
  };
}
