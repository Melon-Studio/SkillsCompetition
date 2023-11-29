<!-- 设置Cookie -->
<?php
$id = $_POST['id'];
$title = $_POST['title'];
$square = $_POST['square'];
$class = $_POST['class'];

setcookie('id', $id, time()+86400);
setcookie('title', $title, time()+86400);
setcookie('square', $square, time()+86400);
setcookie('class', $class, time()+86400);
?>
