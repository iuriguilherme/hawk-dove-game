/**
 * @file sprites.js Themes for Hawk Dove Game  
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

export function getSpritesThemeMap(hawkAndDove) {
  return {
    "Boys & Girls": [
      {
        "key": hawkAndDove[0],
        "type": "svg",
        "file": "boy.svg",
        "scale": "1.0",
      },
      {
        "key": hawkAndDove[1],
        "type": "svg",
        "file": "girl.svg",
        "scale": "1.0",
      },
      {
        "key": "food",
        "type": "svg",
        "file": "heart.svg",
        "scale": "1.0",
      },
    ],
    "Devils & Angels": [
      {
        "key": hawkAndDove[0],
        "type": "svg",
        "file": "face-devilish-2.svg",
        "scale": "0.5",
      },
      {
        "key": hawkAndDove[1],
        "type": "svg",
        "file": "face-angel-2.svg",
        "scale": "0.5",
      },
      {
        "key": "food",
        "type": "svg",
        "file": "emblem-favorite-2.svg",
        "scale": "0.5",
      },
      //~ {
        //~ "key": "food",
        //~ "type": "image",
        //~ "file": "food-strawberry_with_light_shadow.png",
      //~ },
    ],
    "Gimps & Lyxes": [
      {
        "key": hawkAndDove[0],
        "type": "svg",
        "file": "gimp-3.svg",
        "scale": "0.08",
      },
      {
        "key": hawkAndDove[1],
        "type": "svg",
        "file": "lyx.svg",
        "scale": "0.25",
      },
      {
        "key": "food",
        "type": "svg",
        "file": "applications-other-3.svg",
        "scale": "0.6",
      },
    ],
    "Eagles & Doves": [
      {
        "key": hawkAndDove[0],
        "type": "image",
        "file": "animals-eagle.png",
        "scale": "1.0",
      },
      {
        "key": hawkAndDove[1],
        "type": "image",
        "file": "animals-doves_of_peace.png",
        "scale": "1.0",
      },
      {
        "key": "food",
        "type": "image",
        "file": "food-worm_in_apple.png",
        "scale": "1.0",
      },      
    ],
    "Spiders & Ants": [
      {
        "key": hawkAndDove[0],
        "type": "image",
        "file": "animals-black_widow.png",
        "scale": "1.0",
      },
      {
        "key": hawkAndDove[1],
        "type": "image",
        "file": "animals-ant.png",
        "scale": "1.0",
      },
      {
        "key": "food",
        "type": "image",
        "file": "plant-leaf.png",
        "scale": "1.0",
      },      
    ],
  };
}
