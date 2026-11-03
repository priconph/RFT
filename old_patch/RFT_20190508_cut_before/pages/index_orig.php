<?php


	require_once('navmenu.php');
	
	 if(!isset($_GET['page']))
	{
		$page = "dashboard.php";
	}else{
		$page = $_GET['page'];
	} 

	require_once($page);

?>

