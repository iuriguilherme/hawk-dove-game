/**
 * @file loop.js Phaser update for for Hawk Dove Game  
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
  charts,
} from "./charts.js";

import {
  gData,
} from "./genes.js";

import {
  findFoodAlgorithm,
  foodsPlacementAlgorithm,
  growthRate,
  hawkAndDove,
  rulesetAlgorithm,
  subjectsPlacementAlgorithm,
  updateInjection,
} from "./index.js";

import {
  subjects,
  foods,
  subjectsCircle,
  foodsCircle,
  getAgeData,
  getHawkAndDoveData,
  getPopulationData,
} from "./game.js";

import {
  fxArray,
} from "./util.js";

export var iteration = 0;

let gameOver = false;
let data;

export function loop(scene) {
  $fx.preview();
  //~ updateInjection();
  function endGame(scene, i, data, s, f, cause) {
    scene.add.text(
      15,
      30 * (i + 1),
      cause,
      {
        "fontSize": "2em",
        "fill": "#121212",
        //~ "fill": "#e8e8e8",
        "align": "center"
      }
    );
    for (let j = 0; j < data.length - 1; j++) {
      scene.add.text(
        15,
        30 * (j + hawkAndDove.length + 1),
        hawkAndDove[j] + " population: " + data[j],
        {
          "fontSize": "2em",
          "fill": "#121212",
          //~ "fill": "#e8e8e8",
          "align": "center"
        }
      );
    }
    scene.add.text(
      15,
      30 * (data.length + hawkAndDove.length),
      "total population: " + data[data.length - 1],
      {
        "fontSize": "2em",
        "fill": "#121212",
        //~ "fill": "#e8e8e8",
        "align": "center"
      }
    );
    scene.add.text(
      15,
      30 * (data.length + hawkAndDove.length + 1),
      "remaining food: " + f.length,
      {
        "fontSize": "2em",
        "fill": "#121212",
        //~ "fill": "#e8e8e8",
        "align": "center"
      }
    );
    let geneWinner;
    let populationData = getPopulationData();
    if (populationData[1].length > 0) {
      geneWinner = populationData[0][populationData[1].indexOf(
        math.max(populationData[1]))];
    } else {
      geneWinner = "None";
    }
    scene.add.text(
      15,
      30 * (data.length + hawkAndDove.length + 2),
      "highest genetic pool: " + geneWinner,
      {
        "fontSize": "2em",
        "fill": "#121212",
        //~ "fill": "#e8e8e8",
        "align": "center"
      }
    );
    scene.add.text(
      15,
      30 * (data.length + hawkAndDove.length + 3),
      `${geneWinner} genes attributes:
s: ${gData[geneWinner]["s"]}
p: ${gData[geneWinner]["p"]}
e: ${gData[geneWinner]["e"]}
c: ${gData[geneWinner]["c"]}
i: ${gData[geneWinner]["i"]}
a: ${gData[geneWinner]["a"]}
l: ${gData[geneWinner]["l"]}
`,
      {
        "fontSize": "2em",
        "fill": "#121212",
        //~ "fill": "#e8e8e8",
        "align": "left"
      }
    );
    subjects.clear(true);
    foods.clear(true);
    gameOver = true;
    return;
  }
  if (!gameOver) {
    let s = subjects.getChildren();
    let f = foods.getChildren();
    
    data = getPopulationData();
    charts["population"].data.labels = data[0];
    charts["population"].data.datasets[0].data = data[1];
    charts["population"].update();
    
    //~ data = getAgeData();
    //~ charts["age"].data.labels = data[0];
    //~ charts["age"].data.datasets[0].data = data[1];
    //~ charts["age"].update();
    
    data = getHawkAndDoveData();
    //~ charts["hawkAndDove"].data.datasets[0].data = data;
    //~ charts["hawkAndDove"].update();
    for (let i = 0; i < charts["populationLine"].data.datasets.length; i++) {
      charts["populationLine"].data.datasets[i].data.push(data[i]);
    }
    charts["populationLine"].data.labels.push(iteration);
    charts["populationLine"].update();
    
    // Tests game over at iteration 10
    //~ if (iteration == 10) {data[1] = 0;}
    for (let i = 0; i < data.length; i++) {
      if (data[i] < 1) {
        console.log(hawkAndDove[i] +
          " population reached zero at iteration " + iteration);
        endGame(scene, i, data, s, f, hawkAndDove[i] +
          " population reached zero at iteration " + iteration);
        return;
      } else if (data[i] < 2) {
        // TODO: Find out why hawk get stuck with one subject
        console.log("Creating a new " + hawkAndDove[i]);
        let ns = subjects.create(0, 0, hawkAndDove[i]);
        ns.setData({
          "p": fxArray[math.floor($fx.rand() * fxArray.length)],
          "r": hawkAndDove[i],
          "waiting": true,
          "eating": false,
          "fleeing": false,
          "dead": false,
          "strong": false,
          "age": 0
        });
        ns.setTexture(hawkAndDove[i]);
      }
    }
    
    iteration++;
    
    findFoodAlgorithm();
    rulesetAlgorithm();
    
    let toDestroy = [];
    let toReproduce = [];
    for (let i = 0; i < s.length; i++) {
      if (s[i].getData("dead")) {
        toDestroy.push(s[i]);
      } else if (s[i].getData("strong")) {
        toReproduce.push({"r": s[i].getData("r"), "p": s[i].getData("p")});
      }
    }
    for (let i = 0; i < toDestroy.length; i++) {
      toDestroy[i].destroy();
    }
    for (let i = 0; i < toReproduce.length; i++) {
      for (let j = 0; j < growthRate; j++) {
        let ns = subjects.create(0, 0, toReproduce[i]["r"]);
        ns.setData({
          "waiting": true,
          "eating": false,
          "fleeing": false,
          "dead": false,
          "strong": false,
          "p": toReproduce[i]["p"],
          "r": toReproduce[i]["r"],
          "age": 0
        });
        ns.setTexture(toReproduce[i]["r"]);
      }
    }
    if (s.length  == 0) {
      endGame(scene, 0, getHawkAndDoveData(), s, f,
        "all population reached zero at iteration " + iteration);
      again = false;
      return;
    }      
    for (let i = 0; i < s.length; i++) {
      s[i].setData({
        "waiting": true,
        "eating": false,
        "fleeing": false,
        "dead": false,
        "strong": false,
        "age": s[i].getData("age") + 1,
      });
      s[i].setTexture(s[i].getData("r"));
    }
    for (let i = 0; i < f.length; i++) {
      f[i].setData({
        "leftBusy": false,
        "rightBusy": false
      });
    }
    
    subjectsPlacementAlgorithm();
    foodsPlacementAlgorithm();
    
  } else {
    return;
  }
}
