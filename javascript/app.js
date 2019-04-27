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
  $( document ).ready(function() {
    // Handler for .ready() called.
  
  
  firebase.initializeApp(config);

  var database = firebase.database();

      // Variables for the onClick event
    var name;
    var destination;
    var firstTrain;
    var frequency = 0;

    //buttons for addiing trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    console.log("testing")
        // getting new train data
        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#first-train").val().trim();
        frequency = $("#frequency").val().trim();
        
        //pushing to database
        database.ref().push({
            name: name,
            destination: destination,
            frequency: frequency,
            firstTrain: firstTrain,
            
            
        })
        $("#Train-table").append(
            $("<tr>").append(
                $("<td>").text(name),
                $("<td>").text(destination),
                $("<td>").text(firstTrain),
                $("<td>").text(frequency)

            )
        )
        
        
        
        console.log("sent")

  })
});
  