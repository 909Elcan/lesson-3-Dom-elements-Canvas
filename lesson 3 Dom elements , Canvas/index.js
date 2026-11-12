const canvas = document.getElementById("player1");
const ctx = canvas.getContext("2d");

const keys = {};

const img_Soccer_field = new Image();
img_Soccer_field.src = "images/soccer-field.jpg"; 

 let score1 = 0;
 let score2 = 0; 
 let gameOff= false;
function winnerPlayer(){

     const qalib = document.getElementById("WinnerPleyers")
     if(score1 >=10){
         qalib.innerHTML="Qalib: Player1";
         gameOff=true;
     }
     else if(score2 >=10){
         qalib.innerHTML="Qalib: Player2";
         gameOff=true;  
     }
    
};



const score1El = document.getElementById("score1");
const score2El = document.getElementById("score2");

const player1 = {
    x: 100,
    y: 225,
    width: 50,
    height: 50,
    accelaration: 2,
    maxSpeed: 12,
    velocityX: 0,
    velocityY: 0,
    friction: 0.80
};

const player2 = {
    x: 650,
    y: 225,
    width: 50,
    height: 50,
    accelaration: 2,
    maxSpeed: 12,
    velocityX: 0,
    velocityY: 0,
    friction: 0.80
};

const Ball = {
    x: 375,
    y: 225,
    width: 50,
    height: 40,
    velocityX: 0,
    velocityY: 0,
    friction: 0.98
};

const Ball_img = new Image();
Ball_img.src = "images/pngwing.com.png";



const player1_img = new Image();
player1_img.src = "images/pngegg (1).png";

const player2_img = new Image();
player2_img.src = "images/pngegg.png";


function resetBall() {
    Ball.x = (canvas.width / 2) - (Ball.width / 2);
    Ball.y = (canvas.height / 2) - (Ball.height / 2);
    Ball.velocityX = 0;
    Ball.velocityY = 0;


    player1.x= 100;
    player1.y= 225;
    player1.velocityX= 0;
    player1.velocityY= 0;

    player2.x= 650;
    player2.y= 225;
    player2.velocityX= 0;
    player2.velocityY= 0;




}

function handleCollision(player, ball) {

    let pCenterX = player.x + player.width / 2;
    let pCenterY = player.y + player.height / 2;
    let bCenterX = ball.x + ball.width / 2;
    let bCenterY = ball.y + ball.height / 2;

    let dx = bCenterX - pCenterX;
    let dy = bCenterY - pCenterY;
    let distance = Math.sqrt(dx * dx + dy * dy);

    
    let minDistance = (player.width / 2) + (ball.width / 2);

    if (distance < minDistance) {
       
        let angle = Math.atan2(dy, dx);
        let overlap = minDistance - distance;

        ball.x += Math.cos(angle) * overlap;
        ball.y += Math.sin(angle) * overlap;

        // Topa zərbə gücü 
        let kickPower = 10; 
        ball.velocityX = Math.cos(angle) * kickPower + player.velocityX * 0.5;
        ball.velocityY = Math.sin(angle) * kickPower + player.velocityY * 0.5;
    }
}

window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

function update() {
  
    if (keys["w"]){
      player1.velocityY -= player1.accelaration;
    }
    else if (keys["s"]){ 
      player1.velocityY += player1.accelaration;
    }
    if (keys["a"]){ 
      player1.velocityX -= player1.accelaration;}
    else if (keys["d"]){
      player1.velocityX += player1.accelaration;
    }

    player1.velocityX = Math.max(-player1.maxSpeed, Math.min(player1.maxSpeed, player1.velocityX));
    player1.velocityY = Math.max(-player1.maxSpeed, Math.min(player1.maxSpeed, player1.velocityY));
    player1.velocityX *= player1.friction;
    player1.velocityY *= player1.friction;
    player1.x += player1.velocityX;
    player1.y += player1.velocityY;


    if (keys["arrowup"]){
         player2.velocityY -= player2.accelaration;
    }
    else if (keys["arrowdown"]){
      player2.velocityY += player2.accelaration;
    }
    if (keys["arrowleft"]) player2.velocityX -= player2.accelaration;
    else if (keys["arrowright"]){
       player2.velocityX += player2.accelaration;
    }

    player2.velocityX = Math.max(-player2.maxSpeed, Math.min(player2.maxSpeed, player2.velocityX));
    player2.velocityY = Math.max(-player2.maxSpeed, Math.min(player2.maxSpeed, player2.velocityY));
    player2.velocityX *= player2.friction;
    player2.velocityY *= player2.friction;
    player2.x += player2.velocityX;
    player2.y += player2.velocityY;

  
    Ball.x += Ball.velocityX;
    Ball.y += Ball.velocityY;
    Ball.velocityX *= Ball.friction;
    Ball.velocityY *= Ball.friction;

    handleCollision(player1, Ball);
    handleCollision(player2, Ball);

  
    let goalTop = (canvas.height / 2) - 90;
    let goalBottom = (canvas.height / 2) + 90;

    if (Ball.x < 0) {
        if (Ball.y > goalTop && Ball.y + Ball.height < goalBottom) {
            score2++;
            score2El.textContent = score2;
            winnerPlayer();
            resetBall();
        } else {
            Ball.x = 0;
            Ball.velocityX = -Ball.velocityX;
        }
    }
    
    if (Ball.x + Ball.width > canvas.width) {
        if (Ball.y > goalTop && Ball.y + Ball.height < goalBottom) {
            score1++;
            score1El.textContent = score1;
            winnerPlayer();
            resetBall();
        } else {
            Ball.x = canvas.width - Ball.width;
            Ball.velocityX = -Ball.velocityX;
        }
    }

    if (Ball.y < 0) {
     Ball.y = 0; Ball.velocityY = -Ball.velocityY; 
    }
    if (Ball.y + Ball.height > canvas.height) {
     Ball.y = canvas.height - Ball.height; Ball.velocityY = -Ball.velocityY; 
    }

    if (player1.x < 0) {
     player1.x = 0; player1.velocityX = -player1.velocityX; 
    }
    if (player1.y < 0) {
     player1.y = 0; player1.velocityY = -player1.velocityY; 
    }
    if (player1.x + player1.width > canvas.width) { 
     player1.x = canvas.width - player1.width; player1.velocityX = -player1.velocityX; 
    }
    if (player1.y + player1.height > canvas.height) {
     player1.y = canvas.height - player1.height; player1.velocityY = -player1.velocityY; 
    }

    if (player2.x < 0) {
     player2.x = 0; player2.velocityX = -player2.velocityX;
    }
    if (player2.y < 0) {
     player2.y = 0; player2.velocityY = -player2.velocityY;
    }
    if (player2.x + player2.width > canvas.width) { 
     player2.x = canvas.width - player2.width; player2.velocityX = -player2.velocityX; 
    }
    if (player2.y + player2.height > canvas.height) { 
     player2.y = canvas.height - player2.height; player2.velocityY = -player2.velocityY; 
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img_Soccer_field, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(Ball_img, Ball.x, Ball.y, Ball.width, Ball.height);
    ctx.drawImage(player2_img, player1.x, player1.y, player1.width, player1.height);
    ctx.drawImage(player1_img, player2.x, player2.y, player2.width, player2.height);
}

function gameloop() {  
    if(gameOff){
       return
    };
    update();
    draw();
    requestAnimationFrame(gameloop);
}


gameloop();
