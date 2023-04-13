/**
 * @file ruleset4.js Youtube comments ruleset for Hawk Dove Game  
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

/*
 * @description Youtube comments ruleset:
 * 
 * This strategy ruleset have been described through many comment to a Primer 
 * youtube video. The original text of the comments are as follows (sic):
 * 
 * https://www.youtube.com/watch?v=YNMkADpvO4w&lc=Ugz72oOWQom7XBhaczl4AaABAg
 * 3 ideas for new strategies:
 * 1. the seagull strategy (or eagle strategy, illustrated with a white blob)
 * Seagulls are the most aggressive. A seagull will always eat both the food in 
 * the pile, regardless of whether another blob is there or not. 
 * If a seagull meats another seagull they'll both try and get both food at 
 * once but fail and collide into each other, both getting 1 food but get 
 * injured and thereby going home with a 50/50 chance of surviving.
 * 2. the heron strategy (illustrated with a green blob)
 * Herons are super speedy. They'll zip around the world eating multiple piles 
 * of food (up to 4 at a time) and thereby reproducing up to 4 new blobs.
 * and 3. the penguin strategy (illustrated with an orange blob)
 * Penguins and the opposite of herons. There very slow and will sometimes not 
 * succeed in finding any food, therefore not surviving.
 * 
 * https://www.youtube.com/watch?v=YNMkADpvO4w&lc=Ugw6ttfO7oILoIp9feJ4AaABAg
 * Doves: Share the food
 * Hawks: Have three fourths of the food
 * Seagulls: Takes all the food
 * 
 * https://www.youtube.com/watch?v=YNMkADpvO4w&lc=Ugw6ttfO7oILoIp9feJ4AaABAg.
 * 8xyTqD-LTik9TfVugsyoUV
 * Seagulls would be fast and would try to take a bunch of food but it would 
 * easily die if caught by a predator
 * Owls would backstab blobs but they would have a small chance of winning 
 * against an eagle
 * Eagles would eat other blobs but it would be extra vulnerable to owls
 * Ravens would live in packs and would be the same as a dove, but have a 
 * sensing of sus. When they see a damaged raven near a hawk they would get sus 
 * of the hawk and if they saw another raven die or get damaged by a hawk they 
 * would kill the hawk
 * 
 * https://www.youtube.com/watch?v=YNMkADpvO4w&lc=Ugw6ttfO7oILoIp9feJ4AaABAg.
 * 8xyTqD-LTik9YqebemnwkC
 * If a Seagull Meets with a hawk, The seagull takes all food, angering the 
 * hawk, and there's a 1/4 chance that the seagull wins, using up half a food, 
 * if not, it uses up all food and they both die
 * 
 * https://www.youtube.com/watch?v=YNMkADpvO4w&lc=Ugw6ttfO7oILoIp9feJ4AaABAg.
 * 8xyTqD-LTik9dGKgkTvsGE
 * New strategy: Wyr
 * They are nice to doves and run away from hawks. If it meets a dove, it gets 
 * one food and the dove gets the other.
 * 
 * https://www.youtube.com/watch?v=YNMkADpvO4w&lc=UgzyDhScfD-Yf5PYb_14AaABAg
 * There is something that I would like someone to explain: if two hawks do 
 * meet, implying that the payoff is 0,0 is a bit a stretch, since one of the 
 * two hawks might win and take all the food. By this reasoning, i think that 
 * the payoff should have been 33% one wins and lives another day, 33% the 
 * other wins, 33% they both die
 * 
 * https://www.youtube.com/watch?v=YNMkADpvO4w&lc=UgxRAMYdZTYdQqP3x014AaABAg
 * What happens if more than two blobs pick the same pair of food? Isn't there 
 * more outcomes than just one or two blobs for a pair of food if they all pick 
 * a pair randomly?
 * 
 * https://www.youtube.com/watch?v=YNMkADpvO4w&lc=Ugw_NEClqgjdMzPIdyN4AaABAg
 * What happens if we add a “vulture”, that when it finds any kind of conflict 
 * wether it be dove or hawk, it will go to another random pile, repeating a 
 * few times, then going home with what it has? (Just a conflict avoider)
 * 
 * https://www.youtube.com/watch?v=YNMkADpvO4w&lc=UgyvgjDYMfcbERq8mkp4AaABAg
 * Dove: Shares food
 * Hawk: Takes 3/4
 * Seagull: Takes all
 * Ibis: Takes all, munches it in front of you and spits it to the ground.
 * 
 * https://www.youtube.com/watch?v=YNMkADpvO4w&lc=UgyeopVgBapvXMjm_354AaABAg
 * 3rd strategy : Eagle
 * When Eagle meets Dove, it kills dove and gets 2 food+dove is now food, but 
 * it must use energy and therefore get only 1.5 food while dove is killed
 * When Eagle meets Hawm, it also kills hawk and gets 2 food + hawk is now 
 * food, but it needs to use more energy to kill hawk. therefore it only gets 
 * 3/4 food, while hawk is killed
 * But when eagle meets another eagle, Both eagle's close family(their parent 
 * and children) are all involved and die
 * 
 * https://www.youtube.com/watch?v=YNMkADpvO4w&lc=UgyBZgseG4JMWCKRtE14AaABAg
 * I think that the hawks should not die 100% of the time they fight, I think 
 * they should have a 50% chance each or maybe when they fight a random winner 
 * is chosen that survives while the other one dies, or maybe the winner has a 
 * 75% chance of living and the loser only has a 25% chance of living. (My 
 * personal favorite was the latter)
 * 
 * https://www.youtube.com/watch?v=YNMkADpvO4w&lc=UgwAROIRLa5GsV6BmzN4AaABAg
 * New strategy idea Eagle if an eagle comes across a dove it will eat two 
 * pieces and then steal a piece and give it to the dove so if it gets 2 add it 
 * on if you want to eat it they reproduce twice and if a Eagle comes across a 
 * hawk it will eat one and a half of food and then proceed to eat the hawk So 
 * it comes home with 3 food and the hawk doesn’t come home at all
 */
export function ruleset4(subjects, foods, names, name, version) {
  console.log("Not implemented");
}

export function payoffMatrix4() {
  return {
    "survival": {
      "dove": {
        "dove": 0.0,
        "hawk": 0.0,
        "alone": 0.0,
      },
      "hawk": {
        "dove": 0.0,
        "hawk": 0.0,
        "alone": 0.0,
      },
    },
    "reproduction": {
      "dove": {
        "dove": 0.0,
        "hawk": 0.0,
        "alone": 0.0,
      },
      "hawk": {
        "dove": 0.0,
        "hawk": 0.0,
        "alone": 0.0,
      },
    },
  };
}
