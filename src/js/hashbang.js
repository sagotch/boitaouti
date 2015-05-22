/** hashbang.js by Julien Sagot (aka sagotch). */

/** Version 0.1.0 */

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
 *
 * In order to prevent a link from being hooked, set its
 * [data-hashbang-skip] to "true".
 * In order to trigger another action after page loading when a link
 * is clicked, use the [callback] variable.
 */

/**
 * [container]: element where to display the page.
 * [root]: element whose link tags must be hooked.
 * [router]: function to create the real path to fetch resources.
 * [def]: default url to be displayed if no page is specified.
 * [callback]: clicks on a hooked link trigger [callback (event)].
 */
function hashbang (container, root, router, def, callback)
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
        var nodes = root.getElementsByTagName ('a') ;
        for (var i = 0; i < nodes.length; i++)
        {
            (function (i)
             {
                 var node = nodes [i] ;
                 if (node.getAttribute ("data-hashbang-skip") != "true")
                 {
                     node.setAttribute ("data-hashbang-skip", "true") ;
                     if (node.protocol == document.location.protocol &&
                         node.host == document.location.host )
                     {
                         var url = router (node.getAttribute ('href')) ;
                         node.addEventListener
                         ('click', function (e)
                          {
                              e.preventDefault () ;
                              window.history.pushState
                              (null, "",
                               document.location.origin + "#!" + url) ;
                              load (url) ;
                              if (callback) callback (e) ;
                          }, false) ;
                     }
                 }
             }) (i);
        }
    } ;

    var url = window.location.hash.slice(2) ;

    if (url != "")
        load (url)
    else if (def != null)
        load (def)
    else
        hookLinks ()
}
