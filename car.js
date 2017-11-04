function Car(color) {
  this.x = 303;
  this.y = height/2 + 434;
  this.xspeed = 0;
  this.yspeed = 0;
  this.color = color;

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.update = function() {

    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  this.show = function() {
    fill(this.color);
    ellipse(this.x, this.y, 20, 20);

  }
}
