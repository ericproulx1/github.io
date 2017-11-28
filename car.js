//utilizing sloppy inverse kinematics
function Car(r, g, b) {
  this.x = width / 2; //arbitrary for now
  this.y = 120;
  this.radius = 20;

  //range is 235 -- 310
  this.range = 235;
  this.startPause = 0;
  this.endPause = 0;
  this.paused = false;
  this.orbitSpeed = 0;

  this.prevTheta = 0;
  this.currentTheta = 0;
  this.xspeed = 0;
  this.yspeed = 0;
  this.xaccel = 1; //accel is a multiplier in this model
  this.yaccel = 1;

  this.deccelRate = .99;
  this.friction = .985;

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

  this.safemode = function () {
    ang = TWO_PI * this.orbitSpeed / (8192);
    this.x = width / 2 + cos(ang) * this.range;
    this.y = height / 2 + sin(ang) * this.range;
  }

  this.calcSpeed = function () {
    if (this.paused) {
      this.orbitSpeed = this.orbitSpeed;
    }
    if (!this.paused) {
      this.orbitSpeed = (millis() - this.endPause);
    }
  }

  this.pauseOrbit = function () {
    if (!this.paused) {
      this.startPause = millis();
    }
    this.paused = true;
  }

  this.resumeOrbit = function () {
    if (this.paused) {
      this.endPause = this.endPause + (millis() - this.startPause);
    }
    this.paused = false;
  }

  this.handleBounce = function () {
    angleWall = atan2(this.y - height / 2, this.x - width / 2);
    angleVel = atan2(this.yspeed, this.xspeed);
    if (angleWall != PI) {
      angleWall *= -1;
    }
    if (angleVel != PI) {
      angleVel *= -1;
    }
    if (angleWall < 0) {
      angleWall += 2 * PI;
    }
    if (angleVel < 0) {
      angleVel += 2 * PI;
    }
    angleWall *= 180 / PI;
    angleVel *= 180 / PI;
    //console.log(angleWall + "\t" + angleVel);
    result = acos((cos(angleWall) * cos(angleVel) + sin(angleWall) * sin(angleVel)) / (abs(angleWall) * abs(angleVel)));
    //console.log(result);
    this.xaccel = cos(result) * this.xaccel;
    this.yaccel = sin(result) * this.yaccel;
    this.xspeed = cos(result) * this.xspeed;
    this.yspeed = sin(result) * this.yspeed;
    this.x = (cos(result) + this.x);
    this.y = (sin(result) + this.y);
  }

}
