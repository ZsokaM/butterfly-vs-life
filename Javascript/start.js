const startButton = document.getElementById('start-button');

const resetBtn = document.createElement('button');
resetBtn.classList.add('btn', 'btn-primary', 'btn-lg', 'px-4', 'me-sm-3', 'tealButton');
resetBtn.innerHTML = "Try Again";

const pauseBtn = document.createElement('button');
pauseBtn.classList.add('btn', 'btn-primary', 'btn-lg', 'px-4', 'me-sm-3', 'tealButton');
pauseBtn.innerHTML = "Pause";

let ctx = null;

startButton.addEventListener('click', function(e){
    const main = document.getElementById('main');
    const canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = innerWidth * 0.80;
    canvas.height = innerHeight * 0.65;
    canvas.setAttribute('id', 'canvas');
    main.appendChild(canvas);
    
    startButton.setAttribute('class', 'doNotDisplay');
    document.getElementById('footer').classList.add('doDisplay');
    document.getElementById('body').classList.remove('startingStatus');

    const btnDiv = document.getElementById('btnDiv');
    btnDiv.appendChild(resetBtn);
    btnDiv.appendChild(pauseBtn);

    animate()
})


resetBtn.addEventListener('click', function(e){
    cancelAnimationFrame(reqAnimFr) 
    score = 0;
    remainingLife = 10;
    dropsArray = [];
    miniDrops = [];
    flowers = [];
    animate()
})

pauseBtn.addEventListener('click', function(e){
    if(pauseBtn.innerHTML === "Pause"){
        ctx.save()
        ctx.font = "100px Arial"
        ctx.fillStyle = "white";
        ctx.fillText('PAUSED', canvas.width/2 -180, canvas.height/2)
        ctx.restore()
        gameMusic.pause()
        cancelAnimationFrame(reqAnimFr) 
        pauseBtn.innerHTML = "Restart"
    } else{
        animate()
        pauseBtn.innerHTML = "Pause"
    }       
})


const keys = [];

window.addEventListener('keydown', function(e){
    //adding the pressed key to the keys array
    keys[e.key] = true;
    player.moving = true;
    //console.log(e.key)
})

window.addEventListener('keyup', function(e){
    //deleting the pressed key from the array
    delete keys[e.key]
    player.moving = false;
})

window.addEventListener("resize", function() {
    canvas.width = innerWidth *0.80;
    canvas.height = innerHeight *0.65;		
});