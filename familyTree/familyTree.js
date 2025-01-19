var sampleData = [
	['name', 'p1', 'p2', 'mTo','funFacts','imgs', 'personKey', 'nickname'],
	['white', , , 'black', 'fun fact 1|fun fact 2|3 fact fun', , ],
	['black', , , 'white', , , ],
	['Duc', , , 'Du ck', , 'duckImg1.jpg|duckImg2.jpg|duckImg3.jpg|duckImg4-long.jpg', 'Dock'],
	['Du ck', , , 'Duc', , , ],
	['yel-low', , , 'blue', , , ],
	['red', 'black', 'white', 'brown', , , ],
	['green', 'white', 'black', , , ],
	['blue', 'black', 'white', 'yel-low', , , ],
	['brown', , , 'red', , , ],
	['oak', 'brown', 'red', ,'tree hugger' , , ],
	['light ning', 'yel-low', 'blue', '', 'milk before cereal|man fish > fish man!!', , ],
	['birch', 'red', 'brown', , , , ],
	['gus', 'Du ck', 'Duc', , , 'duckImg1.jpg|duckImg2.jpg|duckImg3.jpg|duckImg4-long.jpg', ]
];



/* START: ADDING NEW COLUMNS BASED ON THE ORIGINAL COLUMNS */
var data = familyData ? familyData : sampleData;
// data = sampleData;

// filling in blank spaces with empty strings
for (var i = 0; i < data.length; i++) {
	for (var j = 0; j < data[0].length; j++) {
		data[i][j] = data[i][j] ? data[i][j] : '';
	}
}

// getting indices of the different column
var p1Index = data[0].indexOf('p1');
var p2Index = data[0].indexOf('p2');
var nameIndex = data[0].indexOf('name');
var nicknameIndex = data[0].indexOf('nickname');
var mToIndex = data[0].indexOf('mTo');
var funFactsIndex = data[0].indexOf('funFacts');
var imgsIndex = data[0].indexOf('imgs');
var personKeyIndex = data[0].indexOf('personKey');

// creating a unique key to use as an id for each person that doesn't have one
// TODO: create export function for data columns
for (var i = 1; i < data.length; i++) {
	let createPersonKey = true
	if (data[i][personKeyIndex] != '') {
		let count = 0
		
		for (var j = 1; j < data.length; j++) {
			if (data[i][personKeyIndex] == data[j][personKeyIndex]) {
				count++;
			}
		}
		
		if (count < 2) {
			createPersonKey = false;
		}
	}
	
	if (createPersonKey) {
		let key = data[i][nameIndex].replace(' ','').toLowerCase();
		let count = 0;
		for (var j = 1; j < i; j++) {
			if (data[j][nameIndex] == data[i][nameIndex]) {
				count++
			}
		}
		data[i][personKeyIndex] = key + count;
	}
}

// creating couple key based on parent names in alphabetical order
data[0].push('parentKey');
var parentKeyIndex = data[0].indexOf('parentKey');
for (var i = 1; i < data.length; i++) {
	let parent1 = data[i][p1Index] ? data[i][p1Index].replace(' ','').toLowerCase() : '';
	let parent2 = data[i][p1Index] ? data[i][p2Index].replace(' ','').toLowerCase() : '';	
	
	let parentKey = parent1 > parent2 ? parent1 + parent2 : parent2 + parent1;
	data[i][parentKeyIndex] = parentKey;
}

// creating couple key based on name and married to (mTo) column
// key should match the parentKey of the children
data[0].push('mKey');
var mKeyIndex = data[0].indexOf('mKey');
for (var i = 1; i < data.length; i++) {
	if (data[i][mToIndex] == '') { // no mKey when person isn't married to anymore
		data[i][mKeyIndex] = ''
	} else {
		let partner1 = data[i][nameIndex].replace(' ','').toLowerCase();
		let partner2 = data[i][mToIndex].replace(' ','').toLowerCase();
		
		let mKey = partner1 > partner2 ? partner1 + partner2 : partner2 + partner1;
		data[i][mKeyIndex] = mKey;
	}
}

// creating an array with classes to be assigned to the HTML element of the person
data[0].push('classList');
var classListIndex = data[0].indexOf('classList');
for (var i = 1; i < data.length; i++) {
	data[i][classListIndex] = [];
	
	if (data[i][mKeyIndex] != '') {
		data[i][classListIndex].push('m'); // married
		data[i][classListIndex].push('m' + data[i][mKeyIndex]); // class for specific couple
	}
	
	if (data[i][parentKeyIndex] != '') {
		data[i][classListIndex].push('c'); // child
	}
	
	if (data[i][mKeyIndex] != '') {
		if (data[i][parentKeyIndex] == '') { // married without parent
			for (var j = 1; j < data.length; j++) {
				if (data[j][mKeyIndex] == data[i][mKeyIndex] && data[j][nameIndex] != data[i][nameIndex]) { // checking for other partner (same mKey, different name)
					if (data[j][parentKeyIndex] != '') {
						data[i][classListIndex].push('secondary'); // partner has a parent
					} else if (i > j) {
						data[i][classListIndex].push('secondary'); // neither partner has a parent (initial generation), secondary given to second partner on the list/appearing in the data
					}
				}
			}
		}
	}
}

var startingGen = 2;
data[0].push('gen');
var genIndex = data[0].indexOf('gen');

// assigning startingGen to everyone first
for (var i = 1; i < data.length; i++) {
	data[i][genIndex] = startingGen;
}

// second passthrough on assigning generation values
for (var i = 1; i < data.length; i++) {
	if (data[i][parentKeyIndex] != '') {
		for (var j = 1; j < i; j++) {
			if (data[j][mKeyIndex] == data[i][parentKeyIndex]) {
				data[i][genIndex] = data[j][genIndex] + 1; // generation is 1 more than the generation of the parent
			}
		}
	} else if (data[i][mKeyIndex] != '') { // married but without parents (failed the last if statement check)
		for (var j = 1; j < data.length; j++) {
			if (data[j][mKeyIndex] == data[i][mKeyIndex] && data[j][nameIndex] != data[i][nameIndex]) {
				data[i][genIndex] = data[j][genIndex]; // copy generation number of the partner
			}
		}
	}
}

// third passthrough on assigning generation values
// fixes when the married partner w/o parent is older than the married partner w/ arent
for (var i = 1; i < data.length; i++) {
	if (data[i][parentKeyIndex] != '') {
		for (var j = 1; j < i; j++) {
			if (data[j][mKeyIndex] == data[i][parentKeyIndex]) {
				data[i][genIndex] = data[j][genIndex] + 1; // generation is 1 more than the generation of the parent
			}
		}
	} else if (data[i][mKeyIndex] != '') { // married but without parents (failed the last if statement check)
		for (var j = 1; j < data.length; j++) {
			if (data[j][mKeyIndex] == data[i][mKeyIndex] && data[j][nameIndex] != data[i][nameIndex]) {
				data[i][genIndex] = data[j][genIndex]; // copy generation number of the partner
			}
		}
	}
}

/* END: ADDING NEW COLUMNS BASED ON THE ORIGINAL COLUMNS */



/* START: CREATING ELEMENTS FOR EACH PERSON AND SETTING THEM UP IN THE FAMILY TREE TABLE */
data[0].push('element');
var elementIndex = data[0].indexOf('element');
for (var i = 1; i < data.length; i++) {
	let element;
	// by default, people will have their own table element
	// people with secondary class will have a td element to be inserted in their partner's table element
	
	// p element with the person's name and a click event to update the profile
	let nameText = document.createElement('p');
	nameText.innerText = data[i][nameIndex];
	
	if (data[i][nicknameIndex] != '') {
		nameText.innerText = nameText.innerText + ' (' + data[i][nicknameIndex].replaceAll("|",", ") + ')';
	}
	
	nameText.classList.add('name');
		
	nameText.addEventListener('click', (event) => {
		updateProfile(event.srcElement.parentNode.id);
		document.querySelectorAll('#familyTree')[0].classList.toggle('hide');
		document.querySelectorAll('#profile')[0].classList.toggle('hide');
	})

	if (data[i][classListIndex].includes('secondary')) {
		element = document.createElement('td');
		element.id = data[i][personKeyIndex];
		
		element.append(nameText);
		
		for (var j = 0; j < data[i][classListIndex].length; j++) {
			element.classList.add(data[i][classListIndex][j]);
		}
	} else {
		element = document.createElement('table');
		if (data[i][mKeyIndex] != '') {
			element.id = data[i][mKeyIndex];
		}
		element.setAttribute('gen', data[i][genIndex]);
		
		let firstRow = document.createElement('tr');
		let firstRowEntry = document.createElement('td');
		let firstRowEntryTable = document.createElement('table');
		let firstRowEntryTableRow = document.createElement('tr');
		
		let gen = document.createElement('td');
		gen.innerText = data[i][genIndex];
		// setting attribute to use as reference when gen text is changed for other temporary text
		gen.setAttribute('gen', data[i][genIndex]);

		let nameEntry = document.createElement('td');
		nameEntry.id = data[i][personKeyIndex];
		// setting colspan to 2 for single people
		// so that they occupy the same amount of space as a couple
		if (!data[i][classListIndex].includes('m')) {
			nameEntry.colSpan = 2;
		}
		
		nameEntry.append(nameText);
		
		for (var j = 0; j < data[i][classListIndex].length; j++) {
			nameEntry.classList.add(data[i][classListIndex][j]);
		}
		
		firstRowEntryTableRow.append(gen);
		firstRowEntryTableRow.append(nameEntry);
		
		firstRowEntryTable.append(firstRowEntryTableRow);
		firstRowEntry.append(firstRowEntryTable);
		firstRow.append(firstRowEntry);
		
		element.append(firstRow);
		
		// toggling collapse class on the table element when the gen element is clicked
		// and updating the gen element's text based on it
		gen.addEventListener('click', (event) => {
			event.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.classList.toggle('collapse');
			event.srcElement.innerText = event.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('collapse') ? '+' : event.srcElement.getAttribute('gen');
		});
		
		// changes gen element's text to '-' when hovered without the collapse class
		gen.addEventListener('mouseover', (event) => {
			event.srcElement.innerText = event.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('collapse') ? event.srcElement.getAttribute('gen') : '-';
		});
		
		gen.addEventListener('mouseout', (event) => {
			event.srcElement.innerText = event.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('collapse') ? '+' : event.srcElement.getAttribute('gen');
		});
	}
	data[i][elementIndex] = element;
}

var familyTree = document.createElement('table');
familyTree.id = 'familyTree';
document.querySelectorAll('body')[0].append(familyTree);

for (var i = 1; i < data.length; i++) {
	// adding people with the 'secondary; class to the first row of their partner's table element
	if (data[i][classListIndex].includes('secondary')) {
		for (var j = 1; j < data.length; j++) {
			if (data[i][mKeyIndex] == data[j][mKeyIndex] && data[i][nameIndex] != data[j][nameIndex]) {
				data[j][elementIndex].firstChild.firstChild.firstChild.firstChild.appendChild(data[i][elementIndex]);
			}
		}
	}
	
	// adding people with the 'c' class as a new row to their (non-'secondary') parent's table element
	if (data[i][classListIndex].includes('c')) {
		for (var j = 1; j < data.length; j++) {
			if (data[i][parentKeyIndex] == data[j][mKeyIndex] && !data[j][classListIndex].includes('secondary')) {
				let newRow = document.createElement('tr');
				let newEntry = document.createElement('td');
				
				newEntry.append(data[i][elementIndex]);
				newRow.append(newEntry);
				data[j][elementIndex].append(newRow);
				
				// marking parts of the tree that are expandable
				data[j][elementIndex].classList.add('expandable');
			}
		}
	}
	
	// adding people in the startingGen as a new row in the main family tree table
	if (data[i][genIndex] == startingGen && !data[i][classListIndex].includes('secondary')) {
		let newRow = document.createElement('tr');
		let newEntry = document.createElement('td');
		
		newEntry.append(data[i][elementIndex]);
		newRow.append(newEntry);
		familyTree.append(newRow);
	}
}
/* END: CREATING ELEMENTS FOR EACH PERSON AND SETTING THEM UP IN THE FAMILY TREE TABLE */



/* START: CREATING INITIAL PROFILE SCREEN */
var profile = document.createElement('div');
profile.id = 'profile';
profile.classList.add('hide'); // TODO: only hide for mobile / thin screens?

var profileName = document.createElement('div');
profileName.id = 'profileName';

var profileNameText = document.createElement('p');

var profilePic = document.createElement('div');
profilePic.id = 'profilePic';

var profileInfo = document.createElement('div');
profileInfo.id = 'profileInfo';

profileName.append(profileNameText);

profile.append(profileName);
profile.append(profilePic);
profile.append(profileInfo);

document.querySelectorAll('body')[0].append(profile);

// create p.name that updates profile when clicked
function createName (person) {
	let name = document.createElement('p');
	name.innerText = person[nameIndex];
	name.setAttribute('key', person[personKeyIndex]);
	name.classList.add('name');
	
	name.addEventListener('click', (event) => {
		updateProfile(event.srcElement.getAttribute('key'));
	});
	
	return name;
}

// create div.imgGroup where clicking on the img switches to the next one
function createImageCarousel (person) {
	let picDiv = document.createElement('div');
	picDiv.classList.add('imgGroup')
	
	let picPaths = person[imgsIndex].split('|').map((filename) => person[personKeyIndex] + '\\' + filename);
	
	for (var i = 0; i < picPaths.length; i++) {
		let picImg = document.createElement('img');
		picImg.src = picPaths[i];
		picImg.setAttribute('next', ((i + 1) % picPaths.length));
		
		if (picPaths[i].includes('-long')) {
			picImg.classList.add('long');
		}
		
		if (i == 0) {
			picImg.classList.add('active');
		}
		
		// hide current picture when it's clicked and show the next image
		picImg.addEventListener('click', (event) => {
			event.srcElement.classList.toggle('active');
			event.srcElement.parentNode.childNodes[parseInt(event.srcElement.getAttribute('next'))].classList.toggle('active');
		});
		
		picDiv.append(picImg);
	}
	
	return picDiv;
}

function updateProfile (personKey) {
	// scroll to the top of the page whenever the profile is updated
	window.scrollTo(0, 0);
	
	let person;
	for (var i = 1; i < data.length; i++) {
		if (personKey == data[i][personKeyIndex]) {
			person = data[i];
		}
	}
	
	document.querySelectorAll('#profileName')[0].firstChild.innerText = person[nameIndex] + (person[nicknameIndex] != '' ? (' (' + person[nicknameIndex].replaceAll("|",", ") + ')') : '');
	
	// adding images into the profile
	document.querySelectorAll('#profilePic')[0].innerText = '';
	let imgFiles
	
	if (person[imgsIndex] == '') {
		imgFiles = ['600x600.png', '640x360.png', '400x600.png'].map((filename) => 'fillerImg\\' + filename);
	} else {
		imgFiles = person[imgsIndex].split('|').map((filename) => person[personKeyIndex] + '\\' + filename);
	}
	
	for (var i = 0; i < imgFiles.length; i++) {
		let picDiv = document.createElement('img');
		picDiv.src = imgFiles[i];
		
		document.querySelectorAll('#profilePic')[0].append(picDiv);
	}
	
	// adding fun facts and related people
	document.querySelectorAll('#profileInfo')[0].innerText = '';
	if (person[funFactsIndex] != '') {
		let facts = person[funFactsIndex].split('|');
		
		for (var i = 0; i < facts.length; i++) {
			let factEntry = document.createElement('p');
			factEntry.innerText = facts[i];
			document.querySelectorAll('#profileInfo')[0].append(factEntry);
		}
	}
	
	if (person[classListIndex].includes('m')) {
		// creating entry in #profileInfo for partner
		let partnerEntry = document.createElement('div');
		partnerEntry.innerText = 'Married to: ';
		
		let partner;
		
		for (var i = 1; i < data.length; i++) {
			if (person[mKeyIndex] == data[i][mKeyIndex] && person[nameIndex] != data[i][nameIndex]) {
				partner = data[i];
			}
		}
		
		partnerEntry.append(createName(partner));
		
		if (partner[imgsIndex] != '') {
			partnerEntry.append(createImageCarousel(partner));
		}
		
		
		document.querySelectorAll('#profileInfo')[0].append(partnerEntry);
		
		// creating entry in #profileInfo if person has children
		let childrenEntry = document.createElement('div');
		childrenEntry.innerText = 'Children: ';
		
		for (var i = 1; i < data.length; i++) {
			if (person[mKeyIndex] == data[i][parentKeyIndex]) {
				childrenEntry.append(createName(data[i]));
				
				if (data[i][imgsIndex] != '') {
					childrenEntry.append(createImageCarousel(data[i]));
				}
			}
		}
		
		if (childrenEntry.childElementCount > 0) {
			document.querySelectorAll('#profileInfo')[0].append(childrenEntry);
		}
	}
	
	// creating entry in #profileInfo if person has parents in the family tree
	if (person[classListIndex].includes('c')) {
		let parentEntry = document.createElement('div');
		parentEntry.innerText = 'Parents: ';
		
		for (var i = 1; i < data.length; i++) {
			if (person[parentKeyIndex] == data[i][mKeyIndex]) {
				parentEntry.append(createName(data[i]));
				
				if (data[i][imgsIndex] != '') {
					parentEntry.append(createImageCarousel(data[i]));
				}
			}
		}
		
		document.querySelectorAll('#profileInfo')[0].append(parentEntry);
	}
}
/* END: CREATING INITIAL PROFILE SCREEN */



/* START: CREATING TOGGLE */
// TODO: changed toggle to a menu button
// TODO: add a way to collapse all in the family tree
var menuOptions = document.createElement('div');
menuOptions.id = 'menu';

var menuButton = document.createElement('div');
menuButton.id = 'menuButton';
menuButton.innerText = 'options';
menuButton.classList.add('button');

menuButton.addEventListener('click', (event) => {
	event.srcElement.parentNode.classList.toggle('collapse');
});

var toggleView = document.createElement('div');
toggleView.id = 'toggle';
toggleView.innerText = 'togle~';
toggleView.classList.add('button');

toggleView.addEventListener('click', (event) => {
	document.querySelectorAll('#familyTree')[0].classList.toggle('hide');
	document.querySelectorAll('#profile')[0].classList.toggle('hide');
});

var expandCollapseButton = document.createElement('div');
expandCollapseButton.id = 'expandCollapse';
expandCollapseButton.innerText = '-';
expandCollapseButton.classList.add('button');

// code to collapse whole family tree
expandCollapseButton.addEventListener('click', (event) => {
	if (event.srcElement.innerText == '-') {
		document.querySelectorAll('table[gen].expandable').forEach((el) => el.classList.add('collapse'));
		event.srcElement.innerText = '+';
	} else {
		document.querySelectorAll('table[gen].expandable').forEach((el) => el.classList.remove('collapse'));
		event.srcElement.innerText = '-';
	}
	
	document.querySelectorAll('td[gen]').forEach((el) => el.innerText = el.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('collapse') ? '+' : el.getAttribute('gen'));
});

menuOptions.append(expandCollapseButton);
menuOptions.append(toggleView);
menuOptions.append(menuButton);

document.querySelectorAll('body')[0].append(menuOptions);
/* END: CREATING TOGGLE */



/* START: CSS */
var CSSstyles = document.createElement('style');
document.querySelectorAll('body')[0].append(CSSstyles);
// TODO (LOW): set gen specific styling through JS (e.g. table[gen='2'] > tr:nth-of-type(1))
CSSstyles.textContent = `
#familyTree {
	margin-left: auto;
	margin-right: auto;
}

.hide {
	display: none;
}

#menu {
	position: fixed;
	
	bottom: 20px;
	right: 20px;
}

#menu > .button {
	background-color: lightgray;
	opacity: 0.5;
	
	border: 2px solid gray;
	border-radius: 10px;
	height: 50px;
	width: 50px;
	
	margin-top: 5px;
	
	transition: height 0.5s, opacity 0.5s;
}

#menu.collapse > .button {
	height: 0px;
	opacity: 0;
}

#menu.collapse > .button:last-child {
	height: 50px;
	opacity: 0.5;
}

#menu > .button:hover {
	opacity: 0.75;
}

p {
	margin: 0px;
	padding-bottom: 10px;
	padding-top: 10px;
}

p.name:hover, p.name:active {
	font-weight: bold;
}

#profile {
	max-width: 400px;
	margin-left: auto;
	margin-right: auto;
}

#profile > div {
	margin-bottom: 5px;
	margin-top: 10px;
}

#profile p {
	margin: 0px;
	padding: 0px;
}

#profileInfo p.name {
	font-style: oblique;
}

#profileInfo > p, #profileInfo > div {
	margin-bottom: 5px;
	margin-top: 10px;
}

#profileName > p {
	font-size: x-large;
}

#profilePic > img {
	width: 100%;
	margin-bottom: 5px;
	margin-top: 10px;
}

#profileInfo .imgGroup {
	height: 200px;	
	overflow: hidden;
}

#profileInfo .imgGroup > img {
	display: block;
	margin-left: auto;
	margin-right: auto;
	
	height: 0%;
	width: 0%;
	transition: height 1.25s, width 1.25s;
}

#profileInfo .imgGroup > img.active {
	width: auto;
	height: 100%;
}

#profileInfo .imgGroup > img.active.long {
	width: 100%;
	height: auto;
}

table {
	border-collapse: collapse;
	font-family: sans-serif;
	font-size: 0.8rem;
	letter-spacing: 1px;
	
	border: 0px;
	max-width: 400px;
}

table.expandable.collapse > tr {
	display: none;
}

table.expandable.collapse > tr:nth-of-type(1) {
	display: block;
}

table.expandable.collapse > tr:nth-of-type(1) > td td:nth-of-type(1) {
	font-weight: bold;
	border: 1px solid black;
}

table[gen='2'] > tr:nth-of-type(1) {
	background-color: pink;
}

table[gen='3'] > tr:nth-of-type(1) {
	background-color: lightblue;
}

table[gen='4'] > tr:nth-of-type(1) {
	background-color: honeydew;
}

table[gen='5'] > tr:nth-of-type(1) {
	background-color: blanchedalmond;
}

table table {
	width: 100%;
	table-layout: fixed;
}

td {
	text-align: center;	
	padding: 0px;
}

td.name:hover, td.name:active {
	opacity: 0.5;
}

tr > td:nth-of-type(1) {
	width: 10%;
}
`;
/* END: CSS */
