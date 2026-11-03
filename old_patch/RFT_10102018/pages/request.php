<?php
	
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	
	$date = date('Y-m-d');
?>

<style>

	#id_emp_name, #id_emp_dateHired {
		
		background-color: #FFFFFF;;
		
	}
	
	.modal {
	  overflow-y:auto;
	}
	
	.table td{
	  text-align: center;
	  vertical-align: bottom;
	}

	.span-align {
		vertical-align: bottom;
	}
	
	.loader {
		border: 16px solid #f3f3f3; /* Light grey */
		border-top: 16px solid #3498db; /* Blue */
		border-radius: 50%;
		width: 120px;
		height: 120px;
		animation: spin 2s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
	
</style>

<html lang="eng">

	<head>
		<input type="hidden" id="hidden_email" value="<?=$empEmail?>">
	</head>
	
	<body>
		
		<div class="container">
			<div id="row">
				<div class="col-sm-12">
					<ol class="breadcrumb" style="background-color: #00B5EC; border-radius: 0px;">
					  <li><a href="#" style="color: #FFFFFF;">Home</a></li>
					</ol>
				</div>
			</div>
		</div>
			
		<header>
		
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<center>
							<h3> REQUEST PANEL</h3>
						</center>
					</div>	
				</div>
				
				<div class="row">
					<div class="col-md-2 pull-right">
						<button id="btn_create_request" class="btn btn-success">Create a request</button>
					</div>
				</div>
			</div>
			
		</header>

		<br>
		
		<section id="home-slider">
			
			<div class="container">
				<div class="row">	
					<div class="col-sm-12">
						<div id="container_request">
						</div>
					</div>
				</div>
			</div>
			
			
			
		</section>
		
		<br>
		
		<div class="container">
			<div class="row">
				<div class="col-md-2 pull-right">
					<button id="display_granted_request" class="btn btn-default">Show Request History</button>
				</div>
			</div>
		</div>
		
		<br>
		
		<section id="section_2">
			
		</section>
		
		<footer></footer>
	
	</body>
	
	<div class="modal fade" id="modal_create_request">
	
		<div class="modal-dialog modal-lg" >
			
			<div class="modal-content" >
			  
				<div class="modal-body" >
					
					<form id="form_id_create_request">
					
						<div class="row rowMargin">
							<div class="col-sm-12">
								<label style="margin-bottom:2px;"> TRAINING REQUEST FORM</label>
							</div>
						</div>
												
						<br>
					
						<div class="row rowMargin">
							<div class="col-sm-3" >
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">CONTROL NO :</span>
									<input type	="text" class="form-control" id ="id_add_ctrlno" style="background-color: #FFF; border-color: #FFF;" readonly>
								</div>
							</div>	
							<div class="col-sm-5">
							</div>
							<div class="col-sm-4">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">DATE :</span>
									<input type	="text" class="form-control" id ="id_add_ctrlno" name="name_add_date" style="background-color: #FFF; border-color: #FFF;" value="<?=$date?>" readonly>
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
								<label  style="margin-bottom:2px;">REQUEST DETAILS</label>
							</div>
						</div>
						
						<div class="row rowMargin">
						
							<div class="col-sm-3">
								<div class="input-group input-group-sm">
								
									<span class="input-group-addon set_span_color" id="sizing-addon3">DEPARTMENT :</span>
									
									<select class="form-control" name="name_crt_dept" id="id_crt_dept">
										<option value="PPS">PPS</option>
										<option value="CN">CN</option>
										<option value="YF">YF</option>
										<option value="TS">TS</option>
									</select>
									
								</div>
							</div>
							
							<div class="col-sm-3">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">SECTION :</span>
									
									<select class="form-control" name="name_crt_sec" id="id_crt_sec">
										<option value="PRD">Production</option>
										<option value="ENG">Engineering</option>
										<!--<option value="SSD">SSD</option>-->
										<option value="PPC">PPC</option>
										<option value="LQC">LQC</option>
									</select>
									
								</div>
							</div>
							
							<div class="col-sm-6">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">REASON:</span>
									
									<select class="form-control" name="name_crt_reason" id="id_crt_reason">
										<option value="1">Newly Hired</option>
										<option value="2">Promoted Employee</option>
										<option value="3">Transferred from other assembly line</option>
										<option value="4">Transferred from other section/department/division</option>
										<option value="5">ML/SL/VL (whose leave reached at least 1 month)</option>
										<option value="6">New Product/Line</option>
										<option value="7">Flexibility Certification</option>
										<option value="8">Re-certification</option>
									</select>
									
								</div>
							</div>
							
						</div >
						
						<br>
						
						<div class="row rowMargin">
						
							<div class="col-sm-4">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">JOB FUNCTION :</span>
									
									<select class="form-control" name="name_crt_jobfunc" id="id_crt_jobfunc">
										<option value="1">Operator</option>
										<option value="2">Material Handler</option>
										<option value="3">Inspector</option>
										<option value="4">Technician</option>
										<option value="5">Engineer</option>
										<option value="6">Supervisor</option>
									</select>
									
								</div>
							</div>
							
							<div class="col-sm-6">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">AREA/LINE ALLOCATION :</span>
									
									<select class="form-control" name="name_crt_alloc" id="id_crt_alloc">
										<option value="1">Automotive Line</option>
										<option value="2">Non-Automotive Line</option>
									</select>
									
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
								<label  style="margin-bottom:2px;">EMPLOYESS DETAILS</label>
							</div>
						</div>
						
						<div class="row rowMargin">
							<div class="col-sm-12">
								<table id="tbl_trainees" class="table table-bordered" style="font-size: 12px;" border="1">
									
									<thead>
										<tr>
											<th>Date hired</th>
											<th>Employee No</th>
											<th>Name</th>
											<th colspan="2">From Station/Production</th>
											<th colspan="2">To Station/Production</th>
											<th><center><span class="fa fa-wrench"></span></center></th>
										</tr>
									</thead>
									
									<tbody>
									</tbody>
									
								</table>
							</div>
						</div>
						
						
						<br>
						
						<div class="row rowMargin">
							<div class="col-sm-12">
								<button 
								type="button" 
								class="btn btn-success btn-sm pull-right" 
								id="btn_id_add_emp_details" >
								<i class="fa fa-plus" style="font-size: 15px;"> ADD EMPLOYEE</i>
								</button>
							</div>
						</div>
						
						<div class="row">
							<div class="col-sm-12">
								<hr width="100%" align="center" style="padding-bottom: 1px; margin-bottom: 5px; opacity: 0.4;" noshade="noshade">
							</div>
						</div>
						
						<div class="row rowMargin">
							<div class="col-sm-12">
								<label  style="margin-bottom:2px;">APPROVAL DETAILS</label>
							</div>
						</div>
						
						<div class="row rowMargin">
							<div class="col-sm-6">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">REQUESTOR:</span>
									<input type	="text" class="form-control" value="<? echo $empName2 ?>" readonly>
									<input type	="text" class="form-control" name="name_crt_reqby" id="id_crt_reqby" value="<? echo $empEmail ?>" readonly>
								</div>
							</div>
							
							<div class="col-sm-6">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3"> APPROVER:</span>
									<input class="form-control" list="id_superior_list" name="name_superior_check" id="id_superior_check" autocomplete=off required>
									<datalist id="id_superior_list"></datalist>
									<input type="text" class="form-control" name="name_superior_name" id="id_superior_name" required readonly>
								</div>
							</div>
						</div>
						
						<br>
						<br>
					 
						<div class="modal-footer">
							<div class="form-group">
							
								<button 
								type="submit" 
								class="btn btn-info btn-sm" style="background-color: #7e3878; border-color: #7e3878;">
								<i class="fa fa-send-o" style="font-size: 15px;"> SUBMIT </i>
								</button>
							
								<button type="button" 
								class="btn btn-default btn-sm"  
								data-dismiss="modal" >
								<i class="fa fa-close" style="font-size: 15px;"> Close</i>
								</button>
								
							</div>
						</div>
						
					</form>
					
					
				
					<div id="misc">
					</div>
					
				</div><!-- Modal Body -->
				
			</div><!-- /.modal-content -->
			
		</div><!-- /.modal-dialog -->

	</div>
	
	<div class="modal fade" id="modal_crt_add_emp">
	
		<div class="modal-dialog modal-sm" >
			
			<div class="modal-content" >
			  
				<div class="modal-body">
				
					<form id="form_id_add_emp" role="form">
						
						<div class="row rowMargin">

							<div class="col-sm-12">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">CLASSIFICATION:</span>
									
									<select class="form-control" id="id_crt_type">
										<option value="0">SELECT CLASS</option>
										<option value="SUBCON">SUBCON</option>
										<option value="PMI">PMI</option>
									</select>
									
								</div>
							</div>
							
							<div class="col-sm-12" style="padding-top: 5px;">
							</div>
							
							<div class="col-sm-12">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">EMPLOYEE NO :</span>
									<input class="form-control" list="id_crt_name" name="empno_check" id="id_empno_check">
									<datalist id="id_crt_name"></datalist>
								</div>
							</div>
						</div>
						
						<!--<div class="row rowMargin">
							<div class="col-sm-12">
								<button type="button" class="btn btn-info btn-sm pull-right" id="btn_check_details"> Check Details
								</button>
							</div>
						</div>-->
						
						<div class="row rowMargin">
							<div class="col-sm-12">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">NAME :</span>
									<input type	="text" class="form-control" tabindex="-1" name="name_emp_name" id="id_emp_name" readonly>
								</div>
							</div>
						</div>
						
						<div class="row rowMargin">
							<div class="col-sm-12">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">DATE HIRED</span>
									<input type	="text" class="form-control" tabindex="-1" name="name_emp_dateHired" id ="id_emp_dateHired" readonly>
								</div>
							</div>
						</div>
						
						<div class="row rowMargin">
							<div class="col-sm-12">
								<label style="margin-bottom:2px;"> From</label>
							</div>
						</div>
						
						<div class="row rowMargin">
							<div class="col-sm-12">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">STATION :</span>
									<input type	="text" class="form-control" name="name_emp_fstation" id="id_emp_fstation" required>
								</div>
							</div>
						</div >
						
						<div class="row rowMargin">
						
							<div class="col-sm-12">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">PRODUCT NAME :</span>
									<input type	="text" class="form-control" name="name_emp_fprodname" id="id_emp_fprodname" required>
								</div>
							</div>
							
						</div >
						
						<div class="row rowMargin">
							<div class="col-sm-12">
								<label style="margin-bottom:2px;"> To</label>
							</div>
						</div>
						
						<div class="row rowMargin">
						
							<div class="col-sm-12">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">STATION :</span>
									<input type	="text" class="form-control" name="name_emp_tstation" id="id_emp_tstation" required>
								</div>
							</div>
							
						</div >
						
						<div class="row rowMargin">
						
							<div class="col-sm-12">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">PRODUCT NAME :</span>
									<input type	="text" class="form-control" name="name_emp_tprodname" id="id_emp_tprodname" required>
								</div>
							</div>
							
						</div >
						
						<br>
					 
						<div class="modal-footer">
							<div class="form-group">
								
								<button 
								type="button"
								class="btn btn-info btn-sm" 
								id="btn_id_add_emp" >
								<i class="fa fa-check" style="font-size: 15px;"> Add</i>
								</button>
							
								<button type="button" 
								class="btn btn-default btn-sm"  
								data-dismiss="modal" >
								<i class="fa fa-close" style="font-size: 15px;"> Close</i>
								</button>
								
							</div>
						</div>
						
					</form>
				
					<div id="misc">
					</div>
					
				</div>
				
			</div>
			
		</div>

	</div>
	
	<div class="modal fade" id="modal_id_request">
	
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
									<input class="form-control" type="text" id="id_request_dept" readonly>
								</div>
							</div>
							
							<div class="col-sm-3">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">SECTION :</span>
									<input class="form-control" type="text" id="id_request_sec" readonly>
								</div>
							</div>
							
							<div class="col-sm-6">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">REASON:</span>
									<input class="form-control" type="text" id="id_request_reason" readonly>
								</div>
							</div>
							
						</div >
						
						<br>
						
						<div class="row rowMargin">
						
							<div class="col-sm-4">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">JOB FUNCTION :</span>
									<input class="form-control" type="text" id="id_request_jobfunc" readonly>
								</div>
							</div>
							
							<div class="col-sm-6">
								<div class="input-group input-group-sm">
									<span class="input-group-addon set_span_color" id="sizing-addon3">AREA/LINE ALLOCATION :</span>
									<input class="form-control" type="text" id="id_request_alloc" readonly>
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
					 
						<div class="modal-footer">
							<div class="form-group">
															
								<button type="button" 
								class="btn btn-default btn-sm"  
								data-dismiss="modal" id="modal_close">
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
	
	<div class="modal fade" id="modal_previous_request">
	
		<div class="modal-dialog modal-lg" >
			
			<div class="modal-content" >
			  
				<div class="modal-body" >
				
					<div class="container-fluid">
				
						<div class="row">
						
							<div class="col-md-12">
								<center>
									<h3 id="display_label"> APPROVED TRAINING REQUESTS</h3>
								</center>
							</div>
							
							<br>
							
							<br>
							
							<div class="row">	
								<div class="col-sm-12">
									<div id="container_granted_request">
									</div>
								</div>
							</div>
							
						</div>
					
					</div>
				
				</div>
				
			</div>
			
		</div>

	</div>
	
	<script type="text/javascript" src="./js/request.js">
	</script>
	
</html>