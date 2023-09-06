/*!
* Carleton Bootcamp - 2023
* Copyright 2023 Gustavo Miller
* Licensed under MIT 
* Assignment - 05 Work Day Scheduler
*/

// TODO: Add a listener for click events on the save button. 
//    This code should use the id in the containing time-block as a key to save the user input in local storage. 
//    HINT: What does `this` reference in the click listener function? 
//    How can DOM traversal be used to get the "hour-x" id of the time-block containing the button that was clicked? 
//    How might the id be useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.

/**
 * Main jQuery entry call. Wrapped after the page load process has been completed and document can be manipulated safely. 
 * It contains all functions available.
 */
$(document).ready(function () {



  /**
   * Initialize the page
   */
  function init() {

    var newTimeBlock = $('#newTime06').clone();
    var currentHour = dayjs().format('HH') // This will 

    console.log(dayjs().format('HH'));

    for (var hour = 6; hour < 21; hour++) {

      var insertLocation = addLeadingZero(hour - 1);
      var formattedHour = addLeadingZero(hour);
      var time = formattedHour + ":00";
      var newTimeFormatted = "newTime" + formattedHour;

      // Work on disabling items and setting up the colors of the time blocks. Note: this will have to be 
      // executed once loaded but then it should trigger every hour.
      var disableItem = " disabled";
      var statusTimeColor = "past";

      if (+currentHour == hour){
        statusTimeColor="present";
        disableItem = "";
      }else if( hour > +currentHour && hour <= 18){
        statusTimeColor="future";
        disableItem = "";
      }

      if (hour > 6) {

        var htmlCode = '<section id="' + newTimeFormatted + '" class="row time-block ' + statusTimeColor + '">'
          + '<div class="col-2 col-md-1 hour text-center py-3">' + time + '</div>'
          + '<textarea class="col-8 col-md-10 description" rows="3"> </textarea>'
          + '<button type="button" class="btn saveBtn col-2 col-md-1" aria-label="save"'
          + disableItem + '>'
          + '<i class="fas fa-save" aria-hidden="true"></i></button></section>'

        $(htmlCode).insertAfter("#newTime" + insertLocation);

        // newTimeBlock.attr("id", newTimeFormatted);
        // newTimeBlock.children().eq(0).text(time);
        // newTimeBlock.insertAfter("#newTime" + insertLocation);
      }else{
        $('#newItem06').children('button').attr("disabled", true);
      }
    }

    $('#currentDay').text(dayjs().format('MMMM DD, YYYY'));

  };

  function addLeadingZero(num) {
    return num < 10 ? "0" + num : num;
  }

  init();

})

