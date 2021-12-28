// rearranging array variables by order
var findBSTIndex = function (orderedArray, entry, sortIndex, start, end) {
	if (orderedArray.length == 0) {
		return 0;
	}
	
	if (start == end) {
		if (orderedArray[start][sortIndex] > entry[sortIndex]) {
			return start;
		} else {
			return start + 1;
		}
	}
	
	var checkIndex = Math.floor((end + start) / 2);
	
	// testing code:
	// console.log("start:" + start + ", end:" + end + ", checkIndex:" + checkIndex);
	// console.log(orderedArray[checkIndex][sortIndex] > entry[sortIndex]);
	
	if (orderedArray[checkIndex][sortIndex] > entry[sortIndex]) {
		return findBSTIndex(orderedArray, entry, sortIndex, start, checkIndex);
	} else {
		return findBSTIndex(orderedArray, entry, sortIndex, checkIndex + 1, end);
	}
}

var rearrangeArray = function (unorderedArray, sortIndex) {
	if (unorderedArray.length > 0) {
		var rearrangedArray = [unorderedArray[0]];
		
		for (var i = 1; i < unorderedArray.length; i++) {
			rearrangedArray.splice(findBSTIndex(rearrangedArray, unorderedArray[i], sortIndex, 0, rearrangedArray.length - 1), 0, unorderedArray[i]);
		}
		
		return rearrangedArray;
	} else {
		return unorderedArray;
	}
}


var setCalendar = function () {
	// add vertical lines/day labels to calendar
	for (var i = 0; i < 8; i++) {
		var currentDate = new Date(calendarStart.valueOf() + (86400000 * i));
		
		var vertLine = document.createElement("div");
		vertLine.classList.add("vertLine");
		
		var dateLabel = document.createElement("div");
		dateLabel.classList.add("dateLabel");
		dateLabel.innerText = currentDate.getDate();
		
		vertLine.append(dateLabel);
		
		document.querySelectorAll("#calendar")[0].append(vertLine);
	};

	// add horizontal divs to calendar (1 per half hour), add labels to the left of the calendar

	var calendarHorLines = document.createElement("div");
	calendarHorLines.id = "calendarHorLines";
	document.querySelectorAll("#calendar")[0].append(calendarHorLines);

	for (var i = 0; i < 48; i++) {
		if (i % 2 == 0) {
			// hour label
			var hourLabel = document.createElement("div");
			hourLabel.classList.add("hourLabel");
			hourLabel.innerText = ("0" + i / 2).slice(-2);
			hourLabel.style.top = "calc(7vh + (" + i + " * ((var(--calendarHeight) - 7vh) / 48)) - (0.5 * var(--littleLabelSize))";
			
			document.querySelectorAll("#calendarHorLines")[0].append(hourLabel);
			
			// hour horizontal line
			var horLine = document.createElement("div");
			horLine.classList.add("horLine");
			horLine.style.top = "calc(7vh + (" + i + " * ((var(--calendarHeight) - 7vh) / 48)))";
			
			document.querySelectorAll("#calendarHorLines")[0].append(horLine);
		}
		
		for (var j = 0; j < 8; j++) {
			var timeDiv = document.createElement("div");
			timeDiv.classList.add("timeDiv");
			timeDiv.style.height = "calc((var(--calendarHeight) - 7vh) / 48)";
			
			document.querySelectorAll("#calendar > .vertLine")[j].append(timeDiv);
		}
	};
};



// add expandable dropdowns to the sidebar
var setDropdowns = function () {
	for (var i = 0; i < dropdowns.length; i++) {
		var dropdown = document.createElement("div");
		dropdown.id = dropdowns[i].toLowerCase().replace(/\s/g, '');
		dropdown.classList.add("dropdown");
		
		var dropdownLabel = document.createElement("div");
		dropdownLabel.classList.add("dropdownLabel");
		dropdownLabel.innerText = dropdowns[i];
		dropdown.append(dropdownLabel);
		
		dropdownLabel.onclick = function () {
			var expanded = this.parentNode.classList.contains("expanded");
			if (document.querySelectorAll("#sidebar > .dropdown.expanded").length > 0) {
				document.querySelectorAll("#sidebar > .dropdown.expanded")[0].classList.remove("expanded");
			};
			
			// toggle to expand/collapse sidebar options
			// commented out because sidebar looks really bad when everything's collapsed
			/*if (!expanded) {*/
				this.parentNode.classList.add("expanded");
			/*}*/
		};
		
		document.querySelectorAll("#sidebar")[0].append(dropdown);
	}
	
	var livestreamTimes = document.createElement("div");
	livestreamTimes.classList.add("streamTimes");
	livestreamTimes.classList.add("dropdownContent");
	document.querySelectorAll(".dropdown#recentlylive")[0].append(livestreamTimes);

	var streamers = document.createElement("div");
	streamers.classList.add("dropdownContent");
	document.querySelectorAll(".dropdown#streamers")[0].append(streamers);
	
	var streamTimes = document.createElement("div");
	streamTimes.classList.add("streamTimes");
	streamTimes.classList.add("dropdownContent");
	document.querySelectorAll(".dropdown#streams")[0].append(streamTimes);
		
	var addCustomEvents = document.createElement("div");
	addCustomEvents.classList.add("dropdownContent");
	document.querySelectorAll(".dropdown#addcustomevent")[0].append(addCustomEvents);
		
	var settings = document.createElement("div");
	settings.classList.add("dropdownContent");
	document.querySelectorAll(".dropdown#settings")[0].append(settings);
};




var showEventDetails = function (eventId) {
	document.querySelectorAll("#stream-" + eventId.slice(eventId.search("-") + 1))[0].scrollIntoView();
	document.querySelectorAll("#livestream-" + eventId.slice(eventId.search("-") + 1))[0].scrollIntoView();
}

var toggleEvent = function (eventId) {
	var eventId = parseInt(eventId.slice(eventId.search("-") + 1));
	var eventDetails = schedule[eventId];
	
	// remove the calendar event if it's already there
	var calendarEventQuery = document.querySelectorAll("#event-" + eventId);
	if (document.querySelectorAll("#event-" + eventId).length > 0) {
		if (document.querySelectorAll("#event-" + eventId)[0].style.display == "none") {
			document.querySelectorAll("#event-" + eventId)[0].style.display = "";	
		} else {
			// remove styling from showing hidden events on mouseover
			// add in styling for an active event (events are readded in with toggleEvent when the mouse is over the stream event)
			// ^ the streamers active checkboxes use their own code to "reactivate" events
			if (document.querySelectorAll("#event-" + eventId)[0].style.background.startsWith("white")) {
				document.querySelectorAll("#event-" + eventId)[0].style.background = "";
				document.querySelectorAll("#event-" + eventId)[0].classList.add("active");	
			} else {
				document.querySelectorAll("#event-" + eventId)[0].style.setProperty("display", "none", "important");
			}
		}
	} else {
		var time = eventDetails[1].getDate() + ("0" + eventDetails[1].getHours()).slice(-2) + ("0" + eventDetails[1].getMinutes()).slice(-2);
		var dayPassed = Math.floor(10000 * (60 * eventDetails[1].getHours() + eventDetails[1].getMinutes()) / 1440) / 10000;
		
		if (document.querySelectorAll(".time" + time).length == 0) {
			var calendarTime = document.createElement("div");
			calendarTime.classList.add("calendarTime");
			calendarTime.classList.add("time" + time);

			var calendarDay = eventDetails[1] - calendarStart;
			calendarDay = calendarDay - (calendarDay % 86400000);
			calendarDay = calendarDay / 86400000;
			calendarTime.style.left = "calc(" + calendarDay + " * (var(--calendarWidth) / 8))";
			calendarTime.style.top = "calc(7vh + (" + dayPassed + " * (var(--calendarHeight) - 7vh)))";	

			document.querySelectorAll("#calendar")[0].append(calendarTime);		
		}
		var calendarEvent = document.createElement("div");
		calendarEvent.id = "event-" + eventId;
		calendarEvent.classList.add("calendarEvent");
		calendarEvent.classList.add(eventDetails[0].toLowerCase().replace(/\s/g, ''));
		calendarEvent.onclick = function () {
			showEventDetails(this.id)
		};
	
		// light up corresponding calendar event when mousing over the stream in the sidebar
		calendarEvent.addEventListener('mouseenter', function () {
			var streamTimeId = "stream-" + this.id.slice(this.id.search("-") + 1);
			var streamTimeQuery = document.querySelectorAll("#" + streamTimeId);
			if (streamTimeQuery.length > 0) {
				streamTimeQuery[0].classList.add("active");
			}
			
			var livestreamTimeQuery = document.querySelectorAll("#live" + streamTimeId);
			if (livestreamTimeQuery.length > 0) {
				livestreamTimeQuery[0].classList.add("active");
			}
		});
		
		calendarEvent.addEventListener('mouseleave', function () {
			var streamTimeId = "stream-" + this.id.slice(this.id.search("-") + 1);
			var streamTimeQuery = document.querySelectorAll("#" + streamTimeId);
			if (streamTimeQuery.length > 0) {
				streamTimeQuery[0].classList.remove("active");
			}
			
			var livestreamTimeQuery = document.querySelectorAll("#live" + streamTimeId);
			if (livestreamTimeQuery.length > 0) {
				livestreamTimeQuery[0].classList.remove("active");
			}
		});
		
		document.querySelectorAll(".time" + time)[0].append(calendarEvent);
	}
}



// recently live dropdown
var createLiveStreamDiv = function (i) {
	var streamTime = document.createElement("div");
	streamTime.id = "livestream-" + i;
	streamTime.classList.add("streamTime");
	streamTime.classList.add(schedule[i][0].toLowerCase().replace(/\s/g, ''));
	
	var streamDate = document.createElement("div");
	streamDate.classList.add("streamDate");
	
	var streamDay = document.createElement("div");
	streamDay.classList.add("streamDay");
	streamDay.innerText = schedule[i][1].getDate();
	
	var streamHour = document.createElement("div");
	streamHour.classList.add("streamHour");
	streamHour.innerText = ("0" + schedule[i][1].getHours()).slice(-2) + ":" + ("0" + schedule[i][1].getMinutes()).slice(-2);
	
	streamDate.append(streamDay);
	streamDate.append(streamHour);
	
	
	
	var streamStreamer = document.createElement("div");
	streamStreamer.innerText = "— " + schedule[i][0] + " —";
	
	var streamText = document.createElement("div");
	streamText.classList.add("streamText");
	
	var streamTitle = document.createElement("div");
	streamTitle.classList.add("streamTitle");
	streamTitle.innerText = schedule[i][2];
	
	var streamDescription = document.createElement("div");
	streamDescription.classList.add("streamDescription");
	streamDescription.innerText = schedule[i][3];
	
	streamText.append(streamStreamer);
	streamText.append(streamTitle);
	if (schedule[i][3]!="") {streamText.append(streamDescription);};
	
	streamTime.append(streamDate);
	streamTime.append(streamText);
	
	streamTime.onclick = function () {
		var streamer = schedule[this.id.slice(this.id.search("-") + 1)][0].toLowerCase().replace(/\s/g, '');
		console.log(streamer);
		window.open(streamerSpecificStuffDictionary[streamer][2], "_blank");
	}
	
	// light up corresponding calendar event when mousing over the stream in the sidebar
	streamTime.addEventListener('mouseenter', function () {
		var calendarEventId = "event-" + this.id.slice(this.id.search("-") + 1);
		var calendarEventQuery = document.querySelectorAll("#" + calendarEventId);
		if (calendarEventQuery.length > 0) {
			// display the event with a full white background if it is hidden
			if (calendarEventQuery[0].style.display == "none") {
				toggleEvent(this.id);
				calendarEventQuery[0].style.background = "white";
			} else {
				calendarEventQuery[0].classList.add("active");		
			}
		}
	});
	
	streamTime.addEventListener('mouseleave', function () {
		var calendarEventId = "event-" + this.id.slice(this.id.search("-") + 1);
		var calendarEventQuery = document.querySelectorAll("#" + calendarEventId);
		if (calendarEventQuery.length > 0) {
			// revert a hidden event back to being hidden
			if (calendarEventQuery[0].style.background.startsWith("white")) {
				calendarEventQuery[0].style.background = "";
				toggleEvent(this.id);
			} else {
				calendarEventQuery[0].classList.remove("active");
			}
		}
	});
	
	return streamTime;
}



// streamers dropdown
var createStreamerDiv = function (streamerSpecificStuff) {
	var streamer = streamerSpecificStuff[0].toLowerCase().replace(/\s/g, '');
	
	var streamerDiv = document.createElement("div");
	streamerDiv.id = "streamerDiv-" + streamer;
	streamerDiv.classList.add("streamerDiv");
	streamerDiv.classList.add(streamer);
	
	var streamerActive = document.createElement("div");
	streamerActive.id = streamer + "Active";
	streamerActive.classList.add("streamerActive");
	
	var streamerActiveCheckbox = document.createElement("input");
	streamerActiveCheckbox.type = "checkbox";
	streamerActiveCheckbox.id = streamer + "ActiveCheckbox";
	streamerActiveCheckbox.name = streamer + "ActiveCheckbox";
	streamerActiveCheckbox.checked = true;
	streamerActiveCheckbox.classList.add("streamerActiveCheckbox");
	
	
	var streamerActiveCss = document.createElement("style");
	streamerActiveCss.innerText = ".calendarEvent." + streamer + "{display: var(--" + streamer + "ActiveCheckbox) !important;}";
	streamerActiveCss.innerText = streamerActiveCss.innerText + "\n.streamTime." + streamer + "{display: var(--" + streamer + "ActiveCheckbox) !important;}";
	
	document.querySelectorAll("body")[0].append(streamerActiveCss);
	document.documentElement.style.setProperty("--" + streamer + "ActiveCheckbox", "flex");
	
	
	streamerActiveCheckbox.addEventListener("input", function (event) {
		document.documentElement.style.setProperty("--" + event.target.id, event.target.checked?"flex":"none");
		
		// removing/resetting display styling for hidden calendar events
		var streamer = event.target.id.replace('ActiveCheckbox', '');
		var calendarEvents = document.querySelectorAll(".calendarEvent." + streamer);
		for (var i = 0; i < calendarEvents.length; i++) {
			calendarEvents[i].style.display = "";
		}
	});
	
	var streamerActiveLabel = document.createElement("label");
	streamerActiveLabel.id = streamer + "ActiveLabel";
	streamerActiveLabel.setAttribute("for", streamer + "ActiveCheckbox");
	streamerActiveLabel.innerText = streamerSpecificStuff[0];
	streamerActiveLabel.classList.add("streamerActiveLabel");
	
	var streamerColor = document.createElement("div");
	streamerColor.innerHTML = `
	<input type="color" id="` + streamer + `Color" name="` + streamer + `Color"
		   value="` + streamerSpecificStuff[1] + `">
	`;
	streamerColor.classList.add("streamerColor");
		
	streamerColor.addEventListener("input", function (event) {
		document.documentElement.style.setProperty("--" + event.target.id, event.target.value);
	});
	
	streamerActive.append(streamerActiveCheckbox);
	streamerActive.append(streamerActiveLabel);
	
	streamerDiv.append(streamerActive);
	streamerDiv.append(streamerColor);
	
	
	// light up corresponding calendar events when mousing over the streamer in the sidebar
	streamerDiv.addEventListener('mouseenter', function () {
		var streamer = this.id.slice(this.id.search("-") + 1);
		var streamTimeQuery = document.querySelectorAll(".calendarEvent." + streamer);
		for (var i = 0; i < streamTimeQuery.length; i++) {
			streamTimeQuery[i].classList.add("active");
		}
	});
	
	streamerDiv.addEventListener('mouseleave', function () {
		var streamer = this.id.slice(this.id.search("-") + 1);
		var streamTimeQuery = document.querySelectorAll(".calendarEvent." + streamer);
		for (var i = 0; i < streamTimeQuery.length; i++) {
			streamTimeQuery[i].classList.remove("active");
		}
	});
	
	return streamerDiv;
}

var toggleAllStreamersDiv = function () {
	var streamer = "allstreamers";
	
	var streamerDiv = document.createElement("div");
	streamerDiv.id = "streamerDiv-" + streamer;
	streamerDiv.classList.add("streamerDiv");
	streamerDiv.classList.add(streamer);
	
	var streamerActive = document.createElement("div");
	streamerActive.id = streamer + "Active";
	streamerActive.classList.add("streamerActive");
	
	var streamerActiveCheckbox = document.createElement("input");
	streamerActiveCheckbox.type = "checkbox";
	streamerActiveCheckbox.id = streamer + "ActiveCheckbox";
	streamerActiveCheckbox.name = streamer + "ActiveCheckbox";
	streamerActiveCheckbox.checked = true;
	streamerActiveCheckbox.classList.add("streamerActiveCheckbox");
	
	
	streamerActiveCheckbox.addEventListener("input", function (event) {
		// removing/resetting display styling for hidden calendar events
		var streamer = event.target.id.replace('ActiveCheckbox', '');
		
		
		var allStreamerDivs = document.querySelectorAll("#streamers > .dropdownContent > :not(.allstreamers) > div > .streamerActiveCheckbox");
		
		for (var i = 0; i < allStreamerDivs.length; i++) {
			allStreamerDivs[i].checked = event.target.checked;
			// allStreamerDivs[i].checked = !allStreamerDivs[i].checked;
			allStreamerDivs[i].dispatchEvent(new Event("input", {"bubbles": true}));
		}
	});
	
	var streamerActiveLabel = document.createElement("label");
	streamerActiveLabel.id = streamer + "ActiveLabel";
	streamerActiveLabel.setAttribute("for", streamer + "ActiveCheckbox");
	streamerActiveLabel.innerText = "Toggle all";
	streamerActiveLabel.classList.add("streamerActiveLabel");
	
	
	streamerActive.append(streamerActiveCheckbox);
	streamerActive.append(streamerActiveLabel);
	
	streamerDiv.append(streamerActive);
	
	
	// light up corresponding calendar events when mousing over the streamer in the sidebar
	streamerDiv.addEventListener('mouseenter', function () {
		var streamer = this.id.slice(this.id.search("-") + 1);
		var streamTimeQuery = document.querySelectorAll(".calendarEvent." + streamer);
		for (var i = 0; i < streamTimeQuery.length; i++) {
			streamTimeQuery[i].classList.add("active");
		}
	});
	
	streamerDiv.addEventListener('mouseleave', function () {
		var streamer = this.id.slice(this.id.search("-") + 1);
		var streamTimeQuery = document.querySelectorAll(".calendarEvent." + streamer);
		for (var i = 0; i < streamTimeQuery.length; i++) {
			streamTimeQuery[i].classList.remove("active");
		}
	});
	
	return streamerDiv;
}



// streams dropdown
var createStreamDiv = function (i) {
	var streamTime = document.createElement("div");
	streamTime.id = "stream-" + i;
	streamTime.classList.add("streamTime");
	streamTime.classList.add(schedule[i][0].toLowerCase().replace(/\s/g, ''));
	
	var streamDate = document.createElement("div");
	streamDate.classList.add("streamDate");
	
	var streamDay = document.createElement("div");
	streamDay.classList.add("streamDay");
	streamDay.innerText = schedule[i][1].getDate();
	
	var streamHour = document.createElement("div");
	streamHour.classList.add("streamHour");
	streamHour.innerText = ("0" + schedule[i][1].getHours()).slice(-2) + ":" + ("0" + schedule[i][1].getMinutes()).slice(-2);
	
	streamDate.append(streamDay);
	streamDate.append(streamHour);
	
	
	
	var streamStreamer = document.createElement("div");
	streamStreamer.innerText = "— " + schedule[i][0] + " —";
	
	var streamText = document.createElement("div");
	streamText.classList.add("streamText");
	
	var streamTitle = document.createElement("div");
	streamTitle.classList.add("streamTitle");
	streamTitle.innerText = schedule[i][2];
	
	var streamDescription = document.createElement("div");
	streamDescription.classList.add("streamDescription");
	streamDescription.innerText = schedule[i][3];
	
	streamText.append(streamStreamer);
	streamText.append(streamTitle);
	if (schedule[i][3]!="") {streamText.append(streamDescription);};
	
	streamTime.append(streamDate);
	streamTime.append(streamText);
	
	toggleEvent(streamTime.id)
	streamTime.onclick = function () {
		toggleEvent(this.id);
	}
	
	// light up corresponding calendar event when mousing over the stream in the sidebar
	streamTime.addEventListener('mouseenter', function () {
		var calendarEventId = "event-" + this.id.slice(this.id.search("-") + 1);
		var calendarEventQuery = document.querySelectorAll("#" + calendarEventId);
		if (calendarEventQuery.length > 0) {
			// display the event with a full white background if it is hidden
			if (calendarEventQuery[0].style.display == "none") {
				toggleEvent(this.id);
				calendarEventQuery[0].style.background = "white";
			} else {
				calendarEventQuery[0].classList.add("active");		
			}
		}
	});
	
	streamTime.addEventListener('mouseleave', function () {
		var calendarEventId = "event-" + this.id.slice(this.id.search("-") + 1);
		var calendarEventQuery = document.querySelectorAll("#" + calendarEventId);
		if (calendarEventQuery.length > 0) {
			// revert a hidden event back to being hidden
			if (calendarEventQuery[0].style.background.startsWith("white")) {
				calendarEventQuery[0].style.background = "";
				toggleEvent(this.id);
			} else {
				calendarEventQuery[0].classList.remove("active");
			}
		}
	});
	
	return streamTime;
}




// custom events dropdown
var addStreamForm = function () {
	var newStreamForm = document.createElement("form");
	newStreamForm.id = "newStream";

	var newStreamFormStreamer = document.createElement("div");
	newStreamFormStreamer.id = "newStreamFormStreamer";

	var newStreamFormStreamerLabel = document.createElement("div");
	newStreamFormStreamerLabel.id = "newStreamFormStreamerLabel";
	newStreamFormStreamerLabel.innerText = "Streamer";

	var newStreamFormStreamerSelect = document.createElement("select");
	newStreamFormStreamerSelect.setAttribute("name", "newStreamFormStreamerSelect");
	newStreamFormStreamerSelect.id = "newStreamFormStreamerSelect";

	for (var i = 0; i < streamerSpecificStuff.length; i++) {
		var newStreamFormStreamerSelectOption = document.createElement("option");
		newStreamFormStreamerSelectOption.value = streamerSpecificStuff[i][0];
		newStreamFormStreamerSelectOption.innerText = streamerSpecificStuff[i][0];
		
		newStreamFormStreamerSelect.append(newStreamFormStreamerSelectOption);
	}

	newStreamFormStreamer.append(newStreamFormStreamerLabel);
	newStreamFormStreamer.append(newStreamFormStreamerSelect);

	newStreamForm.append(newStreamFormStreamer);

	newStreamForm.innerHTML = newStreamForm.innerHTML + `
	<div id="newStreamFormTime">
		<div>Time</div>
		<input type="date" name="newStreamFormTimeDate" id="newStreamFormTimeDate" value = "` + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + `">
		<input type="time" name="newStreamFormTimeTime" id="newStreamFormTimeTime" value="00:00">
	</div>
	<div id="newStreamFormTitle">
		<div>Stream title</div>
		<input type="text" id="newStreamFormTitleText" name="newStreamFormTitleText">
	</div>
	<div id="newStreamFormNotes">
		<div>Stream notes</div>
		<input type="text" id="newStreamFormNotesText" name="newStreamFormNotesText">
	</div>
	`;

	var newStreamFormButton = document.createElement("button");
	newStreamFormButton.id = "newStreamFormButton";
	newStreamFormButton.setAttribute("type", "button");
	newStreamFormButton.innerText = "Add new stream";

	newStreamFormButton.onclick = function () {
		var newStream = [document.querySelectorAll("#newStreamFormStreamerSelect")[0].value, new Date(document.querySelectorAll("#newStreamFormTimeDate")[0].value + "T" + document.querySelectorAll("#newStreamFormTimeTime")[0].value + ":00"), document.querySelectorAll("#newStreamFormTitleText")[0].value, document.querySelectorAll("#newStreamFormNotesText")[0].value];
		oldschedule.push(newStream);
		
		if ((newStream[1] >= calendarStart) && (newStream[1] <= calendarEnd)) {
			var tempSchedule = rearrangeArray(schedule, 1);
			var insertIndex = findBSTIndex(tempSchedule, newStream, 1, 0, schedule.length - 1);
			schedule.push(newStream);
			
			var streamDiv = createStreamDiv(schedule.length - 1);
			var livestreamDiv = createLiveStreamDiv(schedule.length - 1);
			
			var streamDivs = document.querySelectorAll("#streams > .dropdownContent > div");
			var livestreamDivs = document.querySelectorAll("#recentlylive > .dropdownContent > div");
			
			if (insertIndex == streamDivs.length) {
				document.querySelectorAll("#streams > .dropdownContent")[0].append(streamDiv);
				document.querySelectorAll("#recentlylive > .dropdownContent")[0].append(livestreamDiv);
			} else {
				streamDivs[insertIndex].before(streamDiv);
				livestreamDivs[insertIndex].before(livestreamDiv);
			}
			
			updateTime();
		} else {
			console.log("Did not add event: Date not in the calendar");
		}
	};

	newStreamForm.append(newStreamFormButton);



	var newStreamerForm = document.createElement("form");
	newStreamerForm.id = "newStreamer";
	newStreamerForm.innerHTML = `
	<div id="newStreamerFormStreamer">
		<div>Streamer name</div>
		<input type="text" id="newStreamerFormStreamerName" name="newStreamerFormStreamerName">
	</div>
	<div id="newStreamerFormChannel">
		<div>Channel</div>
		<input type="text" id="newStreamerFormChannelText" name="newStreamerFormChannelText">
	</div>
	<div id="newStreamerFormColor">
		<div>Color</div>
		<input type="color" id="newStreamerFormColorColor">
	</div>
	`;

	var newStreamerFormButton = document.createElement("button");
	newStreamerFormButton.id = "newStreamerFormButton";
	newStreamerFormButton.setAttribute("type", "button");
	newStreamerFormButton.innerText = "Add new streamer";

	newStreamerFormButton.onclick = function () {
		var newStreamer = [document.querySelectorAll("#newStreamerFormStreamerName")[0].value, document.querySelectorAll("#newStreamerFormColorColor")[0].value, document.querySelectorAll("#newStreamerFormChannelText")[0].value];
		
		var insertIndex = findBSTIndex(streamerSpecificStuff, newStreamer, 0, 0, streamerSpecificStuff.length - 1);
		streamerSpecificStuff.splice(insertIndex, 0, newStreamer);
		
		streamerSpecificStuffDictionary[newStreamer[0].toLowerCase().replace(/\s/g, '')] = newStreamer;
		
		var streamerDiv = createStreamerDiv(newStreamer);
		var streamerDivs = document.querySelectorAll("#streamers > .dropdownContent > div");
		
		var newStreamFormStreamerSelectOption = document.createElement("option");
		newStreamFormStreamerSelectOption.value = newStreamer[0];
		newStreamFormStreamerSelectOption.innerText = newStreamer[0];
		
		var newStreamFormStreamerSelectOptions = document.querySelectorAll("#newStreamFormStreamerSelect > option");
		
		if ((insertIndex + 1) == streamerDivs.length) {
			document.querySelectorAll("#streamers > .dropdownContent")[0].append(streamerDiv);
			document.querySelectorAll("#newStreamFormStreamerSelect")[0].append(newStreamFormStreamerSelectOption);
		} else {
			streamerDivs[insertIndex + 1].before(streamerDiv);
			newStreamFormStreamerSelectOptions[insertIndex].before(newStreamFormStreamerSelectOption);
		}
		
		document.documentElement.style.setProperty("--" + newStreamer[0].toLowerCase().replace(/\s/g, '') + "Color", newStreamer[1]);
		colorCodesCss.innerText = colorCodesCss.innerText + "\n.calendarEvent." + newStreamer[0].toLowerCase().replace(/\s/g, '') + "{background: var(--" + newStreamer[0].toLowerCase().replace(/\s/g, '') + "Color);}";
	};

	newStreamerForm.append(newStreamerFormButton);

	document.querySelectorAll(".dropdown#addcustomevent > .dropdownContent")[0].append(newStreamForm);
	document.querySelectorAll(".dropdown#addcustomevent > .dropdownContent")[0].append(newStreamerForm);
}



// update indicator for current time
var updateTime = function () {
	var today = new Date();
	
	if ((today >= calendarStart) && (today <= calendarEnd)) {
		var calendarDay = today - calendarStart;
		calendarDay = calendarDay - (calendarDay % 86400000);
		calendarDay = calendarDay / 86400000;
	
		var dayPassed = Math.floor(100 * (60 * today.getHours() + today.getMinutes()) / 1440) / 100;
		
		document.querySelectorAll(".timeIndicator")[0].style.left = "calc((" + calendarDay + " * (var(--calendarWidth) / 8)) - var(--borderWidth))";
		document.querySelectorAll(".timeIndicator")[0].style.top = "calc(7vh + (" + dayPassed + " * (var(--calendarHeight) - 7vh)))";
	}
		
	var pastIndex = findBSTIndex(schedule, [, today.valueOf() - pastLimit + 1], 1, 0, schedule.length - 1);
	var futureIndex = findBSTIndex(schedule, [, today.valueOf() + futureLimit + 1], 1, 0, schedule.length - 1);
	
	var liveStreams = document.querySelectorAll(".streamTime.live");
	for (var i = 0; i < liveStreams.length; i++) {
		liveStreams[i].classList.remove("live");
	}
	
	for (var i = 0; i < futureIndex - pastIndex; i++) {
		document.querySelectorAll("#recentlylive > .dropdownContent > div")[pastIndex + i].classList.add("live");
	}
}



// redo stream dropdowns + calendar with new start date
var setNewStartDate = function (newDate) {
	document.querySelectorAll("#calendar")[0].innerHTML = "";
	
	var dropdownResets = ["recentlylive", "streams"];
	for (var i = 0; i < dropdownResets.length; i++) {
		document.querySelectorAll("#" + dropdownResets[i] + " > .dropdownContent")[0].innerHTML = "";	
	}
	
	// get current day of the week
	today = newDate;

	calendarStart = new Date(today - ((today.getHours() * 3600 * 1000) + (today.getMinutes() * 60 * 1000) + (today.getSeconds() * 1000) + today.getMilliseconds()));
	calendarEnd = new Date(calendarStart.valueOf() + (86400000 * 8));

	schedule = oldschedule;
	oldschedule = rearrangeArray(schedule, 1);
	schedule = oldschedule;

	schedule = schedule.slice(findBSTIndex(schedule, [,new Date(calendarStart.valueOf() - 1)], 1, 0, schedule.length-1), findBSTIndex(schedule, [,new Date(calendarEnd.valueOf() - 1)], 1, 0, schedule.length-1));

	setCalendar();

	for (var i = 0; i < schedule.length; i++) {
		document.querySelectorAll("#recentlylive > .dropdownContent")[0].append(createLiveStreamDiv(i));
	}

	for (var i = 0; i < schedule.length; i++) {
		document.querySelectorAll("#streams > .dropdownContent")[0].append(createStreamDiv(i));
	}

	var timeIndicator = document.createElement("div");
	timeIndicator.classList.add("timeIndicator");

	document.querySelectorAll("#calendar")[0].append(timeIndicator);

	updateTime();
}


// download stream + streamers arrays
var downloadFiles = function () {
	var rearrangedSchedule = rearrangeArray(oldschedule, 0);
	var scheduleContent = "var oldschedule = [\n";
	
	for (var i = 0; i < rearrangedSchedule.length; i++) {
		scheduleContent = scheduleContent + "[`" + rearrangedSchedule[i][0] + "`, new Date(`" + rearrangedSchedule[i][1] + "`), `" + rearrangedSchedule[i][2] + "`, `" + rearrangedSchedule[i][3] + "`]";
		
		if (i != (rearrangedSchedule.length - 1)) {
			scheduleContent = scheduleContent + ",\n";
		}
	}
	
	scheduleContent = scheduleContent + "\n];";
	
	var downloadFile = new File([scheduleContent], "schedule.js", {type: "application/javascript"});
	
	var downloadLink = document.createElement("a");
	downloadLink.download = "schedule.js";
	downloadLink.href = window.URL.createObjectURL(downloadFile);
	downloadLink.style.display = "none";
	downloadLink.click();
	
	
	
	var streamerContent = "var streamerSpecificStuff = [\n";
	
	for (var i = 0; i < streamerSpecificStuff.length; i++) {
		streamerContent = streamerContent + "[`" + streamerSpecificStuff[i][0] + "`, `" + streamerSpecificStuff[i][1] + "`, `" + streamerSpecificStuff[i][2] + "`]";
		
		if (i != (streamerSpecificStuff.length - 1)) {
			streamerContent = streamerContent + ",\n";
		}
	}
	
	streamerContent = streamerContent + "\n];";
	
	downloadFile = new File([streamerContent], "streamers.js", {type: "application/javascript"});
	downloadLink.download = "streamers.js";
	downloadLink.href = window.URL.createObjectURL(downloadFile);
	downloadLink.style.display = "none";
	downloadLink.click();
}



// reset streams + streamers
var resetStreamers = function () {
	streamerSpecificStuffDictionary = {}

	for (var i = 0; i < streamerSpecificStuff.length; i++) {
		var streamer = streamerSpecificStuff[i][0].toLowerCase().replace(/\s/g, '');
		streamerSpecificStuffDictionary[streamer] = streamerSpecificStuff[i];
	}
	
	// resetting css color variables
	var colorCodesCss = document.querySelectorAll("#colorCodesCss")[0];
	colorCodesCss.innerText = "";

	for (var i = 0; i < streamerSpecificStuff.length; i++) {
		var streamer = streamerSpecificStuff[i][0].toLowerCase().replace(/\s/g, '');
		document.documentElement.style.setProperty("--" + streamer + "Color", streamerSpecificStuff[i][1]);
		colorCodesCss.innerText = colorCodesCss.innerText + "\n.calendarEvent." + streamer + "{background: var(--" + streamer + "Color);}";
	}
	
	// resetting streamers dropdown
	document.querySelectorAll("#streamers > .dropdownContent")[0].innerHTML = "";
	
	document.querySelectorAll("#streamers > .dropdownContent")[0].append(toggleAllStreamersDiv());
	for (var i = 0; i < streamerSpecificStuff.length; i++) {
		document.querySelectorAll("#streamers > .dropdownContent")[0].append(createStreamerDiv(streamerSpecificStuff[i]));
	}
	
	// resetting add new events form
	var newStreamFormStreamerSelect = document.querySelectorAll("#newStreamFormStreamerSelect")[0];
	newStreamFormStreamerSelect.innerHTML = "";	

	for (var i = 0; i < streamerSpecificStuff.length; i++) {
		var newStreamFormStreamerSelectOption = document.createElement("option");
		newStreamFormStreamerSelectOption.value = streamerSpecificStuff[i][0];
		newStreamFormStreamerSelectOption.innerText = streamerSpecificStuff[i][0];
		
		newStreamFormStreamerSelect.append(newStreamFormStreamerSelectOption);
	}
}

var resetAll = function () {
	resetStreamers();
	setNewStartDate(today);
}



// settings dropdown
var addSettings = function () {
	// adjust start date of calendar
	document.querySelectorAll(".dropdown#settings > .dropdownContent")[0].innerHTML = `
	<div>
		<div>Calendar: </div>
		<div id="newFirstDate">
			<span>First calendar day</span>
			<input type="date" name="newFirstDateDate" id="newFirstDateDate" value = "` + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + `">
		</div>
	</div>
	<div>
		<div>Recently live: </div>
		<div id="newPastLimit">
			<span>Include streams that started in the last </span>
			<input type="number" name="newPastLimitNumber" id="newPastLimitNumber" value = "` + (pastLimit / (3600 * 1000)) + `" min="0" size="4" step="0.5">
			<span> hours</span>
		</div>
		<div id="newFutureLimit">
			<span>Include streams that will start in </span>
			<input type="number" name="newFutureLimitNumber" id="newFutureLimitNumber" value = "` + (futureLimit / (3600 * 1000)) + `" min="0" size="4" step="0.5">
			<span> hours</span>
		</div>
	</div>
	<div>
		<div>Download/Upload: </div>
		<div>
			<span class="material-icons" id="downloadData" title="Download a schedule/streamer file">file_download</span>
			<span id="jsFile" title="Upload a schedule/streamer file">
				<label id="newDataLabel">
					<span class="material-icons">upload_file</span>
					<input type="file" id="newData" name="newData" accept=".js"></input>
				</label>
			</span>
		</div>
	</div>
	`;
	document.querySelectorAll("#newFirstDate")[0].addEventListener("input", function (event) {
		setNewStartDate(new Date(document.querySelectorAll("#newFirstDateDate")[0].value + "T00:00:00"));
	});
	document.querySelectorAll("#newPastLimitNumber")[0].addEventListener("input", function (event) {
		try {
			pastLimit = parseFloat(document.querySelectorAll("#newPastLimitNumber")[0].value) * (3600 * 1000);
			updateTime();
		} catch (e) {}
	});
	document.querySelectorAll("#newFutureLimitNumber")[0].addEventListener("input", function (event) {
		try {
			futureLimit = parseFloat(document.querySelectorAll("#newFutureLimitNumber")[0].value) * (3600 * 1000);
			updateTime();
		} catch (e) {}
	});
	document.querySelectorAll("#downloadData")[0].onclick = function () {downloadFiles()};
	document.querySelectorAll("#newData")[0].onchange = function () {
		try {
			var curFiles = document.querySelectorAll("#newData")[0].files;
			curFiles[curFiles.length - 1].text().then(function (result) {
				var newSchedule = document.createElement('script');
				newSchedule.innerHTML = result; 
				document.querySelectorAll("body")[0].append(newSchedule);
				
				window.setTimeout(function () {newSchedule.remove();}, 5000);
				
				resetAll();
				}, function (error) {console.log(error)})
		} catch (e) {}
	};
}



// streamer color codes
var setColors = function () {
	for (var i = 0; i < streamerSpecificStuff.length; i++) {
		var streamer = streamerSpecificStuff[i][0].toLowerCase().replace(/\s/g, '');
		streamerSpecificStuffDictionary[streamer] = streamerSpecificStuff[i];
	}

	var colorCodesCss = document.createElement("style");
	colorCodesCss.id = "colorCodesCss";
	colorCodesCss.innerText = "";

	for (var i = 0; i < streamerSpecificStuff.length; i++) {
		var streamer = streamerSpecificStuff[i][0].toLowerCase().replace(/\s/g, '');
		document.documentElement.style.setProperty("--" + streamer + "Color", streamerSpecificStuff[i][1]);
		colorCodesCss.innerText = colorCodesCss.innerText + "\n.calendarEvent." + streamer + "{background: var(--" + streamer + "Color);}";
	}

	document.querySelectorAll("body")[0].append(colorCodesCss);
}


// dropdowns
var dropdowns = ["Recently live", "Streamers", "Streams", "Add custom event", "Settings"];
document.documentElement.style.setProperty("--numDropdown", dropdowns.length);


// time limits
var pastLimit = 9 * 60 * 60 * 1000; // 24 hours
var futureLimit = 3 * 60 * 60 * 1000; // 24 hours


// get current day of the week
var today = today || new Date(new Date () - (new Date().getDay() * 86400000));

var calendarStart = new Date(today - ((today.getHours() * 3600 * 1000) + (today.getMinutes() * 60 * 1000) + (today.getSeconds() * 1000) + today.getMilliseconds()));
var calendarEnd = new Date(calendarStart.valueOf() + (86400000 * 8));

// setting colors
var streamerSpecificStuff = streamerSpecificStuff || [];
var streamerSpecificStuffDictionary = {}
setColors();

var schedule = schedule || [];
var oldschedule = rearrangeArray(schedule, 1);
schedule = oldschedule;

schedule = schedule.slice(findBSTIndex(schedule, [,new Date(calendarStart.valueOf() - 1)], 1, 0, schedule.length-1), findBSTIndex(schedule, [,new Date(calendarEnd.valueOf() - 1)], 1, 0, schedule.length-1));

//var streamerSpecificStuff = streamerSpecificStuff || [];
streamerSpecificStuff = rearrangeArray(streamerSpecificStuff, 0);

setCalendar();
setDropdowns();

for (var i = 0; i < schedule.length; i++) {
	document.querySelectorAll("#recentlylive > .dropdownContent")[0].append(createLiveStreamDiv(i));
}

document.querySelectorAll("#streamers > .dropdownContent")[0].append(toggleAllStreamersDiv());
for (var i = 0; i < streamerSpecificStuff.length; i++) {
	document.querySelectorAll("#streamers > .dropdownContent")[0].append(createStreamerDiv(streamerSpecificStuff[i]));
}

for (var i = 0; i < schedule.length; i++) {
	document.querySelectorAll("#streams > .dropdownContent")[0].append(createStreamDiv(i));
}

addStreamForm();

addSettings();

var timeIndicator = document.createElement("div");
timeIndicator.classList.add("timeIndicator");

document.querySelectorAll("#calendar")[0].append(timeIndicator);

updateTime();
window.setInterval(updateTime, 300000);

document.querySelectorAll(".dropdown#streamers")[0].classList.add("expanded");



// check for params for preset streamers/schedules
var checkParams = function () {
	var searchParams = new URLSearchParams(new URL(window.location.href).search);
	
	if (searchParams.has("group")) {
		var addScripts = false;
		var streamersScript = "";
		var scheduleScript = "";
		
		if (searchParams.get("group").toLowerCase() == "niji-en") {
			streamersScript = "streamers-NIJI-EN.js";
			scheduleScript = "schedule-NIJI-EN.js";
			
			addScripts = true;
		} else if (searchParams.get("group").toLowerCase() == "personal") {
			streamersScript = "streamers-personal.js";
			scheduleScript = "schedule-personal.js";
			
			addScripts = true;
		}
		
		if (addScripts) {
			var newScript1 = document.createElement("script");
			newScript1.setAttribute('type', 'text/javascript');
			newScript1.setAttribute('src', streamersScript);
			
			var newScript2 = document.createElement("script");
			newScript2.setAttribute('type', 'text/javascript');
			newScript2.setAttribute('src', scheduleScript);
			
			var newScript3 = document.createElement("script");
			newScript3.setAttribute('type', 'text/javascript');
			newScript3.innerHTML = "resetAll();";
			
			
			newScript1.onload = function () {
				document.querySelectorAll("head")[0].append(newScript2);
			}
			
			newScript2.onload = function () {
				document.querySelectorAll("head")[0].append(newScript3);
			}
			
			document.querySelectorAll("head")[0].append(newScript1);
		}
	}
}

checkParams();
