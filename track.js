function Track() {
  if(width<height)
  {
    this.outerWidth = width;
    this.outerHeight = width;
    this.innerWidth = this.outerWidth * .7;
    this.innerHeight = this.outerWidth * .7;
  }else
  {
    this.outerWidth = height;
    this.outerHeight = height;
    this.innerWidth = this.outerWidth * .7;
    this.innerHeight = this.outerWidth * .7;
  }

  this.drawTrack = function () {
    fill(0, 0, 0);
    ellipse(width / 2, height / 2, this.outerWidth, this.outerHeight);
    fill(51, 51, 51);
    ellipse(width / 2, height / 2, this.innerWidth, this.innerHeight);
  }

  this.isOnTrack = function (x, y, diameter) {
    x = x - width / 2; //set such that 0,0 is at center
    y = y - height / 2;
    d = sqrt(x * x + y * y);
    if ((d - diameter/2 >= this.innerWidth / 2) && (d + diameter/2 <= this.outerWidth / 2)) {
      return true;
    } else {
      return false;
    }
  }

}
