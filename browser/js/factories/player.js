app.factory('StatsFactory', function ($q) {
    var statsObj = {};
    statsObj.totalTime = function (album) {
        var audio = document.createElement('audio');
        return $q(function (resolve, reject) {
            var sum = 0;
            var n = 0;
            function resolveOrRecur () {
                if (n >= album.songs.length) resolve(sum);
                else audio.src = album.songs[n++].audioUrl;
            }
            audio.addEventListener('loadedmetadata', function () {
                sum += audio.duration;
                resolveOrRecur();
            });
            resolveOrRecur();
        });
    };
    return statsObj;
});

app.factory('PlayerFactory', function ($rootScope) {
 	
 	var playCtrl = {
 		isPlaying: false,
 		currentSong: null,
 		progress: 0
 	};

 	playCtrl.isPlaying2 = function(){
 		return playCtrl.isPlaying;
 	}

 	playCtrl.pause = function (){
 		console.log("pausing")
 		if(!playCtrl.currentSong2) {
 			playCtrl.currentSong2 = document.createElement('audio');
 		}
 		playCtrl.currentSong2.pause();
 		playCtrl.isPlaying = false;
 	}

 	playCtrl.load = function(song){
 	// 		audio.src = song.audioUrl;
		// audio.load();
		// $scope.currentSong = song;
		// $rootScope.$broadcast('songLoad', song);
		// $scope.progress = 0;
		var audio = document.createElement('audio');
		audio.src = song.audioUrl;
		audio.load();
		playCtrl.currentSong2 = audio;
		playCtrl.currentSong = song;
		$rootScope.currentSong = song;
	}

	playCtrl.play = function(){
 		playCtrl.currentSong2.play();
 		playCtrl.isPlaying = true;
 	}

 	playCtrl.toggle = function(){
 		if(playCtrl.isPlaying) playCtrl.pause();
 		else playCtrl.play();
 	}

 	playCtrl.start = function (song, songs){
		if(songs) playCtrl.songs = songs;
		console.log("Songs", songs)
		playCtrl.pause();
		playCtrl.load(song);
		playCtrl.play();
 	}

 	playCtrl.resume = function() {
 		if(!playCtrl.currentSong2) playCtrl.currentSong2 = document.createElement('audio');
 		playCtrl.currentSong2.play();
 		playCtrl.isPlaying = true;
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
 		if (!playCtrl.isPlaying) return 0;
 		var thisAud = playCtrl.currentSong2;
 		playCtrl.progress = thisAud.currentTime / thisAud.duration
 		return playCtrl.progress;
 	}



	return playCtrl;

});

