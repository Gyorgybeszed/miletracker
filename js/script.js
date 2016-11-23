$(document).one("pageinit", function() {

// Display Runs

showRuns();

// Add Handler
	
$("#submitAdd").on("tap", addRun);

// Edit Handler

$("#submitEdit").on("tap", editRun);

// Delete Handler

$("#stats").on("tap", "#deleteLink", deleteRun);

// Set Current Handler

$("#stats").on("tap", "#editLink", setCurrent);

// Clear Handler

$("#clearRuns").on("tap", clearRuns);


// Show all runs on Homepage

function showRuns() {
	
// Get runs Object

var runs = getRunsObject();

// Check if empty

var currentRuns = localStorage.getItem("runs");

if (currentRuns!= null) {

if (runs != "" || runs != null) {


		for (var i=0; i<runs.length; i++) {
			$("#stats").append('<li class="ui-body-inherit ui-li-static"><strong>Date: </strong>'+runs[i]["date"]+
			'<br/><strong>Distance: </strong>'+runs[i]["miles"]+'m<div class="controls">'+
			'<a href="#edit" id="editLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'">Edit</a> | <a href=# id="deleteLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'" onclick=" return confirm(\'Are you sure?\')">Delete</a></div></li>');
			
		}

	$("#home").bind("pageinit", function() {
		
		$("#stats").listview("refresh");
		
	});
	
}
}
 else {
	
$("#stats").html("<p>You have no logged runs</p>");
}

	
	
}


// Add a Run

function addRun() {

// Get form values

var miles = $("#addMiles").val();
var date = $("#addDate").val();

// Create a "Run" object

var run = {
	date: date,
	miles:  parseFloat(miles)
};

var currentRuns = localStorage.getItem("runs");

if (currentRuns!= null) {

var runs = getRunsObject();
} else {
var runs = new Array();	
}

// Add runs to runs Array

runs.push(run);

alert("Run added");

// Set stringified object to localStorage

localStorage.setItem("runs", JSON.stringify(runs));

// Redirect to Index Page

window.location.href="index.html";

return false;

}

// Edit a Run

function editRun() {

// Get Current Data

var currentMiles = localStorage.getItem("currentMiles");
var currentDate = localStorage.getItem("currentDate");

var runs = getRunsObject();



// Loop through Runs

var currentRuns = localStorage.getItem("runs");

if (currentRuns!= null) {

for (var i=0; i < runs.length; i++) {
	if (runs[i].miles == currentMiles && runs[i].date == currentDate) {
		runs.splice(i, 1);
	}
}
}
	
localStorage.setItem("runs", JSON.stringify(runs));


// Get form values

var miles = $("#editMiles").val();
var date = $("#editDate").val();

// Create a "Run" object

var update_run = {
	date: date,
	miles:  parseFloat(miles)
};

// Add runs to runs Array

runs.push(update_run);

alert("Run updated");

// Set stringified object to localStorage

localStorage.setItem("runs", JSON.stringify(runs));

// Redirect to Index Page

window.location.href="index.html";

return false;
}

function clearRuns() {
	localStorage.removeItem("runs");
	$("#stats").html("<p>You have no logged runs</p>");

}



// Delete a Run

function deleteRun() {

// Set Local Storage Items

localStorage.setItem("currentMiles", $(this).data("miles"));
localStorage.setItem("currentDate", $(this).data("date"));

// Get Current Data

var currentMiles = localStorage.getItem("currentMiles");
var currentDate = localStorage.getItem("currentDate");

var runs = getRunsObject();

// Loop through Runs

for (var i=0; i < runs.length; i++) {
	if (runs[i].miles == currentMiles && runs[i].date == currentDate) {
		runs.splice(i, 1);
	}
}
	
localStorage.setItem("runs", JSON.stringify(runs));

alert("Run deleted");

// Redirect to Index Page

window.location.href="index.html";

return false;
}

// Get the runs Object

function getRunsObject() {

// set runs Array

var runs = new Array();

// Get Current Runs from localStorage

var currentRuns = localStorage.getItem("runs");

// Check localStorage

if (currentRuns!= null) {
	
// Set the runs

var runs = JSON.parse(currentRuns);	

// Return runs Object

return runs.sort(function(a,b) {return new Date(b.date) - new Date(a.date)});
		
} 

}

// Set the current clicked miles and date

function setCurrent() {

// Set Local Storage Items

localStorage.setItem("currentMiles", $(this).data("miles"));
localStorage.setItem("currentDate", $(this).data("date"));

// Insert Form Fields

$("#editMiles").val(localStorage.getItem("currentMiles"));
$("#editDate").val(localStorage.getItem("currentDate"));

}
	
	
	
});
