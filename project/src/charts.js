/**
 * @file charts.js Charts for Hawk Dove Game  
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
//~ import Plotly from "plotly.js-dist-min";

import {
  getAgeData,
  getHawkAndDoveData,
  getPopulationData,
} from "./game.js";

import {
  graphsCanvas,
} from "./html.js";

import {
  hawkAndDove,
  hawkAndDoveColors,
} from "./index.js";

import {
  iteration,
} from "./loop.js";

let data;
let datasets;
export var charts = {};

export function createCharts() {
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
    //~ let r = math.randomInt(60, 210);
    //~ let g = math.randomInt(60, 210);
    //~ let b = math.randomInt(60, 210);
    //~ let r = math.round($fx.rand() * 255);
    //~ let g = math.round($fx.rand() * 255);
    //~ let b = math.round($fx.rand() * 255);
    datasets.push({
      "label": hawkAndDove[i],
      "data": [data[i]],
      "fill": false,
      "pointStyle": false,
      "borderWidth": 0.5,
      //~ "backgroundColor": `rgb(${r}, ${g}, ${b})`,
      //~ "borderColor": `rgb(${r}, ${g}, ${b})`,
      "backgroundColor": hawkAndDoveColors[i],
      "borderColor": hawkAndDoveColors[i],
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
}
