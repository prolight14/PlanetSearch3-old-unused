export default class PixelObserver {

    constructor (scene)
    {
        this.graphics = scene.add.graphics({ lineStyle: 0xFF0000 });

        this.cache = {
            left: [],
            right: [],
            up: [],
            down: [],
        };

        this.res = 15;
        this.padding = 1;
        this.offset = 3;

        this.loopLimit = 400;

        this.colors = [this.color(0, 0, 0, 0)];
    }

    color (r, g, b, a)
    {
        return (a << 24) | (r << 16) | (g << 8) | b;
    }

    getPixel (imageData, x, y)
    {
        var i = ((0 | x) + (0 | y) * imageData.width) << 2;
        var data = imageData.data;
        return (data[i + 3] << 24) | (data[i] << 16) | (data[i + 1] << 8) | data[i + 2];
    }

    collect (dynamicObject, staticObject)
    {
        var colors = this.colors;
        var padding = this.padding;
        var oBox = {
            left: dynamicObject.body.left - staticObject.body.left,
            right: dynamicObject.body.right - staticObject.body.left,
            top: dynamicObject.body.top - staticObject.body.top,
            bottom: dynamicObject.body.bottom - staticObject.body.top
        };
        var setX, setY;

        var widthRes = dynamicObject.width / this.res;
        var heightRes = dynamicObject.height / this.res;

        setY = oBox.top;

        setX = Math.round(oBox.left - padding);

        for(var i = this.offset; i <= this.res - this.offset; i++)
        {
            this.cache.left[i] = colors.indexOf(this.getPixel(staticObject.imageData, setX, Math.round(setY + i * heightRes))) === -1;
        }

        setX = Math.round(oBox.right - padding);

        for(var i = this.offset; i <= this.res - this.offset; i++)
        {
            this.cache.right[i] = colors.indexOf(this.getPixel(staticObject.imageData, setX, Math.round(setY + i * heightRes))) === -1;
        }

        setX = oBox.left;

        setY = Math.round(oBox.top - padding);

        for(var i = this.offset; i <= this.res - this.offset; i++)
        {
            
        }
    }

    resolve (dynamicObject, staticObject)
    {
        var colors = this.colors;
        var widthRes = dynamicObject.width / this.res;
        var heightRes = dynamicObject.height / this.res;

        var oBox = {
            left: Math.round(dynamicObject.body.left) - staticObject.body.left,
            right: dynamicObject.body.right - staticObject.body.left,
            top: dynamicObject.body.top - staticObject.body.top,
            bottom: dynamicObject.body.bottom - staticObject.body.top
        };

        var minIndex, maxIndex;

        var i = 0;

        if((minIndex = this.cache.left.indexOf(true)) !== -1)
        {
            maxIndex = this.cache.left.lastIndexOf(true);

            dynamicObject.setVelocityX(1);

            while(colors.indexOf(this.getPixel(staticObject.imageData, Math.round(oBox.left), 
                                                Math.round(oBox.top + minIndex * heightRes))) === -1 && i < this.loopLimit) 
            {
                dynamicObject.x += 1;

                oBox.left = Math.round(dynamicObject.x) - staticObject.body.left;
                i++;
            }

            while(colors.indexOf(this.getPixel(staticObject.imageData, Math.round(oBox.left), 
                                                Math.round(oBox.top + maxIndex * heightRes))) === -1 && i < this.loopLimit) 
            {

                dynamicObject.x += 1;
            
                oBox.left = Math.round(dynamicObject.x) - staticObject.body.left;
                i++;
            }
        }
        if((minIndex = this.cache.right.indexOf(true)) !== -1)
        {
            maxIndex = this.cache.right.lastIndexOf(true);

            dynamicObject.setVelocityX(-1);

            while(colors.indexOf(this.getPixel(staticObject.imageData, Math.round(oBox.right), 
                                                Math.round(oBox.top + minIndex * heightRes))) === -1 && i < this.loopLimit) 
            {
                dynamicObject.x -= 1;

                oBox.right = Math.round(dynamicObject.x + dynamicObject.width) - staticObject.body.left;
                i++;
            }

            while(colors.indexOf(this.getPixel(staticObject.imageData, Math.round(oBox.right), 
                                                Math.round(oBox.top + maxIndex * heightRes))) === -1 && i < this.loopLimit) 
            {

                dynamicObject.x -= 1;
            
                oBox.right = Math.round(dynamicObject.x + dynamicObject.width) - staticObject.body.left;
                i++;
            }
        }
    }

    debug (dynamicObject, staticObject)
    {
        var graphics = this.graphics;
        graphics.clear();
        graphics.lineStyle(2, 0xFF00FF, 1.0);

        var widthRes = dynamicObject.width / this.res;
        var heightRes = dynamicObject.height / this.res;

        var box = {
            left: dynamicObject.body.left,
            right: dynamicObject.body.right,
            top: dynamicObject.body.top,
            bottom: dynamicObject.body.bottom
        };

        var minIndex, maxIndex;

        if((minIndex = this.cache.left.indexOf(true)) !== -1)
        {
            maxIndex = this.cache.left.lastIndexOf(true);

            graphics.beginPath();
            graphics.moveTo(box.left, box.top + minIndex * heightRes);
            graphics.lineTo(box.left, box.top + maxIndex * heightRes);
            graphics.closePath();
            graphics.strokePath();
        }

        if(this.cache.right.indexOf(true) !== -1) 
        {
            minIndex = this.cache.right.indexOf(true);
            maxIndex = this.cache.right.lastIndexOf(true);

            graphics.beginPath();
            graphics.moveTo(box.right, box.top + minIndex * heightRes);
            graphics.lineTo(box.right, box.top + maxIndex * heightRes);
            graphics.closePath();
            graphics.strokePath();
        }
    }

    clear ()
    {
        this.cache.left = [];
        this.cache.right = [];
        this.cache.up = [];
        this.cache.down = [];
    }

    run (dynamicObject, staticObject)
    {
        this.collect(dynamicObject, staticObject);
        this.resolve(dynamicObject, staticObject);

        this.debug(dynamicObject, staticObject);

        this.clear();
    }
}