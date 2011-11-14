var Player;
Player = function(x, y)
{
    this.STATES = {"JUMPING":1,"FALLING":2, "LANDED":3};
    Player.superclass.constructor.apply(this, [x,y,50,50]);
    this.gravity = 5;
    this.impulse = 0;
    this.landedOn = null;
    this.startFalling();
}
extend(Player,GameObject);

Player.prototype.jump = function()
{
    var up = this.gravity - this.impulse;
    this.moveY(up);
    this.impulse--;
}

Player.prototype.landed = function(landedOn)
{
    this.state = this.STATES.LANDED;
    this.impulse = this.gravity;
    this.landedOn = landedOn;
}

Player.prototype.startFalling = function()
{
    this.landedOn = null;
    this.impulse = 0;
    this.state = this.STATES.FALLING;
}

Player.prototype.startJump = function()
{
    this.moveY(-10);
    this.landedOn = null;
    this.impulse = this.gravity * 5;
    this.state = this.STATES.JUMPING;
}

Player.prototype.fall = function()
{
    this.moveY(this.gravity - this.impulse);
}

Player.prototype.isJumping = function()
{
    if (this.state == this.STATES.JUMPING) return true;
    return false;
}

Player.prototype.move = function()
{
    if (this.state == this.STATES.FALLING || this.state == this.STATES.LANDED)
    {
        this.fall();
    }
    if (this.state == this.STATES.JUMPING)
    {
        this.jump();
    }
}
