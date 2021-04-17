class Flowers{
    constructor(x, y, widht, height){
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src="/Images/sunflower.png";
    this.width = 50;
    this.height = 50;
    this.radius = 30;
    this.sound = document.createElement('audio');
    this.sound.src = "/Sounds/coin.wav";

    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        ctx.fill();
        ctx.closePath();
    }

    drawFlower(){
        ctx.drawImage(this.img, this.x-25, this.y-25, this.width, this.height)
    }

    update(){
        this.draw();
        this.drawFlower();
        
    }
}