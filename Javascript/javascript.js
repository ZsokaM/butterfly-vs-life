//variables 

const butterflySprite = new Image();
butterflySprite.src= "/Images/pillango.png";

const background = new Image();
background.src="/Images/mandy-choi-_qZ0us4az20-unsplash.jpg";

const rainDrop = new Image();
rainDrop.src="/Images/water-drop.png";

const flower = new Image();
flower.src = "/Images/rose.png";

let score = 0;
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


function crashFinder(item){
        let dx = item.x - player.x;
        let dy = item.x - player.y;
        item.distance = Math.sqrt(dx*dx + dy*dy);

        if(item.distance < item.radius + player.radius){
            //array.splice(array[i],1)
            console.log("COLLISSION")
            score++;            
            //}
        } 
}


//Animation loop


function animate(){
    
    gameFrame += 1;
    
    if(gameFrame % randomNumber(30, 50) === 0){
        rainDrops()
    }

    if(gameFrame % randomNumber(120, 150) === 0){
        createFlowers()
    }

    ctx.clearRect(0,0, canvas.width, canvas.height);

    //ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
       
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

    flowers.forEach(flo => {
        crashFinder(flo)
    })


    ctx.fillText('score: ' + score, 10, 50)
    
    requestAnimationFrame(animate);
}


animate()

