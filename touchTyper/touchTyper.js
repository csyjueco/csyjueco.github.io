// figure out what key was pressed: start
var shiftKey = false;
var shiftDigit = [")","!","@","#","$","%","^","&","*","("];

var keyStrokeKey = function (event) {
	var keyStroke = event.code;
	var capsLock = event.getModifierState("CapsLock");
	
	if (event.code.startsWith("Shift")) {
		shiftKey = true;
		keyStroke = "Shift";
	} else if (event.code.startsWith("Key")) {
		if (shiftKey + capsLock == 1) {
			keyStroke = event.code.slice(-1).toUpperCase();
		} else {
			keyStroke = event.code.slice(-1).toLowerCase();
		}
	} else if (event.code.startsWith("Numpad")) {
		if (shiftKey) {
			keyStroke = event.code.slice(-1).toUpperCase();
		} else {
			keyStroke = event.code.slice(-1).toLowerCase();
		}
	} else if (event.code.startsWith("Digit")){
		if (shiftKey) {
			keyStroke = shiftDigit[parseInt(event.code.slice(-1))];
		} else {
			keyStroke = event.code.slice(-1);
		}
	} else {
		switch (event.code) {
			case "Space":
			keyStroke = String.fromCharCode(32);
			break;
			
			case "Enter":
			keyStroke = "\n";
			break;
			
			case "Comma":
			if (shiftKey) {
				keyStroke = "<";
			} else {
				keyStroke = ",";
			}
			break;
			
			case "Period":
			if (shiftKey) {
				keyStroke = ">";
			} else {
				keyStroke = ".";
			}
			break;
			
			case "Slash":
			if (shiftKey) {
				keyStroke = "?";
			} else {
				keyStroke = "/";
			}
			break;
			
			case "Semicolon":
			if (shiftKey) {
				keyStroke = ":";
			} else {
				keyStroke = ";";
			}
			break;
			
			case "Quote":
			if (shiftKey) {
				keyStroke = "\"";
			} else {
				keyStroke = "'";
			}
			break;
			
			case "BracketLeft":
			if (shiftKey) {
				keyStroke = "{";
			} else {
				keyStroke = "[";
			}
			break;
			
			case "BracketRight":
			if (shiftKey) {
				keyStroke = "}";
			} else {
				keyStroke = "]";
			}
			break;
			
			case "Backslash":
			if (shiftKey) {
				keyStroke = "|";
			} else {
				keyStroke = "\\";
			}
			break;
			
			case "BackQuote":
			if (shiftKey) {
				keyStroke = "~";
			} else {
				keyStroke = "`";
			}
			break;
			
			case "Minus":
			if (shiftKey) {
				keyStroke = "_";
			} else {
				keyStroke = "-";
			}
			break;
			
			case "Equal":
			if (shiftKey) {
				keyStroke = "+";
			} else {
				keyStroke = "=";
			}
			break;
			
			case "CapsLock":
			keyStroke = "Caps";
			break;
		}
	}
	
	return keyStroke;
	
};
// figure out what key was pressed: end






// set up keyboard layout: start
var clickedKey = function (char) {
	switch (char) {
		case "\n":
		char = "Enter";
		break;
		
		case " ":
		char = "Space";
		break;
		
		case "`":
		char = "Backquote";
		break;
		
		case "~":
		char = "Tilde";
		break;
		
		case "!":
		char = "Exclamation";
		break;
		
		case "@":
		char = "At";
		break;
		
		case "#":
		char = "Hashtag";
		break;
		
		case "$":
		char = "Dollar";
		break;
		
		case "%":
		char = "Percent";
		break;
		
		case "^":
		char = "Hat";
		break;
		
		case "&":
		char = "Ampersand";
		break;
		
		case "*":
		char = "Asterisk";
		break;
		
		case "(":
		char = "OpenParentheses";
		break;
		
		case ")":
		char = "ClosedParentheses";
		break;
		
		case "+":
		char = "Plus";
		break;
		
		case "=":
		char = "Equals";
		break;
		
		case "[":
		char = "OpenBracket";
		break;
		
		case "]":
		char = "ClosedBracket";
		break;
		
		case "{":
		char = "OpenBrace";
		break;
		
		case "}":
		char = "ClosedBrace";
		break;
		
		case "|":
		char = "Pipe";
		break;
		
		case "\\":
		char = "Backslash";
		break;
		
		case ":":
		char = "Colon";
		break;
		
		case ";":
		char = "Semicolon";
		break;
		
		case "\"":
		char = "DoubleQuote";
		break;
		
		case "'":
		char = "SingleQuote";
		break;
		
		case "<":
		char = "LessThan";
		break;
		
		case ",":
		char = "Comma";
		break;
		
		case ">":
		char = "GreaterThan";
		break;
		
		case ".":
		char = "Period";
		break;
		
		case "?":
		char = "Question";
		break;
		
		case "/":
		char = "ForwardSlash";
		break;
	}
	
	return char;
}

var keyboardKeys = [
	[1, "`", "~"],
	[1, "1", "!"],
	[1, "2", "@"],
	[1, "3", "#"],
	[1, "4", "$"],
	[1, "5", "%"],
	[1, "6", "^"],
	[1, "7", "&"],
	[1, "8", "*"],
	[1, "9", "("],
	[1, "0", ")"],
	[1, "-", "_"],
	[1, "=", "+"],
	[2, "Backspace", ""],
	[1.5, "Tab", ""],
	[1, "q", "Q"],
	[1, "w", "W"],
	[1, "e", "E"],
	[1, "r", "R"],
	[1, "t", "T"],
	[1, "y", "Y"],
	[1, "u", "U"],
	[1, "i", "I"],
	[1, "o", "O"],
	[1, "p", "P"],
	[1, "[", "{"],
	[1, "]", "}"],
	[1.5, "\\", "|"],
	[1.75, "Caps", ""],
	[1, "a", "A"],
	[1, "s", "S"],
	[1, "d", "D"],
	[1, "f", "F"],
	[1, "g", "G"],
	[1, "h", "H"],
	[1, "j", "J"],
	[1, "k", "K"],
	[1, "l", "L"],
	[1, ";", ":"],
	[1, "'", "\""],
	[2.25, "Enter", ""],
	[2.25, "Shift", ""],
	[1, "z", "Z"],
	[1, "x", "X"],
	[1, "c", "C"],
	[1, "v", "V"],
	[1, "b", "B"],
	[1, "n", "N"],
	[1, "m", "M"],
	[1, ",", "<"],
	[1, ".", ">"],
	[1, "/", "?"],
	[2.75, "Shift", ""],
	[1.25, "Ctrl", ""],
	[1, "Fn", ""],
	[1, "Win", ""],
	[1, "Alt", ""],
	[6, "Space", ""],
	[1, "Alt", ""],
	[1, "Fn", ""],
	[1, "", ""],
	[1.75, "Ctrl", ""]
]


var createKeyboard = function () {
	var temp = 0;
	var keyboardHeight = Math.min(window.innerHeight * 0.35, window.innerWidth * 0.3);
	document.documentElement.style.setProperty("--keyboardHeight", keyboardHeight + "px");
	
	for (var i = 0; i < keyboardKeys.length; i++) {
		var keyboardButton = document.createElement("div");
		keyboardButton.classList.add("keyboardKey");
		
		if (Math.floor(temp / 15) != Math.floor((temp + keyboardKeys[i][0]) / 15) && (temp + keyboardKeys[i][0]) % 15 != 0) {
			temp = temp + keyboardKeys[i][0];
			
			keyboardButton.style.top = "calc(((var(--keyboardHeight) / 5) * " + Math.floor(temp / 15) + ")";
			keyboardButton.style.left = "calc(((3 * (var(--keyboardHeight) / 15) * " + (temp % 15) + "))";
			keyboardButton.style.width = "calc((0.9 * 3 * (var(--keyboardHeight) / 15) + ((0.1 * 3 * (var(--keyboardHeight) / 15) * " + Math.floor(keyboardKeys[i][0] - 1) +"))";
		} else {
			keyboardButton.style.top = "calc(((var(--keyboardHeight) / 5) * " + Math.floor(temp / 15) +")";
			keyboardButton.style.left = "calc(((3 * (var(--keyboardHeight) / 15) * " + (temp % 15) + "))";
			keyboardButton.style.width = "calc((3 * (var(--keyboardHeight) / 15) * " + keyboardKeys[i][0] + ") - (0.1 * 3 * (var(--keyboardHeight) / 15)))";
			
			temp = temp + keyboardKeys[i][0];
		}
		
		if (keyboardKeys[i][1] != "") {
			var keyboardButtonLower = document.createElement("div");
			keyboardButtonLower.innerHTML = keyboardKeys[i][1];
			keyboardButtonLower.classList.add("lower");
			keyboardButtonLower.classList.add("Key" + clickedKey(keyboardKeys[i][1]));
			
			keyboardButton.append(keyboardButtonLower);
		}
		
		if (keyboardKeys[i][2] != "") {
			var keyboardButtonUpper = document.createElement("div");
			keyboardButtonUpper.innerHTML = keyboardKeys[i][2];
			keyboardButtonUpper.classList.add("upper");
			keyboardButtonUpper.classList.add("Key" + clickedKey(keyboardKeys[i][2]));
			
			keyboardButton.append(keyboardButtonUpper);
		}
		
		document.querySelectorAll("#keyboard")[0].append(keyboardButton);
	}
}
// set up keyboard layout: end





var updateKeyboard = function (char) {
	if (document.querySelectorAll("#keyboard")[0].style.display != "none") {
		char = clickedKey(char);
		
		var oldKeys = document.querySelectorAll(".highlight");
		var newKeys = document.querySelectorAll(".Key" + char);
		
		for (var i = 0; i < oldKeys.length;  i++) {
			oldKeys[i].classList.remove("highlight");
		}
		
		for (var i = 0; i < newKeys.length;  i++) {
			if (newKeys[i].classList.contains("Key" + char)) {
				newKeys[i].parentNode.classList.add("highlight");
			
				if(newKeys[i].classList.contains("upper")) {
					var shiftKeys = document.querySelectorAll(".KeyShift");
					
					for (var j = 0; j < shiftKeys.length; j++) {
						shiftKeys[j].parentNode.classList.add("highlight");
					}
				}
			}
		}
	}
};

var pushKey = function (char) {
	if (document.querySelectorAll("#keyboard")[0].style.display != "none") {
		char = clickedKey(char);
		
		var newKeys = document.querySelectorAll(".Key" + char);
		
		for (var i = 0; i < newKeys.length;  i++) {
			if (newKeys[i].classList.contains("Key" + char)) {
				newKeys[i].parentNode.classList.add("keyPush");
			}
		}
	}
};

var releaseKey = function (char) {
	if (document.querySelectorAll("#keyboard")[0].style.display != "none") {
		char = clickedKey(char);
		
		var oldKeys = document.querySelectorAll(".keyPush");
		
		for (var i = 0; i < oldKeys.length;  i++) {
			oldKeys[i].classList.remove("keyPush");
		}
	}
};





var updateScroll = function () {
	cursorPos = document.querySelectorAll("#cursor")[0].getBoundingClientRect().top;
	
	var topOffSet = parseInt(document.querySelectorAll("#typingArea > div:nth-of-type(1)")[0].style.top.slice(0,-2));
	topOffSet = topOffSet ? topOffSet : 0;
	
	var newNumScrollText = Math.floor((cursorPos - topOffSet - breakPoint) / lineHeight);
	newNumScrollText = Math.max(newNumScrollText, 0);
	
	if (newNumScrollText != numScrollText) {
		numScrollText = newNumScrollText;
		
		document.querySelectorAll("#typingArea > div:nth-of-type(1)")[0].style.top = -lineHeight * numScrollText + "px";
		document.querySelectorAll("#typingArea > div:nth-of-type(2)")[0].style.top = -lineHeight * numScrollText + "px";
	}
}

window.addEventListener('resize', function () {
	breakPoint = window.innerHeight * breakPointFactor;
	updateScroll();
	
	var keyboardHeight = Math.min(window.innerHeight * 0.35, window.innerWidth * 0.3);
	document.documentElement.style.setProperty("--keyboardHeight", keyboardHeight + "px");
});

var updateStats = function () {
	document.documentElement.style.setProperty('--accuracy', accuracy);
	document.querySelectorAll("#stats")[0].innerHTML = (accuracy * 100).toFixed(1) + "% Accuracy - " + charNum + " Characters - " + mistakes + " Misclicks";
}

var toggleKeyboard = function () {
	if (document.querySelectorAll("#keyboard")[0].style.display == "none") {
		document.documentElement.style.setProperty("--typingAreaHeight", "calc(57.5vh)");
		updateStats();
		
		updateScroll();
		
		document.querySelectorAll("#keyboard")[0].style.display = "block";
		updateKeyboard(nextChar);
	} else {
		document.querySelectorAll("#keyboard")[0].style.display = "none";
		
		document.documentElement.style.setProperty("--typingAreaHeight", "calc(90vh)");
		updateStats();
		
		updateScroll();
	}
};

	
var colorInputs = [
//	[input id/name, label, default value]
	["colorBackground", "Background", "#4F4E4E"],
	["colorText", "Text", "#DBDBDB"],
	["colorKeyboardOutline", "Keyboard outline", "#EA975B"],
	["colorKeyboardHighlight", "Keyboard highlight", "#EA975B"],
	["colorAccuracyGood", "Accuracy - Good", "#8FE368"],
	["colorAccuracyBad", "Accuracy - Bad", "#FFB2B2"]
];


var customColorsPopUp = function () {
	var popUp = document.createElement("div");
	popUp.id = "customColorsPopUp";
	popUp.style.display = "none";
	
	var colorInputsContainer = document.createElement("div");
	colorInputsContainer.id = "colorInputsContainer";
	
	popUp.append(colorInputsContainer);
	
	for (var i = 0; i < colorInputs.length; i++) {
		var colorInput = document.createElement("div");
		colorInput.classList.add("colorInputDiv");
		
		colorInput.innerHTML = `
		<input type="color" id="` + colorInputs[i][0] + `" name="` + colorInputs[i][0] + `"
			   value="` + (document.documentElement.style.getPropertyValue("--" + colorInputs[i][0]) == "" ? colorInputs[i][2] : document.documentElement.style.getPropertyValue("--" + colorInputs[i][0])) + `">
		<label for="` + colorInputs[i][0] + `">` + colorInputs[i][1] + `</label>
		`;
		
		colorInput.addEventListener("input", function (event) {
			document.documentElement.style.setProperty("--" + event.target.id, event.target.value);
		});
		
		colorInputsContainer.append(colorInput);
	}
	
	var popUpCommands = document.createElement("div");
	popUpCommands.id = "customColorsPopUpCommands";
	
	var popUpDefault = document.createElement("span");
	popUpDefault.id = "customColorsDefault";
	popUpDefault.innerHTML = "Default";
	popUpDefault.onclick = function () {
		for (var i = 0; i < colorInputs.length; i++) {
			var currInput = document.querySelectorAll("#" + colorInputs[i][0])[0];
			currInput.value = colorInputs[i][2];
			currInput.dispatchEvent(new Event("input", {bubbles: true}));
		}
	};
	
	popUpCommands.append(popUpDefault);
	
	var popUpClose = document.createElement("span");
	popUpClose.id = "customColorsPopUpClose";
	popUpClose.innerHTML = "Close";
	popUpClose.onclick = function () {toggleCustomColorsPopUp()};
	
	popUpCommands.append(popUpClose);
	
	popUp.append(popUpCommands);
	
	document.querySelectorAll("body")[0].append(popUp);
}

var toggleCustomColorsPopUp = function () {
	if (document.querySelectorAll("#customColorsPopUp")[0].style.display != "none") {
		document.querySelectorAll("#customColorsPopUp")[0].style.display = "none";
	} else {
		document.querySelectorAll("#customColorsPopUp")[0].style.display = "block";
	}
};





// main code: start
var mistakes = 0;
var charNum = 0;
var wordNum = 0;
var nextChar = document.querySelectorAll("#typingArea > div:nth-of-type(1)")[0].innerText.slice(charNum, charNum + 1);
var currWord = document.querySelectorAll("#typingArea > div:nth-of-type(1)")[0].innerText.split(" ")[wordNum];
var typedChar = "";

var cursorPos = document.querySelectorAll("#cursor")[0].getBoundingClientRect().top;
var breakPointFactor = 0.50;
var breakPoint = window.innerHeight * breakPointFactor;
var numScrollText = 0;
var lineHeight = 30;

var accuracy = 1.00;

createKeyboard();
customColorsPopUp();

updateKeyboard(nextChar);

var resetTyper = function () {
	mistakes = 0;
	charNum = 0;
	wordNum = 0;
	nextChar = document.querySelectorAll("#typingArea > div:nth-of-type(1)")[0].innerText.slice(charNum, charNum + 1);
	currWord = document.querySelectorAll("#typingArea > div:nth-of-type(1)")[0].innerText.split(" ")[wordNum];
	
	document.querySelectorAll("#typedText")[0].innerHTML = "<span id=\"cursor\"></span><span id=\"currWord\">" + currWord + "</span>";
	
	// resetting scroll
	document.querySelectorAll("#typingArea > div:nth-of-type(1)")[0].style.top = "0px";
	document.querySelectorAll("#typingArea > div:nth-of-type(2)")[0].style.top = "0px";
	
	numScrollText = 0;
	lineHeight = 30;

	accuracy = 1.00;

	updateKeyboard(nextChar);
	updateStats();
};



// adding functions to buttons
document.querySelectorAll("#reset")[0].onclick = function () {resetTyper();};

document.querySelectorAll("#toggleKeyboard")[0].onclick = function () {toggleKeyboard();};

document.querySelectorAll("#newTextInput")[0].onchange = function () {
	try {
		var curFiles = document.querySelectorAll("#newTextInput")[0].files;
		curFiles[curFiles.length - 1].text().then(function (result) {document.querySelectorAll("#typingArea > div:nth-of-type(1)")[0].innerText = result; resetTyper();}, function (error) {console.log(error)})
	} catch (e) {}
};

document.querySelectorAll("#customColors")[0].onclick = function () {toggleCustomColorsPopUp();};



// main event listener
document.addEventListener("keydown", function (event) {
	pushKey(keyStrokeKey(event));
	
	if (nextChar != "") {
		typedChar = keyStrokeKey(event);
	
		if (typedChar == nextChar) {
			// special cases for line breaks and spaces
			if (nextChar == "\n") {nextChar = "<br>";};
			//if (nextChar == " ") {nextChar = "&nbsp;";};
			
			// mark the character as typed and get the next character
			if (nextChar != " ") {
				currWord = currWord.slice(1);
			}
			document.querySelectorAll("#typedText")[0].innerHTML = document.querySelectorAll("#typedText")[0].innerHTML.slice(0, document.querySelectorAll("#typedText")[0].innerHTML.search("<span id")) + nextChar + "<span id=\"cursor\"></span><span id=\"currWord\">" + currWord.replace("\n", "<br>"); + "</span>";
			
			charNum = charNum + 1;
			nextChar = document.querySelectorAll("#typingArea > div:nth-of-type(1)")[0].innerText.slice(charNum, charNum + 1);
			
			if (currWord == "") {
				wordNum = wordNum + 1;
				currWord = document.querySelectorAll("#typingArea > div:nth-of-type(1)")[0].innerText.split(" ")[wordNum];
			}
			
			// update keyboard highlights
			updateKeyboard(nextChar);
			
			// check if it's the text is finished
			if (nextChar == "") {
				// what do if end
			}
			
			// adjust the typing area if the text is really long
			updateScroll();
		} else {
			if (typedChar.length == 1) {
				mistakes = mistakes + 1;
			};
		}
		
		// update stats section
		if (typedChar.length == 1) {
			accuracy = Math.round(10000 * charNum / (mistakes + charNum)) / 10000;
			updateStats();
		}
	}
});

document.addEventListener("keyup", function (event) {
	var keyStroke = keyStrokeKey(event);
	releaseKey(keyStroke);
	
	if (keyStroke == "Shift") {
		shiftKey = false;
	}
});
