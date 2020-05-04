/**
 * The player game object
 * 
 * @name player
 */
export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, texture)
    {
        super(scene, x, y);

        this.type = "Player";

        this.setTexture(texture);
        this.setPosition(x, y);

        var texture = scene.textures.get(texture);
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var image = texture.getSourceImage();
        context.drawImage(image, 0, 0);
        this.imageData = context.getImageData(0, 0, image.width, image.height);

        this.keys = scene.input.keyboard.addKeys("W,A,S,D");
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if(this.keys.A.isDown)
        {
            super.setVelocityX(-90);
        }
        if(this.keys.D.isDown)
        {
            super.setVelocityX(90);
        }
        if(!this.keys.A.isDown && !this.keys.D.isDown)
        {
            super.setVelocityX(0);
        }

        if(this.keys.W.isDown)
        {
            super.setVelocityY(-110);
        }
        if(this.keys.S.isDown)
        {
            super.setVelocityY(110);
        }
        if(!this.keys.W.isDown && !this.keys.S.isDown)
        {
            super.setVelocityY(0);
        }
    }
}

// Toot! Was that a fart? Yeah, mommy I farted!
// Beavus the trevus