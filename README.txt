---STORM ANIMATION MODULE---

-About-
An animation library for the game asset "Storm" from marvel vs capcom2
Built with modularity in mind. Built from 100% base library functionality.



-Get it running-
Install this package into any file folder and run storm.html using a modern
broswer of your choice. Right click storm.html to select your broswer in windows.
Safari Chrome and Firefox 100% work. 
I'm pretty sure old versions of internet explorer will not work.


-controls-
Move storm with the arrow keys.

Ability keys:
q, e, r, z, x, c, f

Just press them and see what they do. Storm must be idle to use abilities.



-How-
See the SormAbilities class in storm.js to see how abilities are implemented.
Abilities are called from this.ability_set in the Storm class.

The Sprite class handles all drawing and even contains the css elements. 
storm.js directs the Sprite what to draw through methods.


-Why-

Good practice for vanilla javascript animations and class design. 
Not everything has to be a startup pitch.

-What?-
script files are called directly by the html to avoid a CORS block and
allow simple local testing and distribution for now. 
Imports are better though if this were to ever make it onto a web app.