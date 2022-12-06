<?php
  $now = date("Y-m-d H:i:s");
  $ip = $_SERVER['REMOTE_ADDR'];
  $senderName = $_POST["request_sender_name"];
  $senderMail = $_POST["request_sender_mail"];
  $message = $_POST["request_message"];

  
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