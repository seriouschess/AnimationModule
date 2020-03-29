function cache(){
    let sprite = new Sprite(10, 10, "Storm_0066.png", "storm");
    //sprite.element.style.opacity = 0;
    var interval;
    var x = 0;
    var flag = false;
        interval = setInterval(function(){ 
            sprite.setFrame(x);
            x += 1
            if(x > 1000){
                clearInterval();
            } 
        }, 30);
    }
    //sprite.delete();
    
    console.log("hi");