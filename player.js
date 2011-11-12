    var Player = function(x,y)
    {
        this.STATES={"JUMPING":1,"FALLING":2};
        Player.superclass.constructor.apply(this,[x,y,50,50]);
        this.boundingBox = new BoundingBox(this.x-2,this.y-2,this.width+2,this.height+2);
        this.gravity = 5;
        this.impulse = 0;
        this.state=this.STATES.FALLING;
    }
    
    Player.prototype.moveX = function(diff)
    {
        this.x += diff;
        this.boundingBox.x += diff;
    }

    Player.prototype.moveY = function(diff)
    {
        this.y += diff;
        this.boundingBox.y += diff;
    }

    Player.prototype.jump = function()
    {
        this.moveY(-(this.gravity + this.impulse));
        this.impulse--;
    }

    Player.prototype.landed = function()
    {
        this.gravity = 0;
    }

    Player.prototype.fall = function()
    {
        this.moveY(this.gravity);
    }

    Player.prototype.move = function()
    {
        if (this.state == this.STATES.FALLING)
        {
            this.fall();
        }
        else if (this.state == this.STATES.JUMPING)
        {
            this.jump();
        }
    }
    extend(Player,GameObject);