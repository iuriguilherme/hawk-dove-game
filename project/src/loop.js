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

import {
  endGame,
} from "./gameOver.js";

let chartData;
let gameOver = false;

export const loop = function(
  scene,
  subjects,
  foods,
  subjectsCircle,
  foodsCircle,
  findFoodAlgorithm,
  foodsPlacementAlgorithm,
  gameOverGenetic,
  gameOverPopulation,
  gameOverStrategy,
  growthRate,
  lessFoods,
  maxAge,
  moreDoves,
  moreFoods,
  moreHawks,
  moreSubjects,
  name,
  names,
  ruleset,
  strategiesNames,
  strategy,
  subjectsPlacementAlgorithm,
  version,
  charts,
  alphabetArray,
  fxArray,
  math,
  gData,
  iteration,
  payoffMatrix,
) {
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
      //~ `(${getStrategyData()[key]})`);
  }
  
  function updateSimpleBarChart(key) {
    chartData = getSimpleData(key);
    charts[key].data.labels = chartData["labels"];
    charts[key].data.datasets[0].data = chartData["data"];
    charts[key].update('none');
  }
  
  function updateNestedBarChart(chart, key, array) {
    chartData = getNestedData(key, array);
    charts[chart].data.labels = chartData["labels"];
    charts[chart].data.datasets[0].data = chartData["data"];
    charts[chart].update('none');
  }
  
  function updatePopulationChart(key) {
    chartData = getStrategyData();
    charts[key].data.datasets[0].data = [chartData["total"]];
    charts[key].data.datasets[1].data = [chartData[names["food"]]];
    for (let i = 0; i < strategiesNames.length; i++) {
      charts[key].data.datasets[i + 2].data = [
        chartData[names["strategies"][strategiesNames[i]]]];
    }
    charts[key].update('none');
  }
  
  function updatePopulationMovingChart(key) {
    chartData = getStrategyData();
    charts[key].data.labels.push(iteration);
    charts[key].data.datasets[0].data.push(chartData["total"]);
    charts[key].data.datasets[1].data.push(chartData[names["food"]]);
    for (let i = 0; i < strategiesNames.length; i++) {
      charts[key].data.datasets[i + 2].data.push(
        chartData[names["strategies"][strategiesNames[i]]]);
    }
    charts[key].update('none');
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
  
  function getStrategyData() {
    let data = {};
    data["total"] = subjects.getChildren().length;
    data[names["food"]] = foods.getChildren().length;
    for (let i = 0; i < strategiesNames.length; i++) {
      data[names["strategies"][strategiesNames[i]]] = 
        subjects.getChildren().filter(s => s.getData("strategy") == 
        names["strategies"][strategiesNames[i]]).length;
    }
    return data;
  }
  
  if (!gameOver) {
    let s = subjects.getChildren();
    let f = foods.getChildren();
    
    updateNestedBarChart("genetic", "gene", alphabetArray);
    updateSimpleBarChart("age");
    updateSimpleBarChart("generation");
    updatePopulationChart("population");
    updatePopulationMovingChart("populationHistory");
    
    chartData = getStrategyData();
    for (let i = 0; i < strategiesNames.length; i++) {
      if (chartData[names["strategies"][strategiesNames[i]]] < 1) {
        let reason = `${names["strategies"][strategiesNames[i]]} ` +
          `population reached zero at iteration ${iteration}`;
        //~ console.log(`[${name} v${version}]: ${reason}`);
        if (gameOverStrategy) {
          endGame(
            scene,
            reason,
            subjects,
            foods,
            getNestedData,
            getStrategyData,
            names,
            updateNestedBarChart,
            updatePopulationChart,
            updateSimpleBarChart,
            gData,
            strategiesNames,
            alphabetArray,
            math,
          );
          gameOver = true;
          return iteration;
        }
      }
    }
    
    iteration++;
    
    findFoodAlgorithm(
      subjects,
      foods,
      math,
    );
    strategy(subjects, foods, names, name, version, payoffMatrix);
    ruleset(subjects, foods, names, name, version);
    
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
      if (gameOverPopulation) {
        endGame(
          scene,
          reason,
          subjects,
          foods,
          getNestedData,
          getStrategyData,
          names,
          updateNestedBarChart,
          updatePopulationChart,
          updateSimpleBarChart,
          gData,
          strategiesNames,
          alphabetArray,
          math,
        );
        gameOver = true;
        return iteration;
      }
    }
    
    chartData = getNestedData("gene", alphabetArray);
    if (chartData["labels"].length === 1) {
      let reason = `all other genes have been erradicated`;
      //~ console.log(`[${name} v${version}]: ${reason}`);
      if (gameOverGenetic) {
        endGame(
          scene,
          reason,
          subjects,
          foods,
          getNestedData,
          getStrategyData,
          names,
          updateNestedBarChart,
          updatePopulationChart,
          updateSimpleBarChart,
          gData,
          strategiesNames,
          alphabetArray,
          math,
        );
        gameOver = true;
        return iteration;
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
      createNew(names["strategies"]["hawk"]);
    }
    
    if ($fx.rand() < moreDoves * 1e-2) {
      createNew(names["strategies"]["dove"]);
    }
    
    if ($fx.rand() < moreSubjects * 1e-2) {
      createNew(names["strategies"][strategiesNames[
        math.floor($fx.rand() * strategiesNames.length)]]);
    }
    
    subjectsPlacementAlgorithm(
      subjects,
      foods,
      subjectsCircle,
      foodsCircle,
      Phaser,
    );
      
    if ($fx.rand() < moreFoods * 1e-2) {
      foods.create(0, 0, names["food"]);
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
    
    foodsPlacementAlgorithm(
      subjects,
      foods,
      subjectsCircle,
      foodsCircle,
      Phaser,
    );
    
  }
  $fx.preview();
  return iteration;
}
