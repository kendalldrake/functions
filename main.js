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