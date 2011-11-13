var Wall = function(x,y,width,height)
{
    Wall.superclass.constructor.apply(this,[x,y,width,height]);
}
extend(Wall,GameObject);