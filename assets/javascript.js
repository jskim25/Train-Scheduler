// Week 7 Homework - Train Scheduler

$(document).ready(function() {

    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyD8sK60RReY45LhY-zHINSRQ9Elt9tET9I",
    authDomain: "train-scheduler-3fc87.firebaseapp.com",
    databaseURL: "https://train-scheduler-3fc87.firebaseio.com",
    projectId: "train-scheduler-3fc87",
    storageBucket: "train-scheduler-3fc87.appspot.com",
    messagingSenderId: "970796206422"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    // Create on-click function
    $("#add-train-btn").on("click", function() {

        // Takes the value of user's input
        var trainName = $("#name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var firstTrain = $("#start-input").val().trim();
        var trainFrequency = $("#frequency-input").val().trim();

        // Set it to Firebase
        database.ref().push( {
            name: trainName,
            destination: trainDestination,
            start: firstTrain,
            frequency: trainFrequency
        });
        
        // Now clear the inputs
        $("#name-input").val("");
        $("#destination-input").val("");
        $("#start-input").val("");
        $("#frequency-input").val("");
        
    });
    
    // Create Firebase event for adding trains to the database
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

        // Console log the values to make sure everything is captured correctly
        // console.log(childSnapshot.val());
      
        // Store the values into variables
        var newName = childSnapshot.val().name;
        var newDestination = childSnapshot.val().destination;
        var newFrequency = childSnapshot.val().frequency;
        var newFirstTrain = childSnapshot.val().start;

        // This set of variables will be used to calculate next train arrival and number of minutes away
        var firstTrainConverted = newFirstTrain.split(":");
        var nextTrain = moment().hours(firstTrainConverted[0]).minutes(firstTrainConverted[1]);
        var maxMoment = moment.max(moment(), nextTrain);
        var tNextArrival;
        var tMinutesAway;
        
        // If the first train is set to depart after the current time, arrival is the same as first train time
        if (maxMoment === nextTrain) {
            tNextArrival = nextTrain.format("hh:mm A");
            tMinutesAway = nextTrain.diff(moment(), "minutes");
        }
        
        // Otherwise, need to figure out next train time and how many minutes that is from current time
        else {
            // To calculate the minutes till arrival, take the current time and subtract the first train time
            var differenceTimes = moment().diff(nextTrain, "minutes");
            // Take the remainder between the difference and the frequency.
            var tRemainder = differenceTimes % newFrequency;
            // Then subtract that from the frequency to get the remaining minutes
            tMinutesAway = newFrequency - tRemainder;
            // To calculate the arrival time, add the remaining minutes to the currrent time
            tNextArrival = moment().add(tMinutesAway, "m").format("hh:mm A");
        }

            // Console log to make sure they are calculated correctly
            // console.log("tMinutesAway:", tMinutesAway);
            // console.log("tNextArrival:", tNextArrival);
    
            // Append each of the values to the table
            $("#train-table > tbody").append("<tr><td>" + newName + "</td><td>" + newDestination + "</td><td>" +
            newFrequency + "</td><td>" + tNextArrival + "</td><td>" + tMinutesAway + "</td></tr>");
    });

    // Console log any errors
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);

});
