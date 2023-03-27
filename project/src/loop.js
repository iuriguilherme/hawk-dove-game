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
        endGame(scene, i, data, hawkAndDove[i] +
          " population reached zero at iteration " + iteration);
        return;
      } else if (data[i] < 2) {
        // TODO: Find out why hawk get stuck with one subject
        let toCreate = hawkAndDove[i];
        console.log("Creating a new " + toCreate);
        let children = subjects.create(0, 0, toCreate);
        children.setData({
          "p": fxArray[math.floor($fx.rand() * fxArray.length)],
          "r": toCreate,
          "waiting": true,
          "eating": false,
          "fleeing": false,
          "dead": false,
          "strong": false,
          "age": 0,
          "gen": 0,
        });
        children.setTexture(toCreate);
      }
    }
    
    iteration++;
    
    findFoodAlgorithm();
    rulesetAlgorithm();
    
    let toDestroy = [];
    let toReproduce = [];
    for (let i = 0; i < s.length; i++) {
      let toCheck = s[i];
      if (toCheck.getData("dead")) {
        toDestroy.push(toCheck);
      } else if (toCheck.getData("strong")) {
        toReproduce.push(toCheck);
      }
    }
    for (let i = 0; i < toDestroy.length; i++) {
      toDestroy[i].destroy();
    }
    for (let i = 0; i < toReproduce.length; i++) {
      for (let j = 0; j < growthRate; j++) {
        let parent = toReproduce[i];
        let children = subjects.create(0, 0, parent.getData("r"));
        children.setData({
          "waiting": true,
          "eating": false,
          "fleeing": false,
          "dead": false,
          "strong": false,
          "p": parent.getData("p"),
          "r": parent.getData("r"),
          "age": 0,
          "gen": parent.getData("gen") + 1,
        });
        children.setTexture(parent.getData("r"));
      }
    }
    if (s.length  == 0) {
      endGame(scene, 0, getHawkAndDoveData(),
        "all population reached zero at iteration " + iteration);
      again = false;
      return;
    }      
    for (let i = 0; i < s.length; i++) {
      let toReset = s[i];
      toReset.setData({
        "waiting": true,
        "eating": false,
        "fleeing": false,
        "dead": false,
        "strong": false,
        "age": toReset.getData("age") + 1,
      });
      toReset.setTexture(toReset.getData("r"));
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

function endGame(scene, i, data, cause) {
  let s = subjects.getChildren();
  let f = foods.getChildren();
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
  let geneWinner, geneWinnerN;
  let geneWinners = {"ages": [], "gens": []};
  let populationData = getPopulationData();
  if (populationData[1].length > 0) {
    geneWinnerN = math.max(populationData[1]);
    geneWinner = populationData[0][populationData[1].indexOf(geneWinnerN)];
    for (let j = 0; j < s.length; j++) {
      if (s[j].getData("p") == geneWinner) {
        geneWinners["ages"].push(s[j].getData("age"));
        geneWinners["gens"].push(s[j].getData("gen"));
      }
    }
  } else {
    geneWinner = "None";
  }
  scene.add.text(
    15,
    30 * (data.length + hawkAndDove.length + 2),
    `highest genetic pool: \#${geneWinner} (${geneWinnerN} individuals)`,
    {
      "fontSize": "2em",
      "fill": "#121212",
      //~ "fill": "#e8e8e8",
      "align": "center"
    }
  );
  if (geneWinner != "None") {
    scene.add.text(
      15,
      30 * (data.length + hawkAndDove.length + 3),
      `highest age from all \#${geneWinner}: ${math.max(geneWinners["ages"])}`,
      {
        "fontSize": "2em",
        "fill": "#121212",
        //~ "fill": "#e8e8e8",
        "align": "left"
      }
    );
    scene.add.text(
      15,
      30 * (data.length + hawkAndDove.length + 4),
      `oldest generation from all \#${geneWinner}: ` + 
        `${math.min(geneWinners["gens"])}`,
      {
        "fontSize": "2em",
        "fill": "#121212",
        //~ "fill": "#e8e8e8",
        "align": "left"
      }
    );
    scene.add.text(
      15,
      30 * (data.length + hawkAndDove.length + 5),
      `newest generation from all \#${geneWinner}: ` + 
        `${math.max(geneWinners["gens"])}`,
      {
        "fontSize": "2em",
        "fill": "#121212",
        //~ "fill": "#e8e8e8",
        "align": "left"
      }
    );
    let keys = Object.keys(gData[geneWinner]);
    let attrs = [];
    for (let j = 0; j < keys.length; j++) {
      attrs.push(`${keys[j]}: ${gData[geneWinner][keys[j]]}`);
    }
    scene.add.text(
      15,
      30 * (data.length + hawkAndDove.length + 6),
      `genetic attributes for \#${geneWinner}:\n${attrs.join('\n')}`,
      {
        "fontSize": "2em",
        "fill": "#121212",
        //~ "fill": "#e8e8e8",
        "align": "left"
      }
    );
  }
  subjects.clear(true);
  foods.clear(true);
  gameOver = true;
  return;
}
