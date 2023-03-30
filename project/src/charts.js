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

import {
  graphsCanvas,
} from "./html.js";

let datasets;

export function createCharts(
  charts,
  names,
  graphColors,
  strategiesNames,
) {
  datasets = [];
  datasets.push({
    "label": "total",
    "data": [],
    "fill": false,
    "pointStyle": false,
    "borderWidth": 0.5,
    "backgroundColor": "rgb(30, 30, 30)",
    //~ "backgroundColor": "rgb(180, 180, 180)",
    "borderColor": "rgb(30, 30, 30)",
    //~ "borderColor": "rgb(180, 180, 180)",
    "tension": 0.1,
  });
  datasets.push({
    "label": names["food"],
    "data": [],
    "fill": false,
    "pointStyle": false,
    "borderWidth": 0.5,
    "backgroundColor": "rgb(180, 30, 30)",
    //~ "backgroundColor": "rgb(180, 180, 180)",
    "borderColor": "rgb(180, 30, 30)",
    //~ "borderColor": "rgb(180, 180, 180)",
    "tension": 0.1,
  });
  for (let i = 0; i < strategiesNames.length; i++) {
    datasets.push({
      "label": names["strategies"][strategiesNames[i]],
      "data": [],
      "fill": false,
      "pointStyle": false,
      //~ "borderWidth": 0.5,
      //~ "backgroundColor": `rgb(${r}, ${g}, ${b})`,
      //~ "borderColor": `rgb(${r}, ${g}, ${b})`,
      "backgroundColor": 
        graphColors["population"][names["strategies"][strategiesNames[i]]],
      "borderColor": graphColors["population"][names["strategies"][strategiesNames[i]]],
      "tension": 0.1,
    });
  }
  
  charts["populationHistory"] = new Chart(graphsCanvas[0], {
    "type": "line",
    "data": {
      "labels": [],
      "datasets": datasets
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
  
  charts["population"] = new Chart(graphsCanvas[1], {
    "type": "bar",
    "data": {
      "labels": ["# of individuals / food"],
      "datasets": datasets
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
  
  charts["age"] = new Chart(graphsCanvas[2], {
    "type": "bar",
    "data": {
      "labels": [],
      "datasets": [{
        "label": "Individuals at age #",
        "data": [],
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

  charts["generation"] = new Chart(graphsCanvas[3], {
    "type": "bar",
    "data": {
      "labels": [],
      "datasets": [{
        "label": "Individuals from generation #",
        "data": [],
        "borderWidth": 1,
        "backgroundColor": graphColors["generation"],
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
  
  charts["genetic"] = new Chart(graphsCanvas[4], {
    "type": "bar",
    "data": {
      "labels": [],
      "datasets": [{
        "label": "Genetic population",
        "data": [],
        "borderWidth": 1,
        "backgroundColor": graphColors["genetic"],
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
