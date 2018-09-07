$(document).ready(function () {
  console.log("hello");

  var config = {
    apiKey: "AIzaSyAncmCOJd-1vA8QdIlJPoVgysFBlMiOrRQ",
    authDomain: "train-schedule-app-14721.firebaseapp.com",
    databaseURL: "https://train-schedule-app-14721.firebaseio.com",
    projectId: "train-schedule-app-14721",
    storageBucket: "",
    messagingSenderId: "51306655280"
  };


  firebase.initializeApp(config);

  //Initial Values 
  var currentTime;
  var timeDifference;
  var firstTime;
  var tRemainder;
  var nextArrival;
  var minutesAway;
  var nextTrain;
  


  var dataRef = firebase.database();

  $("#submit-button").on("click", function (event) {


    event.preventDefault();

    // Grabbing users' input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = $("#first-train-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();


    // Creating a new train entry
    var newEntry = {
      name: trainName,
      destination: destination,
      time: firstTrainTime,
      frequency: frequency,
      dataAdded: firebase.database.ServerValue.TIMESTAMP

    }
    console.log(newEntry);

    dataRef.ref().push(newEntry);

    //Logs everything to console
    console.log(newEntry.name);
    console.log(newEntry.destination);
    console.log(newEntry.time);
    console.log(newEntry.frequency);

  

    //Set Input to empty after user presses submit and child is added
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");

  });

  dataRef.ref().on("child_added", function (childSnapshot) {


    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;
    // console.log(childSnapshot.val().joinDate);


    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    //Current Time
    currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    //First Time train arrives
    formattedFirstTime = moment(firstTrainTime, "hh:mm");
    console.log(formattedFirstTime);

    //Difference between current time and first train time
    timeDifference = moment().diff(moment(formattedFirstTime), "minutes");
    console.log(timeDifference);

    //Use % to obtain Modulus and Remainder 
    tRemainder = timeDifference % frequency;
    console.log(tRemainder);

    //Minutes until train arrives
    minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    nextArrival= moment().add(moment(minutesAway), "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

    nextTrain = moment(nextArrival).format("hh:mm");

    // Append the new row of data to the table body
    var newRow = "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td></tr>";
    
        $("tbody").append(newRow);


      })
    })
    
    // frequency - tRemainder/modulus = x
    // x = minutes away
    // currentTime + x = arrival of train 







    // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
// and find the difference between the modulus and the frequency.

// 6:23

// 5:00

// diff is 83 mins

// frequency = 10

// 83 / 10 = 8 remainder/modulus 3

// 10 - 3 = 7 mins away : difference between modulus and frequency

    // //First Train Time
    // firstTime = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    // console.log(firstTime);

    // // Difference between current time and first train time in minutes
    // timeDifference = moment().diff(moment(firstTime), "minutes");
    // console.log(timeDifference);


    //  // Time apart (remainder)
    //  tRemainder = timeDifference % frequency;
    //  console.log(tRemainder);
 
    //  // Minute Until Next Train - need to change to moment js; need a readable time.
    //  tMinutesTillTrain = frequency - tRemainder;
    //  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
 
    //  // Next Train
    //  nextTrain = moment().add(tMinutesTillTrain, "minutes");
    //  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    //  alert("Train added successfully");
  

// Add each train's data into the table
//  $("tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("h:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");


