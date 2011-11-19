var Game = function(canvas)
{
    this.player = new Player(100,300);
    this.walls = [new Wall(0,400,400,200),new Wall(400,270,100,100),new Wall(10,250,100,130)];
    this.render = new Render(canvas);
    this.KEYS = {"A":65, "W":87, "D":68, "S":83, "LEFT":37, "UP":38,"RIGHT":39, "DOWN":40};
    this.JUMP_IMPULSE = 20;
    this.STEP = 10;
    this.FPS = 30;
    this.pressed = {"A":false,"W":false,"D":false,"S":false};
}

Game.prototype.initControls = function()
{
    self = this;
    $(window).bind("keydown",function(event)
    {
        if(event.keyCode == self.KEYS.A)
        {
            self.pressed.A = true;
        }
        if(event.keyCode == self.KEYS.D)
        {
            self.pressed.D = true;
        }
        if(event.keyCode == self.KEYS.W)
        {
            self.pressed.W = true;
        }
    });
    $(window).bind("keyup",function(event)
    {
        if(event.keyCode == self.KEYS.A) self.pressed.A = false;
        if(event.keyCode == self.KEYS.D) self.pressed.D = false;
        if(event.keyCode == self.KEYS.W) self.pressed.W = false;
    });
}

Game.prototype.mainLoop = function()
{
    var self = this;
    var mainloop = function()
    {
        if (self.pressed.A) self.player.moveX(-self.STEP);
        if (self.pressed.D) self.player.moveX(self.STEP);
        if (self.pressed.W && self.player.state!=self.player.STATES.JUMPING) self.player.startJump();
        var landed = false;
        for (var j = 0;j< self.walls.length;j++)
        {
            var curWall = self.walls[j].boundingBox;
            if (self.player.boundingBox.intersects(curWall))
            {
                var intersected = curWall;
                var sides = self.player.boundingBox.intersectionSides(intersected);
                var downOrUp = sides[0];
                var leftOrRight = sides[1];
                if (downOrUp == DIRECTION.UP  && self.player.isJumping())
                {
                      console.log("UP IN A JUMP");
                      self.player.startFalling();
                      self.player.smoothUp(intersected);
                }
                if (downOrUp == DIRECTION.DOWN)
                {
                     landed = true;
                     console.log("DOWN WITH:"+j);
                     self.player.landed(intersected);
                     self.player.smoothDown(intersected);
                }
                if (leftOrRight == DIRECTION.LEFT)  console.log("LEFT WITH" + j);
                if (leftOrRight == DIRECTION.RIGHT) console.log("RIGHT WITH" +j);
                if (leftOrRight == DIRECTION.LEFT &&
                    (self.player.landedOn != intersected || self.player.isJumping() || self.player.isFalling()))
                {
                     console.log("Collision LEFT with" +j);
                     self.player.smoothLeft(intersected);
                }
                if (leftOrRight == DIRECTION.RIGHT &&
                    (self.player.landedOn != intersected || self.player.isJumping() || self.player.isFalling()))
                {
                     console.log("Collision RIGHT with" +j);
                     self.player.smoothRight(intersected);
                }
            }
        }
        if(!landed && self.player.state != self.player.STATES.JUMPING) self.player.startFalling();
        self.player.move();
        self.render.begin();
            self.render.draw(self.player);
            self.render.drawAll(self.walls);
        self.render.end();
        setTimeout(mainloop,300);
    }
    mainloop();
}
