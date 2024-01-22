/**
 * @file gameOver.js End screen for Hawk Dove Game  
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

export function endGame(
  scene,
  cause,
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
) {
  let geneticData = getNestedData("gene", alphabetArray, subjects);
  let populationData = getStrategyASRData(foods, subjects, names,
    strategiesNames, asrAvailable);
  let s = subjects.getChildren();
  let f = foods.getChildren();
  let v = asrAvailable();
  
  updateNestedBarChart("genetic", "gene", alphabetArray, charts, chartData,
    subjects);
  updateHADPopulationChart("HADPopulation", charts, chartData, foods, subjects,
    names, strategiesNames);
  updateASRPopulationChart("ASRPopulation", charts, chartData, subjects,
    names, asrAvailable);
  updateSimpleBarChart("age", charts, chartData, subjects, math);
  updateSimpleBarChart("generation", charts, chartData, subjects, math);
  
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
      30 * (2 + i),
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
  for (let i = 0; i < v.length; i++) {
    scene.add.text(
      15,
      30 * (2 + strategiesNames.length + i),
      `${names["asr"][v[i]]} population: ` +
        `${populationData[names["asr"][v[i]]]}`,
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
    30 * (2 + strategiesNames.length + v.length),
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
    30 * (3 + strategiesNames.length + v.length),
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
      30 * (4 + strategiesNames.length + v.length),
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
      30 * (5 + strategiesNames.length + v.length),
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
      30 * (6 + strategiesNames.length + v.length),
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
      30 * (7 + strategiesNames.length + v.length),
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
      30 * (8 + strategiesNames.length + v.length),
      `genetic attributes for \#${geneWinner}:\n\n\t${attrs}`,
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
