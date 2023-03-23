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

import Chart from "chart.js/auto";
import { create, all } from "mathjs";
const math = create(all, {});
import Phaser from "phaser";

import {
  alphabetArray,
  fxArray,
  //~ properAlphabet,
  //~ sleep,
} from "./util.js";

import {
  hawkAndDove,
  //~ minDistance,
  startingSubjects,
} from "./config.js";

import {
  graphsCanvas,
} from "./charts.js";

import {
  findFoodAlgorithm,
  foodsPlacementAlgorithm,
  growthRate,
  initialFoodRate,
  rulesetAlgorithm,
  subjectsPlacementAlgorithm,
} from "./index.js";

export var foods;
export var foodsCircle;
export var subjects;
export var subjectsCircle;

let charts = {};
let data;
let datasets;
let gameOver = false;
let iteration = 0;

function getAgeData() {
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

function getHawkAndDoveData() {
  let data = [];
  for (let i = 0; i < hawkAndDove.length; i++) {
    data[i] = subjects.getChildren().filter(
      s => s.getData("r") == hawkAndDove[i]).length;
  }
  data.push(subjects.getChildren().length)
  return data;
}

function getPopulationData() {
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
    //~ this.load.svg("hawk", "boy.svg");
    this.load.svg("hawk", "face-devilish-2.svg");
    //~ this.load.svg("dove", "girl.svg");
    this.load.svg("dove", "face-angel-2.svg");
    this.load.svg("strong", "yinyang.svg");
    this.load.svg("dead", "block.svg");
    this.load.svg("fleeing", "swiss.svg");
    //~ this.load.svg("food", "heart.svg");
    this.load.image("food", "food-strawberry_with_light_shadow.png");
    //~ const blob = new Blob([svgString], { type: 'image/svg+xml' });
    //~ const url = URL.createObjectURL(blob);
    //~ this.load.spritesheet(
      //~ "dude",
      //~ "dude.png",
      //~ {
        //~ "frameWidth": 178,
        //~ "frameHeight": 198
      //~ }
    //~ );
  }
  create () {
    subjects = this.add.group({
      "key": "hawk",
      "repeat": startingSubjects
    });
    foods = this.add.group({
      "key": "food",
      "repeat": (startingSubjects * initialFoodRate) / 1e2
    });
    for (let i = 0; i < subjects.getChildren().length; i++) {
      let r = math.pickRandom(hawkAndDove);
      subjects.getChildren()[i].setData({
        "p": fxArray[i],
        "r": r,
        "waiting": true,
        "eating": false,
        "fleeing": false,
        "dead": false,
        "strong": false,
        "age": 0
      });
      subjects.getChildren()[i].setTexture(r);
    }
    for (let i = 0; i < foods.getChildren().length; i++) {
      foods.getChildren()[i].setData({
        "leftBusy": false,
        "rightBusy": false
      });
    }
    //~ for (let i = 0; i < startingSubjects; i++) {
      //~ foods.push(this.add.image(0, 0, "food"));
      //~ foods[i].setCollideWorldBounds(true);
    //~ }
    //~ this.add.collider(subjects, foods);
    subjectsCircle = new Phaser.Geom.Circle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      (this.cameras.main.height / 2)
    );
    foodsCircle = new Phaser.Geom.Circle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      (this.cameras.main.height / 3)
    );
    Phaser.Actions.PlaceOnCircle(subjects.getChildren(), subjectsCircle);
    Phaser.Actions.RandomCircle(foods.getChildren(), foodsCircle);
    //~ var trace1 = {
      //~ x: [1, 2, 3, 4],
      //~ y: [10, 15, 13, 17],
      //~ type: 'scatter'
    //~ };
    //~ var trace2 = {
      //~ x: [1, 2, 3, 4],
      //~ y: [16, 5, 11, 9],
      //~ type: 'scatter'
    //~ };
    //~ var data = [trace1, trace2];
    //~ let plot = Plotly.newPlot("graph", data);
    
    data = getPopulationData();
    charts["population"] = new Chart(graphsCanvas[0], {
      "type": "bar",
      "data": {
        "labels": data[0],
        "datasets": [{
          "label": "Genetic Population",
          "data": data[1],
          "borderWidth": 1
        }]
      },
      "options": {
        "responsive": true,
        "maintainAspectRatio": false,
        "scales": {
          "y": {
            "beginAtZero": true
          }
        }
      }
    });
    
    //~ charts["hawkAndDove"] = new Chart(graphsCanvas[2], {
      //~ "type": "bar",
      //~ "data": {
        //~ "labels": hawkAndDove.concat(["total"]),
        //~ "datasets": [{
          //~ "label": "Hawk and Dove Population",
          //~ "data": getHawkAndDoveData(),
          //~ "borderWidth": 1
        //~ }]
      //~ },
      //~ "options": {
        //~ "responsive": true,
        //~ "maintainAspectRatio": false,
        //~ "scales": {
          //~ "y": {
            //~ "beginAtZero": true
          //~ }
        //~ }
      //~ }
    //~ });
    
    data = getHawkAndDoveData();
    datasets = [];
    for (let i = 0; i < hawkAndDove.length; i++) {
      let r = math.randomInt(30, 150);
      let g = math.randomInt(30, 150);
      let b = math.randomInt(30, 150);
      datasets.push({
        "label": hawkAndDove[i],
        "data": [data[i]],
        "fill": false,
        "pointStyle": false,
        "borderWidth": 0.5,
        "backgroundColor": `rgb(${r}, ${g}, ${b})`,
        "borderColor": `rgb(${r}, ${g}, ${b})`,
        "tension": 0.1
      });
    }
    datasets.push({
      "label": "total",
      "data": [data[data.length - 1]],
      "fill": false,
      "pointStyle": false,
      "borderWidth": 0.5,
      "backgroundColor": "rgb(30, 30, 30)",
      //~ "backgroundColor": "rgb(180, 180, 180)",
      //~ "borderColor": "rgb(75, 192, 192)",
      "borderColor": "rgb(30, 30, 30)",
      //~ "borderColor": "rgb(180, 180, 180)",
      "tension": 0.1
    });
    charts["populationLine"] = new Chart(graphsCanvas[1], {
      "type": "line",
      "data": {
        "labels": [iteration],
        "datasets": datasets
      },
      "options": {
        "responsive": true,
        "maintainAspectRatio": false
      }
    });
    
    //~ data = getAgeData();
    //~ charts["age"] = new Chart(graphsCanvas[3], {
      //~ "type": "bar",
      //~ "data": {
        //~ "labels": data[0],
        //~ "datasets": [{
          //~ "label": "Age",
          //~ "data": data[1],
          //~ "borderWidth": 1
        //~ }]
      //~ },
      //~ "options": {
        //~ "responsive": true,
        //~ "maintainAspectRatio": false,
        //~ "scales": {
          //~ "y": {
            //~ "beginAtZero": true
          //~ }
        //~ }
      //~ }
    //~ });
  }
  update () {
    function endGame(scene, i, data, s, f, cause) {
      scene.add.text(
        15,
        30 * (i + 1),
        cause,
        {
          "fontSize": "24px",
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
            "fontSize": "24px",
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
          "fontSize": "24px",
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
          "fontSize": "24px",
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
          "fontSize": "24px",
          "fill": "#121212",
          //~ "fill": "#e8e8e8",
          "align": "center"
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
      
      //~ if (iteration == 10) {
        //~ data[1] = 0;
      //~ }
      for (let i = 0; i < data.length; i++) {
        if (data[i] < 1) {
          console.log(hawkAndDove[i] +
            " population reached zero at iteration " + iteration);
          endGame(this, i, data, s, f, hawkAndDove[i] +
            " population reached zero at iteration " + iteration);
          return;
        } else if (data[i] < 2) {
          // TODO: Find out why hawk get stuck with one subject
          console.log("Creating a new " + hawkAndDove[i]);
          let ns = subjects.create(0, 0, hawkAndDove[i]);
          ns.setData({
            "p": math.pickRandom(fxArray),
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
        endGame(this, 0, getHawkAndDoveData(), s, f,
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
