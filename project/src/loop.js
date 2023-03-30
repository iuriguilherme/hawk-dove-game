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
  endGame,
} from "./gameOver.js";

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
  infinite,
  lessFoods,
  maxAge,
  moreDoves,
  moreFoods,
  moreHawks,
  moreSubjects,
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
        if (!infinite) {
          endGame(
            scene,
            reason,
            subjects,
            foods,
            getNestedData,
            getPopulationData,
            names,
            math,
            alphabetArray,
            updateNestedBarChart,
            updatePopulationChart,
            updateSimpleBarChart,
            gData,
          );
          gameOver = true;
          return;
        }
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
      if (!infinite) {
        endGame(
          scene,
          reason,
          subjects,
          foods,
          getNestedData,
          getPopulationData,
          names,
          math,
          alphabetArray,
          updateNestedBarChart,
          updatePopulationChart,
          updateSimpleBarChart,
          gData,
        );
        gameOver = true;
        return;
      }
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
    
    if ($fx.rand() < moreHawks * 1e-2) {
      createNew(names[1]);
    }
    
    if ($fx.rand() < moreDoves * 1e-2) {
      createNew(names[2]);
    }
    
    if ($fx.rand() < moreSubjects * 1e-2) {
      createNew(names[math.max(1, math.floor($fx.rand() * names.length))]);
    }
    
    subjectsPlacementAlgorithm();
      
    if ($fx.rand() < moreFoods * 1e-2) {
      foods.create(0, 0, names[0]);
      //~ console.log(`[${name} v${version}]: Creating one food (${f.length})`);
    }
    if ($fx.rand() < lessFoods * 1e-2) {
      try {
        foods.getChildren()[0].destroy();
      } catch {}
      //~ console.log(`[${name} v${version}]: Destroying one food (${f.length})`);
    }
    for (let i = 0; i < f.length; i++) {
      f[i].setData({
        "leftBusy": -1,
        "rightBusy": -1,
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

// FIXME: The population line chart is broken since 0.9
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
