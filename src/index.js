/**!
 * @file fxhash4  
 * @version 0.0.1  
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
    "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
const variantFactor = 3.904e-87; // This number is magic
const fxhashDecimal = base58toDecimal(fxhashTrunc);
const featureVariant = math.max(1, fxHashToVariant(fxhashDecimal, 30));
console.log("featureVariant: " + featureVariant);
const startingSubjects = featureVariant;

const wrapperDiv = document.createElement("div");
const graphDiv = document.createElement("div");
const gameDiv = document.createElement("div");
const graphCanvas = document.createElement("canvas");
const gameCanvas = document.createElement("canvas");
wrapperDiv.id = "wrapper";
graphDiv.id = "graph";
gameDiv.id = "game";
graphCanvas.id = "graphCanvas";
gameCanvas.id = "gameCanvas";
document.body.appendChild(wrapperDiv);
wrapperDiv.appendChild(graphDiv);
wrapperDiv.appendChild(gameDiv);
graphDiv.appendChild(graphCanvas);
gameDiv.appendChild(gameCanvas);

class Example extends Phaser.Scene {
    constructor () {
        super();
    }
    
    preload () {
        this.load.svg("subject", "boy.svg");
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
        //~ let subjects = [];
        let foods = [];
        for (let i = 0; i < startingSubjects; i++) {
            foods.push(this.add.image(0, 0, "food"));
        }
        const circle = new Phaser.Geom.Circle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            (this.cameras.main.width / 3)
        );
        this.group = this.add.group({
            key: "subject",
            //~ frame: [0, 1, 5],
            repeat: startingSubjects
        });
        Phaser.Actions.PlaceOnCircle(this.group.getChildren(), circle);
        Phaser.Actions.RandomCircle(foods, circle);
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
        let chart = new Chart(graphCanvas, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    update () {
        //~ Phaser.Actions.RotateAroundDistance(
            //~ this.group.getChildren(),
            //~ { x: 400, y: 300 },
            //~ 0.02,
            //~ this.tween.getValue()
        //~ );
    }
}

const config = {
    "type": Phaser.CANVAS,
    "width": window.innerWidth - 
        document.getElementById("graph").offsetWidth - 
        (window.innerWidth / 60),
    "height": window.innerHeight - 
        document.getElementById("graph").offsetHeight - 
        (window.innerHeight / 60),
    "backgroundColor": "#e8e8e8",
    //~ "canvas": document.getElementById("game"),
    "canvas": gameCanvas,
    "parent": "game",
    //~ "physics": {
        //~ "default": "arcade",
        //~ "arcade": {
            //~ "gravity": { y: 300 },
            //~ "debug": false
        //~ }
    //~ },
    "scale": {
        "mode": Phaser.Scale.NONE,
        "zoom": Phaser.Scale.MAX_ZOOM
    },
    "scene": Example
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

window.addEventListener(
  "resize",
  game.scale.setMaxZoom()
);

window.$fxhashFeatures = {
  "fx(variant)": featureVariant
}
