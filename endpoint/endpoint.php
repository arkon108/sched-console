<?php
/*
  TODO: documentation
*/
ob_end_flush();

// Accept the input sent by the JS
$command = $_REQUEST['schonsole.input'];

// Start the output buffer within the input will execute
ob_start();

// Run the input
eval($command);

// Get the execution result
$result = ob_get_contents();

// Stop the buffering
ob_end_clean();

// Output
echo $result;