$(document).keydown(function(e){
	//Disable event key F12
	if(e.keyCode == 123) {
		return false;
	}
	//Disable event key Ctrl + E
	if(e.ctrlKey && (e.keyCode == 'E'.charCodeAt(0) || e.keyCode == 'e'.charCodeAt(0))){
		return false;
	}
	//Disable event key Ctrl + Shift + I / Ctrl + Shift + i
	if(e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'i'.charCodeAt(0))){
		return false;
	}
	//Disable event key Ctrl + Shift + J / Ctrl + Shift + j
	if(e.ctrlKey && e.shiftKey && (e.keyCode == 'J'.charCodeAt(0) || e.keyCode == 'j'.charCodeAt(0))){
		return false;
	}
	//Disable event key Ctrl + U / Ctrl + u
	if(e.ctrlKey && (e.keyCode == 'U'.charCodeAt(0) || e.keyCode == 'u'.charCodeAt(0))){
		return false;
	}
})