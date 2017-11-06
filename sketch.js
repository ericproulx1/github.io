function setup() {
  createCanvas(800, 800);
  me = new Car(255, 255, 255);
  track = new Track();
  brake = loadImage("img/brakev2.png");
  gas = loadImage("img/gasv2.png");
  posXmsg = "Position X:\t";
  posYmsg = "Position Y:\t";
  posUnits = "pixels";
  velXmsg = "Velocity X:\t";
  velYmsg = "Velocity Y:\t";
  velUnits = "pixels/sec";
  ovrVelmsg = "Overall velocity:\t";
  accXmsg = "Acceleration X:\t";
  accYmsg = "Acceleration Y:\t";
  accUnits = "pixels/sec^2";
  ovrAccmsg = "Overall acceleration:\t";
  angmsg = "Delta Theta:\t";
  angUnits = "degrees";
  timemsg = "Time elapsed:\t";
  timeUnits = "seconds";
  fr = 30;
  currentTheta = 0;
  prevTheta = 0;
  currentSpeedX = 0;
  currentSpeedY = 0;
  prevSpeedX = 0;
  prevSpeedY = 0;
  accX = 0;
  accY = 0;

  frameRate(fr);
}

function draw() {
  background(51, 51, 51);
  track.drawTrack();
  me.update();
  me.show();

  if (keyIsDown(UP_ARROW)) {
    me.dir(0, -.2);
  }
  if (keyIsDown(DOWN_ARROW)) {
    me.dir(0, .2);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    me.dir(.2, 0);
  }
  if (keyIsDown(LEFT_ARROW)) {
    me.dir(-.2, 0);
  }

  if (keyIsDown(82) || keyIsDown(114)) {
    setup();
  }

  if (keyIsDown(88) || keyIsDown(120)) {
    me.deccelerate();
    image(brake, 25, 670, brake.width / 2.2, brake.height / 2.2);
  } else {
    image(brake, 25, 670, brake.width / 2, brake.height / 2);
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW) || keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
    image(gas, width - 25 - gas.width / 2, 670, gas.width / 2.2, gas.height / 2.2);
  } else {
    image(gas, width - 25 - gas.width / 2, 670, gas.width / 2, gas.height / 2);
  }

  if (!track.isOnTrack(me.x, me.y)) {
    me.recolor(255, 0, 0);
    me.xspeed = 0;
    me.yspeed = 0;
    console.log("Game over.");
    text(posXmsg + round(me.x) + " " + posUnits, 275, 300);
    text(posYmsg + round(me.y) + " " + posUnits, 275, 325);
    text(velXmsg + round(me.xspeed * fr) + " " + velUnits, 300, 350);
    text(velYmsg + round(me.yspeed * fr) + " " + velUnits, 300, 375);
    text(ovrVelmsg + round(sqrt(me.xspeed * me.xspeed + me.yspeed * me.yspeed) * fr) + " " + velUnits, 275, 400);
    text(accXmsg + accX * fr + " " + accUnits, 300, 425);
    text(accYmsg + accY * fr + " " + accUnits, 300, 450);
    text(ovrAccmsg + sqrt(accX * accX + accY * accY) * fr + " " + accUnits, 275, 475);
    text(angmsg + (currentTheta - prevTheta) + " " + angUnits, 275, 500);
    text(timemsg + time + " " + timeUnits, 275, 525);
  } else {
    currentTheta = atan(me.yspeed / me.xspeed) * 180;
    currentSpeedX = me.xspeed;
    currentSpeedY = me.yspeed;
    accX = (currentSpeedX - prevSpeedX);
    accY = (currentSpeedY - prevSpeedY);
    text(posXmsg + round(me.x) + " " + posUnits, 275, 300);
    text(posYmsg + round(me.y) + " " + posUnits, 275, 325);
    text(velXmsg + round(me.xspeed * fr) + " " + velUnits, 300, 350);
    text(velYmsg + round(me.yspeed * fr) + " " + velUnits, 300, 375);
    text(ovrVelmsg + round(sqrt(me.xspeed * me.xspeed + me.yspeed * me.yspeed) * fr) + " " + velUnits, 275, 400);
    text(accXmsg + accX * fr + " " + accUnits, 300, 425);
    text(accYmsg + accY * fr + " " + accUnits, 300, 450);
    text(ovrAccmsg + sqrt(accX * accX + accY * accY) * fr + " " + accUnits, 275, 475);
    text(angmsg + (currentTheta - prevTheta) + " " + angUnits, 275, 500);
    time = round(millis() / 1000);
    text(timemsg + time + " " + timeUnits, 275, 525);
    prevTheta = currentTheta;
    prevSpeedX = currentSpeedX;
    prevSpeedY = currentSpeedY;
  }

}
