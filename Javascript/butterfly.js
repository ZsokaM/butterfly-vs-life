class Butterfly{
    constructor(){
        this.x = 200;
        this.y = 200;
        this.width= 75;
        this.height= 76.25;
        this.frameX= 0;
        this.frameY= 0;
        this.speed= 5;
        this.moving= false;
        this.radius= 40;
        this.butterflySprite = new Image();
        this.butterflySprite.src= "/Images/jing.fm-animated-butterflies-clipart-2113544.png";
        this.count = 0;
        this.delay = 15;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x+35, this.y+32, this.radius, 0, Math.PI *2);
        //ctx.fill();
        ctx.closePath();
    }

    drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }

    moveButterfly(){
        if(keys["ArrowUp"] && this.y > 0){
            this.y -= this.speed;
            //this.frameY = 0;
        }
        if(keys["ArrowLeft"] && this.x > 0){
            this.x -= this.speed;
            //this.frameY = 1;
        }
        if(keys["ArrowDown"] && this.y < canvas.height - this.height){
            this.y += this.speed;
            //this.frameY = 0;
        }
        if(keys["ArrowRight"] && this.x < canvas.width - this.width){
            this.x += this.speed;
            //this.frameY = 1;
        }
    }

    handleButterflyFrame(){
        console.log(gameFrame)
        if(gameFrame % 3===0){
        if(this.frameX < 5 && this.moving || this.frameY < 5 && this.moving) { 
            this.frameX++;
            this.frameY++;
        } else {
            this.frameY = 0;
            this.frameX = 0;
        }
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
