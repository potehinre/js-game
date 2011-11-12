var Game = function(canvas)
{
    this.player = new Player(50,40);
    this.walls=[];
    this.walls.push(new Wall(0,400,200,200));
    this.render = new Render(canvas);
    this.DIRECTIONS = {"UP":1,"DOWN":2,"RIGHT":3,"LEFT":4};
    this.KEYS = {"A":65, "W":87, "D":68, "S":83, "LEFT":37, "UP":38,"RIGHT":39, "DOWN":40};
    this.JUMP_IMPULSE = 20;
    this.STEP = 5;
    this.FPS = 30;
}

Game.initControls = function()
{
    $(window).bind("keydown",function(event)
    {
        if(event.keyCode == this.KEYS.A)
        {
            this.player.moveX(-this.STEP);
        }
        if(event.keyCode == this.KEYS.B)
        {
            this.player.moveX(this.STEP);
        }
        if(event.keyCode == this.KEYS.W && this.player.state == this.player.STATES.FALLING)
        {
            this.player.impulse = this.JUMP_IMPULSE;
            this.player.state = this.player.STATES.JUMPING;
        }
    });
}

Game.prototype.mainLoop = function()
{   this.player.move();
    if (this.player.boundingBox.intersectsY(wall))
    {
        this.player.state=this.player.state.FALLING;
        this.player.landed();
    }
    this.render.begin();
        this.render.draw(this.player);
        this.render.drawAll(this.walls);
    this.render.end();
    setTimeout(this.mainLoop, 1000 / this.FPS);
}
