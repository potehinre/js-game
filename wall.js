var Wall = function(x,y,width,height)
{
    this.boundingBox = new BoundingBox(x-2,y-2,width+2,height+2);
    Wall.superclass.constructor.apply(this,[x,y,width,height]);
}
extend(Wall,GameObject);