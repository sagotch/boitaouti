/** slider.js by Julien Sagot (aka sagotch) */

/** Version 0.0.0 */

/**
 * Given a DOM element and a set of image sources, a Slider object,
 * will use the element's background to display.
 */

/** TODO:
 * - pass controllers DOM elements and automatically
 *   bind next / prev / start / stop
 * - automatic start / stop switch according to current state
 * - allow to use strings (DOM element id) instead of element
 */

// Slider constructor
var Slider = function (id, imgs, interval, autostart)
{
    this.DOMelement = document.getElementById (id) ;
    this.imgs = imgs ;
    this.interval = interval ;

    this.idx = 0 ;
    this.timer = null ;
    if (autostart) { this.start () ; }
}

// Update the DOM element background
Slider.prototype.draw ()
{
    this.DOMelement.background = this.imgs [this.idx] ;
}

// This does not reset nor it stops the current timer
Slider.prototype.next ()
{
    this.idx = (this.idx < this.imgs.length - 1) ? this.idx + 1 : 0 ;
    this.draw () ;
}

// This does not reset nor it stops the current timer
Slider.prototype.prev ()
{
    this.idx = (this.idx > 0) ? this.idx - 1 : this.imgs.length - 1 ;
    this.draw () ;
}

Slider.prototype.start ()
{
    if (!this.timer)
    {
        this.draw () ; // display first image
        this.timer = window.setInterval ( this.next, interval) ;
    }
}

Slider.prototype.stop ()
{
    if (this.timer) window.clearInterval (this.timer) ;
}
