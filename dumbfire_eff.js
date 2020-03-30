class DumbfireEffect{ //x, y, default_image, css_class
    constructor(x, y, direction, min_frame, max_frame, x_off, y_off, width, height){
        this.default_image = "Storm_0257.png";
        this.sprite = new Sprite(x, y, this.default_image, "DumbFireEffect", x_off, y_off, width, height);
        this.position = {
            x: x,
            y: y
        }
        this.direction = direction;
        this.SPEED = 30;
        this.timeout = 20; //frames before object is deleted
        this.destroyed = false;
        this.min_frame = min_frame;
        this.max_frame = max_frame;
    }

    action(){ //sparkle
        if(this.timeout < 0){
            this.sprite.delete();
            this.destroyed = true;
        }else{
            //depricate life
            this.timeout -= 1;

            //pass draw information
            this.sprite.frameBound(this.min_frame, this.max_frame);

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

class ElectroBall extends DumbfireEffect{
    constructor(x, y, direction, min_frame = 34, max_frame = 39, x_off=-300, y_off=-350, width = 180, height=140){
        super(x, y, direction, min_frame, max_frame, x_off, y_off, width, height);
    }
}

class Tornado extends DumbfireEffect{
    constructor(x, y, direction, min_frame = 0, max_frame = 5, x_off=-310, y_off=-180, width = 180, height = 230){
        super(x, y, direction, min_frame, max_frame, x_off, y_off, width, height);
    }
}