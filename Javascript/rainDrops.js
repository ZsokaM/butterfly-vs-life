class Rain{
    constructor(x,y,img, width, height){
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = 'Images/drop.png';
        this.width = 50;
        this.height = 50;
        this.radius = 30;
        this.speed = {
            x: 0,
            y: 5,
        }
        this.gravity = 0.25;
        this.friction = 0.3;
        this.sound = document.createElement('audio');
        this.sound.src = "Sounds/household_baby_lotion_movement_sudden_in_bottle.mp3"
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        ctx.closePath();
    }
    drawDrop(){
        ctx.drawImage(this.img, this.x-25, this.y-25, this.width, this.height)
    }


    update(){
        this.draw()
        this.drawDrop()
        if(this.y + this.height + this.speed.y > canvas.height){
            this.speed.y = -this.speed.y * this.friction;
            this.shatter();
        } else {
            this.speed.y += this.gravity;
        }
            this.y += this.speed.y;
            
    }

    shatter(){
        this.width -= 10;
        this.height -= 10;
        for(let i = 0; i<5; i++){
            miniDrops.push(new SmallDrop(this.x,this.y, 10, 10))
        }
    }
}

class SmallDrop extends Rain{
    constructor(x,y,img, width, height){
        super(x, y, img)
        this.width = 20;
        this.height = 20;
        this.speed = {
            x: randomNumber(-5,5),
            y: randomNumber(-15,15),
        }
        this.gravity = 0.9;
        this.friction = 1;
        this.timeToLive = 10;
    }

    update(){
        this.drawDrop()
        if(this.y + this.height + this.speed.y > canvas.height){
            this.speed.y = -this.speed.y * this.friction;
        } else {
            this.speed.y += this.gravity;
        }
            this.y += this.speed.y;
            this.x += this.speed.x;
            this.timeToLive -= 1;
    }
}
