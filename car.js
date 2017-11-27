//utilizing sloppy inverse kinematics
function Car(r, g, b) {
  this.x = 200; //arbitrary for now
  this.y = 200;
  this.radius = 20;

  this.xspeed = 0;
  this.yspeed = 0;
  this.xaccel = 1; //accel is a multiplier in this model
  this.yaccel = 1;

  this.deccelRate = .99;
  this.friction = .9995;

  this.r = r;
  this.g = g;
  this.b = b;

  this.recolor = function (r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  this.deccelerate = function () {
    this.xaccel *= this.deccelRate;
    this.yaccel *= this.deccelRate;
  }

  this.dir = function (x, y) {
    this.xspeed += x;
    this.yspeed += y;
    this.xaccel = 1;
    this.yaccel = 1;
  }

  this.update = function () {
    this.xspeed *= this.xaccel;
    this.yspeed *= this.yaccel;
    this.xspeed *= this.friction;
    this.yspeed *= this.friction;

    if (abs(this.xspeed) < 0.05) {
      this.xspeed = 0;
    }
    if (abs(this.yspeed) < 0.05) {
      this.yspeed = 0;
    }

    if (abs(this.xaccel) < 0.05) {
      this.xaccel = 0;
    }
    if (abs(this.yaccel) < 0.05) {
      this.yaccel = 0;
    }

    this.x += this.xspeed;
    this.y += this.yspeed;

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);

  }

  this.show = function () {
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}
