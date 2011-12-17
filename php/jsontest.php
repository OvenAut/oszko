<?php
	//include 'JSON/JSON.php';
	
	//$json = new Services_JSON();
	
	$value = array("foo","bar",array(1, 2, "baz"), array(3, array(4)));
	$output = json_encode($value);
	
	print($output);
	
	echo("\n");
	$var = json_decode($output);
	
	print_r($var);
	
?>