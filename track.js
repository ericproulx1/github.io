function Track() {
  this.outerWidth = width / 1.25;
  this.outerHeight = this.outerWidth
  this.innerWidth = this.outerWidth * .7;
  this.innerHeight = this.innerWidth;

  this.drawTrack = function () {
    fill(0, 0, 0);
    ellipse(width / 2, height / 2, this.outerWidth, this.outerHeight);
    fill(51, 51, 51);
    ellipse(width / 2, height / 2, this.innerWidth, this.innerHeight);
  }

  this.isOnTrack = function (x, y) {
    x = x - width / 2;
    y = y - height / 2;
    x = abs(x);
    y = abs(y);
    if ((sqrt(x * x + y * y) >= this.innerWidth / 2) && (sqrt(x * x + y * y) <= this.outerWidth / 2)) {
      return true;
    } else {
      return false;
    }

  }

}
