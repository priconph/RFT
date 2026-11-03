
	var handler = '../handler/handler.php';
	var selected_pkid ='';
	var email = $('#id_email').val();
	
	$(document).ready(function(){
		
		$('#btn_id_approval').click(function(){
			
			if (confirm('Please select ok to confirm approval')) {
				
				var data = {
					'action'		: 'approve_request',
					'pkid'			: selected_pkid
				}
		
				data = $.param(data);
				approve_request(data);
				
			} else {
				return false;
			}
		});
		
	});
	
	display_approval(email);
	display_approved(email);
	
	function display_approved(email){
		
		var data = {
			'action'		: 'display_approved',
			'credential'	: email
		}
		
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
				
				// alert(data['control_no']);
				var ctr = data['ctr'];
			
				$('#container_list_of_approved').empty();
				
				var html  = '<table id="tbl_approved" class="table table-bordered" style="padding: 20px; margin-right: 20px; font-size: 15px;">';
					html += '	<thead>';
					html += '		<tr>';
					html += '			<th>Control No.</th>';
					html += '			<th>Date Filed</th>';
					html += '			<th>Requested By</th>';
					html += '			<th>Remarks</th>';	
					html += '		</tr>';
					html += '	</thead>';
					html += '	<tbody>';
					html += '	</tbody>';
					html += '</table>';
				
				$('#container_list_of_approved').append(html);	
				
				// alert(data['pkid_request'][0]);
				
				for(i=0;i<ctr;i++){
					var html = '<tr id="'+data['pkid_request'][i]+'">';
						html += '   <td>'+data['control_no'][i]+'</td>';
						html += '	<td>'+data['date_filed'][i]+'</td>';
						html += '	<td>'+data['requested_by'][i]+'</td>';
						
						if (data['remarks'] == ''){
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-success">APPROVED</span></h5></td>';
						}else{
							html += '	<td>'+data['remarks'][i]+'</td>';
						}
						
						html += '</tr>';
					 $('#tbl_approved tbody').append(html);
				}
				
				var oTable = $('#tbl_approved').DataTable({ paginate: true, aaSorting: []});
				table_event_approved();
			},
			error	: function(data){
				alert(data);
			}
		});
		
	}
	
	function display_approval(email){
		
		var data = {
			'action'	: 'display_approval',
			'credential': email 
		}
		
		data = $.param(data);
		
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
				var ctr = data['ctr'];
			
				$('#container_approval').empty();
			
				var html  = '<table id="tbl_approval" class="table table-bordered" style="padding: 20px; margin-right: 20px; font-size: 15px;">';
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
					
				$('#container_approval').append(html);	
			
				for(i=0;i<ctr;i++){
						var html = '<tr id="'+data['pkid_request'][i]+'">';
						
						if(data['control_no'][i]==''){										
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-info" style="background-color: green; border-radius: 0px;">TBA</span></h5></td>';
						}else{
							html += '   <td style="vertical-align: middle;">'+data['control_no'][i]+'</td>';
						}
						
						html += '	<td style="vertical-align: middle;">'+data['date_filed'][i]+'</td>';
						
						if(data['conf_status'][i] == '0'){
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-info" style="background-color: #34CCFF; border-radius: 0px;">ON-GOING</span></h5></td>';
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
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-info" style="background-color: #FF9F00; border-radius: 0px;">FOR YOUR APPROVAL</span></h5></td>';
						}else if(data['app_status'][i] == '1'){
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-success">APPROVED</span></h5></td>';
						}else{
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-success" style="background-color: #5416B4; border-radius: 0px;">QUEUED</span></h5></td>';
						}
												
						html += '</tr>';
						
						$('#tbl_approval tbody').append(html);
				}
			
				var oTable = $('#tbl_approval').DataTable({ paginate: true, aaSorting: []});
				table_event_approval();
			},
			error	: function(data){
				alert('Error found during retrieval of approval data');
				console.log(data);
			}
		});
	}
	
	function table_event_approval(){
		
		$('#tbl_approval tbody').on('click','tr', function(){
			selected_pkid = '';
			$('#tbl_approval tbody tr').attr('style','');
			$(this).attr('style','background:#7a9d00 ;color:white;');
			selected_pkid = this.id;
		});
		
		$('#tbl_approval tbody').on('dblclick', 'tr', function(){
			
			getRequestDetails(selected_pkid);
			$('#btn_id_approval').prop('disabled',false);
			
		});
		
	}
	
	function table_event_approved(){
		
		$('#tbl_approved tbody').on('click','tr', function(){
			selected_pkid = '';
			$('#tbl_approved tbody tr').attr('style','');
			$(this).attr('style','background:#7a9d00 ;color:white;');
			selected_pkid = this.id;
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
				
				$('#id_approval_dept').val(data['dept']);
				$('#id_approval_sec').val(data['sec']);
				
				
				var reason = data['rft'];
				var job_function = data['job_func'];
				var allocation = data['al_alloc'];
				var requestor = data['requested_by'];
				var conformer = data['conformed_by'];
				var receiver = data['received_by'];
				var approval = data['app_status'];
				
				if(reason == '1'){
					$('#id_approval_reason').val('Newly Hired');
				}else if(reason == '2'){
					$('#id_approval_reason').val('Promoted Employee');
				}else if(reason == '3'){
					$('#id_approval_reason').val('Transferred from other assembly line');
				}else if(reason == '4'){
					$('#id_approval_reason').val('Transferred from on other section/department/division');
				}else if(reason == '5'){
					$('#id_approval_reason').val('ML / SL / VL (whose leave reached at least 1 month)');
				}else if(reason == '6'){
					$('#id_approval_reason').val('New Product Line');
				}else if(reason == '7'){
					$('#id_approval_reason').val('Flexibility Certification');
				}else if(reason == '8'){
					$('#id_approval_reason').val('Re-certification');
				}
				
				if(job_function == '1'){
					$('#id_approval_jobfunc').val('Operator');
				}else if(job_function == '2'){
					$('#id_approval_jobfunc').val('Material Handler');
				}else if(job_function == '3'){
					$('#id_approval_jobfunc').val('Inspector');
				}else if(job_function == '4'){
					$('#id_approval_jobfunc').val('`Technician');
				}else if(job_function == '5'){
					$('#id_approval_jobfunc').val('Engineer');
				}else if(job_function == '6'){
					$('#id_approval_jobfunc').val('Supervisor');
				}
				
				if(allocation == '1'){
					$('#id_approval_alloc').val('Automotive Line');
				}else{
					$('#id_approval_alloc').val('Non-Automotive Line');
				}
				
				getEmployeeList(pkid);
				getRequestorDetails(requestor);
				getConformerDetails(conformer);
				getReceiverDetails(receiver);
				
				if(approval == '1'){
					$('#btn_id_approval').prop('disabled', true);
				}else{
					
				}
				
				$('#modal_id_approval').modal('show');
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
		
		// alert(data);
		
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
				var ln = data['lastname'];
				var fn = data['firstname'];
				
				var fullname = fn+" "+ln;
				
				$('#id_approval_requestor').val(fullname);
			},
			error	: function(data){
				alert('Error found in retrieving requestor');
				console.log(data);
			}
		});
		
	}
	
	function getConformerDetails(conformer){
		
		var data = {
			'action'	: 'getRequestorDetails',
			'email'		: conformer[0]
		}
		
		data = $.param(data);
		
		// alert(data);
		
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
				var ln = data['lastname'];
				var fn = data['firstname'];
				
				var fullname = fn+" "+ln;
				
				$('#id_approval_conformer').val(fullname);
			},
			error	: function(data){
				alert('Error found in retrieving requestor');
				console.log(data);
			}
		});
	}
	
	function getReceiverDetails(receiver){
		
		var data = {
			'action'	: 'getRequestorDetails',
			'email'		: receiver[0]
		}
		
		data = $.param(data);
		
		// alert(receiver);
		
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
				var ln = data['lastname'];
				var fn = data['firstname'];
				
				var fullname = fn+" "+ln;
				
				$('#id_approval_receiver').val(fullname);
			},
			error	: function(data){
				alert('Error found in retrieving requestor');
				console.log(data);
			}
		});
		
	}
	
	function approve_request(data){
		
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success : function(data){
				var pkid_approval = data['pkid'];
				send_email_approval(pkid_approval);
			},
			error	: function(data){
				alert('Error found on conforming request.');
				console.log(data);
			}
		});
		
	}
	
	function send_email_approval(pkid_approval){
		
		var data = {
			'action'	: 'send_email_approval',
			'pkid'		: pkid_approval,
			'email'		: email
		}
		
		data = $.param(data);
		
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
				display_approval(email);
				display_approved(email);
				$('#modal_id_approval').modal('hide');
				notif_success();
			},
			error	: function(data){
				alert('Error found in sending email receive');
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
	