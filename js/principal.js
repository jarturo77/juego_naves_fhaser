var juego;
var Iniciar;
var Terminado;
juego= new Phaser.Game(400, 600,  Phaser.CANVAS,'bloque_juego');
var nave;
var balas;
var timer = 0;
var aparecer;
var bg;
var delay = 400;
var vidas;
var puntos;
var txtPuntos;
var txtVidas;
var music;

var Iniciar = {
    preload: function(){
        //cargar elementos del
        juego.load.image('nave','img/nave.png');
        juego.load.image('laser','img/laser.png');
        juego.load.image('malo','img/malo.png');
        juego.load.image('bg','img/bg.png');
        juego.load.audio('boden', ['assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);
    },
    create: function(){
        //mostrar en pantalla
        bg=juego.add.tileSprite(0,0,400,540,'bg');
        //agregar al canvas la nave
        nave=juego.add.sprite(40, juego.height/2,'nave');
        //punto de apoyo centrado
        nave.anchor.setTo(0.5);
        //agregar funciones al juego de fisica tipo ARCADE
        juego.physics.startSystem(Phaser.Physics.ARCADE);
        //activar fisica para la nave
        juego.physics.arcade.enable(nave,true);
        //limitar giro de la nave   
        nave.body.allowRotation=false;
        //Crear balas
        balas=juego.add.group();
        balas.enableBody= true;
        balas.setBodyType= Phaser.Physics.ARCADE;
        balas.createMultiple(20,'laser');
        balas.setAll('Anchor.x',0.5);
        balas.setAll('Anchor.y',1);
       // balas.fireRate = 100;
        //balas.bulletTime = 0;
       // balas.bulletSpeed = 400;
       // balas.bulletLifeSpan = 1500;
        balas.setAll('checkWorldBounds',true);
        balas.setAll('outOfBoundsKill',true);

        //Crear enemigos individuales
        malos=juego.add.group();
        malos.enableBody= true;
        malos.setBodyType= Phaser.Physics.ARCADE;
        malos.createMultiple(20,'malo');
        malos.setAll('Anchor.x',0.5);
        malos.setAll('Anchor.y',1);
        malos.setAll('checkWorldBounds',true);
        malos.setAll('outOfBoundsKill',true);
        //ciclo de enemigos
        //loop(time,funcionloop)
        aparecer=juego.time.events.loop(1500, this.crearEnemigo,this);

        //logica del puntaje y vidas
        puntos= 0;
        juego.add.text(20,20,"Puntos:",{font:"14px Arial",fill:"#fff"});
        txtPuntos=juego.add.text(75,20,"0",{font:"14px Arial",fill:"#fff"});

        ///vidas
        vidas= 5;
        juego.add.text(310,20,"Vidas:",{font:"14px Arial",fill:"#fff"});
        txtVidas=juego.add.text(355,20,"5",{font:"14px Arial",fill:"#fff"});

        ///musica de fondo del juego
        music = juego.add.audio('boden');

        music.play();
       


    },
   

   
    
    update: function(){
        //Animar juego
        ///var fondoJuego;
        bg.tilePosition.x -=3;
        nave.rotation=juego.physics.arcade.angleToPointer(nave);

        //Disparar balas
        if (juego.input.activePointer.leftButton.isDown) {
           // console.log(juego.input.activePointer.leftButton.isDown);
            this.disparar();
        }
        //colision de rocas y bals
        juego.physics.arcade.overlap(balas,malos,this.colision,null,this);
        
        ///colision que quita vidas
        malos.forEachAlive(function(m){
            if (m.position.x>10 && m.position.x<12) {
                vidas -=1;
                txtVidas.text=vidas;
            }

           
        });

        ///logica game over
        if (vidas==0) {
            juego.state.start('Terminado');
        }


            
        
    },
    //funcion disparar una sola bala
    disparar: function(){
        timer = juego.time.now + delay;
       
        var bala = balas.getFirstDead();
      // console.log(juego.time.now < timer);
        if (juego.time.now < timer && balas.countDead()>0) {
           //console.log(juego.time.now >timer && balas.countDead()>0);
           bala.anchor.setTo(0.5);
           bala.reset(nave.x,nave.y);
           bala.rotation=juego.physics.arcade.angleToPointer(bala);
           juego.physics.arcade.moveToPointer(bala,300);

        }
    },
    //funcion dela aparacion de enemigos
    crearEnemigo: function(){
        var enem= malos.getFirstDead();
        var num=Math.floor(Math.random()*10+1);
        enem.reset(400,num*55);
        // enem.reset(num*38,0);
        enem.anchor.setTo(0.5);
        enem.body.velocity.x= -100;
        enem.checkWorldBounds=true;
        enem.outOfBoundsKill=true;


    },
    //funcion de colision y bals de enemigos
    colision: function(bala, malo){
        bala.kill();
        malo.kill();
        puntos ++;
        txtPuntos.text=puntos;
    }
}
var Terminado={
    preload: function(){

    },
    create: function(){
        juego.add.text(40,230,"GAME OVER",{font:"50px Arial",fill:"#fff"});
        juego.stage.backgroundColor='#962813'
        if (confirm("Desea continuar el juego?")) {
            juego.state.start('iniciar');   
        }
        
    }
}
function render() {
    juego.debug.soundInfo(music, 20, 32);
}

juego.state.add('Iniciar',Iniciar);
juego.state.add('Terminado',Terminado);
juego.state.start('Iniciar');