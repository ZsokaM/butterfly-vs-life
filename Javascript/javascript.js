//initial set up
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = innerWidth * 0.80;
canvas.height = innerHeight * 0.80;

//variables 
const keys = [];

const butterflySprite = new Image();
butterflySprite.src= "/Images/pillango.png";

const background = new Image();
background.src="/Images/mandy-choi-_qZ0us4az20-unsplash.jpg";

const rainDrop = new Image();
rainDrop.src="/Images/water-drop.png";

const flower = new Image();
flower.src = "/Images/rose.png";

//utility functions
function randomNumber(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

//event listeners
window.addEventListener('keydown', function(e){
    //adding the pressed key to the keys array
    keys[e.key] = true;
    butterfly.moving = true;
    //console.log(e.key)
})

window.addEventListener('keyup', function(e){
    //deleting the pressed key from the array
    delete keys[e.key]
    butterfly.moving = false;
})

// window.addEventListener("resize", function() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;		
// });

//OBJECTS AND CLASSES
const butterfly = {
    x: 200,
    y: 200,
    width: 99.4,
    height: 94.4,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false,
}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function moveButterfly(){
    if(keys["ArrowUp"] && butterfly.y > 0){
        butterfly.y -= butterfly.speed;
        butterfly.frameY = 0;
    }
    if(keys["ArrowLeft"] && butterfly.x > 0){
        butterfly.x -= butterfly.speed;
        butterfly.frameY = 1;
    }
    if(keys["ArrowDown"] && butterfly.y < canvas.height - butterfly.height){
        butterfly.y += butterfly.speed;
        butterfly.frameY = 0;
    }
    if(keys["ArrowRight"] && butterfly.x < canvas.width - butterfly.width){
        butterfly.x += butterfly.speed;
        butterfly.frameY = 1;
    }
}

function handleButterflyFrame(){
    if(butterfly.frameX < 10 && butterfly.moving) {
        butterfly.frameX++;
    } else {
        butterfly.frameX = 0;
    }
}

class Rain{
    constructor(x,y,img, width, height){
        this.x = x;
        this.y = y;
        this.img = img;
        this.width = 50;
        this.height = 50;
        this.speed = {
            x: 0,
            y: 5,
        }
        this.gravity = 1;
        this.friction = 0.3;
    }

    drawDrop(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    update(){
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
            miniDrops.push(new SmallDrop(this.x,this.y, rainDrop, 10, 10))
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


class Flowers{
    constructor(x, y, img, widht, height){
    this.x = x;
    this.y = y;
    this.img = img;
    this.width = 50;
    this.height = 50;
    }

    drawFlower(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    update(){
        this.drawFlower()
    }
}

//Implementation
const drops = [];
const miniDrops = [];
const flowers = [];

function init(){
    let x = randomNumber(0, canvas.width);
    let y = randomNumber(0, canvas.width);
    setInterval(()=>{
    for(let i =0; i < 1; i++){
            drops.push(new Rain(x,y, rainDrop));
            x = randomNumber(0, canvas.width);
        }
    }, 500)

    setInterval(()=>{
        for(let i =0; i < 1; i++){
            flowers.push(new Flowers(x,y, flower));
            x = randomNumber(0, canvas.width);
            y = randomNumber(0, canvas.width);
        }
    }, 1000)
}
//Animation loop
//frame per second = fps
let fps, fpsInterval, startTime, now, then, elapsed;
function startAnimating(fps){
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();

}

function animate(){
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);

        ctx.clearRect(0,0, canvas.width, canvas.height);

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        drawSprite(butterflySprite, butterfly.width * butterfly.frameX, butterfly.height * butterfly.frameY, butterfly.width, butterfly.height,
            butterfly.x, butterfly.y, butterfly.width, butterfly.height)

        moveButterfly();

        handleButterflyFrame();

        drops.forEach((drop, index) => {
            drop.update()
            if(drop.width === 0 && drop.height === 0){
                drops.splice(drops[index], 1)
            }
        })
    
        miniDrops.forEach((minidrop, index) => {
            minidrop.update()
            if(minidrop.timeToLive == 0){
                miniDrops.splice(miniDrops[index], 1)
            }
        })
        
        flowers.forEach(flo => {
            flo.update()

        })
    }
}

init()
startAnimating(20)

