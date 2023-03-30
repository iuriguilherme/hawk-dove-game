/**
 * @file gameOver.js End screen for Hawk Dove Game  
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

import { create as mcreate, all as mall } from "mathjs";
const math = mcreate(mall, {});

import {
  alphabetArray,
} from "./util.js";

export function endGame(
  scene,
  cause,
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
) {
  let geneticData = getNestedData("gene", alphabetArray);
  let populationData = getStrategyData();
  let s = subjects.getChildren();
  let f = foods.getChildren();
  
  updateNestedBarChart("genetic", "gene", alphabetArray);
  updatePopulationChart("population");
  updateSimpleBarChart("age");
  updateSimpleBarChart("generation");
  
  scene.add.text(
    15,
    30,
    cause,
    {
      "fontSize": "2em",
      "fill": "#121212",
      //~ "fill": "#e8e8e8",
      "align": "center"
    }
  );
  for (let i = 0; i < strategiesNames.length; i++) {
    scene.add.text(
      15,
      30 * (i + 2),
      `${names["strategies"][strategiesNames[i]]} population: ` +
        `${populationData[names["strategies"][strategiesNames[i]]]}`,
      {
        "fontSize": "2em",
        "fill": "#121212",
        //~ "fill": "#e8e8e8",
        "align": "center"
      }
    );
  }
  scene.add.text(
    15,
    30 * (strategiesNames.length + 2),
    `total population: ${populationData["total"]}`,
    {
      "fontSize": "2em",
      "fill": "#121212",
      //~ "fill": "#e8e8e8",
      "align": "center"
    }
  );
  scene.add.text(
    15,
    30 * (strategiesNames.length + 3),
    `remaining ${names["food"]}: ${populationData[names["food"]]}`,
    {
      "fontSize": "2em",
      "fill": "#121212",
      //~ "fill": "#e8e8e8",
      "align": "center"
    }
  );
  
  let geneWinner, geneWinnerN;
  let geneWinners = {"ages": [], "gens": []};
  if (geneticData["data"].length > 0) {
    geneWinnerN = math.max(geneticData["data"]);
    geneWinner = geneticData["labels"][geneticData["data"].indexOf(
      geneWinnerN)];
    for (let i = 0; i < s.length; i++) {
      if (s[i].getData("gene") == geneWinner) {
        geneWinners["ages"].push(s[i].getData("age"));
        geneWinners["gens"].push(s[i].getData("generation"));
      }
    }
  } else {
    geneWinner = "None";
  }
  
  if (geneWinner != "None") {
    scene.add.text(
      15,
      30 * (strategiesNames.length + 4),
      `highest genetic pool: \#${geneWinner} (${geneWinnerN} individuals)`,
      {
        "fontSize": "2em",
        "fill": "#121212",
        //~ "fill": "#e8e8e8",
        "align": "center"
      }
    );
    scene.add.text(
      15,
      30 * (strategiesNames.length + 5),
      `highest age from all \#${geneWinner}: ${math.max(geneWinners["ages"])}`,
      {
        "fontSize": "2em",
        "fill": "#121212",
        //~ "fill": "#e8e8e8",
        "align": "left"
      }
    );
    scene.add.text(
      15,
      30 * (strategiesNames.length + 6),
      `oldest generation from all \#${geneWinner}: ` + 
        `${math.min(geneWinners["gens"])}`,
      {
        "fontSize": "2em",
        "fill": "#121212",
        //~ "fill": "#e8e8e8",
        "align": "left"
      }
    );
    scene.add.text(
      15,
      30 * (strategiesNames.length + 7),
      `newest generation from all \#${geneWinner}: ` + 
        `${math.max(geneWinners["gens"])}`,
      {
        "fontSize": "2em",
        "fill": "#121212",
        //~ "fill": "#e8e8e8",
        "align": "left"
      }
    );
    let attrs = Object.entries(gData[geneWinner]).map(
      ([k, v]) => `${k}: ${v}`).join("\n\t");
    scene.add.text(
      15,
      30 * (strategiesNames.length + 8),
      `genetic attributes for \#${geneWinner}:\n\t${attrs}`,
      {
        "fontSize": "2em",
        "fill": "#121212",
        //~ "fill": "#e8e8e8",
        "align": "left"
      }
    );
  }
  subjects.clear(true);
  foods.clear(true);
}
