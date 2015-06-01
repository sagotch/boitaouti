# IMGCOMPRESS.JS

Client-side image resizing and compression.

## Usage

`imgcompress (callback, file, maxwidth, maxheight, ratio)`

`callback` is the function to call with compressed image's URL
as argument, `file` is used to fetch original image, and `maxwidth`,
`max height` and `ratio` ([0..1]) are resizing and compression parameters.
