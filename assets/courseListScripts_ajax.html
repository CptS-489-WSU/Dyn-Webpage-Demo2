<script>
/* lbScripts.js
   This file defines the scripts that dynamically generate the table of speedgolf courses
   from a back-end database. 
*/

/* getCoursesCallback: Invoked after an ajax request to get the courses data.
   If data was successfully obtained, build the courses table, which may involve
   deleting the current version of it.
*/
function getCoursesCallback(response, status) {
  var now = new Date();

  //0. Stop spinner and re-enable 'Update' button, if necessary
  $("#updateBtn").html("Update");
  $("#updateBtn").prop("disabled",false);

  //1. Update timestamp for this retrieval:
  $("#retrievedAt").html(now.getHours() + ":" + zeroPad(now.getMinutes()) + ":" + zeroPad(now.getSeconds()) + " on " +
  (now.getMonth() + 1) + "-" + now.getDate()  + "-" + now.getFullYear());
  
  //2. Check whether to show banner
  if ($("#coursesTableContainer").data("showBanner")) {
      $("#banner").show();
  } else {
      $("#banner").hide();
  }

  //3. Remove all existing rows from table
  $("#coursesTable").find("tr:gt(0)").remove();

  //4. Save latest course data locally so we can handle resize events gracefully
  $("#coursesTableContainer").data("courses",response.data);

  //5. Dynamically insert into table the coruses in the database
  regenerateTable();

  //6. Potentially resize the table based on screen width
  if ($(window).width() < 760) { //Reduce coures list to just 4 columns for smaller screens
    $(".hWideScreen").remove();
    $(".tdWideScreen").remove();
    $("#coursesTableContainer").data("condensedDisplay",true);
  } else {
    $("#coursesTableContainer").data("condensedDisplay",false);
  }

}


/* JQUERY EVENT HANDLERS */

/* WINDOW RESIZE: When the user resizes the window, dynamically adjust column width of table
   based on window width:
   < 760 px: Display 4 columns ("condensed display")
   >= 760 px: Display all columns ("full display")
   We only need to add/remove columns if new window size causes window to cross the 760 px threshold
*/
$(window).resize(function() {
  var width = $(window).width();
  var condensed = $("#coursesTableContainer").data("condensedDisplay");
  if (condensed && width >= 760) { //window crossed threshold; display full table
    regenerateTable(); //regenerate full table
    $("#coursesTableContainer").data("condensedDisplay",false); //toggle display mode
  } else if (!condensed && width < 760) { //window crossed threshold: display condensed table
    $(".hWideScreen").remove(); //remove all but first four cols
    $(".tdWideScreen").remove(); //remove all but first four cols
    $("#coursesTableContainer").data("condensedDisplay",true); //toggle display mode
  }
});


/* DOCUMENT READY: Make an ajax call to get data on all courses.
 Add the data to the courses table in the callback.
*/
$(document).ready(function() {
  var headers = ["Name", "City", "State", "Country", "# Holes", "Stroke Par", "Time Par", "Golf Dist", "Run Dist"];
  $("#coursesTableContainer").data("headers",headers);
  $("#coursesTableContainer").data("showBanner",true); //initalize showBannder to false
  $("#coursesTableContainer").data("sortBy","Name");
  $.ajax({type: "GET",
          url:"http://sgcourses.us-west-2.elasticbeanstalk.com/courses",
          success: getCoursesCallback,
          dataType: 'json'
  });

});

/* dropdown-item CLICK: Using jquery DOM tree traversal, we can determine what item was clicked and 
  toggle the selected item accordingly. 
*/
  $(".dropdown-item").click(function () {
  var i, j;
  //Toggle the selection to what was clicked on.
  if ($(this).hasClass("disabled"))
  return; //ignore the click in this case!
  //if here, item is not disabled, so let's get to work...
  //TO DO: We could improve performance if enable "Update" button only if the item actually changed
  $(this).parent().parent().find(".btn").find("span").text($(this).text()); 
});
  
/* updateBtn CLICK: When the user clicks "Update", we rebuild the Courses Table based on the build a new URL using the selected search/filter options, and
 reload the page. Use a spinner animation to indicate the page is loading.
*/
$("#updateBtn").click(function () {

  //0. Capture last recorded value of sortBy to see if we need to make ajax call..
  var currSortBy = $("#coursesTableContainer").data("sortBy");
  var url = "http://sgcourses.us-west-2.elasticbeanstalk.com/courses?sortBy=";

  //1. Disable update button and start spinner while processing
  $(this).prop("disabled",true);
  $(this).html("<i class='fa fa-spinner fa-spin'></i>&nbsp;Updating...");


  //2. Update showBanner variable according to current dropdown selection
  $("#coursesTableContainer").data("showBanner",$("#showBanner").text() == "Yes"); //set showBanner var
  //3. Make ajax call to re-sort data only if sort by value has changed...
  if ($("#sortBySelected").text() == currSortBy) { //no ajax call needed; just stop spinner and update banner
      if ($("#coursesTableContainer").data("showBanner")) {
          $("#banner").show();
      } else {
          $("#banner").hide();
      }
      $(this).html("Update");
      $(this).prop("disabled",false);
  } else { //must update sortBy val and make ajax call
      $("#coursesTableContainer").data("sortBy", $("#sortBySelected").text());
      if ($("#coursesTableContainer").data("sortBy") == "Golf Dist" || 
          $("#coursesTableContainer").data("sortBy") == "Run Dist") { //need to prepend 'total'...
            url += camelize("total " +  $("#coursesTableContainer").data("sortBy"));
          } else { //no need to prepend
            url += camelize($("#coursesTableContainer").data("sortBy"));
          }
      $.ajax({type: "GET",
      url: url,
      success: getCoursesCallback,
      dataType: 'json'
      });
      //Execution continues in callback
  }
});

/* HELPER FUNCTIONS */

/* regenerateTable -- This function uses the locally-saved version of the table data, obtained from
   the most recent AJAX call, to regenerate the table from scratch. 
*/
function regenerateTable() {
  //1. Grab local copy of all data
  var data = $("#coursesTableContainer").data("courses"); 
  var headers = $("#coursesTableContainer").data("headers");
  var thisCourse, thisHeader, i;
  //2. Remove all existing rows from table
  $("#coursesTable").find("th").remove();
  $("#coursesTable").find("tr").remove();

  //3. Regenerate header row
  thisHeader = "";
  for (i=0; i < headers.length; ++i) {
     thisHeader += "<th";
     if (i > 3) {
       thisHeader += " class='hWideScreen'";
     }
     thisHeader += ">" + headers[i] + "</th>";
  }
  $("#coursesTable").find("thead:last").append(thisHeader);

  //4. Regenerate table rows
  for (i = 0; i < data.length; ++i) { //iterate through all courses...
    thisCourse="<tr>";
    thisCourse += "<td>" + data[i].name + "</td>" +
                  "<td>" + data[i].city + "</td>" +
                  "<td>" + data[i].state + "</td>" +
                  "<td>" + data[i].country + "</td>" +
                  "<td class='tdWideScreen'>" + data[i].numHoles + "</td>" +
                  "<td class='tdWideScreen'>" + data[i].totalStrPar + "</td>" +
                  "<td class='tdWideScreen'>" + SGTimeToString(new Date(data[i].totalTimePar)) + "</td>" +
                  "<td class='tdWideScreen'>" + data[i].totalGolfDist + "</td>" +
                  "<td class='tdWideScreen'>" + data[i].totalRunDist + "</td>";
     $("#coursesTable").find("tbody:last").append(thisCourse);
  }
}

/* camelize -- Converts string to camel case. This is needed because the RESTful API params use camel case.
*/
function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
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
  theHours = theTime.getHours();
  if (theHours >= 22) { //we have an under par SG to par score between -0:01 and -59:59...
    theSeconds = theTime.getSeconds();
    if (theSeconds > 0) {
      theMinutes = (theHours == 23 ? 60 - theTime.getMinutes() - 1 : 120 - theTime.getMinutes() - 1);
      theSeconds = 60 - theSeconds;
    }  else {
      theMinutes = (theHours == 23 ? 60 - theTime.getMinutes() : 120 - theTime.getMinutes());
    }
    return "-" + theMinutes + ":" + zeroPad(theSeconds);
  } else { //assume above par
    theMinutes = theTime.getMinutes() + (theHours * 60);
    theSeconds = theTime.getSeconds();
    return theMinutes + ":" + zeroPad(theSeconds);
  } 
}
</script>