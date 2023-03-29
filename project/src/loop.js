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
  foodsPlacementAlgorithm,
  growthRate,
  lessFood,
  maxAge,
  moreDove,
  moreFood,
  moreHawk,
  name,
  names,
  rulesetAlgorithm,
  subjectsPlacementAlgorithm,
  updateInjection,
  version,
} from "./index.js";

import {
  subjects,
  foods,
  //~ subjectsCircle,
  //~ foodsCircle,
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
    
    data = getNestedData("gene", alphabetArray);
    charts["genetic"].data.labels = data["labels"];
    charts["genetic"].data.datasets[0].data = data["data"];
    charts["genetic"].update();
    
    updateNestedBarChart("genetic", "gene", alphabetArray)
    updateSimpleBarChart("age");
    updateSimpleBarChart("generation");
    updatePopulationChart("hawkAndDove");
    updatePopulationMovingChart("population");
    
    data = getPopulationData();
    //~ // Tests game over at iteration 10
    //~ if (iteration == 10) {data[names[1]] = 0;}
    for (let i = 1; i < names.length; i++) {
      if (data[names[i]] < 1) {
        let reason = `${names[i]} population reached zero at ` +
          `iteration ${iteration}`;
        //~ console.log(`[${name} v${version}]: ${reason}`);
        endGame(scene, reason);
        return;
      }
      else if (data[names[i]] < 2) {
        // TODO: Find out why hawk get stuck with one subject at classic ruleset
        createNew(names[i]);
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
      endGame(scene, reason);
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
      createNew(names[1]);
    }
    
    if ($fx.rand() < moreDove * 1e-2) {
      createNew(names[2]);
    }
    
    subjectsPlacementAlgorithm();
      
    if ($fx.rand() < moreFood * 1e-2) {
      foods.create(0, 0, names[0]);
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

function updateSimpleBarChart(key) {
  data = getSimpleData(key);
  charts[key].data.labels = data["labels"];
  charts[key].data.datasets[0].data = data["data"];
  charts[key].update();
}

function updateNestedBarChart(chart, key, array) {
  data = getNestedData(key, array);
  charts[chart].data.labels = data["labels"];
  charts[chart].data.datasets[0].data = data["data"];
  charts[chart].update();
}

function updatePopulationChart(key) {
  data = getPopulationData();
  charts[key].data.datasets[0].data = [data["total"]];
  charts[key].data.datasets[1].data = [data[names[0]]];
  for (let i = 1; i < names.length; i++) {
    charts[key].data.datasets[i + 1].data = [data[names[i]]];
  }
  charts[key].update();
}

function updatePopulationMovingChart(key) {
  data = getPopulationData();
  charts[key].data.labels.push(iteration);
  charts[key].data.datasets[0].data.push(data["total"]);
  charts[key].data.datasets[1].data.push(data[names[0]]);
  for (let i = 1; i < names.length; i++) {
    charts[key].data.datasets[i].data.push(data[names[i]]);
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
      data[names[0]]
      //~ $fx.rand() * 99
    );
    for (let i = 1; i < names.length; i++) {
      charts[key].data.datasets[i + 1].data.push(
        data[names[i]]
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

function getSimpleData(key) {
  let data = {"data": [], "labels": []};
  let limit = 0;
  for (let i = 0; i < subjects.getChildren().length; i++) {
    limit = math.max(limit, subjects.getChildren()[i].getData(key));
  }
  for (let i = 0; i <= limit; i++) {
    let new_data = subjects.getChildren().filter(
      s => s.getData(key) == i).length;
    if (new_data > 0) {
      data["labels"].push(i);
      data["data"].push(new_data);
    }
  }
  return data;
}

function getNestedData(key, array) {
  let data = {"data": [], "labels": []};
  for (let i = 0; i < array.length; i++) {
    let new_data = subjects.getChildren().filter(
      s => s.getData(key) == array[i]).length;
    if (new_data > 0) {
      data["labels"].push(array[i]);
      data["data"].push(new_data);
    }
  }
  return data;
}

function getPopulationDataCompat() {
  let data = [];
  data.push(subjects.getChildren().length);
  data.push(foods.getChildren().length);
  for (let i = 1; i < names.length; i++) {
    data[i] = subjects.getChildren().filter(
      s => s.getData("strategy") == names[i]).length;
  }
  return data;
}

function getPopulationData() {
  let data = {};
  data["total"] = subjects.getChildren().length;
  data[names[0]] = foods.getChildren().length;
  for (let i = 1; i < names.length; i++) {
    data[names[i]] = subjects.getChildren().filter(
      s => s.getData("strategy") == names[i]).length;
  }
  return data;
}

function endGame(scene, cause) {
  let geneticData = getNestedData("gene", alphabetArray);
  let populationData = getPopulationData();
  let s = subjects.getChildren();
  let f = foods.getChildren();
  
  updateNestedBarChart("genetic", "gene", alphabetArray);
  updatePopulationChart("hawkAndDove");
  updateSimpleBarChart("age");
  updateSimpleBarChart("generation");
  
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
  for (let i = 1; i < names.length; i++) {
    scene.add.text(
      15,
      30 * (i + 2),
      `${names[i]} population: ${populationData[names[i]]}`,
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
    30 * (names.length + 2),
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
    30 * (names.length + 3),
    `remaining ${names[0]}: ${populationData[names[0]]}`,
    {
      "fontSize": "2em",
      "fill": "#121212",
      //~ "fill": "#e8e8e8",
      "align": "center"
    }
  );
  
  let geneWinner, geneWinnerN;
  let geneWinners = {"ages": [], "gens": []};
  if (geneticData["data"].length > 0) {
    geneWinnerN = math.max(geneticData["data"]);
    geneWinner = geneticData["labels"][geneticData["data"].indexOf(
      geneWinnerN)];
    for (let i = 0; i < s.length; i++) {
      if (s[i].getData("gene") == geneWinner) {
        geneWinners["ages"].push(s[i].getData("age"));
        geneWinners["gens"].push(s[i].getData("generation"));
      }
    }
  } else {
    geneWinner = "None";
  }
  
  if (geneWinner != "None") {
    scene.add.text(
      15,
      30 * (names.length + 4),
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
      30 * (names.length + 5),
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
      30 * (names.length + 6),
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
      30 * (names.length + 7),
      `newest generation from all \#${geneWinner}: ` + 
        `${math.max(geneWinners["gens"])}`,
      {
        "fontSize": "2em",
        "fill": "#121212",
        //~ "fill": "#e8e8e8",
        "align": "left"
      }
    );
    let attrs = Object.entries(gData[geneWinner]).map(
      ([k, v]) => `${k}: ${v}`).join("\n\t");
    scene.add.text(
      15,
      30 * (names.length + 8),
      `genetic attributes for \#${geneWinner}:\n\t${attrs}`,
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
