var setYBB = function (color, faceText) {
	document.querySelectorAll("#boxFace")[0].innerText = faceText;
	document.querySelectorAll("body")[0].style.setProperty("--moodColorNew", color, "");
	
	document.querySelectorAll("#yellowBigBox")[0].style.setProperty("animation", "2s ease-out changeMood", "");
	
	window.setTimeout(function () {
		document.querySelectorAll("body")[0].style.setProperty("--ybbColorBackground", color, "");
		document.querySelectorAll("#yellowBigBox")[0].style.setProperty("animation", "", "");
	}, 1900)
};

var moodButtons = document.querySelectorAll(".mood");
for (var i = 0; i < moodButtons.length; i++) {
	moodButtons[i].onclick = function () {
		var mood = this.id;
		var faceText = "^ _ ^";
		
		switch (mood) {
			case "happy":
				faceText = "^ _ ^";
				break;
			case "mad":
				faceText = "ಠ_ಠ";
				break;
			case "sad":
				faceText = "•́︿•̀";
				break;
			case "shy":
				faceText = ">///<";
				break;
			case "queezy":
				faceText = "Ó﹏Ò";
				break;
			case "scared":
				faceText = "Ó﹏Ò";
				break;
		}
		
		setYBB("var(--moodColor" + mood.charAt(0).toUpperCase() + mood.slice(1) + ")", faceText);
	}
}

var updateTime = function () {
	document.querySelectorAll("#time")[0].style.opacity = "0%";
	
	document.querySelectorAll("#hours")[0].innerText = ("0" + new Date().getHours()).slice(-2);
	document.querySelectorAll("#minutes")[0].innerText = ("0" + new Date().getMinutes()).slice(-2);
	
	document.querySelectorAll("#time")[0].style.setProperty("animation", "1s linear timeBlink", "");
	
	window.setTimeout(function () {
		document.querySelectorAll("#time")[0].style.opacity = "100%";
		document.querySelectorAll("#time")[0].style.setProperty("animation", "", "");
	}, 900)
}

document.querySelectorAll("#hours")[0].innerText = ("0" + new Date().getHours()).slice(-2);
document.querySelectorAll("#minutes")[0].innerText = ("0" + new Date().getMinutes()).slice(-2);
window.setInterval(updateTime, 60000);