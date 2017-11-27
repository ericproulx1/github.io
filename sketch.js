function setup() {
  createCanvas(800, 800); //bg
  me = new Car(255, 255, 255); //car
  track = new Track(); //track
  brake = loadImage("img/brakev2.png");
  gas = loadImage("img/gasv2.png");
  fr = 30; //frameRate
  currentTheta = 0;
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

  if (keyIsDown(82) || keyIsDown(114)) { //r for reset
    setup();
  }

  if (keyIsDown(88) || keyIsDown(120)) { //x for brake
    me.deccelerate();
    image(brake, 25, 670, brake.width / 2.2, brake.height / 2.2); //make brake smaller, appear depressed
  } else {
    image(brake, 25, 670, brake.width / 2, brake.height / 2);
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW) || keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
    image(gas, width - 25 - gas.width / 2, 670, gas.width / 2.2, gas.height / 2.2); //make gas smaller, appear depressed
  } else {
    image(gas, width - 25 - gas.width / 2, 670, gas.width / 2, gas.height / 2);
  }

  if (!track.isOnTrack(me.x, me.y, me.radius)) {
    currentTheta = atan2(me.yspeed, me.xspeed) * 180/PI;
    //do math, find cross product of currentTheta and part of track/ball collided with, set car to that x&y
    console.log(currentTheta);
  }
}
