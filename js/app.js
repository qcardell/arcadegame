let score = document.getElementsByClassName('score')[0];
let lives = document.getElementsByClassName('livesnum')[0];
let hearts = document.querySelectorAll('.healthImg');
let numhearts = 3;
//let gameover = false;
let numofEmemys=3
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    //modal.style.display = "block";
    console.log('playing again');
    modal.style.display = "none";
    gameover();

}
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	//if(enemy1.x<0)//550
	//{
	allEnemies.forEach(function(enemy) {
            enemy.x += enemy.speed*dt;
			if(enemy.x>548){
				enemy.x=0;
			}
        });
	
	allEnemies.forEach(function(enemy) {
        if(player.x < enemy.x + enemy.width  && player.x + player.width  > enemy.x &&
			player.y < enemy.y + enemy.height && player.y + player.height > enemy.y) {
				console.log("The objects are touching");
				player.x = 200;
				player.y = 400;
				//console.log(numhearts);
				//hearts[numhearts-1].classList.add("nodisplay");
				//<i class="far fa-heart"></i>
				hearts[numhearts-1].classList.add("far");
				hearts[numhearts-1].classList.remove("fas");
				numhearts--;
				console.log(score.text);
				score.text=score.text-1;
				if(numhearts===0){
					openmodal();
					//gameover();
				}
		}    
	});
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	//console.log("Enemy render");
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt){
		//console.log("player update funcation");

};

Player.prototype.render = function(){
	//console.log("Player render");
	//console.log(this.sprite);
	//player.x = 200; 
	//player.y = 400;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	
};

Player.prototype.handleInput = function(k){
	switch (k){
		case'left':
			if(player.x>20){
				player.x = player.x-90;
			}
			break;
		case'up':
			player.y = player.y-90;
			break;
		case'right':
			if(player.x<380){
			player.x = player.x+90;
			}
			break;
		case'down':
			if(player.y<400){
				player.y = player.y+90;
			}
			break;
	}
	//console.log(player.x + ", " + player.y);
	if(player.y===-50){
		player.x = 200;
		player.y = 400;
		score.text=parseInt(score.text)+1;
		allEnemies.forEach(function(enemy) {
				enemy.y=radFunction();
				enemy.x=0;
        });
	}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
player.x = 200;
player.y = 400;
player.height=50;
player.width=50;
console.log(player.x + ", " + player.y + ", " + player.width +", " + player.height);
//Creating an Array of enemies.  Assigning Random numbers for the Y axis.
var allEnemies = new Array();
for (var i = 1; i <= 3; i++) { // from 1 to 10
    window["enemy"+i] = new Enemy();
	window["enemy"+i].x=200;
	window["enemy"+i].y=radFunction();//60;
	window["enemy"+i].height=50;
	window["enemy"+i].width=50;
	window["enemy"+i].speed = getRandomArbitrary(100,150);//Math.floor((Math.random() * 20) + 100);;
	allEnemies.push(window["enemy"+i]);
}
console.log(allEnemies); // is not undefined

/*
//var enemy1 = new Enemy();
enemy1.x=200;
enemy1.y=60;
enemy1.height=50;
enemy1.width=50;
enemy1.speed = 100;
//var enemy2 = new Enemy();
enemy2.x=0;
enemy2.y=140;
enemy2.height=50;
enemy2.width=50;
enemy2.speed = 200
//var enemy3 = new Enemy();
enemy3.x=0;
enemy3.y=230;
enemy3.height=50;
enemy3.width=50;
enemy3.speed = 300
//var allEnemies = [enemy1, enemy2, enemy3];
*/

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
function gameover(){
	numhearts=3;
	//score=0;
	score.text=0;
	for(let i=0;i<numhearts;i++){
		//hearts[i].classList.remove("nodisplay");
		hearts[i].classList.add("fas");
		hearts[i].classList.remove("far");
	}
	
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

function radFunction(){
    //var cards = document.querySelectorAll(".card");
    var testArray = [60,140,230];
    Shuffle(testArray);
    return testArray[0];
}

function openmodal()
{
    //starTimer = new Date();
    //var date1 = new Date(2000, 0, 1,  9, 01); // 9:00 AM
    //var date2 = new Date(2000, 0, 1, 17, 0); // 5:00 PM
    var modalText=document.querySelectorAll('.modaltext');
    //console.log(modalText);
    //EndTimer = new Date();
    //var h = EndTimer.getHours() - starTimer.getHours();
    //var m = EndTimer.getMinutes()-starTimer.getMinutes();
    //var s = EndTimer.getSeconds()-starTimer.getSeconds();
    //h2 = EndTimer - starTimer;
    //var msec = h2;
    //var hh = Math.floor(msec / 1000 / 60 / 60);
    //msec -= hh * 1000 * 60 * 60;
    //var mm = Math.floor(msec / 1000 / 60);
    //msec -= mm * 1000 * 60;
    //var ss = Math.floor(msec / 1000);
    //msec -= ss * 1000;
    // diff = 28800000 => hh = 8, mm = 0, ss = 0, msec = 0
    modalText[0].textContent = "Game Over!";
    modalText[1].textContent = "Your Score was  "+ score.text;// + " Moves and "+ numberofStars +" Stars";
    //modalText[2].textContent = "You completed the Game in : "+ hh + " Hours " + mm + " Minutes " + timer + " Seconds";
    //modalText[2].textContent = "You completed the Game in : "+timer + " Seconds";
    //modalText[3].textContent = "Woooooooo!";
    modal.style.display = "block";
    //console.log(hh+":"+mm+":"+ss);
}