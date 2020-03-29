function keyDown(/** @type {KeyboardEvent} */ ev){
    switch(ev.keyCode){
    case 32: //cast
        character.requestMove("spirit_ball");
        break;    
    case 37: //left
        character.controls.left = true;
        break;
    case 38: // up
        character.controls.up = true;
        break;
    case 39: // right arrow
        character.controls.right = true;
        break;
    case 40: //down arrow
        character.controls.down = true;
        break;
      }
}

function keyUp(/** @type {KeyboardEvent} */ ev){
    switch(ev.keyCode){
        case 32: //cast
            break;
        case 37: //left
            character.controls.left = false;
            break;
        case 38: //up
            character.controls.up = false;
            break;
        case 39: //right
            character.controls.right = false;
            break;
        case 40: //down
            character.controls.down = false;
            break;
        }
}


function update(){
    //character
    character.action();

    //effects
    character.manageEffects();

}

//Event Handelers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

//Main Script
cache();
character = new Storm(-180, 0);
setInterval(function(){ update() }, 50);