# jquery-rescale

This [jQuery][] plugin arbitrarly [CSS transforms][] elements to a specific
pixel size.  All the contents of the element will scale with it!

  [jQuery]: http://www.jquery.org/
  [CSS transforms]: https://developer.mozilla.org/en/CSS/transform

[See it in action.](http://talos.github.com/jquery-rescale/demo.html)

### Usage

* `w` The width to scale to.  Required.
* `h` The height to scale to.  Required.
* `options` A JS object of options.  Can be ignored.  These are the options:

> * `x`: The x center to scale from, as a percentage from 0
>        to 100.  Defaults to 50.
> * `y`: The y center to scale from, as a percentage from 0
>        to 100. Defaults to 50.
> * `distort`:  Whether to allow differing x and y scale
>               factors.  Is true by default, meaning the element could be
>               distorted.  If false, the smallest of the two scales will be
>               used for both axes, so that neither w or h is ever exceeded.
> * `direction`: If negative, only scaling down will be
>                allowed.  If greater than 0, only scaling up will be allowed.
>                Otherwise, either direction is allowed.  Defaults to 0.

```javascript
    $(selector).rescale(w, h, options);
```

### Examples

```javascript
    $('.rescale').rescale(100, 100);
```

Would scale all elements with the class *rescale* to 100 by 100 pixels
about their center.

If you want to keep the top-left corner of the elements in the same place,
pass `x` and `y` arguments to specify the center of scaling:

```javascript
    $('.rescale').rescale(100, 100, { x: 0, y: 0 });
```

If you don't want the elements to be distorted, specify the `distort` option.

```javascript
    $('.rescale').rescale(100, 100, { distort: false });
```

Each element will keep its original aspect ratio, but no dimension
will exceed 100 pixels.

If you want to only scale elements up, or only scale them down,
specify the `direction` option.  If it is negative, elements will only
be scaled down:

```javascript
    $('.rescale').rescale(100, 100, { direction: -1 });
```

Any elements with both dimensions already smaller than 100 pixels
will be unmodified.

To only scale elements up, pass a positive value:

```javascript
    $('.rescale').rescale(100, 100, { direction : 1 });
```

Now, elements exceeding 100px * 100px will be unmodified, but any
smaller than that will be scaled up.

Play around with [demo.html](http://talos.github.com/jquery-rescale/demo.html)
to see it in action.

### Links

Fork it from:

* <http://www.github.com/talos/jquery-rescale>

CDN it from:

* <http://talos.github.com/jquery-rescale/jquery-rescale.js>

* <http://talos.github.com/jquery-rescale/jquery-rescale.min.js>
