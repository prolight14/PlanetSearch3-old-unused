import PixelObserver from "../pixelObserver.js";
import Player from "../gameObjects/player.js";
import createCanvas from "../gameObjects/createCanvas.js";

var player, land, pixelObserver;

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
        var landImageData = createCanvas(this, "land", function(p)
        {
            p.size(345, 102);
            p.background(0, 0, 0, 0);
            p.noStroke();
            p.translate(-55, -198);
            p.fill(28, 148, 52);
            p.rect(221, 265, 85, 30);
            p.rect(260, 270, 140, 30);
            p.fill(25, 0, 166);
            p.rect(270, 200, 130, 20);
            p.rect(120, 241, 65, 55);
            p.rect(54, 262, 70, 34);
            p.ellipse(200, 238, 80, 80);
            p.rect(90, 248, 60, 20);
        });

        land = this.add.sprite(250, 250, "land");
        land.setOrigin(0, 0);
        this.physics.add.existing(land);
        land.imageData = landImageData;

        player = this.add.existing(new Player(this, 300, 200, "player"));
        this.physics.add.existing(player);
        player.setOrigin(0, 0);

        window.player = player;

        var cam = this.cameras.main;
        cam.setZoom(2);

        pixelObserver = new PixelObserver(this);
    }

    update ()
    {
        pixelObserver.run(player, land);
    }

    render ()
    {
        
    }
}