// var fakeAlbum = {
// 	name: 'Abbey Road',
// 	artists: [{name: 'Bill'}, {name: 'Bob'}],
// 	songs: [{
// 		name: 'Romeo & Juliette',
// 		artists: [{name: 'Bill'}],
// 		genres: ['Smooth', 'Funk'],
// 		audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2013.mp3'
// 	}, {
// 		name: 'White Rabbit',
// 		artists: [{name: 'Bill'}, {name: 'Bob'}],
// 		genres: ['Fantasy', 'Sci-fi'],
// 		audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2008.mp3'
// 	}, {
// 		name: 'Lucy in the Sky with Diamonds',
// 		artists: [{name: 'Bob'}],
// 		genres: ['Space'],
// 		audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2001.mp3'
// 	}],
// 	imageUrl: 'http://fillmurray.com/300/300'
// };




app.controller('AlbumCtrl', function ($scope, $http, $rootScope, StatsFactory, PlayerFactory) {
	$scope.isPlaying = PlayerFactory.isPlaying;
	$http.get('/api/albums/561eb127aa4d88af14119c23')
	.then(function (response) {
		var album = response.data;
		album.imageUrl = '/api/albums/' + album._id + '.image';
		var albumArtists = _.indexBy(album.artists, '_id');
		album.songs.forEach(function (s) {
			s.audioUrl = '/api/songs/' + s._id + '.audio';
			s.artists = s.artists.map(function (artistId) {
				return albumArtists[artistId];
			});
		});
		$scope.album = album;

		// StatsFactory.totalTime(album)
  //   .then(function (albumDuration) {
  //       $scope.fullDuration = albumDuration;
  //       console.log(albumDuration);
  //   });

	});

	$scope.start = function (s) {
	// 	$rootScope.$broadcast('startIt', {
	// 		song: s,
	// 		album: $scope.album
	// 	});
			PlayerFactory.start(s);
	};
	// $scope.$on('songLoad', function (evt, song) {
	// 	$scope.currentSong = song;
	// });
});