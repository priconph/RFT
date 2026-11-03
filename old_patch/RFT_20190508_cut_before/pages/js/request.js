
	var handler = '../handler/handler.php';
	var selected_pkid ='';
	var email = $('#hidden_email').val();
	// var email = email1+'@pricon.ph';
	
	disable_input();
	get_empno('');
	display_my_request(email);
	
	$('#id_crt_type').change(function(){
		
		var selected_type = $('#id_crt_type').val();
		
		if(selected_type == 'SUBCON'){
		
			// datalist to check employee number
			enable_input();
			clear_fields();
			$('#id_empno_check').keyup(function(e){
				var key_pressed = e.which;
				if(key_pressed != 38 && key_pressed != 40){
				var pattern = $(this).val();
				get_empno(pattern);
				}
				empno_check_db();
			});
			
		}else{
		
			enable_input();
			clear_fields();
			$('#id_empno_check').keyup(function(e){
				var key_pressed = e.which;
				if(key_pressed != 38 && key_pressed != 40){
				var pattern = $(this).val();
				get_empno(pattern);
				}
				
				// alert(pattern);
				empno_check_db2();
			});
			
		}
		
	});
	
	
	$(document).ready(function(){
	
		$('#btn_create_request').click(function(){
			$('#modal_create_request').modal('show');
		});
		
		$('#btn_id_add_emp_details').click(function(){
			$('#modal_crt_add_emp').modal('show');
		}); 
		
		$('#btn_check_details').click(function(){
			var empno = $('#id_empno_check').val();
			
			var data = {
				'action'		: 'check_empno_details',
				'empno'			: empno
			}
			
			data = $.param(data);
			
			$.ajax({
				type	: 'post',
				dataType: 'json',
				data	: data,
				url		: handler,
				success	: function(data){
					
					var fullName = data['LastName']+', '+data['FirstName']+' '+data['MiddleName'];
					$('#id_emp_name').val(fullName);
					$('#id_emp_dateHired').val(data['DateHired']);
				
				},
				error	: function(data){
					alert('check details failed!');
					console.log(data);
				}
			});
			
		});
		
		$('#btn_id_add_emp').click(function(e){
			
			var EmpNo = $('#id_empno_check').val();
			var name = $('#id_emp_name').val();
			var dateHired = $('#id_emp_dateHired').val();
			var from_station = $('#id_emp_fstation').val();
			var from_prodName = $('#id_emp_fprodname').val();
			var to_station = $('#id_emp_tstation').val();
			var to_prodName = $('#id_emp_tprodname').val();
			
			$('#tbl_trainees tbody').append('<tr><td>'+dateHired+'</td><td>'+EmpNo+'</td><td>'+name+'</td><td>'+from_station+'</td><td>'+from_prodName+'</td><td>'+to_station+'</td><td>'+to_prodName+'</td><td><a href="#"</a>Cancel</td></tr>');
			
			clear_query();
		});
		
		$('#modal_close').click(function(){
			
			// $('#modal_previous_request').modal('show');
		});
		
		$('#form_id_create_request').submit(function(e){
			e.preventDefault();
			
			if($("[name='name_superior_name']").val() == ''){
				alert('Please indicate Approver');
			}else{
				
				var table_validity = $("#tbl_trainees tbody");
				
				if (table_validity.children().length == 0) {
					
					alert('Table is empty. Please add an employee.');
					
				} else {
					
					var data = {
						'action'	: 'send_new_request'
					}
					
					data = $.param(data) + "&" + $(this).serialize();
					
					$.ajax({
					
						type	: 'post',
						dataType: 'json',
						data	: data,
						url		: handler,
						success	: function(data){
						
							var assigned_pkid = data['result'];
							send_request_email(assigned_pkid);
							
							$.when(send_request_email).done(function() {
								add_new_employees(assigned_pkid);
							});
								
							
						},
						error	: function(data){
							alert('Error on submitting new request. Please contact ISS Administrator');
							console.log(data);
						}
					});
					
				}
			}
			
		});
		
		$('#tbl_trainees tbody').on('click','tr a', function(){
			var selected_row = $(this).closest('tr').remove();
		});

	});
	

	// datalist to check requestors immediate superior
	$('#id_superior_check').on('keyup',function(e){
		var key_pressed = e.which;
		if(key_pressed !=38 && key_pressed !=40){
		var pattern_superior = $(this).val();
		get_immediate_superior(pattern_superior);
		}
	});
	
	// datalist passes value to check email setup
	$('#id_superior_check').on('change hover',function(e){
		get_superior_email( $(this).val() );
	});
	
	$('#display_granted_request').click(function(){
		display_granted_request(email);
		$('#modal_previous_request').modal('show');
	});
	
	function display_my_request(email){
	
		var data = {
			'action'	: 'display_my_request',
			'email'		: email
		}
		
		data = $.param(data);
		
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
			
				var ctr = data['ctr'];
			
				$('#container_request').empty();
			
				var html  = '<table id="tbl_request_list" class="table table-bordered " style="padding: 20px; margin-right: 20px; font-size: 15px;">';
					html += '	<thead>';
					html += '		<tr>';
					html += '			<th>Control No.</th>';
					html += '			<th>Date Filed</th>';
					html += '			<th>Conformance</th>';
					html += '			<th>Receiving</th>';	
					html += '			<th>QC Head Approval</th>';
					html += '			<th>Actions</th>';
					html += '		</tr>';
					html += '	</thead>';
					html += '	<tbody>';
					html += '	</tbody>';
					html += '</table>';
					
				$('#container_request').append(html);	
			
				for(i=0;i<ctr;i++){
						var html = '<tr id="'+data['pkid_request'][i]+'">';
						
						if(data['control_no'][i]==''){										
							html += '   <td style="vertical-align: left;"><h5><span class="label label-info" style="background-color: green; border-radius: 0px;">TBA</span></h5></td>';
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
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-info" style="background-color: #34CCFF; border-radius: 0px;">ON-GOING</span></h5></td>';
						}else if(data['app_status'][i] == '1'){
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-success">APPROVED</span></h5></td>';
						}else{
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-success" style="background-color: #5416B4; border-radius: 0px;">QUEUED</span></h5></td>';
						}
						
						html +='<td><button id="id_btn_view_request" class="btn btn-sm btn-success">View</button> '
						html +='<button id="id_btn_cancel_request" class="btn btn-sm btn-danger">Cancel</button></td>'
						
						html += '</tr>';
						$('#tbl_request_list tbody').append(html);
				}
				
			
			
			var oTable = $('#tbl_request_list').DataTable({ paginate: true, aaSorting: []});
			table_events_tbl_request_list();
			

			$('#id_btn_view_request').click(function(){
				if(selected_pkid == ''){
					selected_pkid = $(this).closest('tr').prop('id');
				}
				$(this).closest('tr').dblclick();
				// alert(selected_pkid);
			});	

			$('#id_btn_cancel_request').click(function(){
				if(selected_pkid == ''){
					selected_pkid = $(this).closest('tr').prop('id');
				}
				var data = {
					'action'	: 'cancel_request',
					'pkid'		: selected_pkid
				}				
				data = $.param(data);
				
				if (confirm('Are you sure you want to cancel this request?')) {
					cancel_request(data);
				} else {
					return false;
				}
			});
		
			




			},
			error	: function(data){
				alert('Error on loading your requests');
				console.log(data);
			}
		});
		
	}
	
	function display_granted_request(email){
	
		var data = {
			'action'	: 'display_my_granted_request',
			'email'		: email
		}
		
		data = $.param(data);
		
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
				
				console.log(data);
			
				var ctr = data['ctr'];
			
				$('#container_granted_request').empty();
			
				var html  = '<table id="tbl_request_list2" class="table table-bordered " style="padding: 20px; margin-right: 20px; font-size: 15px;">';
					html += '	<thead>';
					html += '		<tr>';
					html += '			<th>Control No.</th>';
					html += '			<th>Date Filed</th>';
					html += '			<th>Conformance</th>';
					html += '			<th>Receiving</th>';	
					html += '			<th>QC Head Approval</th>';
					html += '			<th>Status</th>';
					// html += '			<th>View Details</th>';
					html += '		</tr>';
					html += '	</thead>';
					html += '	<tbody>';
					html += '	</tbody>';
					html += '</table>';
					
				$('#container_granted_request').append(html);	
			
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
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-info" style="background-color: #34CCFF; border-radius: 0px;">ON-GOING</span></h5></td>';
						}else if(data['app_status'][i] == '1'){
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-success">APPROVED</span></h5></td>';
						}else{
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-success" style="background-color: #5416B4; border-radius: 0px;">QUEUED</span></h5></td>';
						}
						
						if(data['log_del'][i] == '1'){
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-danger" style="border-radius: 0px;">CANCELLED</span></h5></td>';
						}else{
							html += '   <td style="vertical-align: middle;"><h5><span class="label label-success" style="border-radius: 0px;">DONE</span></h5></td>';
						}
						
						// html += '   <td style="vertical-align: middle;"><button class="btn btn-default"><span class="fa fa-cloud-download" style="border-radius: 0px;"> Download</span></button></td>';
												
						html += '</tr>';
						$('#tbl_request_list2 tbody').append(html);
				}
			
			var oTable = $('#tbl_request_list2').DataTable({ paginate: true, aaSorting: []});
			table_events_tbl_request_list2();
			},
			error	: function(data){
				alert('Error on loading your requests');
				console.log(data);
			}
		});
		
	}
	
	function get_immediate_superior(pattern_superior){
		var data = {
			'action'			: 'get_immediate_superior',
			'pattern_superior'	: pattern_superior
		} 
		data = $.param(data) + "&" + $(this).serialize();
		
		// alert(data);
		
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
				console.log(data);
				var ctr = data['ctr'];
				$('#id_superior_list').empty();
				for(i=0;i<ctr;i++){
					var html = '<option id="'+data['pkid'][i]+'">'+data['lastname'][i]+', '+data['firstname'][i]+'</option>';
					$('#id_superior_list').append(html);
				}
			},
			error	: function(data){
				alert('Error found in Superior Listing.');
				console.log(data);
			}
			
		});
	}
	
	function get_superior_email(superior_name){
		var data = {
			'action'			: 'get_superior_email',
			'superior_name'		: superior_name
		} 
		data = $.param(data);
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
				$('#id_superior_name').val(data['email_add']);
			},
			error	: function(data){
				alert('Error found in Superior Listing.');
				console.log(data);
			}
			
		});
	}
	
	function get_empno(pattern){
		
		var data = {
			'action'		: 'action_get_empno',
			'pattern'		: pattern
		}
	
		data = $.param(data) + "&" + $(this).serialize();
		
		$.ajax({
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
				
				var ctr = data['ctr'];
				
				$('#id_crt_name').empty();
				
				for(i=0;i<ctr;i++){
					var html = '<option>'+data['EmpNo'][i]+'</option>';
					$('#id_crt_name').append(html);
				}
				
			},
			error	: function(data){
				alert("Handler Failed!");
				console.log(data);
			}
		});
	}
	
	function empno_check_db(){
			var empno = $('#id_empno_check').val();
			
			var data = {
				'action'		: 'check_empno_details',
				'empno'			: empno
			}
			
			data = $.param(data) + "&" + $(this).serialize();
			
			$.ajax({
				type	: 'post',
				dataType: 'json',
				data	: data,
				url		: handler,
				success	: function(data){
					
					if(typeof data['LastName'] === "undefined"){
						$('#id_emp_name').val('Not Found!');
						$('#id_emp_dateHired').val('Not Found!');
					}else{
						var fullName = data['LastName']+', '+data['FirstName']+' '+data['MiddleName'];
						$('#id_emp_name').val(fullName);
						$('#id_hidden_firstname').val(data['FirstName']);
						$('#id_hidden_lastname').val(data['LastName']);
						$('#id_hidden_middlename').val(data['MiddleName']);
						$('#id_emp_dateHired').val(data['DateHired']);
					}
				},
				error	: function(data){
					alert('check details failed!');
					console.log(data);
				}
			});
		}
		
	function empno_check_db2(){
			var empno = $('#id_empno_check').val();
			
			var data = {
				'action'		: 'check_empno_details2',
				'empno'			: empno
			}
			
			data = $.param(data) + "&" + $(this).serialize();
			
			$.ajax({
				type	: 'post',
				dataType: 'json',
				data	: data,
				url		: handler,
				success	: function(data){
					
					if(typeof data['LastName'] === "undefined"){
						$('#id_emp_name').val('Not Found!');
						$('#id_emp_dateHired').val('Not Found!');
					}else{
						var fullName = data['LastName']+', '+data['FirstName']+' '+data['MiddleName'];
						$('#id_emp_name').val(fullName);
						$('#id_hidden_firstname').val(data['FirstName']);
						$('#id_hidden_lastname').val(data['LastName']);
						$('#id_hidden_middlename').val(data['MiddleName']);
						$('#id_emp_dateHired').val(data['DateHired']);
					}
				},
				error	: function(data){
					alert('check details failed!');
					console.log(data);
				}
			});
		}
		
	function clear_query(){
		$('#id_empno_check').val('');
		$('#id_emp_name').val('');
		$('#id_emp_dateHired').val('');
	}
	
	function add_new_employees(assigned_pkid){
	
		$('#tbl_trainees tr').each(function(row, tr){
			
			if(row>0){
			
				var dateHired = $(tr).find('td:eq(0)').text();
				var empNo = $(tr).find('td:eq(1)').text();
				var name = $(tr).find('td:eq(2)').text();
				var fstation = $(tr).find('td:eq(3)').text();
				var fprod = $(tr).find('td:eq(4)').text();
				var tstation = $(tr).find('td:eq(5)').text();
				var tprod = $(tr).find('td:eq(6)').text();
			
				var data = {
					'action'		: 'add_new_employees',
					'pkid'			: assigned_pkid,
					'empNo'			: empNo,
					'name'			: name,
					'fstation'		: fstation,
					'fprod'			: fprod,
					'tstation'		: tstation,
					'tprod'			: tprod,
					'dateHired'		: dateHired
				}
				
				data = $.param(data);
				
				$.ajax({
				
					type	: 'post',
					dataType: 'json',
					data	: data,
					url		: handler,
					success	: function(data){
						//notif_success();
						$('#modal_create_request').modal('hide');
					},
					error	: function(data){
						alert("Error found in saving employees. Please contact ISS Administrator.")
						console.log(data);
					}
					
				});
				
			}
			
		});
		
	}
	
	function table_events_tbl_request_list2(){
		
		$('#tbl_request_list2 tbody').on('click','tr', function(){
			selected_pkid = '';
			$('#tbl_request_list tbody tr').attr('style','');
			$(this).attr('style','background:#7a9d00 ;color:white;');
			selected_pkid = this.id;
		});
		
		$('#tbl_request_list2 tbody').on('dblclick', 'tr', function(){
			$('#modal_id_request').modal('show');
			getRequestDetails(selected_pkid);
			$('#modal_previous_request').modal('hide');
			
		});
		
	}
	
	function table_events_tbl_request_list(){
		
		$('#tbl_request_list tbody').on('click','tr', function(){
			selected_pkid = '';
			$('#tbl_request_list tbody tr').attr('style','');
			$(this).attr('style','background:#7a9d00 ;color:white;');
			selected_pkid = this.id;
		});
		
		$('#tbl_request_list tbody').on('dblclick', 'tr', function(){
			
			getRequestDetails(selected_pkid);
			
			$.when(getRequestDetails).done(function(){
				$('#modal_id_request').modal('show');
			});
			
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
				
				$('#id_request_dept').val(data['dept']);
				$('#id_request_sec').val(data['sec']);
				
				var reason = data['rft'];
				var job_function = data['job_func'];
				var allocation = data['al_alloc'];
				
				if(reason == '1'){
					$('#id_request_reason').val('Newly Hired');
				}else if(reason == '2'){
					$('#id_request_reason').val('Promoted Employee');
				}else if(reason == '3'){
					$('#id_request_reason').val('Transferred from other assembly line');
				}else if(reason == '4'){
					$('#id_request_reason').val('Transferred from on other section/department/division');
				}else if(reason == '5'){
					$('#id_request_reason').val('ML / SL / VL (whose leave reached at least 1 month)');
				}else if(reason == '6'){
					$('#id_request_reason').val('New Product Line');
				}else if(reason == '7'){
					$('#id_request_reason').val('Flexibility Certification');
				}else if(reason == '8'){
					$('#id_request_reason').val('Re-certification');
				}
				
				if(job_function == '1'){
					$('#id_request_jobfunc').val('Operator');
				}else if(job_function == '2'){
					$('#id_request_jobfunc').val('Material Handler');
				}else if(job_function == '3'){
					$('#id_request_jobfunc').val('Inspector');
				}else if(job_function == '4'){
					$('#id_request_jobfunc').val('Technician');
				}else if(job_function == '5'){
					$('#id_request_jobfunc').val('Engineer');
				}else if(job_function == '6'){
					$('#id_request_jobfunc').val('Supervisor');
				}
				
				if(allocation == '1'){
					$('#id_request_alloc').val('Automotive Line');
				}else{
					$('#id_request_alloc').val('Non-Automotive Line');
				}
				
				getEmployeeList(pkid);
				
				$('#modal_id_request').modal('show');
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
	
	function cancel_request(data){
		
		$.ajax({
			
			type	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
				notif_success();
				$('#modal_id_request').modal('hide');
				display_my_request(email);
			},
			error	: function(data){
				alert('Error found on cancellation of request');
				console.log(data);
			}
			
		});
		
	}
	
	function send_request_email(assigned_pkid){
		
		var data = {
			'action'	: 'send_email_request',
			'email'		: email,
			'pkid'		: assigned_pkid
		}

		data = $.param(data);
		
		$.ajax({
		
			type 	: 'post',
			dataType: 'json',
			data	: data,
			url		: handler,
			success	: function(data){
				notif_email_success();
				display_my_request(email);
			},
			error	: function(data){
				alert('Error found in sending email');
				console.log(data);
			}
		});
		
	}
	
	function disable_input(){
		$('#id_empno_check').prop('disabled', true);
		$('#id_emp_name').prop('disabled', true);
		$('#id_emp_dateHired').prop('disabled', true);
	}
	
	function enable_input(){
		$('#id_empno_check').prop('disabled', false);
		$('#id_emp_name').prop('disabled', false);
		$('#id_emp_dateHired').prop('disabled', false);
	}
	
	function clear_fields(){
		$('#id_empno_check').val('');
		$('#id_emp_name').val('');
		$('#id_emp_dateHired').val('');
		
	}
	
	function notif_success(){
		notif({
		msg: "<strong>System: </strong> Transaction successful!",
		type: "success",
		position: "center",
		timeout: "3000"
		});
	}
	
	function notif_email_success(){
		notif({
		msg: "<strong>System: </strong> Email sent!",
		type: "success",
		position: "center",
		timeout: "3000"
		});
	}
	
	function notif_email_ok(){
		notif({
		msg: "<strong>System: </strong> Email was sent!",
		type: "success",
		position: "center",
		timeout: "3000"
		});
	}
	
	function notif_email_fail(){
		notif({
		msg: "<strong>System: </strong> Email problem!",
		type: "danger",
		position: "center",
		timeout: "3000"
		});
	}
	
	
	