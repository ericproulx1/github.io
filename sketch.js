function setup() {
  createCanvas(800, 800);
  me = new Car(255, 255, 255);
  track = new Track();
}

function draw() {
  background(51, 51, 51);
  track.drawTrack();
  me.update();
  me.show();
  console.log(track.isOnTrack(me.x, me.y));
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    me.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    me.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    me.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    me.dir(-1, 0);
  }
}
