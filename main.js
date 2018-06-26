var config = {
    apiKey: "AIzaSyArlfNlD3AOyeIprXR-nmBS8vXnbw-oAsI",
    authDomain: "train-schedule-5385b.firebaseapp.com",
    databaseURL: "https://train-schedule-5385b.firebaseio.com",
    projectId: "train-schedule-5385b",
    storageBucket: "train-schedule-5385b.appspot.com",
    messagingSenderId: "238922506749"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

  var nName = $("#name-input").val().trim();
  var nDestination = $("#destination-input").val().trim();
  var nTime = moment($("#time-input").val().trim(), "DD/MM/YY").format("X");
  var nFreq = $("#freq-input").val().trim();

  var newTrain = {
    name: nName,
    destination: nDestination,
    time: nTime,
    freq: nFreq
  };

  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.freq);


   // Clears all of the text-boxes
   $("#name-input").val("");
   $("#destination-input").val("");
   $("#time-input").val("");
   $("#freq-input").val("");
});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var newName = childSnapshot.val().name;
    var newDestination = childSnapshot.val().destination;
    var newTime = childSnapshot.val().time;
    var newFreq = childSnapshot.val().freq;
  
    // Employee Info
    console.log(newName); 
    console.log(newDestination);
    console.log(newTime);
    console.log(newFreq);


    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(newTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % newFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain =  newFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + newName + "</td><td>" + newDestination + "</td><td>" +
    newFreq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });