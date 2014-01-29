$.backgroundStretch2x()
=======================
This jQuery plugin can resize images according to the page size or its container.

The plugin works in 4 steps :
* It loads the first image in low resolution *( img-1.jpg )*,
* Then, this same image in high resolution *( img-1-2x.jpg )*,
* Then, the other images are loaded in high resolution *( img-XX-2x.jpg )*,
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
| `wait` | Waiting time between 2 images. | Integer | 5000 |
| `fade` | Time of fade. | Integer | 2000 |
| `shuffle` | Shuffle images. | Boolean | false |
| `centerX` | Percentage of centering image in X *(0.0 to 1.0)*. | Float | 0.5 |
| `centerY` | Percentage of centering image in Y *(0.0 to 1.0)*. | Float | 0.5 |
| `proportional` | Resizing images proportionally. | Boolean | true |
| `onLoad` | All images are loaded. | Function | null |
| `onChange` | The fade will start. | Function | null |
| `onComplete` | The fade is completed. | Function | null |
| `styles` | DIV styles: `{ left:0, top:0, overflow:'hidden', zIndex:-32000 }` | Object | `{ .. }` |
| `template` | HTML: `<div class="background-stretch-2x"></div>` | String | `< .. >` |

