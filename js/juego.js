
var nave;
var balas;
var timer = 0;
var aparecer;
var delay = 400;

var Iniciar = {
    preload: function(){
        //cargar elementos del
        juego.load.image('nave','img/nave.png');
        juego.load.image('laser','img/laser.png');
        juego.load.image('malo','img/malo.png');
        juego.load.image('bg','img/bg.png');
    },
    create: function(){
        //mostrar en pantalla
        juego.add.image(0,0,400,540,'bg');
        //agregar al canvas la nave
        nave=juego.add.Sprite(40,juego.height/2,'nave');
        //punto de apoyo centrado
        nave.anchor.setTo(0,5);
        //agregar funciones al juego de fisica tipo ARCADE
        juego.physics.startSystem(Phaser.physics.ARCADE);
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



    },
    update: function(){
        //Animar juego
        fondoJuego.tilePosition.x -=3;
        nave.rotation=juego.physics.arcade.angleToPointer(nave);

        //Disparar balas
        if (juego.input.activePointer.isDown) {
            this.disparar();
        }
        //colision de rocas y bals
        juego.physics.arcade.overlap(balas,malos,this.colision,null,this);

    },
    //funcion disparar una sola bala
    disparar:function(){
        timer = juego.timne.now + delay;
        var bala = balas.getFirstDead();
        if (juego.time.now >timer && balas.countDead()>0) {
           bala.anchor.setTo(0.5);
           bala.reset(nave.x,nave.y);
           bala,rotation=juego.physics.arcade.angleToPointer(bala);
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
    colosion: function(){
        bala.kill();
        malo.kill();
    }
}