//initialize fairebase
//creat button for adding new train

//initialize fairebase
var config = {
  apiKey: "AIzaSyDyDrnpk_3sLbXD-oJhW3Y09ZVi_fJccac",
  authDomain: "train-scheduler-serena.firebaseapp.com",
  databaseURL: "https://train-scheduler-serena.firebaseio.com",
  projectId: "train-scheduler-serena",
  storageBucket: "train-scheduler-serena.appspot.com",
  messagingSenderId: "350282738380"
};
$(document).ready(function() {
  // Handler for .ready() called.

  firebase.initializeApp(config);

  var database = firebase.database();

  // Variables for the onClick event
  var name;
  var destination;
  var firstTrain;
  var frequency = 0;

  function currentTime() {
    var current = moment().format("LT");
    $("#currentTime").html(current);
    setTimeout(currentTime, 1000);
  }

  //buttons for addiing trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    console.log("testing");
    // getting new train data
    name = $("#train-name")
      .val()
      .trim();
    destination = $("#destination")
      .val()
      .trim();
    firstTrain = $("#first-train")
      .val()
      .trim();
    frequency = $("#frequency")
      .val()
      .trim();

    var firstTrainDate = new Date();
    var timeArry = firstTrain.split(":");
    console.log(timeArry);
    firstTrainDate.setMinutes(timeArry[1]);
    firstTrainDate.setHours(timeArry[0]);
    console.log(moment(firstTrainDate).format("LLLL"));

    //pushing to database
    database.ref().push({
      name: name,
      destination: destination,
      frequency: frequency,
      firstTrain: moment(firstTrainDate).format("LLLL")
    });
    // $("#Train-table").append(
    //   $("<tr>").append(
    //     $("<td>").text(name),
    //     $("<td>").text(destination),
    //     $("<td>").text(firstTrain),
    //     $("<td>").text(frequency)
    //   )
    // );

    console.log("sent");
  });

  database.ref().on("child_added", function(childSnapshot) {
    var startTConvert = moment(childSnapshot.val().firstTrain).subtract(
      1,
      "years"
    );
    var trainTimeDifferent = moment().diff(
      moment(startTConvert),
      "minutes to next arrival"
    );
    var timeRemain = trainTimeDifferent % childSnapshot.val().frequency;
    var minUntillArrival = childSnapshot.val().frequency - timeRemain;
    var nextTrainTime = moment().add(
      minUntillArrival,
      "minutes to next arrival"
    );
    var key = childSnapshot.key;

    var newrow = $("<tr>");
    newrow.append($("<td>" + childSnapshot.val().name + "</td>"));
    newrow.append($("<td>" + childSnapshot.val().destination + "</td>"));
    newrow.append(
      $("<td class='text-center'>" + childSnapshot.val().frequency + "</td>")
    );
    newrow.append(
      $(
        "<td class='text-center'>" +
          moment(nextTrainTime).format("LT") +
          "</td>"
      )
    );
    newrow.append($("<td class='text-center'>" + minUntillArrival + "</td>"));
    newrow.append(
      $(
        "<td class='text-center'><button class='arrival btn btn-danger btn-xs' data-key='" +
          key +
          "'>X</button></td>"
      )
    );

    if (minUntillArrival < 6) {
      newrow.addClass("info");
    }

    $("#Train-table").append(newrow);
  });

  $(document).on("click", ".arrival", function() {
    keyref = $(this).attr("data-key");
    database
      .ref()
      .child(keyref)
      .remove();
    window.location.reload();
  });

  currentTime();
});
