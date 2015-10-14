app.controller('PlayerCtrl', function ($scope, $rootScope) {

	var audio = document.createElement('audio');
	$scope.isPlaying = undefined;
	
	var songs;
	$scope.$on('startIt', function (evt, data) {
		$scope.start(data.song);
		songs = data.album.songs;
	});

	$scope.load = function (song) {
		audio.src = song.audioUrl;
		audio.load();
		$scope.currentSong = song;
		$rootScope.$broadcast('songLoad', song);
		$scope.progress = 0;
	}

	$scope.pause = function () {
		audio.pause();
		$scope.isPlaying = false;
	};

	$scope.play = function () {
		audio.play();
		$scope.isPlaying = true;
	};

	$scope.start = function (song) {
		$scope.pause();
		$scope.load(song);
		$scope.play();
	};

	$scope.toggle = function () {
		if ($scope.isPlaying) $scope.pause();
		else $scope.play();
	};

	$scope.moveTo = function (index) {
		index += songs.length
		index %= songs.length;
		$scope.start(songs[index]);
	};

	$scope.forward = function () {
		var index = songs.indexOf($scope.currentSong);
		$scope.moveTo(index + 1);
	};

	$scope.back = function () {
		var index = songs.indexOf($scope.currentSong);
		$scope.moveTo(index - 1);
	};

	audio.addEventListener('timeupdate', function () {
		$scope.progress = 100 * audio.currentTime / audio.duration;
		$scope.$digest();
	});

	audio.addEventListener('ended', function () {
		$scope.forward();
		$rootScope.$digest();
	});

});