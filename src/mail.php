<?php

// SET HEADER TO BYPASS CORS
header('Access-Control-Allow-Origin: *');

$message = $_POST['message'];
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];

$from = "contact@goldendesigninteriors.com";
$to = "contact@goldendesigninteriors.com";
$subject = "Enquiry On Website From " . $organization;
// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
// More headers
$headers .= 'From:' . $from . "\r\n";
$msgBody = '<html><body><table><tr><td><b>Name :</b></td><td>'.$name.'</td></tr><tr><td><b>Email:</b></td><td>'.$email.'</td></tr><tr><td><b>Phone :</b></td><td>'.$phone.'</td></tr><tr><td><b>Message :</b></td><td>'.$message.'</td></tr></table></body></html>';
echo mail($to, $subject, $msgBody, $headers);
