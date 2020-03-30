class Storm{
    constructor(x, y){
        this.css_class = "Storm";
        this.default_image = "Storm_0066.png";
        this.current_frame = 66;
        this.sprite = new Sprite(x, y, this.default_image, this.css_class,-305,-235, 200, 180);
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
        this.dumbfire_effects = [];
        this.desired_move = "";
        this.fatigue = -1; //determines if character is locked in an animation

        this.abilities = new StormAbilities();
        this.ability_set = {
            "electro_ball": this.abilities.electroBall,
            "electric_fork": this.abilities.electricFork,
            "tornado": this.abilities.tornado,
            "kick":this.abilities.kick,
            "punch":this.abilities.punch,
            "chop":this.abilities.chop,
            "ultimate":this.abilities.ultimate
        }
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
        for(var x=0; x < this.dumbfire_effects.length ;x++){
            if(this.dumbfire_effects[x].destroyed){
                this.dumbfire_effects.splice(x, 1);
            }  
        }

        //effect action
        for(var x=0; x < character.dumbfire_effects.length; x++){
            this.dumbfire_effects[x].action();
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
            else if(this.state == "move_right"){
                this.moveRight();
            }
            else if(this.state == "move_left"){
                this.moveLeft();
            }
            else if(this.state == "move_up"){
                this.moveUp();
            }
            else if(this.state == "move_down"){
                this.moveDown();
            }
            else{ //see StormAbilities class
                //this.abilities.generic(this, 429, 448);
                this.ability_set[this.state](this);
            }
        }else{
            this.intro();
        }
    }
}

class StormAbilities{ //functions called by the storm class to use
    constructor(){}

    //generic is used for skills that don't need additonal functionality
    generic(s, min_frame, max_frame, fatigue = 5){ 
        let check_done = s.sprite.frameBound(min_frame, max_frame);

        if(s.fatigue <= 0){
            s.fatigue = fatigue; //fatigue determines how long before a player can attempt another action.
            s.sprite.frameBound(min_frame, max_frame);
        }else{
            if(check_done){ //s.sprite.current_frame?
                s.state = "idle";
            }
        }
        //s.sprite.frameBound(min_frame, max_frame);
    }



    //generic abilities 
    electricFork(s){
        s.abilities.generic(s, 428, 448);
    }

    kick(s){
        s.abilities.generic(s, 387, 396);
    }

    punch(s){
        s.abilities.generic(s, 368, 375);
    }

    chop(s){
        s.abilities.generic(s, 383, 387);
    }


    //special abilities
    tornado(s){
        //s.abilities.generic(s, 405, 488);

        if(s.fatigue <= 0){
            s.fatigue = Math.abs(485 - 488) + 2;//5;
        }else{
            let check_done = s.sprite.frameStickMax(485, 488);
            if(check_done){ //check if animation has completed
                let offset;
                if(s.direction == "left"){
                    offset = 60
                }else{
                    offset = -60
                }
                s.dumbfire_effects.push(new Tornado(s.position.x-offset, s.position.y-15, s.direction));
                s.state = "idle";
            }            
        }
    }

    electroBall(s){
        if(s.fatigue <= 0){
            s.fatigue = Math.abs(261 - 257) + 2;//5;
        }else{
            let check_done = s.sprite.frameStickMax(257, 261);
            if(check_done){ //s.sprite.current_frame?
                s.dumbfire_effects.push(new ElectroBall(s.position.x, s.position.y-15, s.direction));
                s.state = "idle";
            }
        }
    }

    ultimate(s){
        if(s.fatigue <= 0){
            s.fatigue = Math.abs(261 - 257) + 2;//5;
        }else{
            let check_done = s.sprite.frameStickMax(508, 547);
            if(check_done){ //s.sprite.current_frame?
                s.dumbfire_effects.push(new ElectroBall(s.position.x+50, s.position.y+10, "left"));
                s.dumbfire_effects.push(new ElectroBall(s.position.x-50, s.position.y+10, "right"));
                s.dumbfire_effects.push(new ElectroBall(s.position.x+50, s.position.y+70, "right"));
                s.dumbfire_effects.push(new ElectroBall(s.position.x-50, s.position.y+70, "left"));
                s.state = "idle";
            }
        }
        //s.abilities.generic(s, 508, 547);
    }
}