// GOOGLE MAPS JS

var map;
var directionsService;
var directionsDisplay;
var distanceService;

function initializeMap(){
  var myLatLng = {
    lat : 44.500000, lng : -89.500000 };
  var mapOptions = {
    center : myLatLng ,
    zoom : 7,
    mapTypeId :  google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
      directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setMap(map);
      distanceService = new google.maps.DistanceMatrixService();
  }

  function calcRoute() {
      var origin = document.getElementById("from").value;
      var destination = document.getElementById("to").value;
      var selectedMode = document.getElementById("mode").value;

// check for additional stop

var additionalTime = 0;
var selectedOption = document.getElementById("option").value;
if (selectedOption === "coffee") {
    additionalTime = 10;
} else if (selectedOption === "bagel")
{
    additionalTime = 15;
}   else if (selectedOption === "laundry") {
    additionalTime = 20;
}

var request = {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode[selectedMode]
      };

      directionsService.route(request, function (result, status) {
          if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(result);
              getDistanceMatrix(origin, destination, selectedMode, additionalTime);
          } else {
              directionsDisplay.setDirections({ routes: [] });
              map.setCenter(myLatLng);
              displayErrorMessage();
          }
      });
  }

  function getDistanceMatrix(origin, destination, selectedMode, additionalTime) {
      var mode = selectedMode.toLowerCase();
      var options = {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode[selectedMode]
      };

      distanceService.getDistanceMatrix(options, function (result, status) {
          if (status === 'OK' && result.rows.length > 0 && result.rows[0].elements.length > 0) {
              var distance = result.rows[0].elements[0].distance.text;
              var duration = result.rows[0].elements[0].duration.text;

            
// time for additional stop

var additionalDuration = result.rows[0].elements[0].duration.value + (additionalTime * 60);
var additionalDistance = result.rows[0].elements[0].distance.value;

// calculate additional distance and duration

var additionalDurationText = formatDuration(additionalDuration);
var additionalDistanceText = formatDistance(additionalDistance);

              var modeText = mode.charAt(0).toUpperCase() + mode.slice(1);

              var output = document.getElementById("output");

              output.innerHTML = "<div class = 'alert-info'>Travel mode:" + modeText + "<br />From: " + origin + ".<br />To: " + destination + ".<br />Distance: " + distance + ".<br />Duration: " + duration + ".<br />Additional Time: " + additionalTime + "minutes.<br />Additional Distance: " + additionalDistanceText + ".<br />Additional Duration: " + additionalDurationText + ".</div>";

              output.innerHTML = "<div class='alert-info'>Travel Mode: " + modeText + "<br />From: " + origin + ".<br />To: " + destination + ".<br />Distance: " + distance + ".<br />Duration: " + duration + ".</div>";
          } else {
              displayErrorMessage();
          }
      });
  }
function formatDuration(duration){
    var days = Math.floor(duration / (3600 * 24));
    var hours = Math.floor((duration % (3600 * 24)) / 3600);
    var minutes = Math.floor((duration % 3600) / 60);

    var durationText = "";

    if (days > 0) {
        durationText += days + "d";
    }
    if (hours > 0){
        durationText += hours + "h" ;
    }
    if(minutes > 0){
        durationText += minutes + "m";
    }

    durationText =durationText.trim();
    return durationText;
}

  function displayErrorMessage() {
      var output = document.getElementById("output");
      output.innerHTML = "<div class='alert-danger'>Could not retrieve distance. Please try again.</div>";
  }

  initializeMap();


//Autocomplete objects for all inputs

var options = {
types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

