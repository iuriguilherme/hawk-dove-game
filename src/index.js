/**!
 * @file Hawk Dove Game  
 * @version 0.1.0  
 * @copyright Iuri Guilherme 2023  
 * @license GNU AGPLv3  
 * @author Iuri Guilherme <https://iuri.neocities.org/>  
 * 
 * Source code available at https://github.com/iuriguilherme/fxhash4
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
const math = mcreate(mall, {})
import Phaser from "phaser";
//~ import Plotly from "plotly.js-dist-min";
import Chart from "chart.js/auto";
//~ import p5 from 'p5';

const sleep = ms => new Promise(r => setTimeout(r, ms));
// https://github.com/fxhash/fxhash-webpack-boilerplate/issues/20
const properAlphabet = 
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const variantFactor = 3.904e-87; // This number is magic
const fxArray = Array.from(fxhashTrunc);
const alphabetArray = Array.from(properAlphabet);
const fxhashDecimal = base58toDecimal(fxhashTrunc);
const startingSubjects = fxArray.length;
const initialFoodRate = 2;
const minDistance = 20;
const growthRate = 2;
const hawkAndDove = ["hawk", "dove"];
const graphs = 4;

const wrapperDiv = document.createElement("div");
const gameDiv = document.createElement("div");
const gameCanvas = document.createElement("canvas");
wrapperDiv.id = "wrapper";
gameDiv.id = "game";
gameCanvas.id = "gameCanvas";
document.body.appendChild(wrapperDiv);
let graphsCanvas = [];
let graphsDivs = [];
for (let i = 0; i < graphs; i++) {
  let graphCanvas = document.createElement("canvas");
  let graphDiv = document.createElement("div");
  graphDiv.id = "graph" + i;
  graphDiv.className = "graph";
  graphCanvas.id = "graphCanvas" + i;
  graphDiv.appendChild(graphCanvas);
  wrapperDiv.appendChild(graphDiv);
  graphsCanvas.push(graphCanvas);
  graphsDivs.push(graphDiv);
}
wrapperDiv.appendChild(gameDiv);
gameDiv.appendChild(gameCanvas);

let charts = {};
let subjects;
let foods;
let circle;
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
    this.load.svg("hawk", "boy.svg");
    this.load.svg("dove", "girl.svg");
    this.load.svg("strong", "yinyang.svg");
    this.load.svg("dead", "block.svg");
    this.load.svg("fleeing", "swiss.svg");
    this.load.svg("food", "heart.svg");
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
      "repeat": math.floor(startingSubjects / initialFoodRate)
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
    circle = new Phaser.Geom.Circle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      (this.cameras.main.width / 3)
    );
    Phaser.Actions.PlaceOnCircle(subjects.getChildren(), circle);
    Phaser.Actions.RandomCircle(foods.getChildren(), circle);
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
          "label": "Population",
          "data": data[1],
          "borderWidth": 1
        }]
      },
      "options": {
        "scales": {
          "y": {
            "beginAtZero": true
          }
        }
      }
    });
    
    charts["hawkAndDove"] = new Chart(graphsCanvas[1], {
      "type": "bar",
      "data": {
        "labels": hawkAndDove.concat(["total"]),
        "datasets": [{
          "label": "Population",
          "data": getHawkAndDoveData(),
          "borderWidth": 1
        }]
      },
      "options": {
        "scales": {
          "y": {
            "beginAtZero": true
          }
        }
      }
    });
    
    data = getHawkAndDoveData();
    datasets = [];
    for (let i = 0; i < hawkAndDove.length; i++) {
      datasets.push({
        "label": hawkAndDove[i],
        "data": [data[i]],
        "fill": false,
        "borderColor": "rgb(75, 192, 192)",
        "tension": 0.1
      });
    }
    datasets.push({
      "label": "total",
      "data": [data[data.length - 1]],
      "fill": false,
      "borderColor": "rgb(75, 192, 192)",
      "tension": 0.1
    });
    charts["populationLine"] = new Chart(graphsCanvas[2], {
      "type": "line",
      "data": {
        "labels": hawkAndDove.concat(["total"]),
        "datasets": datasets
      }
    });
    
    data = getAgeData();
    charts["age"] = new Chart(graphsCanvas[3], {
      "type": "bar",
      "data": {
        "labels": data[0],
        "datasets": [{
          "label": "Age",
          "data": data[1],
          "borderWidth": 1
        }]
      },
      "options": {
        "scales": {
          "y": {
            "beginAtZero": true
          }
        }
      }
    });
  }
  update () {
    let s = subjects.getChildren();
    let f = foods.getChildren();
    
    data = getPopulationData();
    charts["population"].data.labels = data[0];
    charts["population"].data.datasets[0].data = data[1];
    charts["population"].update();
    
    data = getHawkAndDoveData();
    //~ console.log(data);
    charts["hawkAndDove"].data.datasets[0].data = data;
    charts["hawkAndDove"].update();
    for (let i = 0; i < charts["populationLine"].data.datasets.length; i++) {
      charts["populationLine"].data.datasets[i].data.push(data[i]);
    }
    charts["populationLine"].update();
    
    data = getAgeData();
    charts["age"].data.labels = data[0];
    charts["age"].data.datasets[0].data = data[1];
    charts["age"].update();
    
    let distances = [];
    for (let i = 0; i < s.length; i++) {
      distances[i] = [];
      for (let j = 0; j < f.length; j++) {
        distances[i][j] = Phaser.Math.Distance.Between(
          s[i].x,
          s[i].y,
          f[j].x,
          f[j].y
        );
      }
      while (s[i].getData("waiting")) {
        try {
          let closer = distances[i].indexOf(math.min(distances[i]));
          let closerFood = f[closer];
          if (closerFood.getData("leftBusy")) {
            if (closerFood.getData("rightBusy")) {
              distances[i].splice(closer, 1);
            } else {
              s[i].x = closerFood.x + minDistance;
              s[i].y = closerFood.y - minDistance;
              closerFood.setData({"rightBusy": i});
              s[i].setData({"waiting": false, "eating": true});
            }
          } else {
            s[i].x = closerFood.x - minDistance;
            s[i].y = closerFood.y - minDistance;
            closerFood.setData({"leftBusy": i});
            s[i].setData({"waiting": false, "eating": true});
          }
        } catch {
          s[i].setData({
            "dead": true,
            "waiting": false
          });
        }
      }
    }
    ruleset();
    let again = true;
    while (again) {
      for (let l = 0; l < s.length; l++) {
        if (s[l].getData("dead")) {
          s[l].destroy();
          again = true;
          break;
        }
        again = false;
      }
    }
    let currentLength = s.length
    for (let m = 0; m < currentLength; m++) {
      if (s[m].getData("strong")) {
        for (let n = 0; n < growthRate; n++) {
          let ns = subjects.create(0, 0, s[m].getData("r"));
          ns.setData({
            "p": s[m].getData("p"),
            "r": s[m].getData("r"),
            "age": 0
          });
        }
      }
    }
    for (let o = 0; o < s.length; o++) {
      s[o].setData({
        "waiting": true,
        "eating": false,
        "fleeing": false,
        "dead": false,
        "strong": false,
        "age": s[o].getData("age") + 1
      });
      s[o].setTexture(s[o].getData("r"));
    }
    for (let p = 0; p < f.length; p++) {
      f[p].setData({
        "leftBusy": false,
        "rightBusy": false
      });
    }
    Phaser.Actions.PlaceOnCircle(s, circle);
    Phaser.Actions.RandomCircle(f, circle);
  }
}

/*
 * @description Ruleset 1:
 *  If two Hawks met, one of them eats all the food and reproduce, while the 
 *    other one dies;
 *  If two Doves met, they share the food and don't reproduce;
 *  If one Hawk and one Dove met, the Hawk eats all the food alone and 
 *    reproduce, while the Dove flees, surviving but not reproducing;
 *  If only one Bird finds a food, then it eats all of it and reproduce;
 */
function ruleset1() {
  let s = subjects.getChildren();
  let f = foods.getChildren();
  for (let k = 0; k < f.length; k++) {
    //~ console.log(k);
    if (f[k].getData("leftBusy")) {
      //~ console.log("left populated");
      if (f[k].getData("rightBusy")) {
        //~ console.log("right populated");
        if (s[f[k].getData("leftBusy")].getData("r") == "hawk") {
          //~ console.log("left is hawk");
          if (s[f[k].getData("rightBusy")].getData("r") == "hawk") {
            //~ console.log("left and right two hawks. will fight...");
            if (math.randomInt(1)) {
              //~ console.log("left hawk wins");
              s[f[k].getData("rightBusy")].setData({
                "dead": true,
                "eating": false
              });
              s[f[k].getData("rightBusy")].setTexture("dead");
              s[f[k].getData("leftBusy")].setData({
                "strong": true,
                "eating": false
              });
              s[f[k].getData("leftBusy")].setTexture("strong");
            } else {
              //~ console.log("right hawk wins");
              s[f[k].getData("leftBusy")].setData({
                "dead": true,
                "eating": false
              });
              s[f[k].getData("leftBusy")].setTexture("dead");
              s[f[k].getData("rightBusy")].setData({
                "strong": true,
                "eating": false
              });
              s[f[k].getData("rightBusy")].setTexture("strong");
            }
          } else {
            //~ console.log("right is dove, hawk and dove");
            s[f[k].getData("leftBusy")].setData({
              "strong": true,
              "eating": false
            });
            s[f[k].getData("leftBusy")].setTexture("strong");
            s[f[k].getData("rightBusy")].setData({
              "fleeing": true,
              "eating": false
            });
            s[f[k].getData("rightBusy")].setTexture("fleeing");
          }
        } else {
          //~ console.log("left is dove");
          if (s[f[k].getData("rightBusy")].getData("r") == "hawk") {
            //~ console.log("right is hawk, dove and hawk");
            s[f[k].getData("leftBusy")].setData({
              "fleeing": true,
              "eating": false
            });
            s[f[k].getData("leftBusy")].setTexture("fleeing");
            s[f[k].getData("rightBusy")].setData({
              "strong": true,
              "eating": false
            });
            s[f[k].getData("rightBusy")].setTexture("strong");
          } else {
            //~ console.log("right is dove, dove and dove");
            s[f[k].getData("leftBusy")].setData({
              "eating": false
            });
            s[f[k].getData("rightBusy")].setData({
              "eating": false
            });
          }
        }
      } else {
        //~ console.log("no one on right");
        if (s[f[k].getData("leftBusy")].getData("r") == "hawk") {
          //~ console.log("left is hawk, hawk alone");
          s[f[k].getData("leftBusy")].setData({
            "strong": true,
            "eating": false
          });
          s[f[k].getData("leftBusy")].setTexture("strong");
        } else {
          //~ console.log("left is dove, dove alone");
          s[f[k].getData("leftBusy")].setData({
            "strong": true,
            "eating": false
          });
          s[f[k].getData("leftBusy")].setTexture("strong");
        }
      }
    } else {
      //~ console.log("no one on left");
      if (f[k].getData("rightBusy")) {
        if (s[f[k].getData("rightBusy")].getData("r")) {
          console.log("right is hawk, hawk alone");
          s[f[k].getData("rightBusy")].setData({
            "strong": true,
            "eating": false
          });
          s[f[k].getData("rightBusy")].setTexture("strong");
        } else {
          //~ console.log("right is dove, dove alone");
          s[f[k].getData("rightBusy")].setData({
            "strong": true,
            "eating": false
          });
          s[f[k].getData("rightBusy")].setTexture("strong");
        }
      } else {
        //~ console.log("Food is alone");
        f[k].setTint(0xff0000);
      }
    }
  }
}

let graphsMaxWidth = 0;
let graphsMaxHeight = 0;
for (let i = 0; i < graphsCanvas.length; i++) {
  graphsMaxWidth = math.max(graphsMaxWidth, graphsDivs[i].offsetWidth);
  graphsMaxHeight = math.max(graphsMaxHeight, graphsDivs[i].offsetHeight);
  //~ graphsHeight += graphsDivs[i].offsetHeight;
}

const config = {
  "type": Phaser.CANVAS,
  "width": window.innerWidth - graphsMaxWidth - (window.innerWidth / 60),
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

const rulesetMap = {
  "1": ruleset1,
};
const rulesetNumber = math.max(1, fxHashToVariant(fxhashDecimal, 1))
const ruleset = rulesetMap[rulesetNumber];

console.log("Ruleset: " + rulesetNumber);

window.addEventListener(
  "resize",
  game.scale.setMaxZoom()
);

window.$fxhashFeatures = {
  "fx(ruleset)": rulesetNumber
}
