/**
   Copyright 2012 John Krauss. All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

   1. Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above
   copyright notice, this list of conditions and the following
   disclaimer in the documentation and/or other materials provided
   with the distribution.

   THIS SOFTWARE IS PROVIDED BY JOHN KRAUSS ''AS IS'' AND ANY EXPRESS
   OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
   ARE DISCLAIMED. IN NO EVENT SHALL JOHN KRAUSS OR CONTRIBUTORS BE
   LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
   CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT
   OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
   BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
   USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
   DAMAGE.

   The views and conclusions contained in the software and
   documentation are those of the authors and should not be
   interpreted as representing official policies, either expressed or
   implied, of John Krauss.
**/

/**
   DOCUMENTATION

   See README.md
**/

/**
   VERSIONS

   0.1.0 : Initial release
**/

/**
   CODE
**/
(function($) {
    var properties = [
        [ 'transform', 'transform-origin' ],
        [ '-ms-transform','-ms-transform-origin'], /* IE 9 */
        [ '-webkit-transform', '-webkit-transform-origin'],/* Safari and Chrome */
        [ '-o-transform', '-o-transform-origin'], /* Opera */
        [ '-moz-transform', '-moz-transform-origin' ] /* Firefox */
    ],

    len = properties.length,

    /**
       Construct a JS object hash that can be applied as CSS to do
       transform and transform-origin value across browsers.

       @param transform the value for the transform CSS property.
       @param transformOrigin the value for the transform-origin CSS
       property.

       @return A JS object that can be applied as CSS.
    **/
    buildCSS = function(transform, transformOrigin) {
        var memo = {},
        i = -1; // this is so much more elegant using reduce. le sigh.
        while(++i < len) {
            memo[properties[i][0]] = transform;
            memo[properties[i][1]] = transformOrigin;
        }
        return memo;
    };

    /**
       Scale an element to a specific width and height.

       @param w The width to scale to.  Required.
       @param h The height to scale to.  Required.
       @param distort Whether to allow differing x and y scale
       factors.  Is true by default, meaning the element could be
       distorted.  If false, the smallest of the two scales will be
       used for both axes, so that neither w or h is ever exceeded.
       @param scaleDirection If negative, only scaling down will be
       allowed.  If greater than 0, only scaling up will be allowed.
       Otherwise, either direction is allowed.  Defaults to 0.
    **/
    $.fn.rescale = function(w, h, distort, scaleDirection) {
        if(w === null || typeof w === 'undefined'
           || h === null || typeof h === 'undefined') {
            return this;
        }
        return $.each(this, function(i, el) {
            var $el = $(el),
            xScale = w / $el.width(),
            yScale = h / $el.height();

            if(scaleDirection > 0) { // allow scaling only up
                xScale = xScale < 1 ? 1 : xScale;
                yScale = yScale < 1 ? 1 : yScale;
            } else if(scaleDirection < 0) { // allow scaling only down
                xScale = xScale > 1 ? 1 : xScale;
                yScale = yScale > 1 ? 1 : yScale;
            }

            if(distort === false) {
                if(xScale > yScale) {
                    xScale = yScale;
                } else {
                    yScale = xScale;
                }
            }

            $el.css(buildCSS('scale(' + xScale + ',' + yScale + ')', '0 0'));
        });
    };
})(jQuery);
