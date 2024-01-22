/**
 * @file sprites.js Themes for Hawk Dove Game  
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

export const getSpritesThemeMap = function(names) {
  return {
    "Boys, Girls & Hearths": [
      {
        "key": names["strategies"]["hawk"],
        "type": "svg",
        "file": "boy.svg",
        "scale": "1.0",
      },
      {
        "key": names["strategies"]["dove"],
        "type": "svg",
        "file": "girl.svg",
        "scale": "1.0",
      },
      {
        "key": names["food"],
        "type": "svg",
        "file": "heart.svg",
        "scale": "1.0",
      },
    ],
    "Devils, Angels & Hearths": [
      {
        "key": names["strategies"]["hawk"],
        "type": "svg",
        "file": "face-devilish-2.svg",
        "scale": "0.5",
      },
      {
        "key": names["strategies"]["dove"],
        "type": "svg",
        "file": "face-angel-2.svg",
        "scale": "0.5",
      },
      {
        "key": names["food"],
        "type": "svg",
        "file": "emblem-favorite-2.svg",
        "scale": "0.5",
      },
    ],
    "Gimps, Lyxes & Files": [
      {
        "key": names["strategies"]["hawk"],
        "type": "svg",
        "file": "gimp-3.svg",
        "scale": "0.08",
      },
      {
        "key": names["strategies"]["dove"],
        "type": "svg",
        "file": "lyx.svg",
        "scale": "0.25",
      },
      {
        "key": names["food"],
        "type": "svg",
        "file": "applications-other-3.svg",
        "scale": "0.6",
      },
    ],
    "Eagles, Doves & Apples": [
      {
        "key": names["strategies"]["hawk"],
        "type": "image",
        "file": "animals-eagle.png",
        "scale": "1.0",
      },
      {
        "key": names["strategies"]["dove"],
        "type": "image",
        "file": "animals-doves_of_peace.png",
        "scale": "1.0",
      },
      {
        "key": names["food"],
        "type": "image",
        "file": "food-worm_in_apple.png",
        "scale": "1.0",
      },      
    ],
    "Spiders, Ants & Leaves": [
      {
        "key": names["strategies"]["hawk"],
        "type": "image",
        "file": "animals-black_widow.png",
        "scale": "1.0",
      },
      {
        "key": names["strategies"]["dove"],
        "type": "image",
        "file": "animals-ant.png",
        "scale": "1.0",
      },
      {
        "key": names["food"],
        "type": "image",
        "file": "plant-leaf.png",
        "scale": "1.0",
      },      
    ],
    "Hornet, Butterfly & Flowers": [
      {
        "key": names["strategies"]["hawk"],
        "type": "image",
        "file": "animals-hornet.png",
        "scale": "1.0",
      },
      {
        "key": names["strategies"]["dove"],
        "type": "image",
        "file": "animals-butterfly.png",
        "scale": "1.0",
      },
      {
        "key": names["food"],
        "type": "image",
        "file": "plant-flower-apple_blossom.png",
        "scale": "1.0",
      },      
    ],
    "Crow, Hummingbird & Blackberries": [
      {
        "key": names["strategies"]["hawk"],
        "type": "image",
        "file": "animals-crow.png",
        "scale": "1.0",
      },
      {
        "key": names["strategies"]["dove"],
        "type": "image",
        "file": "animals-hummingbird.png",
        "scale": "1.0",
      },
      {
        "key": names["food"],
        "type": "image",
        "file": "food-blackberry.png",
        "scale": "1.0",
      },      
    ],
    "Octopuses, Whales & Blowfishes": [
      {
        "key": names["strategies"]["hawk"],
        "type": "image",
        "file": "animals-octopus.png",
        "scale": "1.0",
      },
      {
        "key": names["strategies"]["dove"],
        "type": "image",
        "file": "animals-whale.png",
        "scale": "1.0",
      },
      {
        "key": names["food"],
        "type": "image",
        "file": "animals-blowfish.png",
        "scale": "1.0",
      },      
    ],
    "Bears, Beavers & Acorns": [
      {
        "key": names["strategies"]["hawk"],
        "type": "image",
        "file": "animals-bear.png",
        "scale": "1.0",
      },
      {
        "key": names["strategies"]["dove"],
        "type": "image",
        "file": "animals-beaver.png",
        "scale": "1.0",
      },
      {
        "key": names["food"],
        "type": "image",
        "file": "plant-acorn.png",
        "scale": "1.0",
      },      
    ],
    "Goats, Elephants & Kiwis": [
      {
        "key": names["strategies"]["hawk"],
        "type": "image",
        "file": "animals-goat.png",
        "scale": "1.0",
      },
      {
        "key": names["strategies"]["dove"],
        "type": "image",
        "file": "animals-elephant.png",
        "scale": "1.0",
      },
      {
        "key": names["food"],
        "type": "image",
        "file": "food-kiwi.png",
        "scale": "1.0",
      },      
    ],
    "Owls, Penguins & Grapes": [
      {
        "key": names["strategies"]["hawk"],
        "type": "image",
        "file": "animals-owl.png",
        "scale": "1.0",
      },
      {
        "key": names["strategies"]["dove"],
        "type": "image",
        "file": "animals-penguin.png",
        "scale": "1.0",
      },
      {
        "key": names["food"],
        "type": "image",
        "file": "food-grapes.png",
        "scale": "1.0",
      },      
    ],
    "Windows, Debian & Files": [
      {
        "key": names["strategies"]["hawk"],
        "type": "image",
        "file": "windows.png",
        "scale": "1.0",
      },
      {
        "key": names["strategies"]["dove"],
        "type": "image",
        "file": "linux_distribution-debian.png",
        "scale": "1.0",
      },
      {
        "key": names["food"],
        "type": "svg",
        "file": "text-x-generic.svg",
        "scale": "0.6",
      },      
    ],
    "Proprietary, Kopimi & Code": [
      {
        "key": names["strategies"]["hawk"],
        "type": "svg",
        "file": "licenses-cc-nd-no_derivatives.svg",
        "scale": "0.5",
      },
      {
        "key": names["strategies"]["dove"],
        "type": "image",
        "file": "licenses-kopimi.png",
        "scale": "1.0",
      },
      {
        "key": names["food"],
        "type": "svg",
        "file": "text-x-python.svg",
        "scale": "0.6",
      },
    ],
  };
}
