Hawk Dove Game
===

What
---

### Hawk Dove Game

Hawks and Doves Game is a model of conflict in game theory. Some links 
for an in depth explanation about how the game works:  

* <https://en.wikipedia.org/wiki/Chicken_(game)>
* <https://en.wikipedia.org/wiki/Evolutionary_game_theory>
* <https://en.wikipedia.org/wiki/Resource_holding_potential>
* <https://en.wikipedia.org/wiki/Genetic_algorithm>
* <https://college.holycross.edu/faculty/kprestwi/behavior/ESS/HvD_intro.html>
* <https://youtu.be/YNMkADpvO4w>

It is used in this program to act as a strategy decision system for a 
genetic algorithm.  

### Acute Stress Response

Originally called the "fight or flight response", it is a behavioral 
theory describing how animals respond to stressful stimuli. It is used 
in this program to influence the decision of how each simulated 
individual will choose a strategy in the Hawk Dove Game. There are 
several novel theories other than the original one and they are 
implemented as selectable fx(params).  

* <https://en.wikipedia.org/wiki/Fight-or-flight_response>  

Why
---

This is a Javascript implementation for use in generative NFTs. This 
version is developed to work with 
[fx(params)](https://www.fxhash.xyz/doc/collect/fxparams-mint-tickets).  

To test the game with fx(lens) use `npx @fxhash/cli dev`. To build 
the project in the dist/ folder for use in a web server or in the 
blockhain, use `npx @fxhash/cli build`.  

If you don't know what "npm" is, go to `https://nodejs.org/en`  

How
---

Powered by 
[fxhash boilerplate](https://github.com/fxhash/fxhash-boilerplate), 
[phaser.js](https://phaser.io), [chart.js](https://chartjs.org) and 
[math.js](https://mathjs.org)  

Generated tokens available on 
[fx(hash)](https://www.fxhash.xyz/u/Iuri%20Guilherme)  

> npx node-sloc src
Reading file(s)...
```
    +---------------------------------------------------+
    | SLOC                          | 3579              |
    |-------------------------------|--------------------
    | Lines of comments             | 1710              |
    |-------------------------------|--------------------
    | Blank lines                   | 200               |
    |-------------------------------|--------------------
    | Files counted                 | 45                |
    |-------------------------------|--------------------
    | Total LOC                     | 5289              |
    +---------------------------------------------------+
```

Release log
---

### Pre-alpha

#### Release tag: 
[0.16.0](https://github.com/iuriguilherme/hawk-dove-game/releases/tag/0.16.0)  

* Working simulation of hawk-dove game;  
* fx(params) and fx(features);  
* Selection of themes for the sprites, mostly from openiconlibrary. Selectable 
by fx(params);  
* Option to simulate endlessly or reach a game over screen when the population 
of either Dove or Hawks is extermined;  
* Generation concept: when subjects reproduce, the children will be of next 
generation;
* Age concept: Each iteration increment all subjects's age;  
* Graphs showing the population history, current population, generations, age;  
* Options to customize graphs colors and labels via fx(params);  
* Selection of algorithms to further customize the behaviour and outcome of the 
simulation via fx(params);  
* Added rulesets from Primer youtube channel;  
* Implemented strategies, subjects now can choose what to do;  
* Conditional fx(params) influence the availability of others;  

#### Release tag: 
[0.19.6](https://github.com/iuriguilherme/hawk-dove-game/releases/tag/0.19.6)  

* Implemented PTSD responses (the fight-flight response theory)  
* Reverted conditional fx(params), that just can't work (lol, it's 
working now: https://www.fxhash.xyz/article/draw-that-seed!)  

#### Release tag: 
[0.20.2](https://github.com/iuriguilherme/hawk-dove-game/releases/tag/0.20.2)  

* Converted code to new boilerplate  
* Added support to Ethereum hashes  

ASSETS LICENSE
---

From [css.gg](https://css.gg), [MIT](https://css.gg/doc/licence):  

* block.svg
* boy.svg
* girl.svg
* heart.svg
* swiss.svg
* yinyang.svg

From 
[openiconlibrary](https://sourceforge.net/projects/openiconlibrary/), 
Public Domain:  

* animals-ant.png
* animals-bear.png
* animals-beaver.png
* animals-black_widow.png
* animals-blowfish.png
* animals-butterfly.png
* animals-crow.png
* animals-doves_of_peace.png
* animals-eagle.png
* animals-elephant.png
* animals-goat.png
* animals-hornet.png
* animals-hummingbird.png
* animals-octopus.png
* animals-owl.png
* animals-penguin.png
* animals-whale.png
* applications-other-3.svg
* emblem-favorite-2.svg
* face-angel-2.svg
* face-devilish-2.svg
* food-blackberry.png
* food-grapes.png
* food-kiwi.png
* food-worm_in_apple.png
* gimp-3.svg
* licenses-cc-nd-no_derivatives.svg
* licenses-kopimi.png
* linux_distribution-debian.png
* lyx.svg
* plant-acorn.png
* plant-flower-apple_blossom.png
* plant-leaf.png
* text-x-generic.svg
* text-x-python.svg
* windows.png

LICENSE
---

Copyright 2023-2024 Iuri Guilherme <https://iuri.neocities.org/>  

This program is free software: you can redistribute it and/or modify it under 
the terms of the GNU Affero General Public License as published by the Free 
Software Foundation, either version 3 of the License, or (at your option) any 
later version.  

This program is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A 
PARTICULAR PURPOSE.  
See the GNU Affero General Public License for more details.  

You should have received a copy of the GNU Affero General Public License along 
with this program.  If not, see <https://www.gnu.org/licenses/>.  
