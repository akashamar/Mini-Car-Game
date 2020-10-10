const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

let keys = {ArrowUp : false, ArrowDown: false, ArrowRight: false,ArrowLeft: false}

const keyDown=(e)=>{
    e.preventDefault();
   // console.log(e.key);
    keys[e.key]=true;
   // console.log(keys);
}

const keyUp=(e)=>{
    e.preventDefault();
     keys[e.key]=false;
    // console.log(e.key)
    // console.log(keys);
}

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

let player = {speed:5, score:0};

const start=()=>{
    //gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML="";

    player.start = true;
    player.score = 0;
    player.speed = 5;
    window.requestAnimationFrame(gamePlay);

    for(x=0; x<5; x++){
        let roadLine = document.createElement('div')
        roadLine.setAttribute('class','lines');
        roadLine.y = x*150;
        roadLine.style.top = roadLine.y + 'px';
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement('div');
    car.setAttribute('class','car');
    //car.innerText="car element ready";
    gameArea.appendChild(car);


    player.x = car.offsetLeft;
    player.y = car.offsetTop;

   // console.log(car.offsetTop);
   // console.log(car.offsetLeft);

   for(x=0; x<3; x++){
      let enemyCar = document.createElement('div')
      enemyCar.setAttribute('class','enemy');
      enemyCar.y = ((x+1)*350)* -1;
      enemyCar.style.top = enemyCar.y + 'px';
      gameArea.appendChild(enemyCar);
      enemyCar.style.left= Math.floor(Math.random()*350) + 'px';
      enemyCar.style.backgroundColor="none";
    }

}

function isCollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) ||
    (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

const moveLines=()=>{
    let lines = document.querySelectorAll('.lines');
    
    lines.forEach(function(item){
        if(item.y >=700){
            item.y -=750
        }
    
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

const endGame=()=>{
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = 'GAME OVER <br> Your final score is : ' + player.score + '<br>'+ 'Click here to restart the Game';
    startScreen.style.color="peachpuff";
    startScreen.style.borderRadius="50px";
    startScreen.background="red";
    startScreen.style.backgroundImage = "url('fire.jpeg')";
    startScreen.style.backgroundSize= "100% 100%" ;
    startScreen.style.textShadow= '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
}

const moveEnemy=(car)=>{
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function(item){

        if(isCollide(car,item)){
            //console.log('booom hit')
            endGame();
        }

        if(item.y >= 750) {
            item.y = -300;
            item.style.left= Math.floor(Math.random()*350) + 'px';

        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

const gamePlay=()=>{
    console.log('clicked');
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    //console.log(road)

    if(player.start){

        moveLines();
        moveEnemy(car);

        if(keys.ArrowUp && player.y > (road.top+85)) {player.y -= player.speed}
        if(keys.ArrowDown && player.y < (road.bottom-85)) {player.y += player.speed}
        if(keys.ArrowLeft && player.x > 0) {player.x -= player.speed}
        if(keys.ArrowRight && player.x < (road.width-65)) {player.x += player.speed}

        car.style.top = player.y +'px';
        car.style.left = player.x +'px';

        window.requestAnimationFrame(gamePlay);
       // console.log(player.score++);
        player.score++;
        let ps = player.score -1;
        score.innerText = 'Score:'+ ps;

        if(player.score>400){
            player.speed=8;
            score.innerHTML='Level-1 '+'<br>Score:'+ ps 
        }

        if(player.score>1000){
            player.speed=10;
            score.innerHTML='Level-2 '+'<br>Score:'+ ps 
        }

        if(player.score>1500){
            player.speed=12;
            score.innerHTML='Level-3 '+'<br>Score:'+ ps 
        }

        if(player.score>1800){
            player.speed=15;
            score.innerHTML='Level-4 '+'<br>Score:'+ ps 
        }

        if(player.score>2200){
            player.speed=17;
            score.innerHTML='Level-5 '+'<br>Score:'+ ps 
        }

        if(player.score>2500){
            player.speed=20;
            score.innerHTML='Level-6 '+'<br>Score:'+ ps 
        }

        if(player.score>3000){
            player.speed=24;
            score.innerHTML='Level-7 '+'<br>Score:'+ ps +'YOU WON'
        }
    }
}

startScreen.addEventListener('click',start)