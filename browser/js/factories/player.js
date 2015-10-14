app.factory('PlayerFactory', function () {
	
 	
 	var playCtrl = {
 		isPlaying2: false,
 		currentSong: null,
 		progress: 0
 	};

 	playCtrl.isPlaying = function(){
 		return playCtrl.isPlaying2;
 	};

 	playCtrl.pause = function (){
 		if(!playCtrl.currentSong2) playCtrl.currentSong2 = document.createElement('audio');
 		playCtrl.currentSong2.pause()
 		playCtrl.isPlaying2 = false;
 	}
 	playCtrl.start = function (song, songs){
		if(playCtrl.isPlaying2) {
			playCtrl.pause();
			playCtrl.isPlaying2 = false;
		}
		if(songs) playCtrl.songs = songs;
		var audio = document.createElement('audio');
		audio.src = song.audioUrl;
		audio.load();
		audio.play();
		playCtrl.currentSong2 = audio;
		playCtrl.currentSong = song;
		playCtrl.isPlaying2 = true;

 	}
 	playCtrl.resume = function() {
 		if(!playCtrl.currentSong2) playCtrl.currentSong2 = document.createElement('audio');
 		playCtrl.currentSong2.play();
 		playCtrl.isPlaying2 = true;
 	}

 	playCtrl.getCurrentSong = function() {
 		return playCtrl.currentSong;
 	}
 	playCtrl.next = function () {
 		var nextIndex = playCtrl.indexFinder(playCtrl.currentSong, playCtrl.songs) + 1;
 		if (nextIndex > playCtrl.songs.length-1) nextIndex = 0;
 		playCtrl.songProgress = 0;
 		playCtrl.start(playCtrl.songs[nextIndex]);
 	}

 	playCtrl.previous = function () {
 		var nextIndex = playCtrl.indexFinder(playCtrl.currentSong, playCtrl.songs) - 1;
 		if (nextIndex < 0) nextIndex = playCtrl.songs.length-1;
 		playCtrl.songProgress = 0;
 		playCtrl.start(playCtrl.songs[nextIndex]);

 	}

 	playCtrl.indexFinder = function(song, songs){
 		for(var i=0; i<songs.length; i++){
 			if (songs[i].audioUrl === song.audioUrl)
 				return i;
 		}
 	}

 	playCtrl.getProgress = function() {
 		if (!playCtrl.isPlaying()) return 0;
 		var thisAud = playCtrl.currentSong2;
 		playCtrl.progress = thisAud.currentTime / thisAud.duration
 		return playCtrl.progress;
 	}



	return playCtrl;

});

