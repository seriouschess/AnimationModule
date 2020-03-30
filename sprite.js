class Sprite{ //css_class name must match the name of the .png file
    constructor(
        x, y, default_image, css_class,
         _x_offset = -340, _y_offset = -240,
         width = 180,
         height= 180
         ){
        this.src = default_image; //Example_1234.png
        this.element = document.createElement("div");
        document.body.appendChild(this.element);
        this.element.classList.add(css_class);
        this.file_family = "Storm";
        this.element.style.height = `${height}px`;
        this.element.style.width = `${width}px`;
        this.x_offset = _x_offset;
        this.y_offset = _y_offset;
        this.move(x,y);
        this.stick_counter = 0;
        this.done = false;
    }

    setFrame(frame){ //frame is a number 0 - 1173
        frame = Math.abs(frame % 1174);
        this.current_frame = frame; //not declared in the constructor
        if(frame < 10){
            frame = `000` + frame;
        }else if(frame < 100){
            frame = `00` + frame;
        }else if(frame < 1000){
            frame = `0`+frame;
        }

        this.src = `${this.file_family}_${frame}.png`;
        //let test_color = "white ";
        let test_color = "";
        this.element.style.background = `${test_color}url('Storm/${this.src}') ${this.x_offset}px ${this.y_offset}px`;
    }

    frameBound(min, max, loop_start = -1){ //loop start optional for beginning of the repeat frame
        if(this.current_frame >= min && this.current_frame <= max-1 ){
            this.setFrame(this.current_frame + 1);
            return false;
        }else if(this.current_frame == max && loop_start != -1){
            this.setFrame(loop_start);
            return false;
        }else{
            this.setFrame(min);
            return true;
        }
    }

    frameStickMax(min, max, duration=0){ //allows the final frame to hang for the duration of loops
        if(this.current_frame == max && this.stick_counter <= duration){
            this.stick_counter += 1;
            this.setFrame(max);
            return false;
        }else if(this.stick_counter > duration){
            this.stick_counter = 0;
            this.frameBound(min, max);
            return true; //returns true when done
        }else{
            this.frameBound(min, max);
            return false;
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

    delete(){
        this.element.remove();
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
