var GameObject = function(x,y,width,height)
{
    this.BOX_OUTLINE = 2;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.boundingBox = new BoundingBox(this.x - this.BOX_OUTLINE, this.y - this.BOX_OUTLINE,
                                       this.width + (2 * this.BOX_OUTLINE), this.height + (2 * this.BOX_OUTLINE));
}

GameObject.prototype.moveX = function(diff)
{
    this.x += diff;
    this.boundingBox.x += diff;
}

GameObject.prototype.moveY = function(diff)
{
    this.y += diff;
    this.boundingBox.y += diff;
}

//Выравнивающие объект функции
GameObject.prototype.smoothDown = function(other)
{
    var bottom = this.y + this.height;
    var othTop = other.y;
    var diff = Math.abs(bottom-othTop);
    this.moveY(-diff);
}

GameObject.prototype.smoothUp = function(other)
{
    var top = this.y;
    var othBottom = other.y + other.height;
    var diff = Math.abs(top - othBottom);
    this.moveY(diff);
}

GameObject.prototype.smoothRight = function(other)
{
    var right = this.x + this.width;
    var othLeft = other.x;
    var diff = Math.abs(right-othLeft);
    this.moveX(-diff);
}

GameObject.prototype.smoothLeft = function(other)
{
    var left = this.x;
    var othRight = other.x + other.width;
    var diff = Math.abs(left - othRight);
    this.moveX(diff);
}
