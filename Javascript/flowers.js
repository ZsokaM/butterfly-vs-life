class Flowers{
    constructor(x, y, widht, height){
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src="/Images/sunflower.png";
    this.width = 60;
    this.height = 60;
    this.radius = 30;
    this.sound = document.createElement('audio');
    this.sound.src = "/Sounds/coin.wav";
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        ctx.closePath();
    }

    drawFlower(){
        ctx.drawImage(this.img, this.x-30, this.y-30, this.width, this.height)
    }

    update(){
        this.draw();
        this.drawFlower();
    }
}