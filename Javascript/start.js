//initial set up
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = innerWidth * 0.80;
canvas.height = innerHeight * 0.80;



//utility functions
function randomNumber(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}


function distance(x1,y1,x2,y2){
    let xDistance = x2-x1;
    let yDistance = y2-y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

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
    canvas.height = innerHeight *0.80;		
});
