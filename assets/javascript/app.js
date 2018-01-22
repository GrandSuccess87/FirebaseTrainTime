  // Initialize Firebase
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

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";

var dataRef = firebase.database();

$("#submit-button").on("click", function(event){

event.preventDefault();

var trainName = $("#train-name-input").val().trim();
var destination = $("#destination-input").val().trim();
var firstTrainTime = $("first-train-time-input").val().trim();
var frequency = $("frequency-input").val().trim();

dataRef.ref().push({

name: trainName,
destination: destination,
firstTrainTime: firstTrainTime,
frequency: frequency
dataAdded: firebase.database.ServerValue.TIMESTAMP

})


data.ref().on("child_added", function(childSnapshot){

console.log(childSnapshot.val().name);
console.log(childSnapshot.val().destination);
console.log(childSnapshot.val().firstTrainTime);
console.log(childSnapshot.val().frequency);
console.log(childSnapshot.val().joinDate);

})

$(".card").append("<div class='card2'><span class='train-name'>" + childSnapshot.val().name + "</span><span class='train-destination'>" + childSnapshot.val().destination + "</span><span class='first-train-time'>" + childSnapshot.val().firstTrainTime + "</span><span class='train-frequency'>" + childSnapshot.val().frequency + "</span></div>");

}, function(errorObject) {

    console.log("Errors handled" + errorObject.code);
}

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

$("#name-display").text(snapShot.val().name);
$("#destination-display").text(snapShot.val().destination);
$("#frequency-display").text(snapShot.val().frequency);
$("#next-display").text(snapShot.val().nextArrival);
$("#away-display").text(snapShot.val().minutesAway);


});


