<?php
	$mail = new PHPMailer;
	$mail->isSMTP();                                      	// Set mailer to use SMTP
	$mail->Host = '192.168.3.254';  						// Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                              	// Enable SMTP authentication
	$mail->Username = 'issinfoservice';                 	// SMTP username
	$mail->Password = 'pmi1234';                           	// SMTP password
	$mail->SMTPSecure = '';                            		// Enable TLS encryption, `ssl` also accepted
	$mail->Port = 25;
?>