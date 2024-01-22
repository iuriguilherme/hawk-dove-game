/**
 * @file loop.js Phaser update for for Hawk Dove Game  
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
  hadRuleset,
  strategiesNames,
  hadStrategy,
  subjectsPlacementAlgorithm,
  version,
  charts,
  alphabetArray,
  fxArray,
  math,
  gData,
  iteration,
  rulesetPayoffMatrix,
  asrRuleset,
  asrPayoffMatrix,
  asrStrategy,
  asrAvailable,
  gameOverASR,
) {
  
  if (!gameOver) {
    let s = subjects.getChildren();
    let f = foods.getChildren();
    
    updateNestedBarChart("genetic", "gene", alphabetArray, charts, chartData,
      subjects);
    updateSimpleBarChart("age", charts, chartData, subjects, math);
    updateSimpleBarChart("generation", charts, chartData, subjects, math);
    updateHADPopulationChart("HADPopulation", charts, chartData, foods, 
      subjects, names, strategiesNames);
    updateASRPopulationChart("ASRPopulation", charts, chartData, subjects, 
      names, asrAvailable);
    updateHADPopulationMovingChart("HADPopulationHistory", charts, chartData,
      strategiesNames, foods, subjects, names, iteration);
    updateASRPopulationMovingChart("ASRPopulationHistory", charts, chartData,
      subjects, names, iteration, asrAvailable);
    
    chartData = getStrategyData(foods, subjects, names, strategiesNames);
    for (let strategy of strategiesNames) {
      if (chartData[names["strategies"][strategy]] < 1) {
        let reason = `${names["strategies"][strategy]} population reached ` +
          `zero at iteration ${iteration}`;
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
            updateHADPopulationChart,
            updateSimpleBarChart,
            gData,
            strategiesNames,
            alphabetArray,
            math,
            charts,
            chartData,
            updateASRPopulationChart,
            asrAvailable,
            getASRData,
            getStrategyASRData,
          );
          gameOver = true;
          return iteration;
        }
      }
    }
    
    for (let asr of asrAvailable()) {
      if (chartData[names["asr"][asr]] < 1) {
        let reason = `${names["asr"][asr]} population reached ` +
          `zero at iteration ${iteration}`;
        //~ console.log(`[${name} v${version}]: ${reason}`);
        if (gameOverASR) {
          endGame(
            scene,
            reason,
            subjects,
            foods,
            getNestedData,
            getStrategyData,
            names,
            updateNestedBarChart,
            updateHADPopulationChart,
            updateSimpleBarChart,
            gData,
            strategiesNames,
            alphabetArray,
            math,
            charts,
            chartData,
            updateASRPopulationChart,
            asrAvailable,
            getASRData,
            getStrategyASRData,
          );
          gameOver = true;
          return iteration;
        }
      }
    }
    
    iteration++;
    
    findFoodAlgorithm(subjects, foods, math);
    hadStrategy({
      "subjects": subjects,
      "foods": foods,
      "names": names,
      "name": name,
      "version": version,
      "rulesetPayoffMatrix": rulesetPayoffMatrix,
      "math": math,
      "gData": gData,
      "asrPayoffMatrix": asrPayoffMatrix,
    });
    asrRuleset({
      "subjects": subjects,
      "foods": foods,
      "names": names,
      "name": name,
      "version": version,
      "rulesetPayoffMatrix": rulesetPayoffMatrix,
      "math": math,
      "gData": gData,
      "asrPayoffMatrix": asrPayoffMatrix,
    });
    asrStrategy({
      "subjects": subjects,
      "foods": foods,
      "names": names,
      "name": name,
      "version": version,
      "rulesetPayoffMatrix": rulesetPayoffMatrix,
      "math": math,
      "gData": gData,
      "asrPayoffMatrix": asrPayoffMatrix,
      "asrAvailable": asrAvailable,
    });
    hadRuleset({
      "subjects": subjects,
      "foods": foods,
      "names": names,
      "name": name,
      "version": version,
      "math": math,
      "gData": gData,
      "asrPayoffMatrix": asrPayoffMatrix,
      "rulesetPayoffMatrix": rulesetPayoffMatrix,
    });
    
    let toDestroy = [];
    let toReproduce = [];
    for (let i = 0; i < s.length; i++) {
      let toCheck = s[i];
      if (maxAge > 0) {
        if (toCheck.getData("age") > maxAge) {
          //~ console.log(`[${name} v${version}]: One`,
            //~ `${toCheck.getData("strategy")} died of old age`);
          toCheck.setData({"state": "dying", "dying": true});
        }
      }
      if (toCheck.getData("state") == "dying") {
        toDestroy.push(toCheck);
      } else if (toCheck.getData("state") == "reproducing") {
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
          "state": "waiting",
          "waiting": true,
          "eating": false,
          "responding": false,
          "dying": false,
          "reproducing": false,
          "gene": parent.getData("gene"),
          "strategy": parent.getData("strategy"),
          "asr": parent.getData("asr"),
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
          updateHADPopulationChart,
          updateSimpleBarChart,
          gData,
          strategiesNames,
          alphabetArray,
          math,
          charts,
          chartData,
          updateASRPopulationChart,
          asrAvailable,
          getASRData,
          getStrategyASRData,
        );
        gameOver = true;
        return iteration;
      }
    }
    
    chartData = getNestedData("gene", alphabetArray, subjects);
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
          updateHADPopulationChart,
          updateSimpleBarChart,
          gData,
          strategiesNames,
          alphabetArray,
          math,
          charts,
          chartData,
          updateASRPopulationChart,
          asrAvailable,
          getASRData,
          getStrategyASRData,
        );
        gameOver = true;
        return iteration;
      }
    }
    
    for (let i = 0; i < s.length; i++) {
      let toReset = s[i];
      toReset.setData({
        "state": "waiting",
        "waiting": true,
        "eating": false,
        "responding": false,
        "dying": false,
        "reproducing": false,
        "age": toReset.getData("age") + 1,
      });
      toReset.setTexture(toReset.getData("strategy"));
    }
    
    if ($fx.rand() < moreHawks * 1e-2) {
      createNew(names["strategies"]["hawk"], subjects, fxArray, names, 
        strategiesNames, math);
    }
    
    if ($fx.rand() < moreDoves * 1e-2) {
      createNew(names["strategies"]["dove"], subjects, fxArray, names, 
        strategiesNames, math);
    }
    
    if ($fx.rand() < moreSubjects * 1e-2) {
      createNew(names["strategies"][strategiesNames[
        math.floor($fx.rand() * strategiesNames.length)]], subjects, fxArray,
        names, strategiesNames, math);
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
      //~ console.log(
        //~ `[${name} v${version}]: Creating one food (${f.length})`);
    }
    if ($fx.rand() < lessFoods * 1e-2) {
      try {
        foods.getChildren()[0].destroy();
      } catch {}
      //~ console.log(
        //~ `[${name} v${version}]: Destroying one food (${f.length})`);
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
  
  if (scene.keyC.isDown) {
      console.log("C was pressed");
  }
  if (scene.keyS.isDown) {
      console.log("S was pressed");
  }
  return iteration;
}

function createNew(key, subjects, fxArray, names, strategiesNames, math) {
  let children = subjects.create(0, 0, key);
  let asrArray = Object.keys(names["asr"]);
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
  //~ console.log(`[${name} v${version}]: Creating a new ${key}`,
    //~ `(${getStrategyData(foods, subjects, names, strategiesNames)[key]})`);
}

function updateSimpleBarChart(key, charts, chartData, subjects, math) {
  chartData = getSimpleData(key, subjects, math);
  charts[key].data.labels = chartData["labels"];
  charts[key].data.datasets[0].data = chartData["data"];
  charts[key].update('none');
}

function updateNestedBarChart(chart, key, array, charts, chartData, subjects) {
  chartData = getNestedData(key, array, subjects);
  charts[chart].data.labels = chartData["labels"];
  charts[chart].data.datasets[0].data = chartData["data"];
  charts[chart].update('none');
}

function updatePopulationChart(key, charts, chartData, foods, subjects, 
  names, strategiesNames, asrAvailable) {
  chartData = getStrategyASRData(foods, subjects, names, strategiesNames, 
    asrAvailable);
  charts[key].data.datasets[0].data = [chartData["total"]];
  charts[key].data.datasets[1].data = [chartData[names["food"]]];
  for (let i = 0; i < strategiesNames.length; i++) {
    charts[key].data.datasets[2 + i].data = [
      chartData[names["strategies"][strategiesNames[i]]]];
  }
  let v = asrAvailable();
  for (let i = 0; i < v.length; i++) {
    charts[key].data.datasets[1 + strategiesNames.length + i].data.push(
      chartData[names["asr"][v[i]]]);
  }
  charts[key].update('none');
}

function updateHADPopulationChart(key, charts, chartData, foods, subjects, 
  names, strategiesNames) {
  chartData = getStrategyData(foods, subjects, names, strategiesNames);
  charts[key].data.datasets[0].data = [chartData["total"]];
  charts[key].data.datasets[1].data = [chartData[names["food"]]];
  for (let i = 0; i < strategiesNames.length; i++) {
    charts[key].data.datasets[2 + i].data = [
      chartData[names["strategies"][strategiesNames[i]]]];
  }
  charts[key].update('none');
}

function updateASRPopulationChart(key, charts, chartData, subjects, names,
  asrAvailable) {
  chartData = getASRData(subjects, names, asrAvailable);
  charts[key].data.datasets[0].data = [chartData["total"]];
  let v = asrAvailable();
  for (let i = 0; i < v.length; i++) {
    charts[key].data.datasets[1 + i].data.push(chartData[names["asr"][v[i]]]);
  }
  charts[key].update('none');
}

function updatePopulationMovingChart(key, charts, chartData, strategiesNames, 
  foods, subjects, names, iteration, asrAvailable) {
  chartData = getStrategyASRData(foods, subjects, names, strategiesNames,
    asrAvailable);
  charts[key].data.labels.push(iteration);
  charts[key].data.datasets[0].data.push(chartData["total"]);
  charts[key].data.datasets[1].data.push(chartData[names["food"]]);
  for (let i = 0; i < strategiesNames.length; i++) {
    charts[key].data.datasets[2 + i].data.push(chartData[names["strategies"][
      strategiesNames[i]]]);
  }
  let v = asrAvailable();
  for (let i = 0; i < v.length; i++) {
    charts[key].data.datasets[2 + strategiesNames.length + i].data.push(
      chartData[names["asr"][v[i]]]);
  }
  charts[key].update('none');
}

function updateHADPopulationMovingChart(key, charts, chartData, 
  strategiesNames, foods, subjects, names, iteration) {
  chartData = getStrategyData(foods, subjects, names, strategiesNames);
  charts[key].data.labels.push(iteration);
  charts[key].data.datasets[0].data.push(chartData["total"]);
  charts[key].data.datasets[1].data.push(chartData[names["food"]]);
  for (let i = 0; i < strategiesNames.length; i++) {
    charts[key].data.datasets[2 + i].data.push(chartData[names["strategies"][
      strategiesNames[i]]]);
  }
  charts[key].update('none');
}

function updateASRPopulationMovingChart(key, charts, chartData, subjects, 
  names, iteration, asrAvailable) {
  chartData = getASRData(subjects, names, asrAvailable);
  charts[key].data.labels.push(iteration);
  charts[key].data.datasets[0].data.push(chartData["total"]);
  let v = asrAvailable();
  for (let i = 0; i < v.length; i++) {
    charts[key].data.datasets[1 + i].data.push(chartData[names["asr"][v[i]]]);
  }
  charts[key].update('none');
}

function getSimpleData(key, subjects, math) {
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

function getNestedData(key, array, subjects) {
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

function getStrategyData(foods, subjects, names, strategiesNames) {
  let data = {};
  data["total"] = subjects.getChildren().length;
  data[names["food"]] = foods.getChildren().length;
  for (let strategy of strategiesNames) {
    data[names["strategies"][strategy]] = 
      subjects.getChildren().filter(s => s.getData("strategy") == 
      names["strategies"][strategy]).length;
  }
  return data;
}

function getASRData(subjects, names, asrAvailable) {
  let data = {};
  data["total"] = subjects.getChildren().length;
  let v = asrAvailable();
  for (let asr of v) {
    data[names["asr"][asr]] = 
      subjects.getChildren().filter(s => s.getData("asr") == 
      names["asr"][asr]).length;
  }
  return data;
}

function getStrategyASRData(foods, subjects, names, strategiesNames,
  asrAvailable) {
  let data = {};
  data["total"] = subjects.getChildren().length;
  data[names["food"]] = foods.getChildren().length;
  for (let strategy of strategiesNames) {
    data[names["strategies"][strategy]] = 
      subjects.getChildren().filter(s => s.getData("strategy") == 
      names["strategies"][strategy]).length;
  }
  let v = asrAvailable();
  for (let asr of v) {
    data[names["asr"][asr]] = 
      subjects.getChildren().filter(s => s.getData("asr") == 
      names["asr"][asr]).length;
  }
  return data;
}
