/*!
 * jquery.backgroundStretch2x.js v1.1.0
 * (c) 2014, Benoit Asselin contact(at)ab-d.fr
 * MIT Licence
 */
 
;(function($, window, undefined) {
	'use strict';
	
	/**
	 * background stretch 2x
	 * @param {Array} images2x
	 * @param {Object} options
	 * @returns {jQuery}
	 */
	$.fn.backgroundStretch2x = function(images2x, options) {
		options = $.extend({
			// defaults
			wait: 5000, // Number ms
			fade: 2000, // Number ms
			color: '', // String
			shuffle: false, // Boolean
			centerX: 0.5, // Number [0.0..1.0]
			centerY: 0.5, // Number [0.0..1.0]
			proportional: true, // Boolean
			onLoad: null, // Function
			onChange: null, // Function
			onComplete: null, // Function
			styles: { left:0, top:0, overflow:'hidden', zIndex:-32000 }, // Object
			template: '<div class="background-stretch-2x"></div>' // String html
			}, options);
		
		if(!images2x || !images2x.length) { return this; }
		var $win = $(window);
		
		return this.each(function() {
			var $this = $(this);
			var isBody = ('body' === this.tagName.toLowerCase());
			var withBgColor = options.color;
			var $background = $($.parseHTML(options.template))
						.css(options.styles)
						.css({position:(isBody ? 'fixed' : 'absolute')})
						.appendTo($this);
			if(withBgColor) {
				$background.css({ backgroundColor:withBgColor });
			}
			if(options.shuffle) {
				images2x.sort(function(){ return (Math.round(Math.random()) - 0.5); });
			}
			var images1x = [];
			for(var i = 0; i < images2x.length; i++) {
				images1x[i] = images2x[i].replace('-2x.', '.');
			}
			
			function windowResize() {
				var $elt = (isBody ? $win : $this);
				var eltWidth = $elt.outerWidth(),
				    eltHeight = $elt.outerHeight(),
				    eltRatio = eltWidth / eltHeight;
				$background
					.css({width:eltWidth, height:eltHeight})
					.children().each(function() {
						var $i = $(this);
						var newWidth = 0, newHeight = 0;
						var newLeft = 0, newTop = 0;
						var newRatio = 0;
						if(options.proportional) {
							var imageWidth = $i.data('initWidth'),
							    imageHeight = $i.data('initHeight'),
							    imageRatio = $i.data('initRatio');
							if(eltRatio < imageRatio) {
								newRatio = eltHeight / imageHeight;
								newHeight = imageHeight * newRatio;
								newWidth = newHeight * imageRatio;
								newLeft = - Math.floor((newWidth - eltWidth) * options.centerX);
							} else {
								newRatio = eltWidth / imageWidth;
								newWidth = imageWidth * newRatio;
								newHeight = newWidth / imageRatio;
								newTop = - Math.floor((newHeight - eltHeight) * options.centerY);
							}
						} else {
							newWidth = eltWidth;
							newHeight = eltHeight;
						}
						$i.css({
							left:newLeft, top:newTop,
							width:Math.round(newWidth), height:Math.round(newHeight)
						});
					});
			}
			
			function buildImage(src, onComplete) {
				if(!src) { return; }
				var is2x = (-1 !== src.indexOf('-2x.'));
				var $image = $('<img class="bs-img-' + (!is2x ? '1x' : '2x') + '"/>');
				$image
					.data('loaded', false)
					.load(function() {
						var $i = $(this);
						$i
							.css({position:'absolute'})
							.data('loaded', true)
							.data('initWidth', $i.width())
							.data('initHeight', $i.height())
							.data('initRatio', $i.width() / $i.height());
						if(isNaN($i.data('initRatio'))) { // fix.MsIE 7-
							setTimeout(function() {
								$i.trigger('load');
							}, 50);
							return;
						}
						windowResize();
						if('function' === typeof onComplete) {
							onComplete();
						}
					})
					.error(function() {
						if(window.console) {
							console.log('Error: ' + src);
						}
					})
					.attr('src', src);
				$background.prepend($image);
			}
			
			function prepareImages() {
				$background.children('.bs-img-1x').remove();
				if(images2x.length > 1) {
					$.each(images2x, function(idx, src) {
						if(!idx) { return; }
						buildImage(src, imagesReady);
					});
				} else {
					if('function' === typeof options.onLoad) { options.onLoad(); }
				}
			}
			
			function imagesReady() {
				var loadedCount = 0;
				$background.children().each(function() {
					if($(this).data('loaded')) {
						loadedCount++;
					}
				});
				if(loadedCount >= images2x.length) {
					if('function' === typeof options.onLoad) { options.onLoad(); }
					setInterval(imagesTransition, (options.wait + options.fade));
				}
			}
			
			function imagesTransition() {
				if('function' === typeof options.onChange) { options.onChange(); }
				if(!withBgColor) {
					$background.children(':last')
						// fade 1/1
						.animate({opacity:0}, options.fade, function() {
							var $i = $(this).prependTo($background);
							$i.css({opacity:''});
							if('function' === typeof options.onComplete) { options.onComplete(); }
						});
				} else {
					$background
						.children(':not(:last)').css({visibility:'hidden'}).end()
						.children(':last')
							// fade 1/2
							.animate({opacity:0}, (options.fade / 2), function() {
								var $i = $(this).prependTo($background);
								$i.css({visibility:'hidden', opacity:''});
								// fade 2/2
								$background.children(':last')
									.css({opacity:0, visibility:'visible'})
									.animate({opacity:1}, (options.fade / 2), function() {
										$(this).css({opacity:''});
										if('function' === typeof options.onComplete) { options.onComplete(); }
									});
								
							});
				}
			}
			
			// Events and start SD/HD
			$win.on('resize orientationchange', windowResize);
			buildImage(images1x[0], function() {
				buildImage(images2x[0], prepareImages);
			});
			return this;
		});
	};
	
	$.backgroundStretch2x = function(images2x, options) {
		$('body').backgroundStretch2x(images2x, options);
	};
	
})(jQuery, window);
