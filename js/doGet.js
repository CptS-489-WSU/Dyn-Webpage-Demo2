//********************************************************************************
//DOGET.GS
//*********************************************************************************
//This file contains the doGet() function, which serves up the app, 
//responding to get requests with query strings as appropriate to dish out
//new pages.
//*********************************************************************************

function doGet(e) {
  var template, faviconUrl, tName, url;
  faviconUrl = "https://dl.dropboxusercontent.com/s/79q9a1xy2148unf/SpeedScore3Icon.ico";
  tName = "Idaho Speedgolf Championship";
  if (e.parameter.page == "leaderboard") { //show leaderboard
    template = HtmlService.createTemplateFromFile('html/ViewCourses'); //we'll create page from tempalte
    var sortBy = (e.parameter.sortBy ? e.parameter.sortBy : "name");
    var url = "http://sgcourses.us-west-2.elasticbeanstalk.com/courses?sortBy=" + sortBy;
    //Call RESTful API and package up data for processing in HTML Template
    var options = {
      method: "GET",
      contentType: "application/json"
    }
    //Package up data for templated HTML scripts
    template.data = {sortBy: formatSortBy(sortBy),
                     showBanner: (e.parameter.showBanner != 'undefined' ? e.parameter.showBanner : true),
                     courses: respData.data};
    var response = UrlFetchApp.fetch(url,options);
    var respData = JSON.parse(response.getContentText());
    return template
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle(tName + ": Score for " + e.parameter.player)
    .setFaviconUrl(faviconUrl);
  } else { //page does not exist
    template = HtmlService.createHtmlOutputFromFile('html/PageDoesNotExist');
    return template
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle(tName + ": Page Does Not Exist")
    .setFaviconUrl(faviconUrl);
  } 
}
  
 //include: Allows us to include files using templated HTML, per Google's best practices 
//(https://developers.google.com/apps-script/guides/html/best-practices)
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}     

/* zeroPad: Returns a string in which its integer parameter is padded with a leading
 zero if it is < 10.
*/
function zeroPad(num) {
  if (num < 10) {
    return "0" + num.toString();
  } else {
    return num.toString();
  }
}

//SGTimeToString: Converts a time value (Date object) to a SG Time (only minutes and seconds).
//Note (5/8/18): We assume that a player can't be more than 120 minutes under par. This means we 
//interpret any time with hour == 22 or hour == 23 as under par. All other times are interpreted 
//as over par. In practice, this seems a bit like overkill (no player will ever even be 60 
//under par), but when testing the system, we sometimes generate very quick rounds that are 
//more than 60 under par, so allowing 120 under par accommodates these scenarios.
function SGTimeToString(theTime) {
  var theHours, theMinutes, theSeconds;
  if (theTime == null || theTime == "" || !(theTime instanceof Date))
    return "";
  /* theHours = theTime.getHours();
  if (theHours >= 22) { //we have an under par SG to par score between -0:01 and -59:59...
    theSeconds = theTime.getSeconds();
    if (theSeconds > 0) {
      theMinutes = (theHours == 23 ? 60 - theTime.getMinutes() - 1 : 120 - theTime.getMinutes() - 1);
      theSeconds = 60 - theSeconds;
    }  else {
      theMinutes = (theHours == 23 ? 60 - theTime.getMinutes() : 120 - theTime.getMinutes());
    }
    return "-" + theMinutes + ":" + zeroPad(theSeconds);
  } else { //assume above par */
    theMinutes = theTime.getMinutes(); // + (theHours * 60);
    theSeconds = theTime.getSeconds();
    return theMinutes + ":" + zeroPad(theSeconds);
  // } 
}

//formatDate: Pretty-formats a date variable as "12:35 p.m. on 23 Jan 2017"
function formatDate(date) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hours = date.getHours();
  var mins = date.getMinutes();
  var secs = date.getSeconds();
  return hours + ':' + zeroPad(mins) + ':' + zeroPad(secs) + ' on ' + day + ' ' + monthNames[monthIndex] + ' ' + year;
}

/* formatSortBy: 'Uncamelizes' and places between a sortBy query param so that it can be displayed in
  dropdown menu on client side
*/
/* formatSortBy: 'Uncamelizes' and places between a sortBy query param so that it can be displayed in
  dropdown menu on client side
*/
function formatSortBy(param) {
  if (param == "totalGolfDist")
    return "Golf Dist";
  if (param == "totalRunDist")
    return "Run Dist";
  if (param == "name")
    return "Name";
  return "State";
}
