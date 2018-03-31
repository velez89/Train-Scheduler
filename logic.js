// Firebase
var config = {
  apiKey: "AIzaSyCR1xt93yBkA-zZtJNXlkyv9rBL6pyLzug",
  authDomain: "trainschedule-b2cad.firebaseapp.com",
  databaseURL: "https://trainschedule-b2cad.firebaseio.com",
  projectId: "trainschedule-b2cad",
  storageBucket: "trainschedule-b2cad.appspot.com",
  messagingSenderId: "820153334054"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Schedule time
$("#add-schedule-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trnName = $("#train-name-input").val().trim(); 
  var trnDestination = $("#destination-input").val().trim();
  var trnStart = moment($("#start-input").val().trim(), "HH:mm").format("LT");
  var trnFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding schedule 
  var newSchedule = {
    name: trnName,
    role: trnDestination,
    start: trnStart,
    rate: trnFrequency
  };

  // Uploads schdule data to database
  database.ref().push(newSchedule);

  // Logs everything to console
  console.log(newSchedule.name);
  console.log(newSchedule.role);
  console.log(newSchedule.start);
  console.log(newSchedule.rate);

  // Alert
  alert("New schedule time successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");

});

// Add child to firebase when user adds entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trnName = childSnapshot.val().name;
  var trnDestination = childSnapshot.val().role;
  var trnStart = childSnapshot.val().start;
  var trnFrequency = childSnapshot.val().rate;

  // Train Information
  console.log(trnName);
  console.log(trnDestination);
  console.log(trnStart);
  console.log(trnFrequency);

  // Calculate Minutes Away
  var trnStartConvert = moment(trnStart, "hh:mm").subtract(1, "minutes");
  var diffArrival = moment().diff(moment(trnStartConvert), "minutes");
  var tRemainder = diffArrival % trnFrequency;
  var mntsAway = trnFrequency - tRemainder;
 

  // Calculate Arrival Time 
  var nxtArrival = moment().add(mntsAway, "hh:mm");



  // Add each train's data into the table
  $("#schedule-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" +
  trnFrequency + "</td><td>" + nxtArrival + "</td><td>" + mntsAway + "</td></tr>");
});

