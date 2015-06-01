# SSCS.SCSS

Some useful parameterizable mixins. There is no class,
just mixin so you can use what you want when building your own css
file, and the rest will not be include.

## General default fixes

`reset` and `clearfix` are included in `sscs.scss`.

## Alignment helpers

`left`, `center` and `right` are shortcuts for horizontal block
alignment handling.

## Boxes

Use `radius ($radius)` as a shortcut for `border-radius` property.

`shadow ($top, $left, $blur, $color, $inset)` provides a default
box shahow with nice default, which can be tweaked by its optionnal
arguments.

## Grid system

Include `grid` in a block in order to make its direct children
stack to the left. Define children's width/height in order
to make your own grid.

## Buttons

`button-fill ($bg, $fg)` is a classic rectangular button. It becomes
lighter on `:hover`.

`button-outline ($color, $hover)` is a rectangular button with
transparent background but bordered with the same color as its text.
Becomes filled by this color on `:hover`, while text becomes `$hover`
colored.

## Message box

`message-box ($bg)` is a box width thick left border of a given color,
and background of the same color after lightening.

## Navbar

## Dropdown

`dropdown ($content)` hides children matching `$content` css selector,
and display them on hover.

## Stripped list

`stripped-list ($border)` apply `$border` at the bottom of all `li`
children except the last one.

## Switches

`switch ($w, $h, $m, $r, $on, $off)` make a checkbox appears
like a ON/OFF switch. An empty label **MUST** follow the checkbox in
order to make it work.

## Input

`input-text ($border, $color)` makes text inputs less ugly, and can
be tweaked with its arguments.
