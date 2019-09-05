
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyBNlHs40h_Hflzka93Rmvzc6ulv5XzyGJI",
            authDomain: "train-scheduling-693d1.firebaseapp.com",
            databaseURL: "https://train-scheduling-693d1.firebaseio.com",
            projectId: "train-scheduling-693d1",
            storageBucket: "train-scheduling-693d1.appspot.com",
            messagingSenderId: "1019862013000",
            appId: "1:1019862013000:web:182eecab047674fa"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        var database = firebase.database();  

$(document).ready(function() {
    // Form submit --- add train
    $("#submit").on('click', function() {
        event.preventDefault();
        var name = $("#train-name").val();
        var destination = $("#destination").val();
        var firstTrainTime = $("#train-time").val();
        var frequency = $("#frequency").val();

        database.ref().push({
            name: name,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })
    });

    database.ref().on('child_added', function(childSnapshot){
        // Assumptions
        var tFrequency = childSnapshot.val().frequency;
        // Time is 3:30 AM
        var firstTime = childSnapshot.val().firstTrainTime;
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);
        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


        var row = $("<div class='row py-2 border-top'>");

        $(row).append(
            "<div class='col-4'>" + childSnapshot.val().name,
            "<div class='col-2'>" + childSnapshot.val().destination,
            "<div class='col-2'>" + childSnapshot.val().frequency,
            "<div class='col-2'>" + moment(nextTrain).format("hh:mm"),
            "<div class='col-2'>" + tMinutesTillTrain
        )

        $("#trains-display").append(row);
    })

// END OF JS
});