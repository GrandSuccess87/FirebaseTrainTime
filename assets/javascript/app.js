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
  


  var dataRef = firebase.database();

  $("#submit-button").on("click", function (event) {


    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = $("#first-train-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();



    var newEntry = {
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
      dataAdded: firebase.database.ServerValue.TIMESTAMP

    }
    console.log(newEntry);

    dataRef.ref().push(newEntry);

  });

  dataRef.ref().on("child_added", function (childSnapshot) {


    console.log(childSnapshot.val());

    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().joinDate);


    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;


    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency); 

    //Set Input to empty after user presses submit and child is added
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");

 


  
    // //Current Time
    currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    formattedFirstTime = moment(firstTime, "hh:mm");
    console.log(formattedFirstTime);

    timeDifference = moment().diff(moment(firstTime), "minutes");
    console.log(timeDifference);

    tRemainder = timeDifference % frequency;
    console.log(tRemainder);

    minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    nextArrival= moment().add(moment(minutesAway), "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

    var newRow = "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>";
    
        $("tbody").append(newRow);
    
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


})
})