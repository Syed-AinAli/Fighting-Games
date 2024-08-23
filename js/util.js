function rectangularColission({rectangle1, rectangle2})
{
    return(rectangle1.position.x+ rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x+rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height);
}

function determineWinner({player, enemy})
{
    if(player.health === enemy.health)
        {
            document.querySelector('#displayText').innerHTML= 'Tie';
        }
        else if(player.health > enemy.health)
        {
            document.querySelector('#displayText').innerHTML= 'Player1 Wins';
        }
        else if(player.health < enemy.health)
        {
            document.querySelector('#displayText').innerHTML= 'Player2 Wins';
        }
        document.querySelector('#displayText').style.display = "flex";
        timer=-1;
}


let timer=60;
function decreaseTimer()
{
    setTimeout(decreaseTimer,1000);
    if(timer>0)
    {
        timer-- ;
        document.querySelector("#timer").innerHTML = timer;
    }
    if(timer === 0)
    {
        determineWinner({player, enemy});
    }

}