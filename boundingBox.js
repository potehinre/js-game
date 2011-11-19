   var BoundingBox = function(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    BoundingBox.prototype.intersectsWith = function(boundingBoxes)
    {
        result = [];
        for(var i = 0; i < boudingBoxes.length; i++)
        {
            if (this.intersects(boundingBoxes[i]))
            {
                result.push(boundingBoxes[i]);
            }
        }
        return result;
    }
    BoundingBox.prototype.intersectsX = function(other)
    {
        var left = this.x;
        var right = this.x + this.width;
        var othLeft = other.x;
        var othRight = other.x + other.width;
        return (
                ((left >= othLeft && left <= othRight) || (right >= othLeft && right <= othRight)) ||
                ((othLeft >= left && othLeft <= right) || (othRight >= left && othRight <= right))
               )
    }
    BoundingBox.prototype.intersectsY = function(other)
    {
        var top = this.y;
        var bottom = this.y + this.height;
        var othTop = other.y;
        var othBottom = other.y + other.height;
        return (
                ((top >= othTop && top <= othBottom) || (bottom >= othTop && bottom <= othBottom)) ||
                ((othTop >= top && othTop <= bottom) || (othBottom >= top && othBottom <= bottom))
               )
    }

    BoundingBox.prototype.intersects = function(other)
    {
        return (this.intersectsX(other) && this.intersectsY(other))
    }

    BoundingBox.prototype.intersectionSides = function(other)
    {
        var upOrDown,rightOrLeft;
        if ((this.y >= (other.y + other.height/2)) && (this.y <= other.y + other.height))  upOrDown=DIRECTION.UP;
        else if ((this.y + this.height >= other.y) && (this.y + (this.height/2) <= other.y))    upOrDown=DIRECTION.DOWN;
        if ((this.x + this.width >= other.x) && (this.x + (this.width/2) <= other.x))      rightOrLeft=DIRECTION.RIGHT;
        else if ((this.x >= (other.x + (other.width/2))) && (this.x <= (other.x + other.width))) rightOrLeft=DIRECTION.LEFT;
        return [upOrDown,rightOrLeft];
    }
