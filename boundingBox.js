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
        if (
            (other.x >= this.x && other.x <= (this.x + this.width)) ||
            (other.x+other.width >= this.x && other.x+other.width <= this.x +this.width)
           )
            return true;
        return false;
    }
    BoundingBox.prototype.intersectsY = function(other)
    {
        if ((other.y >= this.y && other.y <= (this.y + this.height)) ||
            (other.y+other.height >= this.y && other.y+other.height <= this.y + this.height))
            return true;
        return false;
    }

    BoundingBox.prototype.intersects = function(other)
    {
        if (this.intersectsX(other) && this.intersectsY(other))
            return true;
        return false;
    }

    BoundingBox.prototype.intersectionSide = function(other)
    {
        directions=[];
        if (other.x <= this.x + this.width && other.x >= this.x + (this.width/2)) directions.push(DIRECTION.RIGHT);
        else if ((other.x >= this.x) && (other.x<= this.x + (this.width/2))) directions.push(DIRECTION.LEFT);
        else if ((other.y >= this.y) && (other.y<= this.y + (this.height/2))) directions.push(DIRECTION.UP);
        else directions.push(DIRECTION.DOWN);
        return directions;
    }