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
		echo join("<br>", $error);
		exit();
	}

	// Config
	$LOG_FILENAME = "log.txt";
	$THROTTLE_SEC = 60;
	
	// Create Temp file which stores the IP and Timestamp	
	$content = file_get_contents($LOG_FILENAME);
	// Check if i am already in file
	$lines = explode("\n", $content);
	
	// filter outdated
	$newLines = array_filter($lines, function($line) use ($THROTTLE_SEC) {
		$parts = explode("|", $line);
		$time = (int)$parts[0];
		$since = time() - $time;
		return $since < $THROTTLE_SEC; // outdated
	});
	
	// check if ip exists
	foreach ($newLines as $line) {
		$parts = explode("|", $line);
		$_ip = $parts[1];
		if ($ip === $_ip) {
			die("FAILED: You already sent a request. Please wait some seconds to send another one!");
		}
	}
	
	// Add new Line
	$logLine = time() . "|" . $ip . "\n";
	array_push($newLines, $logLine);
	$content = implode("\n", $newLines);
	file_put_contents($LOG_FILENAME, $content);

	// Format Message
  $fmtMessage = "$now / $ip / $senderName / $senderMail\n
===
$message";

  $resp = mail("info@wuda.io", "New Message via wuda.io", $fmtMessage);
  if ($resp)
    echo "✔ Your Request was sent!";
  else
    echo "❌ Error while sending Request! Please send your request via mail.";
