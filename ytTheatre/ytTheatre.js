window.onresize = function () {
	var chatWidth = Math.max(window.innerWidth * 0.15, 350) + "px";
	document.documentElement.style.setProperty("--ytChatWidth", chatWidth);
}

var searchParams = new URLSearchParams(new URL(window.location.href).search);
	
if (searchParams.has("v")) {
	if (searchParams.get("v") != "") {
		document.querySelectorAll("#ytVideo")[0].src = "https://www.youtube.com/embed/" + searchParams.get("v");
		document.querySelectorAll("#ytChat")[0].src = "https://www.youtube.com/live_chat?v=" + searchParams.get("v") + "&embed_domain=csyjueco.github.io&dark_theme=1";
	}
} else {
	window.history.pushState({}, "", window.location.href + "?v=");
}
