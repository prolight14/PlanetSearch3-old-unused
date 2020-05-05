import Player from "../gameObjects/player.js";

var player, land;

// Uhh, I can't use es6 classes on mobile! I'll have to change this in the future.
export default class MainScene extends Phaser.Scene {

    constructor (config)
    {
        config = config || {};

        config.key = 'main';

        super(config);
    }

    preload ()
    {
        this.load.image("player", "assets/player.png");
    }

    create ()
    {
        player = this.add.existing(new Player(this, 300, 200, "player"));
        this.physics.add.existing(player);

        window.player = player;

        var cam = this.cameras.main;
        cam.setZoom(2);
    }

    update ()
    {
        
    }

    render ()
    {
        
    }
}