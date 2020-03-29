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
        this.timeout = 20; //frames before object is deleted
        this.destroyed = false;
    }

    action(){ //sparkle
        if(this.timeout < 0){
            this.sprite.delete();
            this.destroyed = true;
        }else{
            //depricate life
            this.timeout -= 1;

            //pass draw information
            this.sprite.frameBound(34, 39);

            //move ball
            if(this.direction == "right"){
                this.position.x += this.SPEED;
            }else{
                this.position.x -= this.SPEED;
            }
            this.sprite.move( this.position.x, this.position.y );
        }
    }
}