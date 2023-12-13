<?php
  $now = date("Y-m-d H:i:s");
  $ip = $_SERVER['REMOTE_ADDR'];
  $senderName = isset($_POST["request_sender_name"]) ? $_POST["request_sender_name"] : null;
  $senderMail = isset($_POST["request_sender_mail"]) ? $_POST["request_sender_mail"] : null;
  $message = isset($_POST["request_message"]) ? $_POST["request_message"] : null;

	// Check inputs
	$error = [];
	if (is_null($senderName) || strlen(trim($senderName)) === 0) array_push($error, "Sender Name not set or empty!");
	if (is_null($senderMail) || strlen(trim($senderMail)) === 0) array_push($error, "Sender Mail not set or empty!");
	if (is_null($message) || strlen(trim($message)) === 0) array_push($error, "Message not set or empty!");
	if (count($error) > 0) {
		die(join("<br>", $error));
	}

	// TODO: Create Temp file which stores the IP and Timestamp
	$logLine = $now . "|" . $ip;
	file_put_contents("log.txt", $logLine);

	echo "LEL";
	exit();

  $fmtMessage = "
    $now / $ip<br>
    $senderName / $senderMail<br>
    <strong>Message:</strong><br>
    $message
  ";
  // echo $fmtMessage;

  $resp = mail("info@wuda.io", "New Request (wuda.io)", $fmtMessage);
  if ($resp)
    echo "✔ Your Request was sent!";
  else
    echo "❌ Error while sending Request! Please send via mail.";
