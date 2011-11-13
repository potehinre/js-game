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
            if (boundingBoxes[i].intersects(this))
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
        if (
            ((left >= othLeft && left <= othRight) || (right >= othLeft && right <= othRight)) ||
            ((othLeft >= left && othLeft <= right) || (othRight >= left && othRight <= right))
           )
            return true;
        return false;
    }
    BoundingBox.prototype.intersectsY = function(other)
    {
        var top = this.y;
        var bottom = this.y + this.height;
        var othTop = other.y;
        var othBottom = other.y + other.height;
        if (
            ((top >= othTop && top <= othBottom) || (bottom >= othTop && bottom <= othBottom)) ||
            ((othTop >= top && othTop <= bottom) || (othBottom >= top && othBottom <= bottom))
           )
            return true;
        return false;
    }

    BoundingBox.prototype.intersects = function(other)
    {
        if (this.intersectsX(other) && this.intersectsY(other))
            return true;
        return false;
    }

    BoundingBox.prototype.intersectionSides = function(other)
    {
        directions=[];
        if (other.x <= this.x + this.width && other.x >= this.x + (this.width/2)) directions.push(DIRECTION.RIGHT);
        else if ((other.x >= this.x) && (other.x<= this.x + (this.width/2))) directions.push(DIRECTION.LEFT);
        else if ((other.y >= this.y) && (other.y<= this.y + (this.height/2))) directions.push(DIRECTION.UP);
        else directions.push(DIRECTION.DOWN);
        return directions;
    }