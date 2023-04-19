/**
 * @file ruleset2.js Primer's Hawks & Doves ruleset for Hawk Dove Game  
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
 * @description Primer's Hawk and Doves ruleset:
 * https://youtu.be/YNMkADpvO4w?t=89s
 * 
 * Youtube channel Primer defines that eating 100% of the food is needed for 
 *  reproduction and 50% is needed for survival. If a bird gets 25% of the 
 *  food, it'll have a 50% chance of surival, and if it gets 75% of the food,
 *  it has 50% chance of reproduction;
 * If a Hawk and a Dove meet, the Dove will have 50% chance of survival, while 
 *  the Hawk will have 100% chance of survival and 50% chance of reproduction,
 *  because the Hawk will eat 75% of the food, and the Dove will eat 25%;
 * If two Hawks meet, both have 0% chance of survival, because they will fight,
 *  wasting all energy and whatever food they eat is irrelevant;
 * If two Doves meet, they both have 100% chance of survival and 0% of chance 
 *  of reproduction, because both will share the food equally;
 * If a Hawk or a Dove finds a food alone, they have 100% of chance of 
 *  reproduction, because they'll eat all the food alone;
 */
export function ruleset2(kwargs) {
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
            //~ console.log("left and right two hawks. both die...");
            s[f[i].getData("rightBusy")].setData({
              "state": "dying",
              "responding": false,
              "dying": true,
            });
            s[f[i].getData("leftBusy")].setData({
              "state": "dying",
              "responding": false,
              "dying": true,
            });
          } else if (s[f[i].getData("rightBusy")].getData("strategy") == 
            kwargs["names"]["strategies"]["dove"]) {
            //~ console.log("right is dove, hawk and dove");
            s[f[i].getData("leftBusy")].setData({"responding": false});
            if ($fx.rand() > p["reproduction"]["hawk"]["dove"]) {
              s[f[i].getData("leftBusy")].setData({
                "state": "reproducing",
                "reproducing": true,
              });
            }
            s[f[i].getData("rightBusy")].setData({"responding": false});
            if ($fx.rand() < p["survival"]["dove"]["hawk"]) {
              s[f[i].getData("rightBusy")].setData({
                "state": "dying",
                "dying": true,
              });
            }
          }
        } else if (s[f[i].getData("leftBusy")].getData("strategy") == 
          kwargs["names"]["strategies"]["dove"]) {
          //~ console.log("left is dove");
          if (s[f[i].getData("rightBusy")].getData("strategy") == 
            kwargs["names"]["strategies"]["hawk"]) {
            //~ console.log("right is hawk, dove and hawk");
            s[f[i].getData("rightBusy")].setData({"responding": false});
            if ($fx.rand() > p["reproduction"]["hawk"]["dove"]) {
              s[f[i].getData("rightBusy")].setData({
                "state": "reproducing",
                "responding": false,
                "reproducing": true,
              });
            }
            s[f[i].getData("leftBusy")].setData({"responding": false});
            if ($fx.rand() < p["survival"]["dove"]["hawk"]) {
              s[f[i].getData("leftBusy")].setData({
                "state": "dying",
                "dying": true,
              });
            }
          } else if (s[f[i].getData("rightBusy")].getData("strategy") == 
            kwargs["names"]["strategies"]["dove"]) {
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
      //~ `${s[i].getData("strategy")} died of`);
    if (s[i].getData("state") == "responding") {
      s[i].setData({
        "responding": false,
        "dying": true,
      });
    }
  }
}
