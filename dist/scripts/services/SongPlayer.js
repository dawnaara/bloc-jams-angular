(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        var currentAlbum = Fixtures.getAlbum();

		var getSongIndex = function(song) {
	     	return currentAlbum.songs.indexOf(song);
    	};
 /**
 * @desc Buzz object audio file
 * @type {Object}
 */
     	
     	var currentBuzzObject = null;          

/**
* @function playSong
* @desc plays current buzz object and sets the playing property of the song to true.
* @param {Object} song
*/
		var playSong = function(song) {
			if (currentBuzzObject) {
				currentBuzzObject.play();
				song.playing = true;

			}
		};
 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */

		var setSong = function(song) {
		    if (currentBuzzObject) {
		        currentBuzzObject.stop();
		        SongPlayer.currentSong.playing = null;
		    }
		 
		    currentBuzzObject = new buzz.sound(song.audioUrl, {
		        formats: ['mp3'],
		        preload: true
		    });
		 
		    SongPlayer.currentSong = song;
		};
 	
 	SongPlayer.currentSong = null;

	SongPlayer.play = function(song) {
     	song = song || SongPlayer.currentSong;

        if (SongPlayer.currentSong !== song) {

        	setSong(song);
	        playSong(song);
     	} else if (SongPlayer.currentSong === song) {
         	if (currentBuzzObject.isPaused()) {
             	playSong(song);
         	}
	    }   
	};

 	SongPlayer.pause = function(song) {
     	song = song || SongPlayer.currentSong;
     	currentBuzzObject.pause();
     	song.playing = false;
 	};	

    return SongPlayer;
}

SongPlayer.previous = function() {
    var currentSongIndex = getSongIndex(SongPlayer.currentSong);
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
    } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
    }
};
 
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();