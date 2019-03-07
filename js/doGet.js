//********************************************************************************
//DOGET.GS
//*********************************************************************************
//This file contains the doGet() function, which serves up the app, 
//responding to get requests with query strings as appropriate to dish out
//new pages.
//*********************************************************************************

function doGet(e) {
  var template, faviconUrl, tName;
  faviconUrl = "https://dl.dropboxusercontent.com/s/79q9a1xy2148unf/SpeedScore3Icon.ico";
  tName = "Idaho Speedgolf Championship";
  if (e.parameter.page == "leaderboard") { //show leaderboard
    template = HtmlService.createTemplateFromFile('html/ViewCourses');
    template.data = {sortBy: (e.parameter.sortBy ? e.parameter.sortBy : "SGS")}; 
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

