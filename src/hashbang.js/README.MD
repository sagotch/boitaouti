# HASHBANG.JS

Save ressources building a single page web site and loading via ajax.

## Usage

This script exports only one function: `hashbang`.

Use `hashbang (container, root, router, def, callback)` to hook
links of `root` element, using `router` function (which is optionnal)
to get the real path to use in order to fetch pointed pages with ajax
from what is set as `href` in DOM.

`container` will display fetched pages, `def` is the default page
to display if no other page is specified, and `callback (event)`
is triggered when a link is clicked.
