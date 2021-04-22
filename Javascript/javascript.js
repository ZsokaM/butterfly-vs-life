const background = new Image();
background.src="Images/eles.png";

const gameMusic = document.createElement('audio');
gameMusic.src = "Sounds/African_fun_long.mp3";
gameMusic.volume = 0.5;
gameMusic.loop = true;


const winSound = document.createElement('audio');
winSound.src = "Sounds/zapsplat_multimedia_male_voice_processed_says_you_win_002_21573.mp3"

const loseSound = document.createElement('audio');
loseSound.src = "Sounds/zapsplat_multimedia_male_voice_processed_says_you_lose_21571.mp3"

let score = 0;
let remainingLife = 10;
let gameFrame = 0;

const player = new Butterfly();
let dropsArray = [];
let miniDrops = [];
let flowers = [];

function randomNumber(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function rainDrops(){
    let x = randomNumber(0, canvas.width);
    let y = 0;
    dropsArray.push(new Rain(x,y));
}

function createFlowers(){
    let x = randomNumber(20, canvas.width-20);
    let y = randomNumber(100, canvas.height-20);
    flowers.push(new Flowers(x,y))
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
    for(let item in anyArray){
        obstacle = anyArray[item];
        //comparing player with the given object
        if(circleIntersect(player.x, player.y, player.radius, obstacle.x, obstacle.y, obstacle.radius)){
            switch(anyArray){
                case dropsArray:
                    obstacle.sound.play()
                    anyArray.splice(item, 1)
                    remainingLife--
                    break;
                case flowers:
                    obstacle.sound.play()
                    anyArray.splice(item, 1)
                    score++
                    break;
            }
        }
    }
}

function checkGameOver(){
    if(remainingLife <=0){
        ctx.save()
        ctx.font = "100px Arial"
        ctx.fillStyle = "white"
        ctx.fillText('YOU LOSE', canvas.width*0.30, canvas.height/2)
        ctx.restore()
        loseSound.play()
        cancelAnimationFrame(reqAnimFr)
        gameMusic.pause()
    }
   if(score === 30){
        ctx.save()
        ctx.font = "100px Arial"
        ctx.fillStyle = "white"
        ctx.fillText('YOU WIN', canvas.width*0.30, canvas.height/2)
        ctx.restore()
        winSound.play()
        cancelAnimationFrame(reqAnimFr)
        gameMusic.pause()
    }
}

//Animation loop

let reqAnimFr = null;

function animate(){
    reqAnimFr = requestAnimationFrame(animate);
    
    gameMusic.play();

    gameFrame += 1;
    
    detectCollision(flowers);
    detectCollision(dropsArray);

    if(gameFrame % randomNumber(40, 60) === 0){
        rainDrops()
    }

    if(gameFrame % randomNumber(130, 150) === 0){
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
        if(minidrop.timeToLive === 0){
            miniDrops.splice(miniDrops[index], 1)
         }
    })
        
    flowers.forEach(flo => {
         flo.update()
    })
   
    ctx.font = "45px Arial"
    ctx.strokeStyle = "#343a40"
    ctx.strokeText('Score: ' + score, canvas.width -200, 50)
    ctx.strokeText('Life: ' + remainingLife, canvas.width -200, 100)

    checkGameOver()
}