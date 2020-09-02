juego.state.add('Terminado',Terminado);
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