<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

?>

<style>
	.table td {
	  text-align: center;
	  vertical-align: bottom;
	}
</style>

<html>

	<head>
	<input type="hidden" id="id_email" value="<? echo $empEmail ?>">
	</head>
	
	<body>
	
		<header>
			
			<div class="container">
				<div id="row">
					<div class="col-sm-12">
						<ol class="breadcrumb" style="background-color: #00B5EC; border-radius: 0px;">
						  <li><a href="#" style="color: #FFFFFF;">CONFORMANCE PAGE</a></li>
						</ol>
					</div>
				</div>
			</div>
			
		</header>
		
		<section>
			
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<center>
							<h3> FOR CONFORMANCE</h3>
						</center>
					</div>	
				</div>
			</div>
			
			<div class="container">
				<div class="row">
					<div class="col-sm-12">
						<div id="container_conformance">
						</div>
					</div>
				</div>
			</div>
		
		</section>
		
		<footer></footer>
	
	</body>
	
	<div class="modal fade" id="modal_id_conformance">
	
		<div class="modal-dialog modal-lg" >
			
			<div class="modal-content" >
			  
				<div class="modal-body" >
					
						<div class="row rowMargin">
							<div class="col-sm-12">
								<label style="margin: auto;"> TRAINING REQUEST FORM</label>
							</div>
						</div>
						
						<div class="row">
							<div class="col-sm-12">
								<hr width="100%" align="center" style="padding-bottom: 1px; margin-bottom: 5px; opacity: 0.4;" noshade="noshade">
							</div>
						</div>
						
						<div class="row rowMargin">
							<div class="col-sm-12">
								<label  style="margin-bottom:2px;">REQUEST DETAILS:</label>
							</div>
						</div>
						
						<div class="row rowMargin">
						
							<div class="col-sm-3">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">DEPARTMENT :</span>
									<input class="form-control" type="text" id="id_conform_dept" readonly>
								</div>
							</div>
							
							<div class="col-sm-3">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">SECTION :</span>
									<input class="form-control" type="text" id="id_conform_sec" readonly>
								</div>
							</div>
							
							<div class="col-sm-6">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">REASON:</span>
									<input class="form-control" type="text" id="id_conform_reason" readonly>
								</div>
							</div>
							
						</div >
						
						<br>
						
						<div class="row rowMargin">
						
							<div class="col-sm-4">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">JOB FUNCTION :</span>
									<input class="form-control" type="text" id="id_conform_jobfunc" readonly>
								</div>
							</div>
							
							<div class="col-sm-6">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">AREA/LINE ALLOCATION :</span>
									<input class="form-control" type="text" id="id_conform_alloc" readonly>
								</div>
							</div>
							
						</div>
						
						<div class="row">
							<div class="col-sm-12">
								<hr width="100%" align="center" style="padding-bottom: 1px; margin-bottom: 5px; opacity: 0.4;" noshade="noshade">
							</div>
						</div>
						
						<div class="row rowMargin">
							<div class="col-sm-12">
								<label  style="margin-bottom:2px;">REQUEST DETAILS:</label>
							</div>
						</div>
						
						<div class="row rowMargin">
							<div class="col-sm-12">
								<div id="container_emplist">
								</div>
							</div>
						</div>
						
						<div class="row">
							<div class="col-sm-12">
								<hr width="100%" align="center" style="padding-bottom: 1px; margin-bottom: 5px; opacity: 0.4;" noshade="noshade">
							</div>
						</div>
						
						<div class="row rowMargin">
							<div class="col-sm-12">
								<label  style="margin-bottom:2px;">APPROVAL DETAILS:</label>
							</div>
						</div>
						
						<div class="row rowMargin">
							<div class="col-sm-6">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">REQUESTED BY:</span>
									<input class="form-control" type="text" id="id_conform_requestor" readonly>
								</div>
							</div>
						</div>
						<br>
					 
						<div class="modal-footer">
							<div class="form-group">
							
								<button 
								type="button" id="btn_id_approve"
								class="btn btn-info btn-sm" style="background-color: #7e3878; border-color: #7e3878;">
								<i class="fa fa-check" style="font-size: 15px;"> CONFORM </i>
								</button>
								
								<button type="button" 
								class="btn btn-default btn-sm"  
								data-dismiss="modal">
								<i class="fa fa-close" style="font-size: 15px;"> Close</i>
								</button>
								
							</div>
						</div>
						
					<div id="misc">
					</div>
					
				</div>
				
			</div>
			
		</div>

	</div>
	
	<script src="./js/conformance.js"></script>

</html>