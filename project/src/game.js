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

import { create as mcreate, all as mall } from "mathjs";
const math = mcreate(mall, {});
import Phaser from "phaser";

import {
  createCharts,
} from "./charts.js";

import {
  graphsCanvas,
} from "./html.js";

import {
  initialFoodRate,
  name,
  names,
  spritesTheme,
  startingSubjects,
  startingHawks,
  startingDoves,
  version,
} from "./index.js";

import {
  loop as updateWrapper,
} from "./loop.js";

import {
  fxArray,
} from "./util.js";

export var foods;
export var foodsCircle;
export var subjects;
export var subjectsCircle;

let data;
let datasets;

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
  }
  create () {
    subjects = new Phaser.GameObjects.Group(this);
    for (let i = 0; i < startingSubjects; i++) {
      createNew(names[math.max(1, math.floor($fx.rand() * names.length))]);
    }
    for (let i = 0; i < startingHawks; i++) {
      createNew(names[2]);
    }
    for (let i = 0; i < startingDoves; i++) {
      createNew(names[1]);
    }
    foods = this.add.group({
      "key": names[0],
      "repeat": ((subjects.getChildren().length * initialFoodRate) / 1e2) - 1,
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
    
    createCharts();
  }
  // FIXME: Use imported update function from another module instead
  update () {
    updateWrapper(this);
  }
}

function createNew(key) {
  let children = subjects.create(0, 0, key);
  children.setData({
    "gene": fxArray[math.floor($fx.rand() * fxArray.length)],
    "strategy": key,
    "waiting": true,
    "eating": false,
    "fleeing": false,
    "dead": false,
    "strong": false,
    "age": 0,
    "generation": 0,
  });
  //~ console.log(`[${name} v${version}]: Creating a new ${key}`);
}

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

export const phaserGame = new Phaser.Game(config);
