/* hashbang.js by Julien Sagot (aka sagotch). */

/**
 * /!\ KNOWN ISSUES /!\
 *
 * In order to make hashbang.js works properly, every link href must be
 * an absolute path or relative to the initial page loaded.
 *
 * Typing an hashbang address in the navigation bar only works
 * if you are not already browsing the site, unless you refresh the
 * page. (hash change does not imply the page to be reloaded).
 */

/**
 * HOW TO
 *
 * <div id="container"></div>
 *  <script src="hashbang.js"></script>
 *  <script>
 *    hashbang (document.getElementById ("container"), document) ;
 *  </script>

 */

// [container]: element where to display the page.
// [root]: element whose link tags must be hooked.
// [router]: function to create the real path to fetch resources.
// [def]: default url to be displayed if no page is specified.
function hashbang (container, root, router, def)
{
    var container = container ;
    var root = root || container ;
    var router = router || function (x) { return x ;} ;
    var def = def || null ;

    var load = function (url)
    {

        var xmlhttp = new XMLHttpRequest () ;

        xmlhttp.onreadystatechange = function ()
        {
	    if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
            {
	        container.innerHTML = xmlhttp.responseText ;
                hookLinks () ;
	    }
        };

        xmlhttp.open ("GET", url, true) ;
        xmlhttp.send (null) ;
    } ;

    var hookLinks = function ()
    {
        var nodes = container.getElementsByTagName ('a') ;
        for (var i = 0; i < nodes.length; i++)
        {
            var node = nodes [i] ;
            if ( node.protocol == document.location.protocol &&
                 node.host == document.location.host )
            {
                var url = router (node.getAttribute ('href')) ;
                node.addEventListener
                ('click', function (e)
                 {
                     e.preventDefault () ;
                     window.history.pushState
                     (null, "", document.location.origin + "#!" + url) ;
                     load (url) ;
                 }, false) ;
            }

        }
    } ;

    var url = window.location.hash.slice(2) ;

    if (url != "")
        load (url)
    else if (def != null)
        load (def)
}
