function defaultEvent(){

    if(localStorage.getItem("firstLoad") != true){

        // tutorial events
        generateEvent("Tap for Details", "Good job! Tapping on an event will show all it's details. Swipe this panel to the left to complete this tutorial event :)");
        generateEvent("Creating an Event", "Tap the \"+\" button to create your first event! When you're done, you can complete this event!");
        generateEvent("Swipe right to delete", "To delete an event, just swipe the panel to the right!");

        // window.location.href = "#help";

        localStorage.setItem("firstLoad", "true");	
    }
}

function generateEvent(title, desc){

    $("#eventName").val(title);
    $("#details").val(desc);

    priority = 0;
    category = 6;

    // save to db
    saveEvent();
    checkForID();
}

/*** To create a bunch of preset events and courses ***/

/* Has params for all event attributes. Some are input IDs, some are global variables. */
function generateEvent2(titleText, priorityVal, dateText, timeText, courseText, categoryVal, detailsText) {
    $("#eventName").val(titleText);
    priority = priorityVal;
    $("#datepicker").val(dateText);
    $("#demo").val(timeText);
    courseName = courseText;
    category = categoryVal;
    $("#details").val(detailsText);

    saveEvent();  
}

function generatePresets() {
    generateEvent2("Reading assignment", // Title
                   0, // Priority
                   "", // Date
                   "", // Time
                   "COMP1510", // Course
                   1, // Category
                   "Chapter 9: Inheritance"); // Description
  
    generateEvent2("Email Bruce",
                  1,
                   "05/10/2014",
                  "02:00 PM",
                  "COMP1510",
                   6,
                  "About term 1 final marks");
    
    generateEvent2("Assignment 3 muy importante",
                   3,
                   "",
                   "",
                   "COMP1510",
                   3,
                   "Part 3 Watch GUI");
    
    generateEvent2("Number representation quiz",
                   0,
                   "05/25/2014",
                   "12:30 PM",
                   "COMP1113",
                   4,
                   "Do practice exercises to study");

    generateEvent2("Apply for co-op",
                   3,
                   "",
                   "",
                   "",
                   0,
                   "Need to update resume and writeup");
    
    //Refresh the page to update All Events
    pageRefreshSwipeDelete();
}

function clearEventDatabase() {
    var db = taskdb.webdb.db;
    db.transaction(function(tx){
        tx.executeSql("DELETE FROM events", [],
                      taskdb.webdb.onSuccess,
                      taskdb.webdb.onError);
    });
    pageRefreshDelete();
}

function clearCourseDatabase() {
    var db = coursedb.webdb.db;
    db.transaction(function(tx){
        tx.executeSql("DELETE FROM courses", [],
                      taskdb.webdb.onSuccess,
                      taskdb.webdb.onError);
    });
    pageRefreshDelete();
}
