/**
 * @file game.js Phaser game for Hawk Dove Game  
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
import Phaser from "phaser";

import {
  createCharts,
} from "./charts.js";

import {
  graphsCanvas,
} from "./html.js";

import {
  hawkAndDove,
  initialFoodRate,
  name,
  spritesTheme,
  startingSubjects,
  version,
} from "./index.js";

import {
  loop as updateWrapper,
} from "./loop.js";

import {
  alphabetArray,
  fxArray,
} from "./util.js";

export var foods;
export var foodsCircle;
export var subjects;
export var subjectsCircle;

let data;
let datasets;

export function getAgeData() {
  let labels = [];
  let data = [];
  let maxAge = 0;
  for (let i = 0; i < subjects.getChildren().length; i++) {
    maxAge = math.max(maxAge, subjects.getChildren()[i].getData("age"));
  }
  for (let j = 0; j <= maxAge; j++) {
    let new_data = subjects.getChildren().filter(
      s => s.getData("age") == j).length;
    if (new_data > 0) {
      labels.push(j);
      data.push(new_data);
    }
  }
  return [labels, data];
}

export function getHawkAndDoveData() {
  let data = [];
  for (let i = 0; i < hawkAndDove.length; i++) {
    data[i] = subjects.getChildren().filter(
      s => s.getData("r") == hawkAndDove[i]).length;
  }
  data.push(subjects.getChildren().length)
  return data;
}

export function getPopulationData() {
  let labels = [];
  let data = [];
  for (let i = 0; i < alphabetArray.length; i++) {
    let new_data = subjects.getChildren().filter(
      s => s.getData("p") == alphabetArray[i]).length;
    if (new_data > 0) {
      labels.push(alphabetArray[i]);
      data.push(new_data);
    }
  }
  return [labels, data];
}

class HawkDoveScene extends Phaser.Scene {
  constructor () {
    super();
  }
  preload () {
    this.load.path = "./assets/";
    for (let i = 0; i < spritesTheme.length; i++) {
      if (spritesTheme[i]["type"] == "svg") {
        this.load.svg(spritesTheme[i]["key"], spritesTheme[i]["file"],
          {"scale": spritesTheme[i]["scale"]});
      } else if (spritesTheme[i]["type"] == "image") {
        this.load.image(spritesTheme[i]["key"], spritesTheme[i]["file"]);
      }
    }
    this.load.svg("strong", "yinyang.svg");
    this.load.svg("dead", "block.svg");
    this.load.svg("fleeing", "swiss.svg");
  }
  create () {
    subjects = this.add.group({
      "key": "hawk",
      "repeat": startingSubjects,
    });
    foods = this.add.group({
      "key": "food",
      "repeat": (startingSubjects * initialFoodRate) / 1e2,
    });
    for (let i = 0; i < subjects.getChildren().length; i++) {
      let s = subjects.getChildren()[i];
      let r = hawkAndDove[math.floor($fx.rand() * hawkAndDove.length)];
      let p = fxArray[math.floor($fx.rand() * fxArray.length)];
      s.setData({
        "p": p,
        "r": r,
        "waiting": true,
        "eating": false,
        "fleeing": false,
        "dead": false,
        "strong": false,
        "age": 0,
        "gen": 0,
      });
      s.setTexture(r);
    }
    for (let i = 0; i < foods.getChildren().length; i++) {
      foods.getChildren()[i].setData({
        "leftBusy": false,
        "rightBusy": false,
      });
    }
    console.log(`[${name} v${version}] created ` +
`${subjects.getChildren().length} subjects and ${foods.getChildren().length} ` +
`foods.`);
    subjectsCircle = new Phaser.Geom.Circle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      (this.cameras.main.height / 2.5),
    );
    foodsCircle = new Phaser.Geom.Circle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      (this.cameras.main.height / 4),
    );
    Phaser.Actions.PlaceOnCircle(subjects.getChildren(), subjectsCircle);
    Phaser.Actions.RandomCircle(foods.getChildren(), foodsCircle);
    
    createCharts();
  }
  update () {
    updateWrapper(this);
  }
}

let graphsMaxWidth = 0;
let graphsMaxHeight = 0;
for (let i = 0; i < graphsCanvas.length; i++) {
  graphsMaxWidth = math.max(graphsMaxWidth, graphsCanvas[i].offsetWidth);
  graphsMaxHeight = math.max(graphsMaxHeight, graphsCanvas[i].offsetHeight);
}

const config = {
  "type": Phaser.CANVAS,
  //~ "width": window.innerWidth - graphsMaxWidth - (window.innerWidth / 60),
  "width": window.innerWidth - (window.innerHeight / 60),
  "height": window.innerHeight - graphsMaxHeight - (window.innerHeight / 60),
  "backgroundColor": "#e8e8e8",
  "canvas": gameCanvas,
  "parent": "game",
  "scale": {
    "mode": Phaser.Scale.NONE,
    "zoom": Phaser.Scale.MAX_ZOOM
  },
  "scene": HawkDoveScene,
};

export const phaserGame = new Phaser.Game(config);
