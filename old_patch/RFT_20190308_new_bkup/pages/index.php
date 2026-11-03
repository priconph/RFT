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
<!-- <h1 class="label-danger">PLEASE CLEAR THE CACHE FIRST BEFORE USING THE SYSTEM</h1> -->


