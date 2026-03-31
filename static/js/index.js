window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
				slidesToScroll: 1,
				slidesToShow: 1,
				loop: true,
				infinite: true,
				autoplay: true,
				autoplaySpeed: 5000,
    }

    var manualOptions = Object.assign({}, options, {
      autoplay: false,
      infinite: false,
    });

    var initVideoCarousel = function(selector) {
      var attachedCarousels = bulmaCarousel.attach(selector, manualOptions);
      if (attachedCarousels.length === 0) {
        return;
      }

      var carousel = attachedCarousels[0];
      var videos = Array.from(document.querySelectorAll(selector + ' .item video'));
      var playTimer = null;

      var playVideo = function(index) {
        videos.forEach(function(video, videoIndex) {
          video.pause();
          if (videoIndex !== index) {
            video.currentTime = 0;
          }
        });

        var activeVideo = videos[index];
        if (!activeVideo) {
          return;
        }

        activeVideo.currentTime = 0;
        var playPromise = activeVideo.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(function() {});
        }
      };

      videos.forEach(function(video, index) {
        video.addEventListener('ended', function() {
          if (carousel.state.index === index) {
            carousel.next();
          }
        });
      });

      carousel.on('before:show', function(state) {
        if (playTimer) {
          window.clearTimeout(playTimer);
        }

        videos.forEach(function(video) {
          video.pause();
        });

        playTimer = window.setTimeout(function() {
          playVideo(state.next);
        }, carousel.options.duration || 0);
      });

      playVideo(carousel.state.index);
    };

			// Advance the result carousels when the current video finishes.
    initVideoCarousel('#multi-carousel');
    initVideoCarousel('#scene-editing-carousel');
		
    bulmaSlider.attach();

})
