var Player;
Player = function(x, y)
{
    this.STATES = {"JUMPING":1,"FALLING":2, "LANDED":3};
    Player.superclass.constructor.apply(this, [x,y,50,50]);
    this.gravity = 5;
    this.impulse = 0;
    this.landedOn = null;
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
}

Player.prototype.startFalling = function()
{
    this.landedOn = null;
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


Player.prototype.fall = function()
{
    console.log(this.impulse);
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
