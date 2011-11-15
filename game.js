var Game = function(canvas)
{
    this.player = new Player(100,300);
    this.walls = [new Wall(0,400,400,200),new Wall(400,300,100,100),new Wall(0,300,50,150)];
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
                var side = self.player.boundingBox.intersectionSides(intersected);
                switch (side)
                {
                        case DIRECTION.UP && self.player.state == self.player.STATES.JUMPING:
                            console.log("UP");
                            self.player.startFalling();
                            self.player.smoothUp(intersected);
                            break;
                        case DIRECTION.RIGHT:
                            console.log("RIGHT WITH:"+j);
                            self.player.smoothRight(intersected);
                            break;
                        case DIRECTION.LEFT:
                            console.log("LEFT WITH" + j);
                            self.player.smoothLeft(intersected);
                            break;
                        case DIRECTION.DOWN:
                            landed = true;
                            console.log("DOWN WITH:"+j);
                            self.player.landed();
                            self.player.smoothDown(intersected);
                            break;
                }
            }
        }
        if(!landed && self.player.state != self.player.STATES.JUMPING) self.player.startFalling();
        self.player.move();
        self.render.begin();
            self.render.draw(self.player);
            self.render.drawAll(self.walls);
        self.render.end();
        setTimeout(mainloop,33);
    }
    mainloop();
}
