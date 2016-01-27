
/* Returns true if array contains a specified value */
Array.prototype.contains = function(value) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === value) return true;
    }
    return false;
};

/* Creates an array of unique values and returns it */
Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}

/* DISPLAY PRIORITY STARS, USABLE FOR HOMEPAGE AND ALL EVENTS */
function loadStars(priorityInt, starImgContainer) {
    starImgContainer.empty();
    if (priorityInt == 0) priorityInt = 1; 
    for (var i = 0; i < priorityInt; i++) {
        starImgContainer.prepend('<img class="homepageStars" src="resources/images/tw_icon_star.png">');
    }
}

/* check title */
function checkTitle(){
    var titleTest = $('#eventName').val();
    var patt = new RegExp(/[\S]+/);
    var res = patt.test(titleTest);
    
    if (res) {
        $('#input-save').addClass('white-text');
        $('#title-img').attr('src',"resources/images/tw_icon_input_title.png");
        $('input')[0].placeholder = 'Event Title';
    } else {
        $('#input-save').removeClass('white-text');
        $('input')[0].placeholder = 'Please enter a title';
        $('#title-img').attr('src',"resources/images/tw_icon_input_title_red.png");
    }
    
    
    /*
    if (!res){
        emptyTitleSave = true;
    }    
        if (emptyTitleSave){
            $('input')[0].placeholder = 'Please enter a title';
            emptyTitleSave = false;        

        } else {
            $('input')[0].placeholder = 'Event Title';
        }
        $('#title-img').attr('src',"resources/images/tw_icon_star.png");
       /* 
    } else {

        $('#title-img').attr('src',"resources/images/tw_icon_input_title.png");
    }*/
}

/* checks to see whether an ID exists already for this task */
function checkForID(){

    //checks to see if a title has been entered
    var titleTest = $('#eventName').val();
    var patt = new RegExp(/[\S]+/);
    var res = patt.test(titleTest);

    checkTitle();
    
    if(res){
        if (existingID != -1) {
            updateExistingEvent();
            // Load newly updated database values on HP, AE, and Course Popup
            loadHomepageEvents();
            taskdb.webdb.getAllTodoItems(loadAllEventsHeaders); // load event header divs
            taskdb.webdb.getAllTodoItems(loadEventsIntoHeaders);
            loadCoursesIntoPopup();
            //may not need this, page seems to refresh without this
            //$('#homepage').trigger('create');
        } else {
            saveEvent();   
        }
        //refresh page and return to homepage
        pageRefresh();
        window.location="#homepage";
    }     
}

/* checks title field before saving to db*/
function saveEvent(){
    addEvent(); // add to database
    loadHomepageEvents(); // re-render homepage
    taskdb.webdb.getAllTodoItems(loadAllEventsHeaders); // re-render all events page headers
    taskdb.webdb.getAllTodoItems(loadEventsIntoHeaders); // re-render all events page
    loadCoursesIntoPopup(); // re-render course pop up
}

/*-----------||||| ROllOVERS AND ANIMATIONS |||||----------*/

/* save button turns white when title is entered */
function saveColor() {

    // check if title field has non-whitespace chars
    var titleTest = $('#eventName').val();
    var patt = new RegExp(/[\S]+/);
    var res = patt.test(titleTest);

    // change colors
    if(res){
        $('#saveButton a').addClass('white-text');
    } else {
        $('#saveButton a').removeClass('white-text');
    }
}


/*----- course and category -----*/
function popRolloverOn(id) {
    $(id).addClass('pop-rollover');
}

function popRolloverOff(id) {
    $(id).removeClass('pop-rollover');
}

/*----- save and back button -----*/

function inputNavRolloverOn(id) {
    $(id).addClass('input-nav-rollover');
}

function inputNavRolloverOff(id) {
    $(id).removeClass('input-nav-rollover');
}

/*----- set stars for priority onclick -----*/

// priority 3 is selected
function star3(){
    setBlueStar("#inputStar1");
    setBlueStar("#inputStar2");
    setBlueStar("#inputStar3");
}

// priority 2 is selected
function star2(){
    setBlueStar("#inputStar1");
    setBlueStar("#inputStar2");
    setGreyStar("#inputStar3");
}

// priority 1 is selected
function star1(){
    setBlueStar("#inputStar1");
    setGreyStar("#inputStar2");
    setGreyStar("#inputStar3");
}

// reset stars
function starReset(){
    setGreyStar("#inputStar1");
    setGreyStar("#inputStar2");
    setGreyStar("#inputStar3");
}

// changes to grey star img
function setGreyStar(id){
    $(id).attr('src',"resources/images/tw_icon_input_starGrey.png");
}

// changes to blue star img
function setBlueStar(id){
    $(id).attr('src','resources/images/tw_icon_star.png');
}

/*----- field focus animation -----*/

/* title field */
$(document).ready(function() {
    $('#eventName').bind('focus', function() {
        $('#title-border').addClass('blue');
    });
    $('#eventName').bind('blur', function() {
        $('#title-border').removeClass('blue');
    });
});

/* new course */
$(document).ready(function() {
    $('#newCourse').bind('focus', function() {
        $('#new-course-border').addClass('blue');
    });
    $('#newCourse').bind('blur', function() {
        $('#new-course-border').removeClass('blue');
    });
});

/* description */
$(document).ready(function() {
    $('#details').bind('focus', function() {
        $('#description-border').addClass('blue');
    });
    $('#details').bind('blur', function() {
        $('#description-border').removeClass('blue');
    });
});

/*----------||||| PREVIOUS PAGE REDIRECTION |||||----------*/

function previousPage(previousPage){
    switch(previousPage){
        case 1:
            window.location="#homepage";
            break;
        case 2:
            window.location="#allEvents";
            break;
        case 3:
            window.location="#history";
            break;
        default:
            window.location="#homepage";
            break;
    }
}

/*-----------||||| COURSES |||||----------*/

/* Save new course to database */
function getNewCourse(){
    newCourseName = $('#newCourse').val();

    var patt = new RegExp(/[\S]+/);
    var res = patt.test(newCourseName);

    if(patt.test(newCourseName)){
        
        $("#addHere").prepend("<table style='width: 100%'><tr><td class='course-option'><a href='index.html/#newEvent'>"
                              + "<div onclick='courseName=this.innerHTML;displayCourseName();'>"
                              + newCourseName + "</div>"
                              + "</a></td><td class='course-icon'><img src='resources/images/tw_icon_removeEvent.png'>"                              
                              + "</td></tr></table>");
        
        // Add the new course to the database
        addCourse();
        resetNewCourse();
    }
}

function resetNewCourse(){
    $('#newCourse').val("");
}

/* display the selected course */
function displayCourseName() {
    $('#coursePopupText').text(courseName);
}

/*----------||||| FIELD RESET |||||----------*/

function resetInputs() {

    // reset variables
    existingID = -1;
    newCourseName = "";
    priority = 0;
    eventDate = "";
    time = "";
    courseName = "";
    category = 0;
    description = "";

    // reset fields
    $("#inputpage")[0].reset();    
    //$('#eventName').val="";
    // $('#').val="";
    $('#datepicker').val("");
    $('#demo').val("");
    $('#categoryPopupText').text('Select a Category');
    $('#coursePopupText').text('Select a Course');

    starReset();
}

/*----------||||| PSEUDORANK |||||----------*/

function pseudoRank(ppriority , pdate, ptime, pcategory) {
    // this value is returned
    var pseudorankValue; // (0, 1 to 9, 100, 1000) 

    // whether the event priority has been set by the user
    var isUserDefined = false; 

    // function to determine whether the event priority is user defined
    if (ppriority > 0) {
        isUserDefined = true;
    } else {
        ppriority = presetPriority(pcategory);

        // Set the priority based on category
        priority = ppriority;
    }

    // Calculate hours until the event date
    var timeHrs = calcHours(pdate, ptime);

    // Whether the event is time-bumped or not
    var isBumped = timeBump(pcategory, timeHrs);

    // Check if the event will occur within 2 weeks and 4 hours
    if (timeHrs > 340) {
        // the event will not be displayed
        pseudorankValue = 0;
        return(pseudoRank);
    } else {

        // calculate pseudorank
        switch(ppriority) {
            case 1:
                pseudorankValue = 1;
                if (isBumped) {            
                    if (isUserDefined){                    
                        pseudorankValue = 5;                     
                    } else {                    
                        pseudorankValue = 2;            
                    }             
                } else if (isUserDefined) {
                    pseudorankValue = 3;
                }

                break;

            case 2:       
                pseudorankValue = 4;            
                if (isBumped) {                 
                    pseudorankValue = 8;            
                } else if (isUserDefined) {                
                    pseudorankValue = 6;                         
                }

                break;

            case 3: 
                pseudorankValue = 7;
                if (isBumped) {
                    if (isUserDefined) {
                        pseudorankValue = 9000;
                    } else {
                        pseudorankValue = 9;
                    }
                } else if (isUserDefined) {
                    pseudorankValue = 100;
                }

                break;
            default:
                pseudorankValue = 1;
        }
    }
    return(pseudorankValue);
}

/*----------||||| Pseudorank Support Functions |||||----------*/

/* calculate the number of hours until the event */
function calcHours(calcDate, calcTime) {

    // Get the event Date
    var d = Date.parse(calcDate);

    // define time constants for conversions
    var minutes = 1000 * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    var years = days * 365;

    // calculates until midnight of the event date
    var hoursFromToday = (d - date.getTime())/hours;
    if (hoursFromToday < 0){
        hoursFromToday = parseInt("0");
    }

    return(hoursFromToday);

    // parse the event time
    var timeStringHours = calcTime.match(/[\d]+/);
    var tempMins = calcTime.match(/:[\d]+/) + "";
    var timeStringMinutes = tempMins.match(/[\d]+/);    

    // check whether the time is AM or PM
    var patt = new RegExp(/PM/);
    if(patt.test(calcTime + "")){
        // add 12 hours if PM
        hoursFromToday += 12;
    }

    // calculate total hours until event date and time
    hoursFromToday += parseInt(timeStringHours + "") + parseInt(timeStringMinutes + "")/(60);

    return(hoursFromToday);
}

function calcHours2(calcDate, calcTime) {

    // Get the event Date
    var d = Date.parse(calcDate);

    // define time constants for conversions
    var minutes = 1000 * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    var years = days * 365;

    // calculates until midnight of the event date
    var hoursFromToday = (d - date.getTime())/hours;
    if (hoursFromToday < 0){
        hoursFromToday = parseInt("0");
    }

    // parse the event time
    var timeStringHours = calcTime.match(/[\d]+/);
    var tempMins = calcTime.match(/:[\d]+/) + "";
    var timeStringMinutes = tempMins.match(/[\d]+/);    

    // check whether the time is AM or PM
    var patt = new RegExp(/PM/);
    if(patt.test(calcTime + "")){
        // add 12 hours if PM
        hoursFromToday += 12;
    }

    // calculate total hours until event date and time
    hoursFromToday += parseInt(timeStringHours + "") + parseInt(timeStringMinutes + "")/(60);

    return(hoursFromToday);
}

/* Whether the event is time-bumped */
function timeBump(bumpCategory, bumpTime){

    // Set time thresholds
    var examThreshold = 172;
    var quizThreshold = 52;
    var assignmentThreshold = 124;
    var readingThreshold = 28;


    switch(bumpCategory){

            // project meetings and other events are not time bumped
        case 2:
        case 6:
            return(false);

            // Reading Assignment
        case 1:
            if(bumpTime < readingThreshold){
                return(true);
            } else {
                return false;
            } break;

            // Assignment
        case 3:
            if(bumpTime < assignmentThreshold){
                return(true);
            } else {
                return false;
            } break;

            // Quiz
        case 4:
            if(bumpTime < quizThreshold){
                return(true);
            } else {
                return false;
            } break;

            // Exam
        case 5:
            if(bumpTime < examThreshold){
                return(true);
            } else {
                return false;
            } break;

        default: 
            return(false);
    }
}

/* Sets event priority based on selected category */
function presetPriority(presetCategory){
    switch(presetCategory){
        case 5:         // exam
            return 3;
        case 4:         // quiz
        case 3:         // assignment
        case 2:         // project meeting
            return 2;
        case 6:         // other
        case 1:         // reading
            return 1;
        default:
            return 0;
    }
}
