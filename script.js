
// Getting Doms Value
btn = document.querySelector('.btn1');
container = document.querySelector('.container');
game = document.querySelector('.Game');
pageReset=document.querySelector('.reset');

// Utility variables
cross = true;
reset = false;



// Start of Game---------------------------------------------------
btn.addEventListener('click', () => {


    container.style.display = 'none';
    
})
startGame();      

pageReset.addEventListener('click',()=>{
    document.location.reload();
    // startGame();
})

// Function Of Game -------------------------------------------
function startGame() {
    game.innerHTML = `
                        <div class="gameContainer">
                        <div class="player">Sam</div>
                        </div>
                        <div class="dino"></div>
                        <div class="obstacle obstacleAni"></div>
                        <div class="score">Score:0</div>
                        <div class="gameover"></div>
                        <div class="lastScore"></div>
                       `;
    dino = document.querySelector('.dino');
    obstacle = document.querySelector('.obstacle');
    gameover = document.querySelector('.gameover');
    score = document.querySelector('.score');
    lastScore = document.querySelector('.lastScore');
    playerName = document.querySelector('.player');
    input = document.querySelector('input');
    

    // Getting audios
    let music=new Audio('music.mp3');
    let gameOverMusic=new Audio('gameover.mp3');
    setTimeout(() => {
        music.play();
    }, 1000);
    gameOverMusic.pause();

    playerName.innerHTML = `Player:${input.value}`;
    document.onkeydown = function (e) {

        if (e.keyCode == 38 || e.keyCode == 32) {
            dino.classList.add('dinoAni');
            setTimeout(() => {
                if (parseInt(window.getComputedStyle(dino, null).getPropertyValue('left')) < 1200)
                    dino.style.left = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left')) + 100 + "px";
            }, 200);

            setTimeout(() => {
                dino.classList.remove('dinoAni');
            }, 700);
        }
        else if (e.keyCode == 39) {
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            if (dinoX < 1200)
                dino.style.left = dinoX + 80 + "px";
        } else if (e.keyCode == 37) {
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            if (dinoX > 0)
                dino.style.left = (dinoX - 112) + 'px';
        }

    }

    let updatedScore = 0;
    updateScore(updatedScore);
    setInterval(() => {
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));

        ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('bottom'));

        offsetX = Math.abs(dx - ox);
        offsetY = Math.abs(dy - oy);

        if (offsetX < 100 && offsetY < 20) {
            gameover.innerHTML = "Game Over!";
           
            if (!reset){
                localset(input.value, updatedScore);
            obstacle.classList.remove('obstacleAni');
            reset = true;
            gameOverMusic.play();
            setTimeout(() => {
                music.pause();
                gameOverMusic.pause();
            }, 1000);
            let gethighScore = highScore(updatedScore);
            // console.log( gethighScore);
            dino.style. backgroundImage=`url(over.gif)`;
            if(typeof(gethighScore) =="object" ){
                 lastScore.innerHTML = `<ul style="list-style: none;">
                <li>YourScore:${updatedScore}</li>
                <li>High Score: ${gethighScore.Name}  (${gethighScore.score})</li>
            </ul>`
               
            }
            else{
                lastScore.innerHTML = `<ul style="list-style: none;">
                <li>YourScore:${updatedScore}</li>
                <li>High Score: ${input.value}  (${updatedScore})</li>
            </ul>`
            }
          
            pageReset.style.visibility="visible";
            // pageReset.addEventListener('click',()=>{
            //     document. location. reload();
               
            // })
        }
        } else if (offsetX < 100 && cross && !reset) {
            updatedScore += 1;
            updateScore(updatedScore);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);
           
       }
    }, 10);

    function updateScore() {
        score.innerHTML = `Score:${updatedScore}`;
    }

    function localset(givenName, givenScore) {
        let given = {
            Name: givenName,
            score: givenScore
        }
        addScore = localStorage.getItem('score');
        if (addScore == null) {
            data = [given];
            localStorage.setItem('score', JSON.stringify(data));
        }
        else {
            data = JSON.parse(addScore);
            data.push(given);
        }
        localStorage.setItem('score', JSON.stringify(data));
    }

    function highScore(givenScore) {
        let highScoreData = JSON.parse(localStorage.getItem('score'));
        if (highScoreData == null) {
            return givenScore;
        }else
        {
            let max=highScoreData[0].score;
           let temp;
            for (let i = 1; i < highScoreData.length; i++) {
                const element = highScoreData[i];
                if(element.score>max){
                    max=element.score;
                    temp=element;
                   
                }
                
            }
      return temp;
        }
    }
}

