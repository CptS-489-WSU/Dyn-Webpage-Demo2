/* SGS (SpeedGolf Score)
   This class defines a speedgolf score, which combines golf strokes and time taken to hole out.
   A speedgolf score consists of the number of minutes/strokes (called strokeMinutes) and the number
   of seconds. It is written as [mm]m:ss, where m is the number of stroke-minutes and s is the number
   of seconds.

   This class works equally well for speedgolf times (time durations) and time pars 
   (also time durations): It will correctly handle time arithmetic when summing or 
   subtracting one time from another.

   There are two unique features of speedgolf scores/times that distinguish them:
   1. An SGS can be negative. A negative SGS is interpreted as under par, 
      and only makes sense in the context of a speedgolf score. When an SGS object is 
      initialized using Date timestamps, negative time durations are NOT allowed. When
      an SGS object is intialized, if either the minutes or the seconds is negative,
      the SGS is set to be negative.

   2.  An SGS contains only minutes and seconds -- never hours. A player who completes a
      speedgolf round in one hour and 4 minutes, for example, is said to have played the
      round in 64 minutes, and if she needed 70 strokes for that round, her SGS would
      be 64 + 70 = 134. Hours just aren't a part of the speedgolf world.

   This class provides a set of convenient methods for performing speedgolf and 
   time duration arithmetic. While JavaScript allows only one constructor, there
   are actually two ways to set up an SGS:
   1. Use the constructor to initialize an SGS with a designated number of  
      strokeMinutes and seconds. Both strokeMinutes and seconds must be integers. While both
      strokeMinutes and seconds may be negative, the SGS is considered to be negative only
      if strokeMinutes is negative; the negative-ness of seconds is ingored.
   2. After constructing an SGS, use setDuration to create an SGS object that acts like a duration.
      setDuration accepts two dates and stores the duration in terms of (stroke)Minutes and seconds.
      If you pass in two Dates where the first Date comes after the second, the resulting SGS is 
      considered invalid. 

   ***IMPORTANT NOTE***
   The validity/invalidity of an SGS object is set in the constructor. 
   The validity of an SGS object can be tested through the isValid() method. If an invalid SGS
   object is used in SGS methods, the returned result is always 'undefined'. Hence, you should always 
   test an SGS for being valid before doing anything else with it.  
 */

 
   class SGS {

    /**************************************************************************
    CONSTRUCTOR: Initializes a new SGS object. You can do this with three 
    alternative sets of args:
    1. Two integer args -- strokeMinutes and seconds. If either is negative, 
       the the SGS object is assumed negative.
    2. Two Date args startTime and finishTime where startTime comes before
       finishTime. In this case, the SGS is initialized as the duration 
       between startTime and finishTime
    3. One string arg -- a string in [-][mm]m:ss format indicating a 
       potentially negative SGS.
    If any other params are passed or if params fit one of the above but
    are out of range, then the SGS object returned is set to invalid
    and cannot be used. You can test for this through the isValid() method.
    **************************************************************************/
    constructor() {
     //Constructor 1: Two integers for strokeMinutes and seconds
    if (arguments.length == 2 && typeof arguments[0] ==='number' &&
                   (arguments[0]%1)===0 && typeof arguments[1] ==='number' &&
                   (arguments[1]%1)===0) { 
        var strokeMinutes = arguments[0];
        var seconds = arguments[1];
        this.valid = true;
        this.strokeMinutes = (arguments[1] >= 0 ? arguments[0] : -1 * Math.abs(arguments[0]));
        this.seconds = (arguments[0] >= 0 ? arguments[1] : -1 * Math.abs(arguments[1]));
        this.underPar = (this.strokeMinutes < 0 || this.seconds < 0);
        return this;
    }
    //Constructor 2: Two Date objects; set strokeMinutes and seconds based on duration
    if (arguments.length == 2 && arguments[0] && 
        Object.prototype.toString.call(arguments[0]) === "[object Date]" && 
        !isNaN(arguments[0]) && arguments[1] && 
        Object.prototype.toString.call(arguments[1]) === "[object Date]" && !isNaN(arguments[1]) &&
                     arguments[0] < arguments[1]) {
            this.valid = true;
            var diffSec = (arguments[1] - arguments[0])/1000; //number of seconds separating the two dates.
            this.strokeMinutes = Math.floor(diffSec / 60);
            this.seconds = Math.floor(diffSec % 60);
            this.underPar = false; //durations can't be negative!
            return this;
        }
        //Constructor 3: A string: set strokeMinutes and seconds based on string
        if (arguments.length == 1 && typeof arguments[0] === 'string' &&
           /-?[0-9]?[0-9]?[0-9]\:[0-5][0-9]/.test(arguments[0])) {
            this.valid = true;
            var parts = arguments[0].split(":");
            this.strokeMinutes = Number(parts[0]);
            this.seconds = Number(parts[1]);
            if (arguments[0].charAt(0) == "-") {
                this.seconds = -1 * this.seconds; //must also be negative.
                this.underPar = true;
            } else {
              this.underPar = false;
            }
            return this;
        }
        this.valid = false;
        return this;
    }
   

    /**************************************************************************
    isValid: Returns true if the object is a valid SGS, false otherwise
    **************************************************************************/
    isValid() {
        return this.valid;
    }
    
    /**************************************************************************
    isUnderPar: Returns true if the object is under par (i.e., has negative
    strokeMinutes and/or seconds), false otherwise
    **************************************************************************/
    isUnderPar() {
      if (!this.valid) {
        return;
      }
      return this.underPar;
    }
    
    /**************************************************************************
     getStrokeMinutes: Get the stroke-minutes of this SGS. Returns undefined
     if the SGS object is invalid.    
    **************************************************************************/
    getStrokeMinutes() {
      if (!this.valid) {
          return; //undefined
      }
      return this.strokeMinutes;
    }
    
    /**************************************************************************
     getSeconds: Get seconds of this SGS. Returns undefined
     if the SGS object is invalid.    
    **************************************************************************/
    getSeconds() {
      if (!this.valid) {
          return; //undefined
      }
      return this.seconds;
    }
    
    /**************************************************************************
    isGreaterThan: Returns true if the SGS represented by the object is greater 
    than the SGS represented by the object passed as parameter, false otherwise.
    **************************************************************************/
    isGreaterThan(sgs) {
     if (!this.valid || !isValid(sgs)) {
         return;
     }
      var sgsStrMin = sgs.getStrokeMinutes();
      if (this.strokeMinutes > sgsStrMin) {
        return true;
      }
      if (this.strokeMinutes < sgsStrMin) {
        return false;
      }
      if (this.seconds > sgs.getSeconds()) {
        return true;
      }
      return false;               
    }
    
    /**************************************************************************
    isEqualTo: Return true if the SGS represented by the object is equal to 
    the SGS represented by the object passed as parameter, false otherwise
    **************************************************************************/
    isEqualTo(sgs) {
        if (!this.valid || !isValid(sgs)) {
            return;
        }
        return (this.strokeMinutes == sgs.getStrokeMinutes() && 
                this.seconds == sgs.getSeconds());
    }
    
    /**************************************************************************
    isLessThan: Return true if the SGS represented by the object is less than
    the SGS represented by the object passed as parameter, false otherwise
    **************************************************************************/
    isLessThan(sgs) {
      if (!this.valid || !isValid(sgs)) {
        return;
      }
      var sgsStrMin = sgs.getStrokeMinutes();
      if (this.strokeMinutes < sgsStrMin) {
        return true;
      }
      if (this.strokeMinutes > sgsStrMin) {
        return false;
      }
      if (this.seconds < sgs.getSeconds()) {
        return true;
      }
      return false;         
    }
    
    /**************************************************************************
    toString: Return a pretty-printable string representation of SGS
    **************************************************************************/
    toString() {
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
    
    /**************************************************************************
     addTo: Add this to SGS provided as a param, returning the sum in a new
     SGS object or 'undfined if this or sgs are invalid or sgs is not an instance
     of SGS.
    **************************************************************************/
    addTo(sgs) {
      if (!this.valid || !(sgs instanceof SGS) || !sgs.isValid()) {
        return; //undefined
    }
    var secSum = this.seconds + sgs.getSeconds();
    var strMinSum = this.strokeMinutes + sgs.getStrokeMinutes() + (secSum / 60);
    strMinSum < 0 ? strMinSum = Math.ceil(strMinSum) : strMinSum = Math.floor(strMinSum);
    return new SGS(strMinSum, secSum % 60);
   }

    /**************************************************************************
     addToMany: Add this to an array of SGS objects, returning the summation as
     a new SGS object. Returns 'undefined' if this is invalid, if sgsArray
     is not an array, or if any in the sgsArray is invalid or not an 
     instance of SGS.
    **************************************************************************/
   
    addToMany(sgsArray) {
        if (!this.valid || !(sgsArray instanceof Array)) {
          return; //undefined
        }
        //if here, we can attempt the sum...
        var sgsSum = new SGS(this.strokeMinutes, this.seconds); //init sum
        var i = 0;
        for (i = 0; i < sgsArray.length; ++i) {
          if (!sgsArray[i] instanceof SGS || !sgsArray[i].isValid()) {
              return; //undefined
          }
          sgsSum = sgsSum.addTo(sgsArray[i]);
        }
        return sgsSum;
    }
    
    /**************************************************************************
     subtractFrom: Subtract this from the sgs provided as a param, returning 
     the difference as a new SGS object. Returns 'undefined' if
     -- this or sgs is invalid
     -- sgs is NOT an SGS object
     -- either this or sgs is negative. (In speedgolf, there is never a need
        to perform subtraction operations involving negative values. Instead,
        subtraction is used only to determine a positive or negative difference
        between a time par and a duration or a speedgolf par and an SGS.     
    **************************************************************************/
    subtractFrom(sgs) {
      if (!this.valid || !(sgs instanceof SGS) || !sgs.isValid() ||
          this.underPar || sgs.isUnderPar()) {
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
      var foo = new Date(2019,2,8,10,48,0,0)
      return new SGS(strMinDiff+1,secDiff);
    }
  } //end of SGS class definition
    
  /* Test Driver -- uncomment if you want to test
  function testSGS() {
    var sgs = new SGS(3, 4);
    Logger.log("sgs (should be 3:04): " + sgs.toString());
    sgs = sgs.addTo(new SGS(3, 58));
    Logger.log("sgs (should be 7:02): " + sgs.toString());
    sgs = sgs.addToMany([new SGS(2, 58), new SGS(3, 43)]);
    Logger.log("sgs (should be 13:43): " + sgs.toString());
    sgs = sgs.subtractFrom(new SGS(10, 51));
    Logger.log("sgs (should be -2:08: " + sgs.toString());
    var durSGS = new SGS(new Date(2019, 2, 8, 10, 50, 0, 0), new Date());
    Logger.log("sgs as duration: " + durSGS.toString());
    sgs = sgs.addTo(new SGS("3:10")); //should be 1:02
    Logger.log("sgs (should be 1:02): " + sgs.toString());
    sgs = sgs.subtractFrom(durSGS);
    Logger.log('sgs (subtractFrom):' + sgs.toString())
    var sgsSum = new SGS(0,0);
    sgsSum = sgsSum.addToMany([new SGS("3:45"), new SGS("-3:45"), new SGS("-4:32")]);
    Logger.log("sgsSum (addToMany -- should be -4:32): " + sgsSum.toString());
} */
    