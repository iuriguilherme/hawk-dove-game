/**
 * @file util.js Utility functions, pseudo library for Hawk Dove Game  
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

import { create, all } from "mathjs";
const math = create(all, {});

export const sleep = ms => new Promise(r => setTimeout(r, ms));

// https://github.com/fxhash/fxhash-webpack-boilerplate/issues/20
export const properAlphabet = $fx.hash.startsWith("oo") ?
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" :
  "0123456789abcdef";
export const baseXToDecimal = $fx.hash.startsWith("oo") ?
  base58toDecimal :
  base16toDecimal;

export const alphabetArray = Array.from(properAlphabet);
//~ export const alphabetArray = properAlphabet;
export const fxhashTrunc = $fx.hash.slice(2);
export const fxArray = Array.from(fxhashTrunc);
//~ export const fxArray = fxhashTrunc;
//~ export const fxhashDecimal = baseXToDecimal(fxhashTrunc);

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
 * @param {String} hash: unique fxhash string (or xtz transaction hash)
 * @returns {float} decimal representation of the number in base16  
 */
function base16toDecimal(hash = fxhashTrunc) {
  let decimal = 0;
  let iterArray = Array.from(hash).reverse();
  while (iterArray.length > 0) {
    decimal += properAlphabet.indexOf(iterArray.slice(-1)) * (math.pow(16,
      iterArray.length - 1));
    iterArray = iterArray.slice(0, -1);
  }
  return decimal;
}

/**
 * @param {float} decimalHash: output from baseXToDecimal(fxhash)
 * @param {int} maxVariants: the inclusive n from the desired range 
 *      of (0, n) for the return value
 * @param {boolean} inverse: transforms range into (n, 0)
 * @returns {int} one random integer defined by fxhash and a threshold
 *      defined by maxVariants * variantFactor
 */
export function fxHashToVariant(
  decimalHash,
  maxVariants = 0,
  inverse = false,
  variantFactor = 3.904e-87, // This number is magic
) {
  let variant = math.round(decimalHash * maxVariants * variantFactor);
  if (inverse) {
    return math.abs(maxVariants - variant);
  }
  return variant;
}
