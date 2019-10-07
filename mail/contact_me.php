<?php
require_once('../wp-load.php' );
error_log("Error message\n", 3, "php.log");
// Check for empty fields
if(empty($_POST['name'])      ||
   empty($_POST['email'])     ||
   empty($_POST['subject'])     ||
   empty($_POST['message'])   )
   {
       $name = strip_tags(htmlspecialchars($_POST['name']));
        $email_address = strip_tags(htmlspecialchars($_POST['email']));
        $subject = strip_tags(htmlspecialchars($_POST['subject']));
        $message = strip_tags(htmlspecialchars($_POST['message']));
  error_log("bad arguments $name $email_address $subject $message\n", 3, "php.log");
   return false;
   }
   
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$subject = strip_tags(htmlspecialchars($_POST['subject']));
$message = strip_tags(htmlspecialchars($_POST['message']));
   
// Create the email and send the message
$to = 'email_address'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Cutting Edge: $subject";
$email_body = "$message \n\n - $name ($email_address)";
$headers = "From: noreply@cutting-edge.construction\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";   
wp_mail($to,$email_subject,$email_body, $headers);

?>