 const startButton = document.getElementById('start-button');

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
    document.getElementById('footer').classList.remove('doNotDisplay');
    document.getElementById('footer').classList.add('doDisplay');
    document.getElementById('body').classList.remove('startingStatus');

    animate()
    })

//event listeners
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
