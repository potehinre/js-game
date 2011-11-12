var Render = function(canvas)
{
    this.canvas = canvas;
    this.context = this.canvas.get(0).getContext("2d");
    this.canvasWidth = this.canvas.width();
    this.canvasHeight = this.canvas.height();
    this.defaultFill = "rgb(0,0,0)";
    this.defaultStroke = "rgb(0,0,0)";
    this.COLOR = {};
    this.COLOR.RED = "rgb(255,0,0)";
    this.COLOR.GREEN = "rgb(0,255,0)";
    this.COLOR.BLUE = "rgb(0,0,255";
};

Render.prototype.begin = function()
{
    this.context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
}

Render.prototype.draw = function(object)
{
    if (object instanceof Player)
    {
        this.strokeStyle = this.COLOR.RED;
        this.context.strokeRect(object.boundingBox.x, object.boundingBox.y,
            object.boundingBox.width, object.boundingBox.height);
        this.strokeStyle = this.defaultStroke;
        this.context.fillRect(object.x, object.y, object.width, object.height);
    }
    else if (object instanceof Wall)
    {
        this.context.fillStyle = this.COLOR.GREEN;
        this.context.fillRect(object.x, object.y, object.width, object.height);
        this.context.fillStyle = this.defaultFill;
    }
}

Render.prototype.drawAll = function(objects)
{
    for (var i=0;i<objects.length;i++)
    {
        this.draw(objects[i]);
    }
}

Render.prototype.end = function()
{
    this.context.fillStyle = this.defaultFill;
    this.context.strokeStyle = this.defaultStroke;
}