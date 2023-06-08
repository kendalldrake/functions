// You can put your individual, DOM-specific logic here.
// window.stateCallback = () => {
// 	console.log('Something changed!')
// }


//making buttons clickable//
heatmap=document.querySelector("#heatmap")
document.querySelector("#B1").addEventListener("click",function(){
	console.log('Something changed!')
	if(heatmap.style.display=="none"){
		heatmap.style.display="flex"
	}
	else{heatmap.style.display="none"}
})

demoJson={
	week1: {
	  monday:{
		"12:00": 10,
		"1:00": 30
	  },
	  tuesday:12,
	  wednesday:30,
  },
	week2: {
		monday:{
		  "12:00": 10,
		  "1:00": 30
		},
		tuesday:12,
		wednesday:30,
	}
  }
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const selectDay = document.getElementById('select-day');
        const selectTime = document.getElementById('select-time');
        const progressBar = document.getElementById('progress-bar');
        const percentage = document.getElementById('percentage');
        const L1Button = document.getElementById('L1');
        const B1Button = document.getElementById('B1');
        const B2Button = document.getElementById('B2');
        const A1Button = document.getElementById('A1');

        // populate the dropdowns with the days and times
        for (const day in data.L1) {
          const option = document.createElement('option');
          option.text = day;
          selectDay.add(option);
        }

        for (const time in data.L1.Monday) {
          const option = document.createElement('option');
          option.text = time;
          selectTime.add(option);
        }

        selectDay.addEventListener('change' , () => {
          var leastElevator = getElevatorWithLeastPercentage(data, selectDay.value, selectTime.value);
          L1Button.parentElement.style.display = "none";
          B1Button.parentElement.style.display = "none";
          B2Button.parentElement.style.display = "none";
          A1Button.parentElement.style.display = "none";
          document.querySelector(`[data-id = "${leastElevator}"]`).style.display = "block";
          document.querySelector('.grid-container').style.gridTemplateColumns = 'repeat(1. 1fr)';
          updateProgressBar();
        });

        selectTime.addEventListener('change' , () => {
          var leastElevator = getElevatorWithLeastPercentage(data, selectDay.value , selectTime.value);
          L1Button.parentElement.style.display = "none";
          B1Button.parentElement.style.display = "none";
          B2Button.parentElement.style.display = "none";
          A1Button.parentElement.style.display = "none";
          document.querySelector(`[data-id = "${leastElevator}"]`).style.display = "block";
          document.querySelector('.grid-container').style.gridTemplateColumns = 'repeat(1, 1fr)';
          updateProgressBar(leastElevator);
        })

        // update the progress bar when a new day or time is selected
        function updateProgressBar(elevator) {
          const day = selectDay.value;
          const time = selectTime.value;
          const count = data[elevator][day][time].count;
          const percentageValue = data[elevator][day][time].percentage;

          percentage.textContent = percentageValue + "";
          render_progress_bar(parseInt(percentageValue));
        }

      })
      .catch(error => console.error(error));
      
// DYNAMIC PROGRESS BAR

function render_progress_bar(progressVal) {
  let strokeVal = (4.64 * 100) / 100;
  let x = document.querySelector('.progress-circle-prog');
  x.style.strokeDasharray = progressVal * strokeVal + ' 999';
  let el = document.querySelector('.progress-text');
  let from = el.dataset.progress;
  el.dataset.progress = progressVal;
  let start = new Date().getTime();

  setTimeout(function () {
      let now = new Date().getTime() - start;
      let progress = now / 700;
      el.innerHTML = progressVal + '%';
      if (progress < 1) setTimeout(arguments.callee, 10);
  }, 10);
}
// function render_progress_bar(progressVal){
//   let strokeVal = ( 4.64 * 100 ) / 100 ;
//   let x = document.querySelector('.progress-circle-prog');
//   x.style.strkeDasharray = progressVal * strokeVal + ' 999 ';
//   let el = document.querySelector('.progress-text');
//   let from = el.dataset.progress;
//   el.dataset.progress = progressVal;
//   let start = new Date().getTime();

//   setTimeout(function () {
//     let now = new Date().getTime() - start ;
//     let progress  = now / 700;
//     el.innerHTML = progressVal + '%' ;
//     if (progress < 1) setTimeout(arguments.callee, 10);
//   }, 10);
// }

//FIND LEAST ELEVATOR

function getElevatorWithLeastPercentage(data, day , time){
  let leastPercentage = Infinity;
  let leastElevator = "";
  for (const elevator in data ) {
    const percentage = parseFloat(data[elevator][day][time].percentage.replace('%' , ''));
    if(percentage < leastPercentage){
      leastPercentage = percentage;
      leastElevator = elevator;
    }
  }
  return leastElevator;
}
      // GOOGLE MAPS JS

//       var map;
//       var directionsService;
//       var directionsDisplay;
//       var distanceService;
      
//       function initializeMap(){
//         var myLatLng = {
//           lat : 44.500000, lng : -89.500000 };
//         var mapOptions = {
//           center : myLatLng ,
//           zoom : 7,
//           mapTypeId :  google.maps.MapTypeId.ROADMAP
//         };
//         map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
//             directionsService = new google.maps.DirectionsService();
//             directionsDisplay = new google.maps.DirectionsRenderer();
//             directionsDisplay.setMap(map);
//             distanceService = new google.maps.DistanceMatrixService();
//         }

//         function calcRoute() {
//             var origin = document.getElementById("from").value;
//             var destination = document.getElementById("to").value;
//             var selectedMode = document.getElementById("mode").value;

//             var request = {
//                 origin: origin,
//                 destination: destination,
//                 travelMode: google.maps.TravelMode[selectedMode]
//             };

//             directionsService.route(request, function (result, status) {
//                 if (status == google.maps.DirectionsStatus.OK) {
//                     directionsDisplay.setDirections(result);
//                     getDistanceMatrix(origin, destination, selectedMode);
//                 } else {
//                     directionsDisplay.setDirections({ routes: [] });
//                     map.setCenter(myLatLng);
//                     displayErrorMessage();
//                 }
//             });
//         }

//         function getDistanceMatrix(origin, destination, selectedMode) {
//             var mode = selectedMode.toLowerCase();
//             var options = {
//                 origins: [origin],
//                 destinations: [destination],
//                 travelMode: google.maps.TravelMode[selectedMode]
//             };

//             distanceService.getDistanceMatrix(options, function (result, status) {
//                 if (status === 'OK' && result.rows.length > 0 && result.rows[0].elements.length > 0) {
//                     var distance = result.rows[0].elements[0].distance.text;
//                     var duration = result.rows[0].elements[0].duration.text;

//                     var modeText = mode.charAt(0).toUpperCase() + mode.slice(1);

//                     var output = document.getElementById("output");
//                     output.innerHTML = "<div class='alert-info'>Travel Mode: " + modeText + "<br />From: " + origin + ".<br />To: " + destination + ".<br />Distance: " + distance + ".<br />Duration: " + duration + ".</div>";
//                 } else {
//                     displayErrorMessage();
//                 }
//             });
//         }

//         function displayErrorMessage() {
//             var output = document.getElementById("output");
//             output.innerHTML = "<div class='alert-danger'>Could not retrieve distance. Please try again.</div>";
//         }

//         initializeMap();


// //Autocomplete objects for all inputs

// var options = {
//   types: ['(cities)']
// }

// var input1 = document.getElementById("from");
// var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

// var input2 = document.getElementById("to");
// var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
 
