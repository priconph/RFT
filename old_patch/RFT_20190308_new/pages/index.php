<h5 class="label-danger" style="text-align: center; color: white;">
	PLEASE CLEAR THE CACHE FIRST BEFORE USING THE SYSTEM
	<br>
	<span class="h4">
		Some functions may not work.
		See the procedure <a href="media/clearcache.png" target="_blank">here</a> or call 205.
	</span>
</h5>
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


