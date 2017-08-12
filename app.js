  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCX8twXx3C5W0Z_8qbcvzzcy-QxGoolRO0",
    authDomain: "train-scheduler-b8fd3.firebaseapp.com",
    databaseURL: "https://train-scheduler-b8fd3.firebaseio.com",
    projectId: "train-scheduler-b8fd3",
    storageBucket: "train-scheduler-b8fd3.appspot.com",
    messagingSenderId: "161710943505"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  //Button for adding employee.
  $("#submit").on("click",function(event) {
      //Grab input from user.
    event.preventDefault();
    
  
    
    var trainName = $('#train-name').val().trim();
    var destination = $('#destination').val().trim();
    var time = $('#time').val().trim();
    var frequency = $('#frequency').val().trim();
    
    database.ref().push({
      trainName: trainName,
      destination : destination,
      time: time,
      frequency: frequency
    });
    
    console.log(trainName);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    clearForms;
    
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log("Train name: "+childSnapshot.val().trainName);
    console.log("Destination: "+childSnapshot.val().destination);
    console.log("Time: "+childSnapshot.val().time);
    console.log("Frequency: "+childSnapshot.val().frequency);

    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var startTime = childSnapshot.val().time;

    //var currentMin = moment();
    var fixTime = moment(startTime, "hh:mm").subtract(1, "years");
    var timeDiff = moment().diff(moment(fixTime), "minutes");
    var timeRemaining = timeDiff % frequency;
    var minutesAway = frequency - timeRemaining;       
    var nextTrain = moment().add(minutesAway, "minutes");
    var nextArrival = moment(nextTrain).format("LT");
    
    //var day = childSnapshot.val().startDate.substring(, 9); 
    
     $("#showTrainData").append("<tr><td>" + trainName + "</td>" + 
                     "<td>" + destination + "</td>" +
                     "<td>" + frequency + "</td>" +
                     "<td>" + nextArrival + "</td>" +
                     "<td>" + minutesAway + "</td>");
    
  });

  clearForms = function(){
     $('#train-name').val("");
     $('#destination').val("");
     $('#time').val("");
     $('#frequency').val("");
  }
  
  
