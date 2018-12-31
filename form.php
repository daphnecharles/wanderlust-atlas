 <?php
print ($_GET["first"]);
print nl2br("\n");

print ($_GET["last-name"]);
print nl2br("\n");

print ($_GET["email"]);
print nl2br("\n");

date_default_timezone_set('EST');

print date('Y-m-d H:i:s');
?>