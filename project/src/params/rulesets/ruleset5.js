/**
 * @file ruleset5.js ARS ruleset Hawk Dove Game  
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

export function ruleset5(kwargs) {
  let f = kwargs["foods"].getChildren();
  let s = kwargs["subjects"].getChildren();
  let p = kwargs["rulesetPayoffMatrix"]();
  for (let i = 0; i < f.length; i++) {
    if (f[i].getData("leftBusy") > -1 && f[i].getData("rightBusy") > -1) {
      if (
        s[f[i].getData("leftBusy")].getData("strategy") == 
          kwargs["names"]["strategies"]["hawk"] || 
        s[f[i].getData("rightBusy")].getData("strategy") == 
          kwargs["names"]["strategies"]["hawk"]
      ) {
        s[f[i].getData("leftBusy")].setData({"responding": false});
        s[f[i].getData("rightBusy")].setData({"responding": false});
        if ($fx.rand() > a["survival"][
          s[f[i].getData("leftBusy")].getData("ars")][
          s[f[i].getData("rightBusy")].getData("ars")]) {
          s[f[i].getData("leftBusy")].setData({
            "state": "dying",
            "dying": true,
          });
        }
        if ($fx.rand() > a["survival"][
          s[f[i].getData("rightBusy")].getData("ars")][
          s[f[i].getData("leftBusy")].getData("ars")]) {
          s[f[i].getData("rightBusy")].setData({
            "state": "dying",
            "dying": true,
          });
        }
        if ($fx.rand() < a["reproduction"][
          s[f[i].getData("leftBusy")].getData("ars")][
          s[f[i].getData("rightBusy")].getData("ars")]) {
          s[f[i].getData("leftBusy")].setData({
            "state": "reproducing",
            "reproducing": true,
          });
        }
        if ($fx.rand() < a["reproduction"][
          s[f[i].getData("rightBusy")].getData("ars")][
          s[f[i].getData("leftBusy")].getData("ars")]) {
          s[f[i].getData("rightBusy")].setData({
            "state": "reproducing",
            "reproducing": true,
          });
        }
      }
    } else {
      if ($fx.rand() > p["reproduction"][kwargs["names"]["strategies"][
        s[f[i].getData("leftBusy")].getData("strategy")]][
        kwargs["names"]["strategies"][
        s[f[i].getData("rightBusy")].getData("strategy")]]) {
          s[f[i].getData("leftBusy")].setData({
            "state": "reproducing",
            "responding": false,
            "reproducing": true,
          });
      } else {
        s[f[i].getData("leftBusy")].setData({
          "state": "waiting",
          "responding": false,
          "waiting": true,
        });
      }
      if ($fx.rand() > p["reproduction"][kwargs["names"]["strategies"][
        s[f[i].getData("rightBusy")].getData("strategy")]][
        kwargs["names"]["strategies"][
        s[f[i].getData("leftBusy")].getData("strategy")]]) {
          s[f[i].getData("rightBusy")].setData({
            "state": "reproducing",
            "responding": false,
            "reproducing": true,
          });
      } else {
        s[f[i].getData("rightBusy")].setData({
          "state": "waiting",
          "responding": false,
          "waiting": true,
        });
      }
    }
  }
  for (let i = 0; i < s.length; i++) {
    //~ console.log(`[${kwargs["name"]} v${kwargs["version"]}]: One`,
      //~ `${s[i].getData("strategy")} died of`);
    if (s[i].getData("state") == "responding") {
      s[i].setData({
        "state": "dying",
        "responding": false,
        "dying": true,
      });
    }
  }
}
