class Butterfly{
    constructor(){
        this.x = 200;
        this.y = 200;
        this.width= 105;
        this.height= 97.5;
        this.frameX= 0;
        this.frameY= 0;
        this.speed= 8;
        this.moving= false;
        this.radius= 40;
        this.butterflySprite = new Image();
        this.butterflySprite.src= "/Images/npc_butterfly__x1_fly-top_png_1354829528 copy.png";
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x+55, this.y+50, this.radius, 0, Math.PI *2);
        ctx.closePath();
    }

    drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }

    moveButterfly(){
        if(keys["ArrowUp"] && this.y > 0){
            this.y -= this.speed;
        }
        if(keys["ArrowLeft"] && this.x > 0){
            this.x -= this.speed;
        }
        if(keys["ArrowDown"] && this.y < canvas.height - this.height){
            this.y += this.speed;
        }
        if(keys["ArrowRight"] && this.x < canvas.width - this.width){
            this.x += this.speed;
        }
    }

    handleButterflyFrame(){
        if(this.frameX < 12 && this.moving && this.frameY < 6) { 
            this.frameX++;
        } else if(this.frameX === 12 && this.moving && this.frameY < 6){
            this.frameY++;
            this.frameX++;
        } else {
            this.frameY = 0;
            this.frameX = 0;
        }
    }

    update(){
        if(gameFrame % 1000){
            this.draw();
            this.drawSprite(this.butterflySprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height,
                player.x, player.y, player.width, player.height);
            this.moveButterfly();
            this.handleButterflyFrame();
        }
    }
}
