class Storm{
    constructor(x, y){
        this.css_class = "storm";
        this.default_image = "Storm_0066.png";
        this.current_frame = 66;
        this.sprite = new Sprite(x, y, this.default_image, this.css_class);
        this.state = "idle";
        this.controls = { //determines movement
            right:false,
            left:false,
            up:false,
            down:false
        };
        this.position = {
                x: x,//strip_px(this.element.style.left),
                y: y//strip_px(this.element.style.top)
        }
        this.SPEED = 20; //don't modify me -_-
        this.electro_balls = [];
    }

    idle(){
        this.sprite.setFrame(96);
    }

    cast(){
        //this.state = "idle";
        this.sprite.frameBound(257, 261);
        if(this.sprite.current_frame === 261){ //this.sprite.current_frame?
            this.electro_balls.push(new ElectroBall(this.position.x, this.position.y, this.direction));
        }
    }

    updatePosition(){
        try{
            if(this.controls.right){
                this.position.x += this.SPEED;
            }
        }finally{
            //:D
        }
        try{
            if(this.controls.left){
                this.position.x -= this.SPEED;
            }
        }finally{
            //:D
        }
        try{
            if(this.controls.down){
                this.position.y += this.SPEED;
            }
        }finally{
            //:D
        }
        try{
            if(this.controls.up){
                this.position.y -= this.SPEED;
            }
        }finally{
            //:D
        }
        console.log("so");
       this.sprite.move(this.position.x, this.position.y);
    }

    moveRight(){
        console.log("doe");
        this.direction = "right";
        this.sprite.frameBound(98,101,101);
        this.position.x += 20;
    }

    moveLeft(){
        console.log("ray");
        this.direction = "left";
        this.sprite.frameBound(98,101,101);
        this.position.x -= 20;
    }

    moveUp(){
        console.log("me");
        this.sprite.frameBound(119, 127, 121);
        this.position.y -= 20;
    }

    moveDown(){
        console.log("fa");
        this.sprite.frameBound(130, 149, 141);
        this.position.y += 20;
    }

    action(){
        if(this.state == "idle"){
            this.idle();
        }
        if(this.state == "move_right"){
            this.moveRight();
        }
        if(this.state == "move_left"){
            this.moveLeft();
        }
        if(this.state == "move_up"){
            this.moveUp();
        }
        if(this.state == "move_down"){
            this.moveDown();
        }
        if(this.state == "cast"){
            this.cast();
        }

       this.sprite.setFacing(this.direction);

        this.updatePosition();
    }
}

function keyDown(/** @type {KeyboardEvent} */ ev){
    switch(ev.keyCode){
    case 32: //cast
        character.state = "cast";
        break;    
    case 37: //left 
        character.direction = "left";
        character.state = "move_left";
        character.controls.left = true;
        break;
    case 38: // up
        character.state = "move_up";
        character.controls.up = true;
        break;
    case 39: // right arrow
        character.direction = "right";
        character.state = "move_right";
        character.controls.right = true;
        break;
    case 40: //down arrow
        character.state = "move_down";
        character.controls.down = true;
        break;
      }
}

function keyUp(/** @type {KeyboardEvent} */ ev){
    switch(ev.keyCode){
        case 32: //cast
            break;
        case 37: //left
            character.state = "idle";
            character.controls.left = false;
            break;
        case 38: //up
            character.state = "idle";
            character.controls.up = false;
            break;
        case 39: //right
            character.state = "idle";
            character.controls.right = false;
            break;
        case 40: //down
            character.controls.down = false;
            character.state = "idle";
            break;
        }
}

class Sprite{
    constructor(x, y, default_image, css_class, _x_offset = -330, _y_offset = -230){
        this.src = default_image; //Example_1234.png
        this.element = document.createElement("div");
        document.body.appendChild(this.element);
        this.element.classList.add(css_class);
        this.x_offset = _x_offset;
        this.y_offset = _y_offset;
        this.move(x,y);
    }

    setFrame(frame){ //frame is a number 0 - 1173
        frame = Math.abs(frame % 1174);
        this.current_frame = frame;
        if(frame < 10){
            frame = `000` + frame;
        }else if(frame < 100){
            frame = `00` + frame;
        }else if(frame < 1000){
            frame = `0`+frame;
        }

        this.src = `Storm_${frame}.png`;
        //let test_color = "white ";
        let test_color = "";
        this.element.style.background = `${test_color}url('Storm/${this.src}') ${this.x_offset}px ${this.y_offset}px`;
    }

    frameBound(min, max, loop_start = -1){ //loop start optional for beginning of the repeat frame
        if(this.current_frame >= min && this.current_frame <= max-1 ){
            console.log("up "+this.current_frame);
            this.setFrame(this.current_frame + 1);
        }else if(this.current_frame == max && loop_start != -1){
            this.setFrame(loop_start);
        }else{
            console.log("initial frame "+this.current_frame);
            this.setFrame(min);
        }
    }

    setFacing(direction){
        if(direction == "left"){
            this.element.style.transform = "scaleX(1)";
        }else{
            this.element.style.transform = "scaleX(-1)";
        };
    }

    move(x, y){
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }
}

function strip_px(string){
    for(var x=0; string.length ;x++){
       if( string[x] == "p" ){
        return Number(string.substring(0,x));
       }
    }
    return 0;
}

class ElectroBall{ //x, y, default_image, css_class
    constructor(x, y, direction){
        this.default_image = "Storm_0257.png";
        this.sprite = new Sprite(x, y, this.default_image, "electroBall", -310, -350);
        this.position = {
            x: x,
            y: y
        }
        this.direction = direction;
        this.SPEED = 30;
    }

    action(){ //sparkle
        this.sprite.frameBound(34, 39);
        if(this.direction == "right"){
            this.position.x += this.SPEED;
        }else{
            this.position.x -= this.SPEED;
        }
        
        this.sprite.move( this.position.x, this.position.y );
    }
}


function update(){
    character.action();
    for(var x=0; x < character.electro_balls.length; x++){
        character.electro_balls[x].action();
    }
}

//Event Handelers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

//Main Script
character = new Storm(0, 0);
console.log("character: "+ character.sprite.src);
setInterval(function(){ update() }, 50);