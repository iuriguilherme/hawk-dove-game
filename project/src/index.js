/**!
 * @file Hawk Dove Game  
 * @version 0.4.2  
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

const name = "hawk-dove-game";
const version = "0.4.2";

// this is how to define parameters
$fx.params([
  {
    id: "growth_rate",
    name: "Reproduction multiplier",
    type: "number",
    options: {
      min: 0,
      max: 10,
      step: 1,
    },
  },
  {
    id: "starting_food",
    name: "Starting Food Rate",
    type: "number",
    options: {
      min: 0,
      max: 100,
      step: 1,
    },
  },
  //~ {
    //~ id: "bigint_id",
    //~ name: "A bigint",
    //~ type: "bigint",
    //~ //default: BigInt(Number.MAX_SAFE_INTEGER * 2),
    //~ options: {
      //~ min: Number.MIN_SAFE_INTEGER * 4,
      //~ max: Number.MAX_SAFE_INTEGER * 4,
      //~ step: 1,
    //~ },
  //~ },
  //~ {
    //~ id: "color_id",
    //~ name: "A color",
    //~ type: "color",
    //~ //default: "ff0000",
  //~ },
  //~ {
    //~ id: "boolean_id",
    //~ name: "A boolean",
    //~ type: "boolean",
    //~ //default: true,
  //~ },
  //~ {
    //~ id: "string_id",
    //~ name: "A string",
    //~ type: "string",
    //~ //default: "hello",
    //~ options: {
      //~ minLength: 1,
      //~ maxLength: 64
    //~ }
  //~ },
  {
    id: "ruleset",
    name: "Ruleset",
    type: "select",
    options: {
      options: ["1"],
    }
  },
  {
    id: "food_find",
    name: "Food finding",
    type: "select",
    options: {
      options: [
        "random",
        "closest",
        "farthest",
      ],
    }
  },
  {
    id: "subjects_placement",
    name: "Subject placement",
    type: "select",
    options: {
      options: [
        "circle",
        "random",
      ],
    }
  },
  {
    id: "foods_placement",
    name: "Food placement",
    type: "select",
    options: {
      options: [
        "circle",
        "random",
      ],
    }
  },
]);

// this is how features can be defined
$fx.features({
  //~ "A random feature": Math.floor($fx.rand() * 10),
  //~ "A random boolean": $fx.rand() > 0.5,
  //~ "A random string": ["A", "B", "C", "D"].at(Math.floor($fx.rand()*4)),
  //~ "Feature from params, its a number": $fx.getParam("number_id"),
  "Ruleset": $fx.getRawParam("ruleset"),
  "Starting Food Rate": $fx.getRawParam("starting_food") + "%",
  "Reproduction Multiplier": $fx.getRawParam("growth_rate"),
  "Food finding algorithm": $fx.getRawParam("food_find"),
  "Subject placement algorithm": $fx.getRawParam("subjects_placement"),
  "Food placement algorithm": $fx.getRawParam("foods_placement"),
})

import Chart from "chart.js/auto";
import { create as mcreate, all as mall } from "mathjs";
const math = mcreate(mall, {})
import Phaser from "phaser";
//~ import p5 from 'p5';
//~ import Plotly from "plotly.js-dist-min";

const sleep = ms => new Promise(r => setTimeout(r, ms));
// https://github.com/fxhash/fxhash-webpack-boilerplate/issues/20
const properAlphabet = 
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const variantFactor = 3.904e-87; // This number is magic
const fxArray = Array.from(fxhashTrunc);
const alphabetArray = Array.from(properAlphabet);
const fxhashDecimal = base58toDecimal(fxhashTrunc);
const startingSubjects = fxArray.length;
const hawkAndDove = ["hawk", "dove"];
const minDistance = 20;
const initialFoodRate = $fx.getRawParam("starting_food");
const growthRate = $fx.getRawParam("growth_rate");
const rulesetAlgorithmMap = {
  "1": rulesetAlgorithm1,
};
const findFoodAlgorithmMap = {
  "random": findFoodAlgorithm1,
  "closest": findFoodAlgorithm2,
  "farthest": findFoodAlgorithm3,
};
const subjectsPlacementAlgorithmMap = {
  "circle": subjectsPlacementAlgorithm1,
  "random": subjectsPlacementAlgorithm2,
};
const foodsPlacementAlgorithmMap = {
  "circle": foodsPlacementAlgorithm1,
  "random": foodsPlacementAlgorithm2,
};
//~ const rulesetNumber = math.max(1, fxHashToVariant(fxhashDecimal,
  //~ rulesetMap.length));
//~ const ruleset = rulesetMap[rulesetNumber];
const rulesetAlgorithm = rulesetAlgorithmMap[$fx.getRawParam("ruleset")];
const findFoodAlgorithm = 
  findFoodAlgorithmMap[$fx.getRawParam("food_find")];
const subjectsPlacementAlgorithm = 
  subjectsPlacementAlgorithmMap[$fx.getRawParam("subjects_placement")];
const foodsPlacementAlgorithm = 
  foodsPlacementAlgorithmMap[$fx.getRawParam("foods_placement")];

const graphs = 4;
const graphsRows = 3;
const graphsBig = 2;
const graphsSmall = 2;
const containerDiv = document.createElement("div");
const containerRow = document.createElement("div");
const graphsCol = document.createElement("div");
const gamesCol = document.createElement("div");
const gameRow = document.createElement("div");
const gameCol = document.createElement("div");
const gameDiv = document.createElement("div");
const gameCanvas = document.createElement("canvas");
containerDiv.className = "container";
//~ containerRow.className = "row containerRow";
//~ containerRow.className = "grid containerRow";
containerRow.className = "containerRow";
//~ graphsCol.className = "col graphsCol";
//~ graphsCol.className = "g-col graphsCol";
graphsCol.className = "graphsCol";
//~ gamesCol.className = "col gamesCol";
//~ gamesCol.className = "g-col gamesCol";
gamesCol.className = "gamesCol";
//~ gameRow.className = "row gameRow";
//~ gameRow.className = "grid gameRow";
gameRow.className = "gameRow";
//~ gameCol.className = "col gameCol";
//~ gameCol.className = "g-col gameCol";
gameCol.className = "gameCol";
gameDiv.id = "game";
gameDiv.className = "gameDiv";
gameCanvas.id = "gameCanvas";
gameCanvas.className = "gameCanvas";
document.body.appendChild(containerDiv);
containerDiv.appendChild(containerRow);
containerRow.appendChild(graphsCol);
let graphsCanvas = [];
let graphsDivs = [];
for (let i = 0; i < graphsBig; i++) {
  let graphRow = document.createElement("div");
  let graphCol = document.createElement("div");
  let graphDiv = document.createElement("div");
  let graphCanvas = document.createElement("canvas");
  //~ graphRow.className = "row graphRow";
  //~ graphRow.className = "grid graphRow";
  graphRow.className = "graphRow";
  //~ graphCol.className = "col graphCol";
  //~ graphCol.className = "g-col graphCol";
  graphCol.className = "graphCol";
  graphDiv.id = "graph" + i;
  graphDiv.className = "graphDiv";
  graphCanvas.id = "graphCanvas" + i;
  graphCanvas.className = "graphCanvas";
  graphsCol.appendChild(graphRow);
  graphRow.appendChild(graphCol);
  graphCol.appendChild(graphDiv);
  graphDiv.appendChild(graphCanvas);
  graphsCanvas.push(graphCanvas);
  graphsDivs.push(graphDiv);
}
//~ for (let i = graphsBig; i < graphsRows; i++) {
  //~ let graphRow = document.createElement("div");
  //~ graphRow.className = "row graphSmallRow";
  //~ graphsCol.appendChild(graphRow);
  //~ for (let j = graphsBig; j < graphsBig + graphsSmall; j++) {
    //~ let graphCol = document.createElement("div");
    //~ let graphDiv = document.createElement("div");
    //~ let graphCanvas = document.createElement("canvas");
    //~ graphCol.className = "col graphSmallCol";
    //~ graphDiv.id = "graph" + j;
    //~ graphDiv.className = "graphSmallDiv";
    //~ graphCanvas.id = "graphCanvas" + j;
    //~ graphCanvas.className = "graphSmallCanvas";
    //~ graphRow.appendChild(graphCol);
    //~ graphCol.appendChild(graphDiv);
    //~ graphDiv.appendChild(graphCanvas);
    //~ graphsCanvas.push(graphCanvas);
    //~ graphsDivs.push(graphDiv);
  //~ }
//~ }

containerRow.appendChild(gamesCol);
gamesCol.appendChild(gameRow);
gameRow.appendChild(gameCol);
gameCol.appendChild(gameDiv);
gameDiv.appendChild(gameCanvas);

let iteration = 0;
let gameOver = false;
let charts = {};
let subjects;
let foods;
let subjectsCircle;
let foodsCircle;
let data;
let datasets;

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

const game = new Phaser.Game(config);

/*
 * @description Subject placement method 1:
 *    Subjects are placed distributed in a circle.  
 */
function subjectsPlacementAlgorithm1() {
  Phaser.Actions.PlaceOnCircle(subjects.getChildren(), subjectsCircle);
}

/*
 * @description Subjects placement method 2:
 *    Subjects are placed randomly inside the subject circle.  
 */
function subjectsPlacementAlgorithm2() {
  Phaser.Actions.RandomCircle(subjects.getChildren(), subjectsCircle);
}

/*
 * @description Food placement method 1:
 *    Foods are placed distributed in a inner circle, smaller than the 
 *    subjects circle.  
 */
function foodsPlacementAlgorithm1() {
  Phaser.Actions.PlaceOnCircle(foods.getChildren(), foodsCircle);
}

/*
 * @description Food placement method 2:
 *    Foods are placed randomly inside the subject circle.  
 */
function foodsPlacementAlgorithm2() {
  Phaser.Actions.RandomCircle(foods.getChildren(), foodsCircle);
}

function findFoodAlgorithmMain(selection) {
  let s = subjects.getChildren();
  let f = foods.getChildren();
  let distances = [];
  for (let i = 0; i < s.length; i++) {
    distances[i] = [];
    for (let j = 0; j < f.length; j++) {
      distances[i][j] = Phaser.Math.Distance.Between(
        s[i].x, s[i].y, f[j].x, f[j].y);
    }
    while (s[i].getData("waiting")) {
      if (distances[i].length == 0) {
        s[i].setData({
          "dead": true,
          "waiting": false
        });
        break;
      }
      let metrics = {
        "random": distances[i].indexOf(math.pickRandom(distances[i])),
        "closest": distances[i].indexOf(math.min(distances[i])),
        "farthest": distances[i].indexOf(math.max(distances[i])),
      };
      let foodMap = {
        "random": f[metrics["random"]],
        "closest": f[metrics["closest"]],
        "farthest": f[metrics["farthest"]],
      };
      let currentFood = foodMap[selection];
      let currentMetric = metrics[selection];
      if (currentFood.getData("leftBusy")) {
        if (currentFood.getData("rightBusy")) {
          distances[i].splice(currentMetric, 1);
        } else {
          s[i].x = currentFood.x + minDistance;
          s[i].y = currentFood.y - minDistance;
          currentFood.setData({"rightBusy": i});
          s[i].setData({"waiting": false, "eating": true});
        }
      } else {
        s[i].x = currentFood.x - minDistance;
        s[i].y = currentFood.y - minDistance;
        currentFood.setData({"leftBusy": i});
        s[i].setData({"waiting": false, "eating": true});
      }
    }
  }
}

/*
 * @description Food finding method 1:
 *    Subject looks for a random free food until they find it, or an infinte 
 *    loop is reached.  
 */
function findFoodAlgorithm1() {
  findFoodAlgorithmMain("random");
}

/*
 * @description Food finding method 2:
 *    Subject looks for the closest free food.  
 */
function findFoodAlgorithm2() {
  findFoodAlgorithmMain("closest");
}

/*
 * @description Food finding method 3:
 *    Subject looks for the farthest free food.  
 */
function findFoodAlgorithm3() {
  findFoodAlgorithmMain("farthest");
}

/*
 * @description Ruleset 1:
 *  If two Hawks met, one of them eats all the food and reproduce, while the 
 *    other one dies;
 *  If two Doves met, they share the food and don't reproduce;
 *  If one Hawk and one Dove met, the Hawk eats all the food alone and 
 *    reproduce, while the Dove flees, surviving but not reproducing;
 *  If only one Bird finds a food, then it eats all of it and reproduce;
 *  Food suply is constant and fixed.
 */
function rulesetAlgorithm1() {
  let s = subjects.getChildren();
  let f = foods.getChildren();
  for (let i = 0; i < f.length; i++) {
    //~ console.log(i);
    if (f[i].getData("leftBusy")) {
      //~ console.log("left populated");
      if (f[i].getData("rightBusy")) {
        //~ console.log("right populated");
        if (s[f[i].getData("leftBusy")].getData("r") == "hawk") {
          //~ console.log("left is hawk");
          if (s[f[i].getData("rightBusy")].getData("r") == "hawk") {
            //~ console.log("left and right two hawks. will fight...");
            if (math.randomInt(1)) {
              //~ console.log("left hawk wins");
              s[f[i].getData("rightBusy")].setData({
                "dead": true,
                "eating": false
              });
              s[f[i].getData("rightBusy")].setTexture("dead");
              s[f[i].getData("leftBusy")].setData({
                "strong": true,
                "eating": false
              });
              s[f[i].getData("leftBusy")].setTexture("strong");
            } else {
              //~ console.log("right hawk wins");
              s[f[i].getData("leftBusy")].setData({
                "dead": true,
                "eating": false
              });
              s[f[i].getData("leftBusy")].setTexture("dead");
              s[f[i].getData("rightBusy")].setData({
                "strong": true,
                "eating": false
              });
              s[f[i].getData("rightBusy")].setTexture("strong");
            }
          } else {
            //~ console.log("right is dove, hawk and dove");
            s[f[i].getData("leftBusy")].setData({
              "strong": true,
              "eating": false
            });
            s[f[i].getData("leftBusy")].setTexture("strong");
            s[f[i].getData("rightBusy")].setData({
              "fleeing": true,
              "eating": false
            });
            s[f[i].getData("rightBusy")].setTexture("fleeing");
          }
        } else {
          //~ console.log("left is dove");
          if (s[f[i].getData("rightBusy")].getData("r") == "hawk") {
            //~ console.log("right is hawk, dove and hawk");
            s[f[i].getData("leftBusy")].setData({
              "fleeing": true,
              "eating": false
            });
            s[f[i].getData("leftBusy")].setTexture("fleeing");
            s[f[i].getData("rightBusy")].setData({
              "strong": true,
              "eating": false
            });
            s[f[i].getData("rightBusy")].setTexture("strong");
          } else {
            //~ console.log("right is dove, dove and dove");
            s[f[i].getData("leftBusy")].setData({
              "eating": false
            });
            s[f[i].getData("rightBusy")].setData({
              "eating": false
            });
          }
        }
      } else {
        //~ console.log("no one on right");
        if (s[f[i].getData("leftBusy")].getData("r") == "hawk") {
          //~ console.log("left is hawk, hawk alone");
          s[f[i].getData("leftBusy")].setData({
            "strong": true,
            "eating": false
          });
          s[f[i].getData("leftBusy")].setTexture("strong");
        } else {
          //~ console.log("left is dove, dove alone");
          s[f[i].getData("leftBusy")].setData({
            "strong": true,
            "eating": false
          });
          s[f[i].getData("leftBusy")].setTexture("strong");
        }
      }
    } else {
      //~ console.log("no one on left");
      if (f[i].getData("rightBusy")) {
        if (s[f[i].getData("rightBusy")].getData("r")) {
          console.log("right is hawk, hawk alone");
          s[f[i].getData("rightBusy")].setData({
            "strong": true,
            "eating": false
          });
          s[f[i].getData("rightBusy")].setTexture("strong");
        } else {
          //~ console.log("right is dove, dove alone");
          s[f[i].getData("rightBusy")].setData({
            "strong": true,
            "eating": false
          });
          s[f[i].getData("rightBusy")].setTexture("strong");
        }
      } else {
        //~ console.log("Food is alone");
        f[i].setTint(0xff0000);
      }
    }
    //~ for (let j = 0; j < s.length; j++) {
      //~ if (s[j].getData("eating")) {
        //~ s[i].setData({
          //~ "dead": true,
          //~ "eating": false
        //~ });
      //~ }
    //~ }
  }
}

const sp = new URLSearchParams(window.location.search);

/**
 * @param {String} hash: unique fxhash string (or xtz transaction hash)
 * @returns {float} decimal representation of the number in base58 
 */
function base58toDecimal(hash = fxhashTrunc) {
  let decimal = 0;
  let iterArray = Array.from(hash).reverse();
  while (iterArray.length > 0) {
    decimal += properAlphabet.indexOf(iterArray.slice(-1)) * (math.pow(58,
      iterArray.length - 1));
    iterArray = iterArray.slice(0, -1);
  }
  return decimal;
}

/**
 * @param {float} decimalHash: output from base58toDecimal(fxhash)
 * @param {int} maxVariants: the inclusive n from the desired range 
 *      of (0, n) for the return value
 * @param {boolean} inverse: transforms range into (n, 0)
 * @returns {int} one random integer defined by fxhash and a threshold
 *      defined by maxVariants * variantFactor
 */
function fxHashToVariant(decimalHash, maxVariants = 0, inverse = false) {
  let variant = math.round(decimalHash * maxVariants * variantFactor);
  if (inverse) {
    return math.abs(maxVariants - variant);
  }
  return variant;
}

window.addEventListener(
  "resize",
  game.scale.setMaxZoom()
);

document.body.style.background = "#e8e8e8";

//~ console.log(fxhash)
//~ console.log(fxrand())
//~ console.log(sp);

console.log("[had]", {
  "Current ruleset": rulesetAlgorithm.name,
  "Food finding algorithm": findFoodAlgorithm.name,
  "Subject placing algorithm": subjectsPlacementAlgorithm.name,
  "Food placing algorithm": foodsPlacementAlgorithm.name,
});

//~ window.$fxhashFeatures = {
  //~ "fx(ruleset)": rulesetNumber
//~ }

// log the parameters, for debugging purposes, artists won't have to do that
//~ console.log("Current param values:")
// Raw deserialize param values 
//~ console.log($fx.getRawParams())
// Added addtional transformation to the parameter for easier usage
// e.g. color.hex.rgba, color.obj.rgba.r, color.arr.rgb[0] 
//~ console.log($fx.getParams())

// how to read a single raw parameter
//~ console.log("Single raw value:")
//~ console.log($fx.getRawParam("color_id"));
// how to read a single transformed parameter
//~ console.log("Single transformed value:")
//~ console.log($fx.getParam("color_id"));

// update the document based on the parameters
//~ document.body.style.background = $fx.getParam("color_id").hex.rgba
//~ document.body.innerHTML = `
//~ <p>
//~ url: ${window.location.href}
//~ </p>
//~ <p>
//~ hash: ${$fx.hash}
//~ </p>
//~ <p>
//~ params:
//~ </p>
//~ <pre>
//~ ${$fx.stringifyParams($fx.getRawParams())}
//~ </pre>
//~ <pre style="color: white;">
//~ ${$fx.stringifyParams($fx.getRawParams())}
//~ </pre>
//~ `
