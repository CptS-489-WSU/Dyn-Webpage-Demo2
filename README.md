# IM3-Complete
Complete code solution for Individual Milestone 3. Here are the supported features:

Login Page
------------
* Displays tournament logo
* Requires user to enter a player code (recommend entering a first name + last name here; it will be used to send data to server) to log in. If nothing is entered, displays an error message.
* When clicked, "Get started" button displays spinner and loads scoring UI, which should be obtained through a URL redirect with query string (processed by doGet()).

Start Scoring page
--------------
* Start Round Timer: When clicked, displays current time with 'click again to update' message'; "Go to Scoring" button enabled
* Go To Scoring: When clicked, advances to hole scoring page

Hole Scoring Page
-----------------
* Record Hole-Out Time button 
  - Displays elapsed time since hole started
  - When clicked, time freezes, Record Strokes options enabled and Save & Next Hole enabled
* Record Strokes buttons
  - plus button adds a stroke, and minus button subtracts a stroke
  - max 50 strokes and min 1 stroke
  - Text after hole score indicates score relative to par (Albatross, Eagle, Birdie, Par, Bogey, Double Bogey, Triple Bogey)
* Save & Next Hole button
  - When clicked, shows spinner and makes call to Restful Web API to send hole data to server. 
  - Spinner stops after data is sent or error occurs. 
  - If hole data successfully saved, present Confirmation dialog that displays for 2 seconds and advance to next hole
  - If hole data not successfully saved, present an Error dialog that displays for 2 seconds and advance to next hole
  - On last hole, "Save & Next" button changes to "Save & Finish"

 Hamburger (left slide-out) Menu
 -------------------------------
 * When hamburger clicked, icon changes to "X" and menu opens. Clicking on "X" or outside of a menu item closes the menu
 * Scoring Instructions -- Displays Scoring instructions page, with left arrow replacing hamburger icon. Clicking on left arrow closes the page and returns to main page.
 * Round Stats -- Displays round stats page, which shows strokes and rel'n to par, elapsed time and rel'n to par, and SGS and rel'n to par. Left arrow replaces hamburger icon. Clicking on on left arrow closes page and returns to main page.
 * Edit Round Data -- Displays a page for editing the hole-by-hole data recorded for the round. Available only after one hole has been played. Only holes for which data has been recorded should be editable.
 * Leaderboard -- Displays placeholder page for leaderboard. Left arrow replaces hamburger icon. Clicking on on left arrow closes page and returns to main page.
 * Scoring assignments -- Displays placeholder page for scoring assignments. Left arrow replaces hamburger icon. Clicking on on left arrow closes page and returns to main page.
 * Log Out -- Clears out current round and returns to log-in page.
 * About SpeedScore -- Displays SpeedScore About Box (code provided) 



