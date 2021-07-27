<?php
$data = array();
$data[] = str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']);
function getDirFiles($dir, &$results = array()) {
    $files = scandir($dir);

    foreach ($files as $key => $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
        if (!is_dir($path)) {
            $results[] = str_replace('\\', '/', $path);
        }
    }

    return $results;
}
function getDirFolders($dir, &$results = array()) {
    $files = scandir($dir);

    foreach ($files as $key => $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
        if (is_dir($path) && $value != "." && $value != "..") {
          $results[] =str_replace('\\', '/', $path);
        }
    }

    return $results;
}

$files = getDirFiles($_SERVER['DOCUMENT_ROOT'].$_GET['uri']);
$folders = getDirFolders($_SERVER['DOCUMENT_ROOT'].$_GET['uri']);
$g = json_encode(['data' => $data, 'files' => $files, 'folders' => $folders]);
echo $g;

?>
