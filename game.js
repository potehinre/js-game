var Game = function(canvas)
{
    this.player = new Player(50,40);
    this.wall = new Wall(0,400,400,200);
    this.render = new Render(canvas);
    this.DIRECTIONS = {"UP":1,"DOWN":2,"RIGHT":3,"LEFT":4};
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
        if(event.keyCode == self.KEYS.W && self.player.state == self.player.STATES.FALLING)
        {
            self.player.impulse = self.JUMP_IMPULSE;
            self.player.state = self.player.STATES.JUMPING;
        }
    });
}

Game.prototype.mainLoop = function()
{
    var self = this;
    var mainloop = function()
    {
        self.player.move();
        if (self.player.boundingBox.intersectsY(self.wall.boundingBox))
        {
            self.player.landed();
            self.player.gravity = 0;
        }
        self.render.begin();
            self.render.draw(self.player);
            self.render.draw(self.wall);
        self.render.end();
        setTimeout(mainloop,33);
    }
    mainloop();
}
