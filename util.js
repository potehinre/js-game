function extend(Child, Parent)
{
    var F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}
DIRECTION = {"UP":1,"DOWN":2,"RIGHT":3,"LEFT":4};