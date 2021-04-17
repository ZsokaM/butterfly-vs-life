class Butterfly{
    constructor(){
        this.x = 200;
        this.y = 200;
        this.width= 99.4;
        this.height= 94.4;
        this.frameX= 0;
        this.frameY= 0;
        this.speed= 5;
        this.moving= false;
        this.radius= 30;
        this.butterflySprite = new Image();
        this.butterflySprite.src= "/Images/pillango.png";
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x+55, this.y+50, this.radius, 0, Math.PI *2);
        ctx.fill();
        ctx.closePath();
    }

    drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }

    moveButterfly(){
        if(keys["ArrowUp"] && this.y > 0){
            this.y -= this.speed;
            this.frameY = 0;
        }
        if(keys["ArrowLeft"] && this.x > 0){
            this.x -= this.speed;
            this.frameY = 1;
        }
        if(keys["ArrowDown"] && this.y < canvas.height - this.height){
            this.y += this.speed;
            this.frameY = 0;
        }
        if(keys["ArrowRight"] && this.x < canvas.width - this.width){
            this.x += this.speed;
            this.frameY = 1;
        }
    }

    handleButterflyFrame(){
        if(this.frameX < 10 && this.moving) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }
    }


    update(){
        this.draw();
        this.drawSprite(this.butterflySprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height,
            player.x, player.y, player.width, player.height);
        this.moveButterfly();
        this.handleButterflyFrame();
    }

}
