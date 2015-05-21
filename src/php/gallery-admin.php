<?php

/** Version 0.0.0 */

function process ()
{

  if (! isset ($_POST ['dir']) || ! isset $_POST ['action'])
    return ;

  $dir = $_POST ['dir']

  $res = [] ;

  switch ( "$_POST ['action']" )
  {
    case "add" :
    $res = (move_uploaded_file ("$_FILES['pic']['tmp_name']",
                                "$dir/$_FILES['pic']['name']") ) ?
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

    echo (json_encode ($res, JSON_FORCE_OBJECT)) ;

    exit ;
  }
}

process () ;

?>
