$(document).ready(function() {
    // Default Train Timing
    var tFrequencyD = 25;
    var firstTimeD = "05:25";
    var firstTimeConvertedD = moment(firstTimeD, "hh:mm").subtract(1, "years");
    var currentTimeD = moment();
    var diffTimeD = moment().diff(moment(firstTimeConvertedD), "minutes");
    var tRemainderD = diffTimeD % tFrequencyD;
    var tMinutesTillTrainD = tFrequencyD - tRemainderD;
    var nextTrainD = moment().add(tMinutesTillTrainD, "minutes");
    
    // Where new trains will go
    var allTrains = [
        defaultTrain = {
            name: "Billy's Choo Choo",
            destination: "Funky Town",
            frequency: 25,
            nextArrival: moment(nextTrainD).format("hh:mm"),
            minutesAway: tMinutesTillTrainD
    },
];

    // Form submit --- add train
    $("#submit").on('click', function() {
        event.preventDefault();
        newtrain();
    })

    // Adding a train
    function newtrain() {
        // Assumptions
        var tFrequency = $("#frequency").val();
        // Time is 3:30 AM
        var firstTime = $("#train-time").val();
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

        // Make a new object for new train
        newTrain = {
            name: $("#train-name").val(),
            destination: $("#destination").val(),
            frequency: tFrequency,
            nextArrival: moment(nextTrain).format("hh:mm"),
            minutesAway: tMinutesTillTrain
        }
        // Add newTrain to allTrains array
        allTrains.push(newTrain);
        console.log(allTrains);
        renderTrains();
    }

    renderTrains();
    function renderTrains() {
        $("#trains-display").empty();
        for (var i = 0; i < allTrains.length; i++) {
            var row = $('<div class="row py-2 border-top">');
            var nameD = $('<div class="col-4">');
            nameD.append(allTrains[i].name);
            row.append(nameD);
            var destinationD = $('<div class="col-2">');
            destinationD.append(allTrains[i].destination);
            row.append(destinationD);
            var frequencyD = $('<div class="col-2">');
            frequencyD.append(allTrains[i].frequency);
            row.append(frequencyD);
            var nextD = $('<div class="col-2">');
            nextD.append(allTrains[i].nextArrival);
            row.append(nextD);
            var awayD = $('<div class="col-2">');
            awayD.append(allTrains[i].minutesAway);
            row.append(awayD);
            $("#trains-display").append(row);
        }
        console.log(allTrains);
    }



// END OF JS
});