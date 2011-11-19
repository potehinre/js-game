var Wall = function(x,y,width,height)
{
    Wall.superclass.constructor.apply(this,[x,y,width,height]);
}
extend(Wall,GameObject);

var Trampoline = function(x,y,width,height)
{
    Trampoline.superclass.constructor.apply(this,[x,y,width,height]);
}
extend(Trampoline,GameObject);