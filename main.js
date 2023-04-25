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

        // update the progress bar when a new day or time is selected
        function updateProgressBar() {
          const day = selectDay.value;
          const time = selectTime.value;
          const count = data[elevator][day][time].count;
          const percentageValue = data[elevator][day][time].percentage;

          percentage.textContent = percentageValue + "";
          progressBar.style.width = percentageValue + "";
        }

        selectDay.addEventListener('change', updateProgressBar);
        selectTime.addEventListener('change', updateProgressBar);

        // add event listeners to the elevator buttons to update the percentage value
        L1Button.addEventListener('click', () => {
          elevator = 'L1';
          updateProgressBar();
        });

        B1Button.addEventListener('click', () => {
          elevator = 'B1';
          updateProgressBar();
        });

        B2Button.addEventListener('click', () => {
          elevator = 'B2';
          updateProgressBar();
        });

        A1Button.addEventListener('click', () => {
          elevator = 'A1';
          updateProgressBar();
        });

        // initialize the progress bar with the default values
        // let elevator = 'L1';
        // updateProgressBar();
        
      })
      .catch(error => console.error(error));
