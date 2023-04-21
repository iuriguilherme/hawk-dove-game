/**
 * @file charts.js Charts for Hawk Dove Game  
 * @copyright Iuri Guilherme 2023  
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

export function createCharts(kwargs) {
  kwargs["datasets"].push({
    "label": "total",
    "data": [],
    "fill": false,
    "pointStyle": false,
    "borderWidth": 0.5,
    "backgroundColor": "rgb(30, 30, 30)",
    "borderColor": "rgb(30, 30, 30)",
    "tension": 0.1,
  });
  
  kwargs["datasetsASRHistory"] = structuredClone(kwargs["datasets"]);
  kwargs["datasetsASR"] = structuredClone(kwargs["datasets"]);
  
  let foodDataset = {
    "label": kwargs["names"]["food"],
    "data": [],
    "fill": false,
    "pointStyle": false,
    "borderWidth": 0.5,
    "backgroundColor": kwargs["graphColors"]["population"][kwargs["names"][
      "food"]],
    "borderColor": kwargs["graphColors"]["population"][kwargs["names"]["food"]],
    "tension": 0.1,
  };
  
  kwargs["datasets"].push(foodDataset);
  kwargs["datasetsHADHistory"] = structuredClone(kwargs["datasets"]);
  kwargs["datasetsHAD"] = structuredClone(kwargs["datasets"]);
  
  for (let strategy of kwargs["strategiesNames"]) {
    let strategyDataset = {
      "label": kwargs["names"]["strategies"][strategy],
      "data": [],
      "fill": false,
      "pointStyle": false,
      "borderWidth": 0.5,
      "backgroundColor": kwargs["graphColors"]["population"][kwargs["names"][
        "strategies"][strategy]],
      "borderColor": kwargs["graphColors"]["population"][kwargs["names"][
        "strategies"][strategy]],
      "tension": 0.1,
    };
    kwargs["datasetsHADHistory"].push(strategyDataset);
    kwargs["datasetsHAD"].push(strategyDataset);
  }
  
  for (let asr of kwargs["asrAvailable"]()) {
    let asrDataset = {
      "label": kwargs["names"]["asr"][asr],
      "data": [],
      "fill": false,
      "pointStyle": false,
      "borderWidth": 0.5,
      "backgroundColor": kwargs["graphColors"]["population"][kwargs["names"][
        "asr"][asr]],
      "borderColor": kwargs["graphColors"]["population"][kwargs["names"][
        "asr"][asr]],
      "tension": 0.1,
    };
    kwargs["datasetsASRHistory"].push(asrDataset);
    kwargs["datasetsASR"].push(asrDataset);
  }
  
  kwargs["charts"]["HADPopulationHistory"] = new kwargs["Chart"](
    kwargs["graphsCanvas"][0],
    {
      "type": "line",
      "data": {
        "labels": [],
        "datasets": kwargs["datasetsHADHistory"],
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
    },
  );
  kwargs["charts"]["HADPopulationHistory"].update('none');

  kwargs["charts"]["ASRPopulationHistory"] = new kwargs["Chart"](
    kwargs["graphsCanvas"][1],
    {
      "type": "line",
      "data": {
        "labels": [],
        "datasets": kwargs["datasetsASRHistory"],
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
    },
  );
  kwargs["charts"]["ASRPopulationHistory"].update('none');
  
  kwargs["charts"]["HADPopulation"] = new kwargs["Chart"](
    kwargs["graphsCanvas"][2],
    {
      "type": "bar",
      "data": {
        "labels": ["# of food / individuals by last HAD strategy"],
        "datasets": kwargs["datasetsHAD"],
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
    },
  );
  
  kwargs["charts"]["ASRPopulation"] = new kwargs["Chart"](
    kwargs["graphsCanvas"][3],
    {
      "type": "bar",
      "data": {
        "labels": ["# of individuals by last ASR strategy"],
        "datasets": kwargs["datasetsASR"],
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
    },
  );
  
  kwargs["charts"]["age"] = new kwargs["Chart"](kwargs["graphsCanvas"][4], {
    "type": "bar",
    "data": {
      "labels": [],
      "datasets": [{
        "label": "Individuals at age #",
        "data": [],
        "borderWidth": 1,
        "backgroundColor": kwargs["graphColors"]["age"],
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

  kwargs["charts"]["generation"] = new kwargs["Chart"](
    kwargs["graphsCanvas"][5],
    {
      "type": "bar",
      "data": {
        "labels": [],
        "datasets": [{
          "label": "Individuals from generation #",
          "data": [],
          "borderWidth": 1,
          "backgroundColor": kwargs["graphColors"]["generation"],
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
    },
  );
  
  kwargs["charts"]["genetic"] = new kwargs["Chart"](kwargs["graphsCanvas"][6], {
    "type": "bar",
    "data": {
      "labels": [],
      "datasets": [{
        "label": "Genetic population",
        "data": [],
        "borderWidth": 1,
        "backgroundColor": kwargs["graphColors"]["genetic"],
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
