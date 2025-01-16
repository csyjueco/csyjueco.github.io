var sampleData = [
	['name', 'dob', 'p1', 'p2', 'mTo'],
	['white', 1975, , , 'black'],
	['black', 1980, , , 'white'],
	['Duc', 1981, , , 'Du ck'],
	['Du ck', 1982, , , 'Duc'],
	['yel-low', 1985, , , 'blue'],
	['red', 1986, 'black', 'white', 'brown'],
	['green', 1988, 'white', 'black'],
	['blue', 1990, 'black', 'white', 'yel-low'],
	['brown', 1995, , , 'red'],
	['oak', 2000, 'brown', 'red', ],
	['light ning', 2000, 'yel-low', 'blue', ''],
	['birch', 2010, 'red', 'brown', ],
	['gus', 2011, 'Du ck', 'Duc', ]
];

var data = sampleData;



/* START: ADDING NEW COLUMNS BASED ON THE ORIGINAL COLUMNS */

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
var dobIndex = data[0].indexOf('dob');
var mToIndex = data[0].indexOf('mTo');

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

// creating a unique key to use as an id for each person
data[0].push('personKey');
var personKeyIndex = data[0].indexOf('personKey');
for (var i = 1; i < data.length; i++) {
	let key = data[i][nameIndex].replace(' ','').toLowerCase();
	let count = 0;
	for (var j = 1; j < i; j++) {
		if (data[j][nameIndex] == data[i][nameIndex]) {
			count++
		}
	}
	data[i][personKeyIndex] = key + count;
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
		if (!data[i][mKeyIndex] != '') {
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
			event.srcElement.classList.toggle('collapse');
			event.srcElement.innerText = event.srcElement.classList.contains('collapse') ? '+' : event.srcElement.getAttribute('gen');
		});
		
		// changes gen element's text to '-' when hovered without the collapse class
		gen.addEventListener('mouseover', (event) => {
			event.srcElement.innerText = event.srcElement.classList.contains('collapse') ? event.srcElement.getAttribute('gen') : '-';
		});
		
		gen.addEventListener('mouseout', (event) => {
			event.srcElement.innerText = event.srcElement.classList.contains('collapse') ? '+' : event.srcElement.getAttribute('gen');
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

function updateProfile (personKey) {
	let person;
	for (var i = 1; i < data.length; i++) {
		if (personKey == data[i][personKeyIndex]) {
			person = data[i];
		}
	}
	
	document.querySelectorAll('#profileName')[0].firstChild.innerText = person[nameIndex];
	
	document.querySelectorAll('#profilePic')[0].innerText = '';
	// TODO: create support for unique collections of images for each person
	let imgFiles = ['600x600', '640x360', '400x600'];
	for (var i = 0; i < 5; i++) {
		let picDiv = document.createElement('img');
		picDiv.src = 'fillerImg\\' + imgFiles[i % imgFiles.length] + '.png';
		picDiv.setAttribute('next', (i + 1) % 5);
		
		if (i == 0) {
			picDiv.classList.add('active');
		}
		
		document.querySelectorAll('#profilePic')[0].append(picDiv);
		
		// hide current picture when it's clicked and show the next image
		picDiv.addEventListener('click', (event) => {
			event.srcElement.classList.toggle('active');
			document.querySelectorAll('#profilePic > img')[parseInt(event.srcElement.getAttribute('next'))].classList.toggle('active');
		});
	}
	
	// TODO: change #profileInfo section to one for fun facts, hobbies, etc.
	// TODO: create a #profileRelated section and put related people into that section (maybe start minimized?)
	document.querySelectorAll('#profileInfo')[0].innerText = '';
	if (person[dobIndex] != '') {
		let dobEntry = document.createElement('p');
		dobEntry.innerText = 'Date of birth: ' + person[dobIndex];
		document.querySelectorAll('#profileInfo')[0].append(dobEntry);
	}
	
	if (person[classListIndex].includes('m')) {
		// creating entry in #profileInfo for partner
		let partnerEntry = document.createElement('p');
		partnerEntry.innerText = 'Married to: ';
		
		let partner;
		
		for (var i = 1; i < data.length; i++) {
			if (person[mKeyIndex] == data[i][mKeyIndex] && person[nameIndex] != data[i][nameIndex]) {
				partner = data[i];
			}
		}
		
		let partnerName = document.createElement('p');
		partnerName.innerText = partner[nameIndex];
		partnerName.setAttribute('key', partner[personKeyIndex]);
		partnerName.classList.add('name');
		
		partnerName.addEventListener('click', (event) => {
			updateProfile(event.srcElement.getAttribute('key'));
		})
		
		partnerEntry.append(partnerName);
		
		document.querySelectorAll('#profileInfo')[0].append(partnerEntry);
		
		// creating entry in #profileInfo if person has children
		let childrenEntry = document.createElement('p');
		childrenEntry.innerText = 'Children: ';
		
		for (var i = 1; i < data.length; i++) {
			if (person[mKeyIndex] == data[i][parentKeyIndex]) {
				let childName = document.createElement('p');
				childName.innerText = data[i][nameIndex];
				childName.setAttribute('key', data[i][personKeyIndex]);
				childName.classList.add('name');
				
				childName.addEventListener('click', (event) => {
					updateProfile(event.srcElement.getAttribute('key'));
				})
				
				childrenEntry.append(childName);
			}
		}
		
		if (childrenEntry.childElementCount > 0) {
			document.querySelectorAll('#profileInfo')[0].append(childrenEntry);
		}
	}
	
	// creating entry in #profileInfo if person has parents in the family tree
	if (person[classListIndex].includes('c')) {
		let parentEntry = document.createElement('p');
		parentEntry.innerText = 'Parents: ';
		
		for (var i = 1; i < data.length; i++) {
			if (person[parentKeyIndex] == data[i][mKeyIndex]) {
				let parentName = document.createElement('p');
				parentName.innerText = data[i][nameIndex];
				parentName.setAttribute('key', data[i][personKeyIndex]);
				parentName.classList.add('name');
				
				parentName.addEventListener('click', (event) => {
					updateProfile(event.srcElement.getAttribute('key'));
				})
				
				parentEntry.append(parentName);
			}
		}
		
		document.querySelectorAll('#profileInfo')[0].append(parentEntry);
	}
}
/* END: CREATING INITIAL PROFILE SCREEN */



/* START: CREATING TOGGLE */
// TODO: figure out if the toggle needs to be changed to a menu button
// TODO: if it stays as a toggle change innerText/icon based on if 'familyTree' or 'profile' element is showing
var toggleView = document.createElement('div');
toggleView.id = 'toggle';
toggleView.innerText = 'togle~'

toggleView.addEventListener('click', (event) => {
	document.querySelectorAll('#familyTree')[0].classList.toggle('hide');
	document.querySelectorAll('#profile')[0].classList.toggle('hide');
});

document.querySelectorAll('body')[0].append(toggleView);
/* END: CREATING TOGGLE */



/* START: CSS */
var CSSstyles = document.createElement('style');
document.querySelectorAll('body')[0].append(CSSstyles);
// TODO: partially copy pasted so some styles can be removed
// TODO (MED): change image transition from height to something that looks better (maybe 100 - 0 opacity/transparency on current image and then 0 - 100 on new image after)
// TODO (LOW): set gen specific styling through JS (e.g. table[gen='2'] > tr:nth-of-type(1))
CSSstyles.textContent = `
#familyTree {
	margin-left: auto;
	margin-right: auto;
}

.hide {
	display: none;
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

#profileInfo > p {
	margin-bottom: 5px;
	margin-top: 10px;
}

#profileName > p {
	font-size: x-large;
}

#profilePic {
	background-color: gray;
	height: 200px;
	width: 100%;
}

#profilePic > img {
	display: block;
	margin-left: auto;
	margin-right: auto;
	overflow: hidden;
	
	background-color: lavender;
	height: 0%;
	transition: height 2s;
}

#profilePic > img.active {
	height: 100%;
}

table {
	border-collapse: collapse;
	font-family: sans-serif;
	font-size: 0.8rem;
	letter-spacing: 1px;
	
	border: 0px;
	max-width: 400px;
}

table.collapse > tr {
	display: none;
}

table.collapse > tr:nth-of-type(1) {
	display: block;
}

table[gen='2'] > tr:nth-of-type(1) {
	background-color: pink;
}

table[gen='3'] > tr:nth-of-type(1) {
	background-color: lightblue;
}

table[gen='4'] > tr:nth-of-type(1) {
	background-color: yellow;
}

table table {
	width: 100%;
	table-layout: fixed;
}

td {
	text-align: center;	
	padding: 0px;
}

td.collapse {
	font-weight: bold;
	border: 1px solid black;
}

td.name:hover, td.name:active {
	opacity: 0.5;
}

#toggle {
	position: fixed;
	
	bottom: 20px;
	right: 20px;
	
	background-color: lightgray;
	opacity: 0.5;
	
	border: 2px solid gray;
	border-radius: 10px;
	height: 50px;
	width: 50px;
}

#toggle:hover, #toggle:active {
	opacity: 0.75;
}

tr > td:nth-of-type(1) {
	width: 10%;
}
`;
/* END: CSS */
