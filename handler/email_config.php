<?php
	$mail = new PHPMailer;
	$mail->isSMTP(true);                                      	// Set mailer to use SMTP
	
	// $mail->Host = 'mail3.pricon.ph';  						//Chan 06-14-2023
	$mail->Host = '192.168.3.244';  						// Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                              	// Enable SMTP authentication
	$mail->Username = 'issinfoservice@pricon.ph';                 	// SMTP username
	$mail->Password = 'EYGEKFwlzuDfNufG2DGk';                           	// SMTP password
	$mail->SMTPSecure = 'ssl';                            		// Enable TLS encryption, `ssl` also accepted
	$mail->Port = 465;
?>