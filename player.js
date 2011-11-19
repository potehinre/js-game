var Player;
Player = function(x, y)
{
    this.STATES = {"JUMPING":1,"FALLING":2, "LANDED":3, "CLIMBING":4};
    Player.superclass.constructor.apply(this, [x,y,50,50]);
    this.gravity = 5;
    this.impulse = 0;
    this.landedOn = null;
    this.climbedOn = null;
    this.startFalling();
    this.NORMAL_JUMP_MULTIPILER = 3;
    this.TRAMPOLINE_JUMP_MULTIPILER = 5;
}
extend(Player,GameObject);

Player.prototype.jumpWithMultipiler = function(multipiler)
{
    this.moveY(-10);
    this.landedOn = null;
    this.impulse = this.gravity * multipiler;
    this.state = this.STATES.JUMPING;
}

Player.prototype.landed = function(landedOn)
{
    this.state = this.STATES.LANDED;
    this.impulse = this.gravity;
    this.landedOn = landedOn;
    this.climbedOn = null;
}

Player.prototype.climbOn = function(climbedOn)
{
    this.state = this.STATES.CLIMBING;
    this.climbedOn = climbedOn;
    this.impulse = this.gravity;
}

Player.prototype.startFalling = function()
{
    this.landedOn = null;
    this.climbedOn = null;
    this.impulse = 0;
    this.state = this.STATES.FALLING;
}

Player.prototype.startJump = function()
{
    this.jumpWithMultipiler(this.NORMAL_JUMP_MULTIPILER);
}

Player.prototype.startTrampolineJump = function()
{
    this.jumpWithMultipiler(this.TRAMPOLINE_JUMP_MULTIPILER);
}

Player.prototype.jump = function()
{
    var up = this.gravity - this.impulse;
    this.moveY(up);
    this.impulse--;
}

Player.prototype.climb = function()
{
    this.moveY(this.gravity - this.impulse);
}

Player.prototype.fall = function()
{
    this.moveY(this.gravity - this.impulse);
    this.impulse--;
}

Player.prototype.isJumping = function()
{
    return this.state == this.STATES.JUMPING
}

Player.prototype.isLanded = function()
{
    return this.state == this.STATES.LANDED;
}

Player.prototype.isFalling = function()
{
    return this.state == this.STATES.FALLING;
}

Player.prototype.isClimbing = function()
{
    return this.state == this.STATES.CLIMBING;
}

Player.prototype.move = function()
{
    console.log("Current state:" + this.state);
    if (this.isFalling() || this.isLanded())  this.fall();
    else if (this.isJumping())   this.jump();
    else if (this.isClimbing())  this.climb();
}
