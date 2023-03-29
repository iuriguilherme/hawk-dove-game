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
  alphabetArray,
} from "./util.js";

import {
  findFoodAlgorithm,
  foodName,
  foodsPlacementAlgorithm,
  growthRate,
  hawkAndDove,
  lessFood,
  maxAge,
  moreDove,
  moreFood,
  moreHawk,
  name,
  rulesetAlgorithm,
  subjectsPlacementAlgorithm,
  updateInjection,
  version,
} from "./index.js";

import {
  subjects,
  foods,
  subjectsCircle,
  foodsCircle,
  //~ getAgeData,
  //~ getGeneticData,
  //~ getPopulationData,
  //~ getPopulationDataCompat,
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
    
    data = getGeneticData();
    charts["genetic"].data.labels = data[0];
    charts["genetic"].data.datasets[0].data = data[1];
    charts["genetic"].update();
    
    data = getAgeData("age");
    charts["age"].data.labels = data[0];
    charts["age"].data.datasets[0].data = data[1];
    charts["age"].update();
    
    data = getAgeData("generation");
    charts["generation"].data.labels = data[0];
    charts["generation"].data.datasets[0].data = data[1];
    charts["generation"].update();
    
    data = getPopulationData();
    
    //~ charts["population"].data.labels.push(iteration);
    //~ charts["population"].data.datasets[0].data.push(data["total"]);
    //~ charts["population"].data.datasets[1].data.push(data[foodName]);
    //~ for (let i = 2; i < (hawkAndDove.length + 2); i++) {
      //~ charts["population"].data.datasets[i].data.push(
        //~ data[hawkAndDove[i - 2]]);
    //~ }
    //~ charts["population"].update();
    
    updatePopulationChart("hawkAndDove");
    //~ updatePopulationMovingChartCompat("population");
    updatePopulationMovingChart("population");
    //~ updatePopulationMovingChartHack("population");
    //~ let key = "population";
    //~ data = getPopulationDataCompat();
    //~ for (let i = 0; i < charts[key].data.datasets.length; i++) {
      //~ charts[key].data.datasets[i].data.push(data[i]);
    //~ }
    //~ charts[key].data.labels.push(iteration);
    //~ console.log(charts[key].data);
    //~ charts[key].update();
    //~ data = getPopulationData();
    //~ charts["population"].data.labels.push(iteration);
    //~ charts["population"].data.labels.push(data["total"]);
    //~ charts["population"].data.datasets[0].data.concat([data["total"]]);
    //~ charts["population"].data.datasets[1].data = [data[foodName]];
    //~ for (let i = 0; i < hawkAndDove.length; i++) {
      //~ charts["population"].data.datasets[i + 2].data = [data[hawkAndDove[i]]];
    //~ }
    //~ charts["population"].data.datasets.forEach((dataset) => {
        //~ dataset.data.push(data["total"]);
    //~ });
    //~ console.log(charts["population"].data.datasets);
    //~ charts["population"].update();
    
    // Tests game over at iteration 10
    //~ if (iteration == 10) {data[1] = 0;}
    for (let i = 0; i < hawkAndDove.length; i++) {
      if (data[hawkAndDove[i]] < 1) {
        let reason = `${hawkAndDove[i]} population reached zero at ` +
          `iteration ${iteration}`;
        //~ console.log(`[${name} v${version}]: ${reason}`);
        endGame(scene, i, reason);
        return;
      }
      else if (data[hawkAndDove[i]] < 2) {
        // TODO: Find out why hawk get stuck with one subject at classic ruleset
        createNew(hawkAndDove[i]);
      }
    }
    
    iteration++;
    
    findFoodAlgorithm();
    rulesetAlgorithm();
    
    let toDestroy = [];
    let toReproduce = [];
    for (let i = 0; i < s.length; i++) {
      let toCheck = s[i];
      if (maxAge > 0) {
        if (toCheck.getData("age") > maxAge) {
          //~ console.log(`[${name} v${version}]: One`,
            //~ `${toCheck.getData("strategy")} died of old age`);
          toCheck.setData({"dead": true});
        }
      }
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
        let children = subjects.create(0, 0, parent.getData("strategy"));
        children.setData({
          "waiting": true,
          "eating": false,
          "fleeing": false,
          "dead": false,
          "strong": false,
          "gene": parent.getData("gene"),
          "strategy": parent.getData("strategy"),
          "age": 0,
          "generation": parent.getData("generation") + 1,
        });
        children.setTexture(parent.getData("strategy"));
      }
    }
    
    if (s.length  == 0) {
      let reason = `all population reached zero at iteration ${iteration}`;
      //~ console.log(`[${name} v${version}]: ${reason}`);
      endGame(scene, 0, reason);
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
      toReset.setTexture(toReset.getData("strategy"));
    }
    
    if ($fx.rand() < moreHawk * 1e-2) {
      createNew("hawk");
    }
    
    if ($fx.rand() < moreDove * 1e-2) {
      createNew("dove");
    }
    
    subjectsPlacementAlgorithm();
      
    if ($fx.rand() < moreFood * 1e-2) {
      foods.create(0, 0, foodName);
      //~ console.log(`[${name} v${version}]: Creating one food (${f.length})`);
    }
    if ($fx.rand() < lessFood * 1e-2) {
      foods.getChildren()[0].destroy();
      //~ console.log(`[${name} v${version}]: Destroying one food (${f.length})`);
    }
    for (let i = 0; i < f.length; i++) {
      f[i].setData({
        "leftBusy": false,
        "rightBusy": false
      });
    }
    
    foodsPlacementAlgorithm();
    
  } else {
    return;
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
  children.setTexture(key);
  //~ console.log(`[${name} v${version}]: Creating a new ${key}`,
    //~ `(${getPopulationData()[key]})`);
}

function updatePopulationChart(key) {
  data = getPopulationData();
  charts[key].data.datasets[0].data = [data["total"]];
  charts[key].data.datasets[1].data = [data[foodName]];
  for (let i = 0; i < hawkAndDove.length; i++) {
    charts[key].data.datasets[i + 2].data = [data[hawkAndDove[i]]];
  }
  charts[key].update();
}

function updatePopulationMovingChart(key) {
  data = getPopulationData();
  //~ console.log(data);
  charts[key].data.labels.push(iteration);
  charts[key].data.datasets[0].data.push(data["total"]);
  charts[key].data.datasets[1].data.push(data[foodName]);
  for (let i = 0; i < hawkAndDove.length; i++) {
    charts[key].data.datasets[i + 2].data.push(data[hawkAndDove[i]]);
  }
  charts[key].update();
}

function updatePopulationMovingChartHack(key) {
  data = getPopulationData();
  charts[key].data.labels.push(iteration);
  for (let i = 0; i < charts[key].data.labels.length; i++) {
    charts[key].data.datasets[0].data.push(
      data["total"]
      //~ $fx.rand() * 99
    );
    charts[key].data.datasets[1].data.push(
      data[foodName]
      //~ $fx.rand() * 99
    );
    for (let i = 0; i < hawkAndDove.length; i++) {
      charts[key].data.datasets[i + 2].data.push(
        data[hawkAndDove[i]]
        //~ $fx.rand() * 99
      );
    }
  }
  charts[key].update();
}

function updatePopulationMovingChartCompat(key) {
  data = getPopulationDataCompat();
  for (let i = 0; i < charts[key].data.datasets.length; i++) {
    charts[key].data.datasets[i].data.push(data[i]);
  }
  charts[key].data.labels.push(iteration);
  charts[key].update();
}

export function getAgeData(key) {
  let labels = [];
  let data = [];
  let limit = 0;
  for (let i = 0; i < subjects.getChildren().length; i++) {
    limit = math.max(limit, subjects.getChildren()[i].getData(key));
  }
  for (let j = 0; j <= limit; j++) {
    let new_data = subjects.getChildren().filter(
      s => s.getData(key) == j).length;
    if (new_data > 0) {
      labels.push(j);
      data.push(new_data);
    }
  }
  return [labels, data];
}

function getPopulationDataCompat() {
  let data = [];
  data.push(subjects.getChildren().length);
  data.push(foods.getChildren().length);
  for (let i = 0; i < hawkAndDove.length; i++) {
    data[i] = subjects.getChildren().filter(
      s => s.getData("strategy") == hawkAndDove[i]).length;
  }
  return data;
}

export function getPopulationData() {
  let data = {};
  data["total"] = subjects.getChildren().length;
  data[foodName] = foods.getChildren().length;
  for (let i = 0; i < hawkAndDove.length; i++) {
    data[hawkAndDove[i]] = subjects.getChildren().filter(
      s => s.getData("strategy") == hawkAndDove[i]).length;
  }
  return data;
}

export function getGeneticData() {
  let labels = [];
  let data = [];
  for (let i = 0; i < alphabetArray.length; i++) {
    let new_data = subjects.getChildren().filter(
      s => s.getData("gene") == alphabetArray[i]).length;
    if (new_data > 0) {
      labels.push(alphabetArray[i]);
      data.push(new_data);
    }
  }
  return [labels, data];
}

function endGame(scene, i, cause) {
  let geneticData = getGeneticData();
  let populationData = getPopulationData();
  let s = subjects.getChildren();
  let f = foods.getChildren();
  scene.add.text(
    15,
    30,
    cause,
    {
      "fontSize": "2em",
      "fill": "#121212",
      //~ "fill": "#e8e8e8",
      "align": "center"
    }
  );
  for (let j = 0; j < hawkAndDove.length; j++) {
    scene.add.text(
      15,
      30 * (j + 2),
      `${hawkAndDove[j]} population: ${populationData[hawkAndDove[j]]}`,
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
    30 * (hawkAndDove.length + 2),
    `total population: ${populationData["total"]}`,
    {
      "fontSize": "2em",
      "fill": "#121212",
      //~ "fill": "#e8e8e8",
      "align": "center"
    }
  );
  scene.add.text(
    15,
    30 * (hawkAndDove.length + 3),
    `remaining ${foodName}: ${populationData[foodName]}`,
    {
      "fontSize": "2em",
      "fill": "#121212",
      //~ "fill": "#e8e8e8",
      "align": "center"
    }
  );
  let geneWinner, geneWinnerN;
  let geneWinners = {"ages": [], "gens": []};
  charts["genetic"].data.labels = geneticData[0];
  charts["genetic"].data.datasets[0].data = geneticData[1];
  charts["genetic"].update();
  updatePopulationChart("hawkAndDove");
  if (geneticData[1].length > 0) {
    geneWinnerN = math.max(geneticData[1]);
    geneWinner = geneticData[0][geneticData[1].indexOf(geneWinnerN)];
    for (let j = 0; j < s.length; j++) {
      if (s[j].getData("gene") == geneWinner) {
        geneWinners["ages"].push(s[j].getData("age"));
        geneWinners["gens"].push(s[j].getData("generation"));
      }
    }
  } else {
    geneWinner = "None";
  }
  if (geneWinner != "None") {
    scene.add.text(
      15,
      30 * (hawkAndDove.length + 4),
      `highest genetic pool: \#${geneWinner} (${geneWinnerN} individuals)`,
      {
        "fontSize": "2em",
        "fill": "#121212",
        //~ "fill": "#e8e8e8",
        "align": "center"
      }
    );
    scene.add.text(
      15,
      30 * (hawkAndDove.length + 5),
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
      30 * (hawkAndDove.length + 6),
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
      30 * (hawkAndDove.length + 7),
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
      30 * (hawkAndDove.length + 8),
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
