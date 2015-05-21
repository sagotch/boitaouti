/** imgcompress.js by Julien Sagot (aka sagtoch) */

/**
 * TODO:
 * - revokeObjectURL
 * - allow other types than jpeg
 **/

/**
 * [callback]: function called with compressed image's url when it's ready.
 * [file]: file path.
 * [maxwidth]: desired max width.
 * [maxheight]: desired max height.
 * [ratio]: compression ratio. Default is 1 (no compression).
 */
function imgcompress (callback, file, maxwidth, maxheight, ratio)
{
    var reader = new FileReader () ;
    reader.readAsArrayBuffer (file) ;

    reader.onload = function (e)
    {
        var blob = new Blob ([e.target.result]) ;
        var img = new Image () ;

        img.onload = function ()
        {
            var canvas = document.createElement ('canvas') ;

            var width = img.width ;
            var height = img.height ;

            if (width > maxwidth)
            {
                height = Math.round (height *= maxwidth / width) ;
                width = maxwidth ;
            }
            else if (height > maxheight)
            {
                width = Math.round (width *= maxheight / height) ;
                height = maxheight ;
            }

            canvas.width = width ;
            canvas.height = height ;
            canvas.getContext("2d").drawImage(img, 0, 0, width, height) ;

            callback (canvas.toDataURL ("image/jpeg", ratio || 1) ) ;
        } ;

        img.src = window.URL.createObjectURL (blob) ;

    } ;

}
