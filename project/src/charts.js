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
  getGenData,
  getHawkAndDoveData,
  getPopulationData,
} from "./game.js";

import {
  graphsCanvas,
} from "./html.js";

import {
  hawkAndDove,
  graphColors,
} from "./index.js";

import {
  iteration,
} from "./loop.js";

let data;
let datasets;
export var charts = {};

export function createCharts() {
  data = getHawkAndDoveData();
  datasets = [];
  for (let i = 0; i < hawkAndDove.length; i++) {
    datasets.push({
      "label": hawkAndDove[i],
      "data": [data[i]],
      "fill": false,
      "pointStyle": false,
      "borderWidth": 0.5,
      //~ "backgroundColor": `rgb(${r}, ${g}, ${b})`,
      //~ "borderColor": `rgb(${r}, ${g}, ${b})`,
      "backgroundColor": graphColors["hawkAndDove"][i],
      "borderColor": graphColors["hawkAndDove"][i],
      "tension": 0.1
    });
  }
  datasets.push({
    "label": "total",
    "data": [data[data.length - 2]],
    "fill": false,
    "pointStyle": false,
    "borderWidth": 0.5,
    "backgroundColor": "rgb(30, 30, 30)",
    //~ "backgroundColor": "rgb(180, 180, 180)",
    "borderColor": "rgb(30, 30, 30)",
    //~ "borderColor": "rgb(180, 180, 180)",
    "tension": 0.1
  });
  datasets.push({
    "label": "food",
    "data": [data[data.length - 1]],
    "fill": false,
    "pointStyle": false,
    "borderWidth": 0.5,
    "backgroundColor": "rgb(180, 30, 30)",
    //~ "backgroundColor": "rgb(180, 180, 180)",
    "borderColor": "rgb(180, 30, 30)",
    //~ "borderColor": "rgb(180, 180, 180)",
    "tension": 0.1
  });
  charts["populationLine"] = new Chart(graphsCanvas[0], {
    "type": "line",
    "data": {
      "labels": [iteration],
      "datasets": datasets
    },
    "options": {
      "responsive": true,
      "maintainAspectRatio": true,
    },
  });
  
  charts["hawkAndDove"] = new Chart(graphsCanvas[1], {
    "type": "bar",
    "data": {
      //~ "labels": hawkAndDove.concat(["total", "food"]),
      "labels": ["Total individuals"],
      "datasets": datasets,
      //~ "datasets": [{
        //~ "label": "Hawk and Dove Population",
        //~ "data": data,
        //~ "borderWidth": 1
      //~ }]
    },
    "options": {
      "responsive": true,
      "maintainAspectRatio": true,
      "scales": {
        "y": {
          "beginAtZero": true,
        },
      },
    },
  });
  
  data = getAgeData("age");
  charts["age"] = new Chart(graphsCanvas[2], {
    "type": "bar",
    "data": {
      "labels": data[0],
      "datasets": [{
        "label": "individuals at age #",
        "data": data[1],
        "borderWidth": 1,
        "backgroundColor": graphColors["age"],
      }]
    },
    "options": {
      "responsive": true,
      "maintainAspectRatio": true,
      "scales": {
        "y": {
          "beginAtZero": true,
        },
      },
    },
  });

  data = getAgeData("gen");
  charts["gen"] = new Chart(graphsCanvas[3], {
    "type": "bar",
    "data": {
      "labels": data[0],
      "datasets": [{
        "label": "individuals from generation #",
        "data": data[1],
        "borderWidth": 1,
        "backgroundColor": graphColors["gen"],
      }],
    },
    "options": {
      "responsive": true,
      "maintainAspectRatio": true,
      "scales": {
        "y": {
          "beginAtZero": true,
        },
      },
    },
  });
  
  data = getPopulationData();
  charts["population"] = new Chart(graphsCanvas[4], {
    "type": "bar",
    "data": {
      "labels": data[0],
      "datasets": [{
        "label": "Genetic Population",
        "data": data[1],
        "borderWidth": 1,
        "backgroundColor": graphColors["population"],
      }]
    },
    "options": {
      "responsive": true,
      "maintainAspectRatio": true,
      "scales": {
        "y": {
          "beginAtZero": true
        }
      },
    },
  });
}
