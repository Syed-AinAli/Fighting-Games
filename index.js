const canvas = document.querySelector('canvas');
const c= canvas.getContext('2d');
const gravity = 0.7;

const audio1=document.getElementById('music1');
audio1.volume =0.08;
const audio2=document.getElementById('music2');
const audio3=document.getElementById('music3');
const audio4=document.getElementById('music4');
const audio5=document.getElementById('music5');
const audio6=document.getElementById('music6');


audio3.volume =0.25;
audio4.volume =0.25;
audio5.volume=0.5;
audio6.volume=0.5;

canvas.width=1024;
canvas.height=576;

c.fillRect(0,0,canvas.width,canvas.height);


const background = new Sprite({
    position :
    {
        x : 0,
        y : 0
    },
    imageSrc: '/Fighting Games/img/oak_woods_v1.0/background.png'
});

const shop =new Sprite({
    position : 
    {
     x : 600,
     y : 128
    },
    imageSrc: '/Fighting Games/img/oak_woods_v1.0/decorations/shop_anim.png',
    scale : 2.75,
    framesMax : 6
 });



const player = new Fighter({
    position : {
        x : 0,
        y : 0
    },
    velocity : {
        x:0,
        y:10
    },
    offset: 
    {
        x : 0 ,
        y : 0
    },
    imageSrc : '/Fighting Games/img/player/Idle.png',
    framesMax : 8,
    scale : 2.5,
    damage:10,
    offset:{
        x: 215,
        y : 157
    },
    sprites : {
        idle : {
            imageSrc : '/Fighting Games/img/player/Idle.png',
            framesMax : 8
        },

        run : {
            imageSrc : '/Fighting Games/img/Martial Hero/Sprites/Run.png',
            framesMax : 8
        },
        jump : {
            imageSrc : '/Fighting Games/img/Martial Hero/Sprites/Jump.png',
            framesMax : 2
        },
        fall : {
            imageSrc : '/Fighting Games/img/Martial Hero/Sprites/Fall.png',
            framesMax : 2
        },
        attack1 : {
            imageSrc : '/Fighting Games/img/Martial Hero/Sprites/Attack1.png',
            framesMax : 6
        },
        takehit : {
            imageSrc : '/Fighting Games/img/Martial Hero/Sprites/Take Hit - white silhouette.png',
            framesMax : 4
        },
        death : {
            imageSrc : '/Fighting Games/img/Martial Hero/Sprites/Death.png',
            framesMax : 6
        }
    },
    attackBox : {
        offset :
        {
            x : 70 , y :50
        },
        width : 225,
        height : 50
    }
}); 




const enemy = new Fighter({
    position : {
    x : 500,
    y : 100},
    velocity : {
        x : 0,
        y : 0
    },
    color : 'blue'
    ,
    offset: 
    {
        x : -50 ,
        y : 0
    },
    imageSrc : '/Fighting Games/img/Martial Hero 2/Sprites/Idle.png',
    framesMax : 4,
    scale : 2.5,
    damage:15,
    offset:{
        x: 215,
        y : 167
    },
    sprites : {
        idle : {
            imageSrc : '/Fighting Games/img/Martial Hero 2/Sprites/Idle.png',
            framesMax : 4
        },

        run : {
            imageSrc : '/Fighting Games/img/Martial Hero 2/Sprites/Run.png',
            framesMax : 8
        },
        jump : {
            imageSrc : '/Fighting Games/img/Martial Hero 2/Sprites/Jump.png',
            framesMax : 2
        },
        fall : {
            imageSrc : '/Fighting Games/img/Martial Hero 2/Sprites/Fall.png',
            framesMax : 2
        },
        attack1 : {
            imageSrc : '/Fighting Games/img/Martial Hero 2/Sprites/Attack1.png',
            framesMax : 4
        },
        takehit : {
            imageSrc : '/Fighting Games/img/Martial Hero 2/Sprites/Take Hit.png',
            framesMax : 3
        },
        death : {
            imageSrc : '/Fighting Games/img/Martial Hero 2/Sprites/Death.png',
            framesMax : 7
        }

    },
    attackBox : {
        offset :
        {
            x : -170 , y :50
        },
        width : 175,
        height : 50
    }

});

const key = {
    a:
    {
        pressed :false
    },
    d :
    {
        pressed: false
    },
    ArrowRight : 
    {
        pressed:false
    },
    ArrowLeft : 
    {
        pressed:false
    }
}


decreaseTimer();

function animate()
{
    window.requestAnimationFrame(animate);
    c.fillStyle= 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    c.fillStyle='rgba(255,255,255,0.15)';
    c.fillRect(0,0,canvas.width,canvas.height);
    player.update();
    enemy.update();

    //Player's Movement
    player.velocity.x = 0;


    if(key.a.pressed && player.lastkey=='a')
    {
        player.velocity.x = -5;
        player.switchSprite('run');
    }
    else if(key.d.pressed && player.lastkey=='d')
    {
        player.velocity.x = 5;
        player.switchSprite('run');
    }
    else{
        player.switchSprite('idle');
    }
    


    if(player.velocity.y <0)
    {
        player.switchSprite('jump');  
    }
    else if(player.velocity.y >0) {
        player.switchSprite('fall');        
    }

    //Enemy Movement
    enemy.velocity.x = 0;
    if(key.ArrowRight.pressed && enemy.lastkey == 'ArrowRight')
    {
        enemy.velocity.x = 5;
        enemy.switchSprite('run');
    }
    else if (key.ArrowLeft.pressed && enemy.lastkey == 'ArrowLeft')
    {
        enemy.velocity.x = -5;
        enemy.switchSprite('run');
    }
    else{
        enemy.switchSprite('idle');
    }

    if(enemy.velocity.y <0)
        {
            enemy.switchSprite('jump'); 
        }
        else if(enemy.velocity.y >0) {
            enemy.switchSprite('fall');     
        }

    //Collision Detection && getting hit
    if( rectangularColission({
        rectangle1 : player, 
        rectangle2 : enemy
    }) && player.isAttacking && player.frameCurrent === 3
    )
    {
       
        console.log('Player Attack Succesfull');
        enemy.takehit();
        player.isAttacking= false;

        
        gsap.to('#enemyHealth',{ 
            width :enemy.health + '%'
        });
    }

    if(player.isAttacking && player.frameCurrent === 4)
    {
        player.isAttacking= false;
    }

    if( rectangularColission({
        rectangle1 : enemy, 
        rectangle2 : player
    }) && enemy.isAttacking && enemy.frameCurrent === 2
    )
    {
       
        console.log('Enemy Attack Succesfull');
        player.takehit();
        enemy.isAttacking= false;
    
        gsap.to('#playerHealth',{ 
            width :player.health + '%'
        });
    }

    if(enemy.isAttacking && enemy.frameCurrent === 2 )
        {
            enemy.isAttacking= false;
        }
    

    //end game based on health 
    if(enemy.health <=0 || player.health <=0)
    {
        determineWinner({player, enemy});
    }
    


}

animate();

window.addEventListener('keydown', (event)=>{
    audio1.play();
 

    
    if(!player.dead)
   { switch(event.key)
    {
        case 'd':
            key.d.pressed = true;
            player.lastkey='d';
        break;

        case 'a':
            key.a.pressed = true;
            player.lastkey='a';
        break;

        case 'w':
            player.velocity.y = -20;
            audio5.play();
            
        break;

        case 's' :
            player.attack();
            audio3.play();
            break;
            }
    }

    if(!enemy.dead)
        {
        switch(event.key)

       { case 'ArrowRight':
            key.ArrowRight.pressed = true;
            enemy.lastkey = 'ArrowRight';
            break;

        case 'ArrowLeft' :
            key.ArrowLeft.pressed = true;
            enemy.lastkey = 'ArrowLeft';
            break;

        case 'ArrowUp' :
            enemy.velocity.y=-20;
            audio6.play();
            break;
        
        case 'ArrowDown' :
            enemy.attack();
            audio4.play();
            break;
    
    }
}
    
})

window.addEventListener('keyup', (event)=>{
    switch(event.key)
    {
        case 'd':
            key.d.pressed = false;
        break;

        case 'a':
            key.a.pressed = false;
        break;
        
        case 'ArrowRight':
            key.ArrowRight.pressed = false;
            break;

        case 'ArrowLeft' :
            key.ArrowLeft.pressed = false;
            break;
    }
})