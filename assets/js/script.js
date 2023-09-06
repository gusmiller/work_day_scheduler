/*!
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under MIT
 * Assignment - 05 Work Day Scheduler
 */

/**
 * Main jQuery entry call. Wrapped after the page load process has been completed and document can be manipulated safely.
 * It contains all functions available.
 */
$(document).ready(function () {

  /**
   * 
   */
  function retrieveData(){

  }

  /**
   * This function will iterate through the sections in the scheduler and validate current time is being
   * properly handled. As time runs the hours change and application needs to refresh its state. This could cause some
   * performance issues but it is ok for now.
   */
  function validateCurrent() {
    var currentHour = dayjs().format("HH"); // This will retrieve the current hour
    var newTimeFormatted = "newTime" + currentHour;

    var $parent = $('#timeBlockArea');

    // Iterate through all elements in the timeBlockArea. I had  used a selector like this $(#timeBlockA > Section)
    // but I did not have the accessibility I was hoping for. This method works fine
    $parent.children().each(function () {

      if (this.id != "newTime04") { // Avoid this element -it is hidden.

        var selectTimeBlock = $("#" + this.id); // Build the id in string
        var text = selectTimeBlock.children().eq(0).text(); // Grab the time from children element
        var hour = parseInt(text.replace(":00", "")); // Remove the minutes format and convert into integer

        selectTimeBlock.removeClass("past present future nonworking"); // Get rid of classes

        // Re-assign the classes based on the time criteria; some hours are non-working hours, past, current 
        // and future hours. Note: requirement does not ask for non-working hours, but I put them for higher
        // visualization of the day
        if (+hour <= 5 || +hour >= 21) {
          selectTimeBlock.addClass("nonworking")
        } else if (+currentHour == hour) {
          selectTimeBlock.addClass("present")
          disableItem = "";
        } else if (hour > +currentHour && hour <= 18) {
          selectTimeBlock.addClass("future")
          disableItem = "";
        } else {
          selectTimeBlock.addClass("past")
        }
      }

    });
  }

  /**
   * Initialize the page time-block elements, set their color and availability based in the time. We need t
   * build the HTML from scratch using text strings. I had in mind to CLONE a template row and add it but
   * it would not add; as the next row. Leave for later.
   */
  function init() {
    var newTimeBlock = $("#newTime05").clone(); // Initial mechanism to create DOM - not successfull

    var currentHour = dayjs().format("HH"); // This will retrieve the current hour

    // Iterate through the hours that would be included in the scheduler. We are using non-working hours
    // only to demonstrate that we can handle them. This runs automatically when document is ready and it
    // will start a timer to refresh when the current hour changes.
    for (var hour = 5; hour < 23; hour++) {
      var insertLocation = addLeadingZero(hour - 1); // this is a hack to starting point
      var formattedHour = addLeadingZero(hour); // Intentionally done d
      var time = formattedHour + ":00";
      var newTimeFormatted = "newTime" + formattedHour;

      // Work on disabling items and setting up the colors of the time blocks. Note: this will have to be
      // executed once loaded but then it should trigger every hour.
      var disableItem = " disabled";
      var statusTimeColor = "past";

      if (+hour <= 5 || +hour >= 21) {
        statusTimeColor = "nonworking";
      } else if (+currentHour == hour) {
        statusTimeColor = "present";
        disableItem = "";
      } else if (hour > +currentHour && hour <= 18) {
        statusTimeColor = "future";
        disableItem = "";
      }

      // Build HTML code using string and concatenating variables; slick but not the way I would 
      // like it. Line #62 contains the clone I had in mind, but was not implemented. Kept code for 
      // future implementations.
      var htmlCode =
        '<section id="' + newTimeFormatted + '" class="row time-block ' + statusTimeColor + '">' +
        '<div class="col-2 col-md-1 hour text-center py-3">' + time + "</div>" +
        '<textarea class="col-8 col-md-10 description" rows="3"> </textarea>' +
        '<button type="button" class="btn saveBtn col-2 col-md-1" aria-label="save"' + disableItem + ">" +
        '<i class="fas fa-save" aria-hidden="true"></i></button></section>';

      $(htmlCode).insertAfter("#newTime" + insertLocation);

      // The following code, is kept for future implementations. It was intended to work in combination with 
      // the cloning on line #62.
      //
      // newTimeBlock.attr("id", newTimeFormatted);
      // newTimeBlock.children().eq(0).text(time);
      // newTimeBlock.insertAfter("#newTime" + insertLocation);
    }

    // Display the date on hero section
    $("#currentDay").text(dayjs().format("MMMM DD, YYYY"));

    //Set an interval of 30 minutes to run this function
    setInterval(validateCurrent, 60 * 1000);
  }

  /**
   * This function receives the hour being processed, then adds a leading zero and returns the results. This could
   * have been implemented in the calling function, but we want to demonstrate that we can use out-side resources.
   * @param {*} num
   * @returns
   */
  function addLeadingZero(num) {
    return num < 10 ? "0" + num : num;
  }

  init();
});
