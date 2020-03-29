class Storm{
    constructor(x, y){
        this.css_class = "Storm";
        this.default_image = "Storm_0066.png";
        this.current_frame = 66;
        this.sprite = new Sprite(x, y, this.default_image, this.css_class);
        this.state = "intro";

        //sprite related
        this.position = {
                x: x,//strip_px(this.element.style.left),
                y: y//strip_px(this.element.style.top)
        }
        this.SPEED = 20; //don't modify me -_-
        
        this.direction = "left";
        this.intro_done = false;

        //player control related
        this.controls = { //determines movement
            right: false,
            left: false,
            up: false,
            down: false
        };

        //ability related
        this.electro_balls = [];
        this.desired_move = "";
        this.fatigue = -1; //determines if character is locked in an animation
    }

    idle(){
        this.sprite.setFrame(96);
    }

    intro(){
        this.sprite.frameBound(677, 682);
        if(this.sprite.current_frame === 682){
            this.direction ="right";
            this.state = "idle";
            this.intro_done = true;
        }
    }

    spiritBall(){
        console.log("Fatigue "+this.fatigue);
        if(this.fatigue <= 0){
            this.fatigue = 5;
        }else{
            this.sprite.frameBound(257, 261);
            if(this.sprite.current_frame === 261){ //this.sprite.current_frame?
                this.electro_balls.push(new ElectroBall(this.position.x, this.position.y-15, this.direction));
                this.state = "idle";
                
                console.log("Fatigue "+this.fatigue);
                console.log("reset");
            }
        }
    }

    updatePosition(){
        if(this.intro_done){
        //if(this.state != "cast"){
            try{
                if(this.controls.right){
                    character.direction = "right";
                    character.state = "move_right";
                    this.position.x += this.SPEED;
                }
            }finally{
                //:D
            }
            try{
                if(this.controls.left){
                    character.state = "move_left";
                    this.position.x -= this.SPEED;
                }
            }finally{
                //:D
            }
            try{
                if(this.controls.down){
                    character.state = "move_down";
                    this.position.y += this.SPEED;
                }
            }finally{
                //:D
            }
            try{
                if(this.controls.up){
                    character.state = "move_up";
                    this.position.y -= this.SPEED;
                }
            }finally{
                //:D
            }
           
        //}
        }else{ //intro
            this.position.x += 50;
            this.position.y += 5;
        }
        this.sprite.move(this.position.x, this.position.y);
    }

    moveRight(){
        this.direction = "right";
        this.sprite.frameBound(98,101,101);
        this.position.x += 20;
    }

    moveLeft(){
        this.direction = "left";
        this.sprite.frameBound(98,101,101);
        this.position.x -= 20;
    }

    moveUp(){
        this.sprite.frameBound(119, 127, 121);
        this.position.y -= 20;
    }

    moveDown(){
        this.sprite.frameBound(130, 149, 141);
        this.position.y += 20;
    }

    manageEffects(){
        //garbage collect effects
        for(var x=0; x < this.electro_balls.length ;x++){
            if(this.electro_balls[x].destroyed){
                this.electro_balls.splice(x, 1);
            }  
        }

        //effect action
        for(var x=0; x < character.electro_balls.length; x++){
            this.electro_balls[x].action();
        }
    }

    requestMove(req){
        if(this.fatigue < 0){
            this.desired_move = req;
        }
    }

    determineAbility(){
        if(this.desired_move != "" && this.fatigue < 0){
            this.state = this.desired_move;
            this.desired_move = "";  
        }else if(this.fatigue < 0){
            this.state = "idle";
        }else{
            this.fatigue -= 1;
        }
    }

    action(){
        //pass draw information and update state
        this.determineAbility();
        this.updatePosition(); //must be after updateMove(), both set state
        this.sprite.setFacing(this.direction);
        
        //resolve state
        if(this.intro_done){
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
            if(this.state == "spirit_ball"){
                this.spiritBall();
            }
        }else{
            this.intro();
        }
        console.log("Current State "+this.state);
    }
}