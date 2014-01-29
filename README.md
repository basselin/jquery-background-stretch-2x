$.backgroundStretch2x()
=======================
backgroundStretch2x is a lite jQuery plugin that adds images in the background dynamically. The images are resized according to the window size or its element container. This plugin is optimized to download images in low resolution then in high resolution for a better render with retina display (device pixel ratio: 2).

The plugin works in 4 steps :
* It loads the first image in low resolution *( img-1.jpg )*
* Then, this same image in high resolution *( img-1-2x.jpg )*
* Then, the other images are loaded in high resolution *( img-XX-2x.jpg )*
* Finally, the fade starts...

Installation
------------

The image filename be named like this *(the resolution is free, but must be double for the file "-2x.ext")*.

**image-1.jpg** (800x600) et **image-1-2x.jpg** (1600*1200)

```html
<script src="http://code.jquery.com/jquery-2.1.0.min.js"></script>
<script src="jquery.backgroundStretch2x.min.js"></script>
<script>
$(function(){
	// use a BODY
	$.backgroundStretch2x(
		['images/image-1-2x.jpg','images/image-2-2x.jpg','images/image-3-2x.jpg']
		);
	// or
	$('body').backgroundStretch2x( ['images/image-1-2x.jpg'] );
	
	// use a DIV
	$('#my-div').backgroundStretch2x(
		['images/image-1-2x.jpg','images/image-2-2x.jpg','images/image-3-2x.jpg'], {
			// options
			wait: 6000,
			fade: 1000,
			suffle: true
		});
});
</script>
```

Options
-------

| Name | Description | Type | Default |
|------|-------------|------|---------|
| `wait` | Waiting time in milliseconds between 2 images. | Integer *ms* | `5000` |
| `fade` | Time of fade in milliseconds. | Integer *ms* | `2000` |
| `color` | Display background color between the images. You can use all the colors used in css. Eg:`black`, `#000`, `#fff`... | String | `''` |
| `shuffle` | Shuffle images before starting. | Boolean | `false` |
| `centerX` | Centering the image in X axis with percentage.  | Float `0.0` *to* `1.0` | `0.5` |
| `centerY` | Centering the image in Y axis with percentage. | Float `0.0` *to* `1.0` | `0.5` |
| `proportional` | Resizing images proportionally. | Boolean | `true` |
| `onLoad` | All images are loaded. | Function | `null` |
| `onChange` | The fade will start. | Function | `null` |
| `onComplete` | The fade is completed. | Function | `null` |
| `styles` | DIV styles: `{ left:0, top:0, overflow:'hidden', zIndex:-32000 }` | Object | `{ .. }` |
| `template` | HTML: `<div class="background-stretch-2x"></div>` | String *html* | `< .. >` |

