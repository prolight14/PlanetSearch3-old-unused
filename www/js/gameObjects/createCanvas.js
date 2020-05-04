export default function createCanvas(scene, key, builder)
{
    var world = document.createElement('canvas');

    var p = new Processing(world, function(p)
    {
        builder.apply(this, arguments);

        // Make sure we don't use setInterval 
        delete p.draw;
    });

    scene.textures.addCanvas(key, world);

    return scene.textures.get(key).imageData;
}