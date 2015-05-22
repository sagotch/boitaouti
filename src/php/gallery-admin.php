<?php

/** Version 0.0.0 */

function process ()
{

  if (! isset ($_GET ['dir']) || ! isset ($_POST ['action']))
    return ;

  $dir = $_GET ['dir'] ;

  $res = [] ;

  switch ( $_POST ['action'] )
  {
    case "add" :
    $res = (move_uploaded_file ($_FILES['img']['tmp_name'],
                                $dir."/".$_FILES['img']['name']) ) ?
           [ "add" => "OK" ] :
           [ "add" => "KO" ] ;
    break ;

    case "rm" :
    $res = unlink ("$_POST[path]") ?
           [ "rm" => "OK" ] :
           [ "rm" => "KO" ] ;
    break ;

    case "list" :
    $res = [ "list" => glob ( "$dir/*.{jpg,JPG,gif,GIF,png,PNG,jpeg,JPEG}",
                              GLOB_BRACE ) ];
    break ;

    default:
    return ;
  }
  echo (json_encode ($res)) ;

  exit ;

}

process () ;

?>

<html>
  <head></head>
  <body>

    <form method="POST" action="" id="add-form">
      <input type="hidden" name="action" value="add" />
      <input type="file" name="img" />
      <button id="add-button">Upload</button>
    </form>

    <ul id="pictures"></ul>

    <form method="POST" action="" id="refresh-form">
      <input type="hidden" name="action" value="list" />
      <button id="refresh-button">Refresh</button>
    </form>

    <script>

     (function ()
       {

         /* Pictures loading. */
         var refresh = function ()
         {
           var xhr = new XMLHttpRequest () ;

           xhr.onreadystatechange = function ()
           {
	           if (xhr.readyState === 4 && xhr.status === 200)
             {
               var imgs = JSON.parse (xhr.responseText) ["list"] ;
               console.log (imgs) ;
	           }
           }

           xhr.open ('POST', '', true) ;
           xhr.send (new FormData
             (document.getElementById ('refresh-form') ) ) ;
         } ;


         document.getElementById ('refresh-button').onclick =
         function (e) { e.preventDefault () ; refresh () ; } ;

         /***************/
         /* File upload */
         /***************/

         var button = document.getElementById ('add-button') ;

         button.onclick = function (e)
         {
           e.preventDefault () ;

           button.innerHTML = 'Uploading...' ;

           var xhr = new XMLHttpRequest () ;

           xhr.onload = function ()
           {
             if (xhr.status === 200)
             {
               button.innerHTML = 'Upload';
               refresh () ;
             }
             else button.innerHTML = 'Error';
           } ;

           xhr.open ('POST', '', true) ;
           xhr.send (new FormData
             (document.getElementById ('add-form') ) ) ;
         }

       }) () ;

    </script>

  </body>
</html>
