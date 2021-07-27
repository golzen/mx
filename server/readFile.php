<?php

$fh = fopen($_SERVER['DOCUMENT_ROOT'].$_POST['uri'],'r');

while ($line = fgets($fh)) {
  // <... Do your work with the line ...>
  echo($line);
}
fclose($fh);

?>
