var Game = function(canvas)
{
    this.player = new Player(50,200);
    this.wall = new Wall(0,400,400,200);
    this.render = new Render(canvas);
    this.KEYS = {"A":65, "W":87, "D":68, "S":83, "LEFT":37, "UP":38,"RIGHT":39, "DOWN":40};
    this.JUMP_IMPULSE = 20;
    this.STEP = 5;
    this.FPS = 30;
}

Game.prototype.initControls = function()
{
    self = this;
    $(window).bind("keydown",function(event)
    {
        if(event.keyCode == self.KEYS.A)
        {
            self.player.moveX(-self.STEP);
        }
        if(event.keyCode == self.KEYS.D)
        {
            self.player.moveX(self.STEP);
        }
        if(event.keyCode == self.KEYS.W && self.player.state != self.player.STATES.JUMPING)
        {
            self.player.startJump();
        }
    });
}

Game.prototype.mainLoop = function()
{
    var self = this;
    var mainloop = function()
    {
        if (self.player.boundingBox.intersects(self.wall.boundingBox))
        {
            var intersected = self.wall.boundingBox;
            var sides = self.player.boundingBox.intersectionSides(intersected);
            for(var i = 0;i<sides.length;i++)
            {
                switch (sides[i])
                {
                    case DIRECTION.RIGHT:
                        self.player.smoothRight(intersected);
                        break;
                    case DIRECTION.DOWN:
                            self.player.landed();
                            self.player.smoothDown(intersected);
                        break;
                    case DIRECTION.LEFT:
                        break;
                    case DIRECTION.UP:
                        break;
                }
            }
        }
        if(self.player.state == self.player.STATES.FALLING) self.player.startFalling();
        self.player.move();
        self.render.begin();
            self.render.draw(self.player);
            self.render.draw(self.wall);
        self.render.end();
        setTimeout(mainloop,33);
    }
    mainloop();
}
