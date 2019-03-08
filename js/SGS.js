/* SGS (SpeedGolf Score)
   This class defines a speedgolf score, which combines golf strokes and time taken to hole out.
   A speedgolf score consists of the number of minutes/strokes (called strokeMinutes) and the number
   of seconds. It is written as [mm]m:ss, where m is the number of stroke-minutes and s is the number
   of seconds.

   This class works equally well for speedgolf times and time pars: It will correctly handle time
   arithmetic when summing or subtracting times.

   This class provides a set of functions for performing speedgolf and time arithmetic, 
   on the assumption  that a speedgolf score or time never contains hours. 
   Rather, hours are always converted to and stored as minutes in SGS, e.g., 1 hour and 
   9 minutes is stored as 69. SGS object can also be negative. This simply means that 
   the represent a speedgolf score under par. To obtain a speedgolf score relative to 
   par, simply use the subtractFrom method, passing a player's score in to a a 
 */

var SGS = function(strokeMinutes, seconds) {
    this.strokeMinutes = strokeMinutes;
    this.seconds = seconds;
    this.valid = (typeof strokeMinutes==='number' &&
                   (strokeMinutes%1)===0 && 
                   typeof seconds==='number' &&
                   (seconds%1)===0);
    
    //isValid: Return true if this is a valid SGS, false otherwise
    this.isValid = function() {
        return this.valid;
    }

    //toString: Return a pretty string representation of SGS
    this.toString = function() {
      if (!this.valid) {
          return "Invalid Speedgolf Score";
      }
      if (this.strokeMinutes == 0 && this.seconds == 0) {
        return "Even";
      }
      if (this.strokeMinutes >=0 && this.seconds >= 0) {
        return this.strokeMinutes + ":" + 
               (this.seconds < 10 ? "0" + this.seconds : this.seconds);
      }
      //if here, we have a negative SGS
      var absSec = Math.abs(this.seconds);
      return "-" + Math.abs(this.strokeMinutes) + ":" + 
                 (absSec < 10 ? "0" + absSec : absSec);
    }
    
    //getStrokeMinutes: Get the stroke-minutes of this SGS. Returns undefined
    //if the SGS object is invalid.
    this.getStrokeMinutes = function() {
      if (!this.valid) {
          return; //undefined
      }
      return this.strokeMinutes;
    }
    
    //getSeconds: Get the seconds of this SGS. Returns undefined if
    //the SGS object is invalid
    this.getSeconds = function() {
      if (!this.valid) {
          return; //undefined
      }
      return this.seconds;
    }
    
    //addTo: Add this to sgs provided as a param, returning the resultant SGS object
    //Returns 'undefined' if this or sgs are invalid or sgs is not an instance of SGS
    this.addTo = function(sgs) {
      if (!this.valid || !(sgs instanceof SGS) || !sgs.isValid()) {
          return; //undefined
      }
      var secSum = this.seconds + sgs.getSeconds();
      var strMinSum = this.strokeMinutes + sgs.getStrokeMinutes() + (secSum / 60);
      return new SGS(Math.floor(strMinSum), secSum % 60);
    }

    //addToMany: Add this to an array of SGS objects, returning the summation as an SGS
    //Returns 'undefined' if this is invalid, if the param is not an array, or if any
    //element in the array is invalid or not an instance of SGS
    this.addToMany = function(sgsArray) {
        if (!this.valid || !(sgsArray instanceof Array)) {
          return; //undefined
        }
        //if here, we can attempt the sum...
        var sgsSum = new SGS(this.strokeMinutes, this.seconds);
        var i = 0;
        for (i = 0; i < sgsArray.length; ++i) {
          if (!sgsArray[i] instanceof SGS || !sgsArray[i].isValid()) {
              return; //undefined
          }
          sgsSum = sgsSum.addTo(sgsArray[i]);
        }
        return sgsSum;
    }
    
    //subtractFrom: Subtract this from the sgs provided as a param, returning the resultant SGS
    //Returns 'undefined' if this is invalid or sgs is invalid or not an SGS instance
    this.subtractFrom = function(sgs) {
      if (!this.valid || !(sgs instanceof SGS) || !sgs.isValid()) {
        return; //undefined
      }
      var secDiff = sgs.getSeconds() - this.seconds;
      var strMinDiff = sgs.getStrokeMinutes() - this.strokeMinutes;
      //Case 1 (easy): strokeMinutes >= 0 and seconds >= 0
      if (strMinDiff >= 0 && secDiff >= 0) {
        return new SGS(strMinDiff, secDiff);
      }
      //Case 2: strokeMinutes <= 0 and seconds <= 0
      //e.g., 7:32 - 7:52 (-1:20), 6:45 - 7:52 (-1:07)
      if (strMinDiff <= 0 && secDiff <= 0)
        return new SGS(strMinDiff, secDiff);
      //Case 3 strokeMinutes >= 0 and seconds <= 0
      //e.g., 7:23 - 6:45 (1:38). 9:01 - 6:40 (3:21)
      if (strMinDiff >= 0 && secDiff <=0) {
          return new SGS(strMinDiff, (60 + sgs.getSeconds()) - (this.seconds));
      }
      //Case 4: strokeMinutes <= 0 and seconds >=0
      //e.g., 6:45 - 8:32 (-1:13)
      return new SGS(strMinDiff+1,secDiff);
    }
  }; //end of SGS class definition
    