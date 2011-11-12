var Wall = function(x,y,width,height)
{
    this.boundingBox = new BoundingBox(x-2,y-2,width+4,height+4);
    Wall.superclass.constructor.apply(this,[x,y,width,height]);
}
extend(Wall,GameObject);