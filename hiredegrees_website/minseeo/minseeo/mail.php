<?php

	$to = "foundationirs@gmail.com"; // this is your Email address
	$from  = $_POST['email']; // this is the sender's Email address
	$sender_name = $_POST['name'];
	$subject = $_POST['subject'];
	$note = $_POST['note'];


	$subject = "Form submission";
	$message = $sender_name . " has send the contact message! His/ her contact subject is : " .  $subject . ". He / she wrote the following... ". "\n\n" . $note;

	$headers = 'From: ' . $from;
	mail($to, $subject, $message, $headers);

?>