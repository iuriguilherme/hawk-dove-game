/**
 * @file html.js DOM manipulation for Hawk Dove Game  
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

const graphs = 7;
const graphsRows = 1;
const graphsBig = 7;
const graphsSmall = 0;
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
export var graphsCanvas = [];
export var graphsDivs = [];
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
//~ for (let i = graphsBig; i < graphsRows + graphsBig; i++) {
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
