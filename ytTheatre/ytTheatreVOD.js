var chatframeStyle = document.createElement("style");
chatframeStyle.innerHTML = `
#content {
	background: black;
	position: fixed;
}

#chatframe {
	position: fixed;
	top: 0px;
	right: 0px;
	
	width: 300px;
	height: calc(100vh);
}

#movie_player {
	position: fixed !important;
	top: 0px !important;
	left: 0px !important;
	
	width: calc(98vw - 300px) !important;
	height: calc(100vh) !important;
	
	border-right: calc(2vw) solid black;
}

#movie_player .html5-video-container video {
	height: calc(100vh) !important;
	width: 100% !important;
	background: color;
}

#movie_player .ytp-chrome-bottom {
	width: 95% !important;
	left: calc(1vw);
}

#primary-inner > :not(#player){
	display: none;
}

#show-hide-button {
	display: none;
}

#secondary-inner > :not(#chat) {
	display: none;
}

#content > :not(#page-manager) {
	display: none;
}

#movie_player > :not(.html5-video-container, #ytp-caption-window-container, .ytp-chrome-bottom){
	display: none;
}

#chat {
	border: none;
}
`;

document.querySelectorAll("body")[0].append(chatframeStyle);
