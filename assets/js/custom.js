(function($) {
    "use strict";
	
		/* --[ Preloader ]-- */
		$(window).on('load',function() {
			$('.loader').fadeOut();
			$('.page-loader').delay(350).fadeOut('slow');
		});
		
		/* --[ Menu Sticky ]-- */
		$(window).on('scroll',function() {    
			var scroll = $(window).scrollTop();
			if (scroll < 245) { 
				$(".sticker").removeClass("stick");
			}else{
				$(".sticker").addClass("stick");
			}
		}); 
		
		/* --[ mobile menu active ]-- */
       $('#mobile-nav').meanmenu();		
		
		/* --[ Initialization General Scripts for all pages ]-- */
		var moduleHero = $('.module-hero'),
			module     = $('.module-hero, .module, .module-small'),
			navbar     = $('.navbar-custom'),
			navHeight  = navbar.height(),
			worksgrid  = $('#works-grid'),
			width      = Math.max($(window).width(), window.innerWidth),
			mobileTest;
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			mobileTest = true;
		}
		buildModuleHero(moduleHero);

		/* --[ Set module backgrounds ]-- */
		module.each(function(i) {
			if ($(this).attr('data-background')) {
				$(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
			}
		});

		/* --[ Full height module ]-- */
		function buildModuleHero(moduleHero) {
			if (moduleHero.length > 0) {
				if (moduleHero.hasClass('module-full-height')) {
					moduleHero.height($(window).height());
				} else {
					moduleHero.height($(window).height() * 0.85);
				}
			}
		};

		/* --[ Hero slider setup ]-- */
		if ($('.hero-slider').length > 0) {
			$('.hero-slider').flexslider({
				animation: 'fade',
				animationSpeed: 1000,
				animationLoop: true,
				prevText: '',
				nextText: '',
				start: function(slider) {
					heroSliderLight();
				},
				before: function(slider) {
					if(mobileTest != true) {
						$('.hs-caption').fadeOut().animate({top:'-80px'},{queue:false, easing: 'swing', duration: 700});
						slider.slides.eq(slider.currentSlide).delay(500);
						slider.slides.eq(slider.animatingTo).delay(500);
					}
				},
				after: function(slider) {
					heroSliderLight();
					if(mobileTest != true) {
						$('.hs-caption').fadeIn().animate({top:'0'},{queue:false, easing: 'swing', duration: 700});
					}
				},
				useCSS: true
			});
		};

		/* --[  Change color on light slide ]-- */
		function heroSliderLight() {
			if ($('li.bg-light').hasClass('flex-active-slide')) {
				navbar.addClass('nabar-dark');
				$('.hero-slider').addClass('hero-slider-dark');
			} else {
				navbar.removeClass('nabar-dark');
				$('.hero-slider').removeClass('hero-slider-dark');
			}
		}

		/* --[  Hero slider pause on scroll ]-- */
		if ($('.hero-slider').length > 0) {
			$(window).on('scroll',function() {
				var st = $(window).scrollTop();
				if (st > 0) {
					$('.hero-slider').flexslider('pause');
				}
			});
		}

		/* --[  Youtube video background ]-- */
		if(mobileTest != true) {
			$(function() {
				$(".video-player").mb_YTPlayer();
			});

			$('.video-controls-box a').css('visibility', 'visible');

			$('#video-play').on('click', function(event) {
				event.preventDefault();
				if ($(this).hasClass('fa-play')) {
					$('.video-player').playYTP();
				} else {
					$('.video-player').pauseYTP();
				}
				$(this).toggleClass('fa-play fa-pause');
				return false;
			});

			$('#video-volume').on('click', function(event) {
				event.preventDefault();
				$('.video-player').toggleVolume();
				$(this).toggleClass('fa-volume-off fa-volume-up');
				return false;
			});
		}

		/* --[  Portfolio ]-- */
		var worksgrid_mode;
		if (worksgrid.hasClass('works-grid-masonry')) {
			worksgrid_mode = 'masonry';
		} else {
			worksgrid_mode = 'fitRows';
		}
		worksgrid.imagesLoaded(function() {
			worksgrid.isotope({
				layoutMode: worksgrid_mode,
				itemSelector: '.work-item',
			});
		});
		$('#filters a').on('click',function() {
			$('#filters .current').removeClass('current');
			$(this).addClass('current');
			var selector = $(this).attr('data-filter');
			worksgrid.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});

			return false;
		});

		/* --[  Post slider  ]-- */
		$('.post-images-slider').flexslider( {
			animation: 'slide',
			smoothHeight: true,
		});

		/* --[  Progress bars, counters animations ]-- */
		$('.progress-bar').each(function(i) {
			$(this).appear(function() {
				var percent = $(this).attr('aria-valuenow');
				$(this).animate({'width' : percent + '%'});
				$(this).find('span').animate({'opacity' : 1}, 900);
				$(this).find('span').countTo({from: 0, to: percent, speed: 900, refreshInterval: 30});
			});
		});
		
		/* --[  counter item ]-- */		
		$('.counter-item').each(function(i) {
			$(this).appear(function() {
				var number = $(this).find('.counter-number').data('number');
				$(this).find('.counter-number span').countTo({from: 0, to: number, speed: 1200, refreshInterval: 30});
			});
		});

		/* --[  Popup images ]-- */		
		$('a.popup').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1]
			},
			image: {
				titleSrc: 'title',
				tError: 'The image could not be loaded.',
			}
		});

		/* --[ Rotate Text ]-- */
		$(".rotate").textrotator({
			animation: "dissolve",
			separator: "|",
			speed: 3000
		});

		/* --[ A jQuery plugin for fluid width video embeds ]-- */
		$('body').fitVids();
		
		/* --[ Scroll Animation ]-- */
		$('.section-scroll').bind('click', function(e) {
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 1000);
			e.preventDefault();
		});

		/* --[  Scroll top ]-- */
		$(window).on('scroll',function() {
			if ($(this).scrollTop() > 100) {
				$('.scroll-up').fadeIn();
			} else {
				$('.scroll-up').fadeOut();
			}
		});
		$('a[href="#totop"]').on('click', function() {
			$('html, body').animate({ scrollTop: 0 }, 'slow');
			return false;
		});

		
        // Contact Form Start
        // Contact Form Message Popup 
        function contactFormPopup() {
            var trigger = $('#contact-form [type="submit"]'),
                container = $('.cr-contact-message-modal');
        
            trigger.on('click', function () {
                container.addClass('is-visible');
            });
        
            $('<button><i class="fa fa-window-close-o"></i></button>').appendTo(container).on('click', function () {
                container.removeClass('is-visible');
            });
        }
        contactFormPopup();
       // Contact Form End





})(jQuery);