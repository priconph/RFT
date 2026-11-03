
	var handler = '../handler/handler.php';
	var selected_pkid ='';
	var credentials = $('#id_email').val();
	var email = $('#id_email').val();
	
	$(document).ready(function(){
		
		$('#btn_id_approve').click(function(){
			if (confirm('Please select ok to confirm approval')) {
				
				var data = {
					'action'		: 'conform_request',
					'pkid'			: selected_pkid
				}
		
				data = $.param(data);
				
				conform_request(data);
				
			} else {
				return false;
			}
		});
		
	});
	
	display_conformance(credentials);
	
	function display_conformance(credentials){
		
		var data = {
			
			'action'		: 'display_conformance',
			'credentials'	: credentials
			
		}
		
		data = $.param(data);
		
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
				
				var ctr = data['ctr'];
			
				$('#container_conformance').empty();
			
				var html  = '<table id="tbl_conformance" class="table table-bordered" style="padding: 20px; margin-right: 20px; font-size: 15px;">';
					html += '	<thead>';
					html += '		<tr>';
					html += '			<th>Control No.</th>';
					html += '			<th>Date Filed</th>';
					html += '			<th>Conformance</th>';
					html += '			<th>Receiving</th>';	
					html += '			<th>QC Head Approval</th>';
					html += '		</tr>';
					html += '	</thead>';
					html += '	<tbody>';
					html += '	</tbody>';
					html += '</table>';
					
				$('#container_conformance').append(html);	
			
				for(i=0;i<ctr;i++){
						var html = '<tr id="'+data['pkid_request'][i]+'">';
						
						if(data['control_no'][i]==''){										
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-info" style="background-color: green; border-radius: 0px;">TBA</span></h5></td>';
						}else{
							html += '   <td style="vertical-align: middle;">'+data['control_no'][i]+'</td>';
						}
						
						html += '	<td style="vertical-align: middle;">'+data['date_filed'][i]+'</td>';
						
						if(data['conf_status'][i] == '0'){
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-info" style="background-color: #FF9F00; border-radius: 0px;">FOR YOUR APPROVAL</span></h5></td>';
						}else if(data['conf_status'][i] == '1'){
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-success">CONFORMED</span></h5></td>';
						}else{
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-success" style="background-color: #5416B4; border-radius: 0px;">QUEUED</span></h5></td>';
						}
						
						if(data['rec_status'][i] == '0'){
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-info" style="background-color: #34CCFF; border-radius: 0px;">ON-GOING</span></h5></td>';
						}else if(data['rec_status'][i] == '1'){
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-success">RECEIVED</span></h5></td>';
						}else{
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-success" style="background-color: #5416B4; border-radius: 0px;">QUEUED</span></h5></td>';
						}
						
						if(data['app_status'][i] == '0'){
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-info" style="background-color: #34CCFF; border-radius: 0px;">ON-GOING</span></h5></td>';
						}else if(data['app_status'][i] == '1'){
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-success">APPROVED</span></h5></td>';
						}else{
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-success" style="background-color: #5416B4; border-radius: 0px;">QUEUED</span></h5></td>';
						}
												
						html += '</tr>';
										
						$('#tbl_conformance tbody').append(html);
				}
			
				var oTable = $('#tbl_conformance').DataTable({ paginate: true, aaSorting: []});
				table_event_conformance();
				
			},
			error	: function(data){
				alert('Error loading conformance table.');
				console.log(data);
			}

		});
	}
	
	function table_event_conformance(){
		
		$('#tbl_conformance tbody').on('click','tr', function(){
			selected_pkid = '';
			$('#tbl_conformance tbody tr').attr('style','');
			$(this).attr('style','background:#7a9d00 ;color:white;');
			selected_pkid = this.id;
		});
		
		$('#tbl_conformance tbody').on('dblclick', 'tr', function(){
			
			$('#btn_id_approve').prop('disabled', false);
			getRequestDetails(selected_pkid);
			
		});
		
	}
	
	function getRequestDetails(selected_pkid){
		
		var data = {
			'action'	: 'getRequestDetails',
			'pkid'		: selected_pkid
		}
		
		data = $.param(data);
		
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
				
				var pkid = data['pkid_request'];
				
				$('#id_conform_dept').val(data['dept']);
				$('#id_conform_sec').val(data['sec']);
				
				var reason = data['rft'];
				var job_function = data['job_func'];
				var allocation = data['al_alloc'];
				var requestor = data['requested_by'];
				var status = data['conf_status'];
				
				if(reason == '1'){
					$('#id_conform_reason').val('Newly Hired');
				}else if(reason == '2'){
					$('#id_conform_reason').val('Promoted Employee');
				}else if(reason == '3'){
					$('#id_conform_reason').val('Transferred from other assembly line');
				}else if(reason == '4'){
					$('#id_conform_reason').val('Transferred from on other section/department/division');
				}else if(reason == '5'){
					$('#id_conform_reason').val('ML / SL / VL (whose leave reached at least 1 month)');
				}else if(reason == '6'){
					$('#id_conform_reason').val('New Product Line');
				}else if(reason == '7'){
					$('#id_conform_reason').val('Flexibility Certification');
				}else if(reason == '8'){
					$('#id_conform_reason').val('Re-certification');
				}
				
				if(job_function == '1'){
					$('#id_conform_jobfunc').val('Operator');
				}else if(job_function == '2'){
					$('#id_conform_jobfunc').val('Material Handler');
				}else if(job_function == '3'){
					$('#id_conform_jobfunc').val('Inspector');
				}else if(job_function == '4'){
					$('#id_conform_jobfunc').val('Technician');
				}else if(job_function == '5'){
					$('#id_conform_jobfunc').val('Engineer');
				}else if(job_function == '6'){
					$('#id_conform_jobfunc').val('Supervisor');
				}
				
				if(allocation == '1'){
					$('#id_conform_alloc').val('Automotive Line');
				}else{
					$('#id_conform_alloc').val('Non-Automotive Line');
				}
				
				getEmployeeList(pkid);
				getRequestorDetails(requestor);
				
				if(status == '1'){
					$('#btn_id_approve').prop('disabled', true);
				}
				
				
				$('#modal_id_conformance').modal('show');
			},
			error	: function(data){
				alert('Error on retrieving request details.');
				console.log(data);
			}
		});
		
	}
	
	function getEmployeeList(pkid){
		
		var data = {
			'action'	: 'getEmployeeList',
			'pkid'		: pkid[0]
		}
		
		data = $.param(data);
		
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
				
				var ctr = data['ctr'];
			
				$('#container_emplist').empty();
				
				var html  = '<table id="tbl_emplist" class="table table-bordered" style="padding: 20px; margin-right: 20px; font-size: 12px;">';
					html += '	<thead>';
					html += '		<tr>';
					html += '			<th>Date Hired</th>';
					html += '			<th>Employee No.</th>';
					html += '			<th>Name</th>';
					html += '			<th colspan="2">From (Station/Product Name)</th>';	
					html += '			<th colspan="2">To (Station/Product Name)</th>';
					html += '		</tr>';
					html += '	</thead>';
					html += '	<tbody>';
					html += '	</tbody>';
					html += '</table>';
					
				$('#container_emplist').append(html);	
				
				for(i=0;i<ctr;i++){
						var html = '<tr id="'+data['pkid_trainees'][i]+'">';
						html += '   <td>'+data['date_hired'][i]+'</td>';
						html += '	<td>'+data['emp_no'][i]+'</td>';
						html += '	<td>'+data['emp_name'][i]+'</td>';	
						html += '	<td>'+data['from_station'][i]+'</td>';	
						html += '	<td>'+data['from_line'][i]+'</td>';
						html += '	<td>'+data['to_station'][i]+'</td>';
						html += '	<td>'+data['to_line'][i]+'</td>';
						html += '</tr>';
					 $('#tbl_emplist tbody').append(html);
				}
				
				var oTable = $('#tbl_emplist').DataTable({ paginate: true, aaSorting: [] });
			},
			error	: function(data){
				alert('Error on retrieving employee list');
				console.log(data);
			}
		});
	}
	
	function getRequestorDetails(requestor){
		
		var data = {
			'action'	: 'getRequestorDetails',
			'email'		: requestor[0]
		}
		
		data = $.param(data);
		
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
				var ln = data['lastname'];
				var fn = data['firstname'];
				
				var fullname = fn+" "+ln;
				
				$('#id_conform_requestor').val(fullname);
			},
			error	: function(data){
				alert('Error found in retrieving requestor');
				console.log(data);
			}
		});
		
	}
	
	function conform_request(data){
		
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success : function(data){
				var pkid_conformance = data['pkid'];
				send_email_conformance(pkid_conformance);
			},
			error	: function(data){
				alert('Error found on conforming request.');
				console.log(data);
			}
		});
		
	}
	
	function send_email_conformance(pkid_conformance){
		
		var data = {
			'action'	: 'send_email_conformance',
			'pkid'		: pkid_conformance,
			'email'		: email
		}
		
		data = $.param(data);
		
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
				display_conformance(credentials);
				$('#modal_id_conformance').modal('hide');
				notif_success();
			},
			error	: function(data){
				alert('Error found in sending email conformance');
				console.log(data);
			}
		});
	}
	
	function notif_success(){
		notif({
		msg: "<strong>System: </strong> Transaction successful!",
		type: "success",
		position: "center",
		timeout: "3000"
		});
	}
	
	
	
	
	