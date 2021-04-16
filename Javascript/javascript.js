//variables 

const butterflySprite = new Image();
butterflySprite.src= "/Images/pillango.png";

const background = new Image();
background.src="/Images/eles.png";

const rainDrop = new Image();
rainDrop.src="/Images/water-drop.png";

const flower = new Image();
flower.src = "/Images/sunflower.png";

const rainPop = document.createElement('audio');
rainPop.src = "/Sounds/NenadSimic - Muffled Distant Explosion.wav";

const flowerPop = document.createElement('audio');
flowerPop.src = "/Sounds/coin.wav";

let score = 0;
let remainingLife = 10;
let gameFrame = 0;

let player = new Butterfly();
const dropsArray = [];
const miniDrops = [];
const flowers = [];


function rainDrops(){
    let x = randomNumber(0, canvas.width);
    let y = 0;
    dropsArray.push(new Rain(x,y, rainDrop));
}

function createFlowers(){
    let x = randomNumber(0, canvas.width);
    let y = randomNumber(0, canvas.height);
    flowers.push(new Flowers(x,y, flower))
}


function circleIntersect(x1, y1, r1, x2, y2, r2){
    //calculates distance between two circles
    let squareDistance = (x1-x2)*(x1-x2) + (y1-y2)* (y1-y2);
    //when distance is smaller or equal to the sum of the two radius, the circles touch/overlap
    return squareDistance <= ((r1+r2) *(r1+r2))
}

function detectCollision(anyArray){
    let obstacle;

    //start checking for collisions
    for(let i =0; i<anyArray.length; i++){
        obstacle = anyArray[i];

        //comparing player with the given object
        if(circleIntersect(player.x, player.y, player.radius, obstacle.x, obstacle.y, obstacle.radius)){
            if(anyArray === dropsArray){
                rainPop.play()
                remainingLife --
                console.log("RAIN boom")
            }
            if(anyArray === flowers){
                flowerPop.play()
                score++
                console.log("FLOWER BOOM")
            }
            setTimeout(()=>{
                anyArray.splice(i, 1)
            }, 25)
        }
    }
}


//Animation loop

function animate(){
    
    gameFrame += 1;
    
    detectCollision(flowers);
    detectCollision(dropsArray)

    if(gameFrame % randomNumber(50, 70) === 0){
        rainDrops()
    }

    if(gameFrame % randomNumber(120, 150) === 0){
        createFlowers()
    }

    ctx.clearRect(0,0, canvas.width, canvas.height);

    ctx.save()
    ctx.globalAlpha = 0.5;
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    ctx.restore()
       
    player.update()
    
    dropsArray.forEach((drop, index) => {
        drop.update()
        if(drop.width === 0 && drop.height === 0){
            dropsArray.splice(dropsArray[index], 1)
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
   
    

    ctx.font = "50px Arial white"
    ctx.fillStyle = "white"
    ctx.fillText('score: ' + score, canvas.width -200, 50)
    ctx.fillText('life: ' + remainingLife, canvas.width -200, 100)
    
    
    requestAnimationFrame(animate);

}


animate()

