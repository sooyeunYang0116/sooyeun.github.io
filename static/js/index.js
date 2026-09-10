window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    bulmaSlider.attach();

    // Carousel videos autoplay, so without this every clip on the page would be
    // fetched up front. Their sources sit in data-src until the video scrolls into
    // view; posters carry the display until then. Runs after bulmaCarousel.attach
    // so the slides it clones for the infinite loop are picked up too.
    lazyLoadVideos();

})

function lazyLoadVideos() {
    var videos = document.querySelectorAll('video[data-lazy]');
    if (!videos.length) return;

    function load(video) {
        if (video.dataset.loaded) return;
        video.dataset.loaded = '1';
        var sources = video.querySelectorAll('source[data-src]');
        for (var i = 0; i < sources.length; i++) {
            sources[i].src = sources[i].dataset.src;
        }
        video.load();
        if (video.hasAttribute('autoplay')) {
            var played = video.play();
            // Autoplay can still be refused (battery saver, reduced motion). The
            // poster stays up in that case, so swallow the rejection.
            if (played && played.catch) played.catch(function() {});
        }
    }

    if (!('IntersectionObserver' in window)) {
        for (var i = 0; i < videos.length; i++) load(videos[i]);
        return;
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            load(entry.target);
            observer.unobserve(entry.target);
        });
    }, { rootMargin: '300px' });

    for (var j = 0; j < videos.length; j++) observer.observe(videos[j]);
}
