app.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

	var audio = document.createElement('audio');
	$scope.isPlaying = PlayerFactory.isPlaying2;
	
	var songs;
	
	$scope.$on('startIt', function (evt, data) {
		$scope.start(data.song);
		songs = data.album.songs;
	});

	$scope.load = PlayerFactory.load;

	$scope.pause = PlayerFactory.pause;

	$scope.play = PlayerFactory.play;

	$scope.start = PlayerFactory.start;

	$scope.toggle = PlayerFactory.toggle;

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