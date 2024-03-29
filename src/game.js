/**
 * @file game.js Phaser game for Hawk Dove Game  
 * @copyright Iuri Guilherme 2023-2024  
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

import {
  loop as updateWrapper,
} from "./loop.js";

export const getPhaserGame = function(
  params,
  graphColors,
  name,
  names,
  strategiesNames,
  version,
  createCharts,
  charts,
  math,
  Phaser,
  fxArray,
  graphsCanvas,
  alphabetArray,
  Chart,
  gData,
  iteration,
  foods,
  foodsCircle,
  subjects,
  subjectsCircle,
  datasets,
  datasetsHistory,
  getGeneticData,
  properAlphabet,
  geneticCripple,
  geneticHandicap,
  datasetsHAD,
  datasetsASR,
  datasetsASRHistory,
  fxhashTrunc,
) {
  class HawkDoveScene extends Phaser.Scene {
    constructor () {
      super();
    }
    preload () {
      this.load.path = "./assets/";
      for (let i = 0; i < params["spritesTheme"].length; i++) {
        if (params["spritesTheme"][i]["type"] == "svg") {
          this.load.svg(
            params["spritesTheme"][i]["key"],
            params["spritesTheme"][i]["file"],
            {"scale": params["spritesTheme"][i]["scale"]},
          );
        } else if (params["spritesTheme"][i]["type"] == "image") {
          this.load.image(
            params["spritesTheme"][i]["key"],
            params["spritesTheme"][i]["file"],
          );
        }
      }
    }
    create () {
      subjects = new Phaser.GameObjects.Group(this);
      for (let i = 0; i < params["startingSubjects"]; i++) {
        createNew(names["strategies"][strategiesNames[
            math.floor($fx.rand() * strategiesNames.length)]], fxArray, 
          Object.keys(names["asr"]), subjects, math);
      }
      for (let i = 0; i < params["startingDoves"]; i++) {
        createNew(names["strategies"]["dove"], fxArray,
          Object.keys(names["asr"]), subjects, math);
      }
      for (let i = 0; i < params["startingHawks"]; i++) {
        createNew(names["strategies"]["hawk"], fxArray,
          Object.keys(names["asr"]), subjects, math);
      }
      foods = this.add.group({
        "key": names["food"],
        "repeat": ((subjects.getChildren().length * params["initialFoodRate"]) 
          / 1e2) - 1,
      });
      for (let i = 0; i < foods.getChildren().length; i++) {
        foods.getChildren()[i].setData({
          "leftBusy": -1,
          "rightBusy": -1,
        });
      }
      //~ console.log(`[${name} v${version}] created`,
        //~ `${subjects.getChildren().length} subjects and`,
        //~ `${foods.getChildren().length} foods.`);
      
      subjectsCircle = new Phaser.Geom.Circle(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        (this.cameras.main.height / 3),
      );
      foodsCircle = new Phaser.Geom.Circle(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        (this.cameras.main.height / 4.5),
      );
      
      Phaser.Actions.PlaceOnCircle(subjects.getChildren(), subjectsCircle);
      Phaser.Actions.RandomCircle(foods.getChildren(), foodsCircle);
      
      getGeneticData({
        "gData": gData,
        "properAlphabet": properAlphabet,
        "geneticCripple": geneticCripple,
        "geneticHandicap": geneticHandicap,
        "math": math,
        "fxhashTrunc": fxhashTrunc,
      });
      
      this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
      this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
    // FIXME: Use imported update function from another module instead
    update () {
      iteration = updateWrapper(
        this,
        subjects,
        foods,
        subjectsCircle,
        foodsCircle,
        params["findFoodAlgorithm"],
        params["foodsPlacementAlgorithm"],
        params["gameOverGenetic"],
        params["gameOverPopulation"],
        params["gameOverStrategy"],
        params["growthRate"],
        params["lessFoods"],
        params["maxAge"],
        params["moreDoves"],
        params["moreFoods"],
        params["moreHawks"],
        params["moreSubjects"],
        name,
        names,
        params["had_ruleset"],
        strategiesNames,
        params["had_strategy"],
        params["subjectsPlacementAlgorithm"],
        version,
        charts,
        alphabetArray,
        fxArray,
        math,
        gData,
        iteration,
        params["had_payoff_matrix"],
        params["asr_ruleset"],
        params["asr_payoff_matrix"],
        params["asr_strategy"],
        params["asr_available"],
        params["gameOverASR"],
      );
    }
  }
  
  createCharts({
    "charts": charts,
    "names": names,
    "graphColors": graphColors,
    "strategiesNames": strategiesNames,
    "Chart": Chart,
    "graphsCanvas": graphsCanvas,
    "datasets": datasets,
    "datasetsHistory": datasetsHistory,
    "datasetsHAD": datasetsHAD,
    "datasetsASR": datasetsASR,
    "datasetsASRHistory": datasetsASRHistory,
    "asrAvailable": params["asr_available"],
  });
  
  let graphsMaxWidth = 0;
  let graphsMaxHeight = 0;
  for (let i = 0; i < graphsCanvas.length; i++) {
    graphsMaxWidth = math.max(graphsMaxWidth, graphsCanvas[i].offsetWidth);
    graphsMaxHeight = math.max(graphsMaxHeight, graphsCanvas[i].offsetHeight);
  }
  
  const config = {
    "type": Phaser.CANVAS,
    "width": window.innerWidth - graphsMaxWidth - (window.innerWidth / 60),
    "height": window.innerHeight - graphsMaxHeight - (window.innerHeight / 60),
    //~ "width": window.innerWidth - (window.innerWidth / 60),
    //~ "height": window.innerHeight - (window.innerHeight / 60),
    "backgroundColor": "#e8e8e8",
    "canvas": gameCanvas,
    "parent": "game",
    "scale": {
      "mode": Phaser.Scale.NONE,
      "zoom": Phaser.Scale.MAX_ZOOM
    },
    "scene": HawkDoveScene,
  };
  
  return new Phaser.Game(config);
};
//~ export const phaserGame = new Phaser.Game(config);

function createNew(key, fxArray, asrArray, subjects, math) {
  let children = subjects.create(0, 0, key);
  children.setData({
    "gene": fxArray[math.floor($fx.rand() * fxArray.length)],
    "strategy": key,
    "asr": asrArray[math.floor($fx.rand() * asrArray.length)],
    "state": "waiting",
    "waiting": true,
    "eating": false,
    "responding": false,
    "dying": false,
    "reproducing": false,
    "age": 0,
    "generation": 0,
  });
  //~ console.log(`[${name} v${version}]: Creating a new ${key}`);
}
