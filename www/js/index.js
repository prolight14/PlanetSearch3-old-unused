import MainScene from "./scenes/mainScene.js";

var config, game;
document.addEventListener('deviceready', function() 
{
    config = {
        type: Phaser.WEBGL,
        parent: 'game',
        width: 800,
        height: 480,
        backgroundColor: "rgb(255, 255, 255)",
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
                gravity: {
                    // y: 200
                }
            }
        },
        scene: [MainScene]
    };
    
    game = new Phaser.Game(config);
});

// Prevent right click menu from showing because it is annoying
document.addEventListener('contextmenu', event => event.preventDefault());