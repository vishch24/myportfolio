<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    // Get form data and sanitize it
    $name = htmlspecialchars($_POST['fname']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);

    // Create an associative array with the form data
    $formData = [
        'name' => $name,
        'email' => $email,
        'message' => $message,
        'timestamp' => date('Y-m-d H:i:s')
    ];

    // Read existing data from the JSON file
    $file = 'form_data.json';
    if (file_exists($file)) {
        $jsonData = file_get_contents($file);
        $dataArray = json_decode($jsonData, true);
    } else {
        $dataArray = [];
    }

    // Add new form data to the array
    $dataArray[] = $formData;

    // Encode the updated array back to JSON
    $newJsonData = json_encode($dataArray, JSON_PRETTY_PRINT);

    // Save JSON data to the file
    if (file_put_contents($file, $newJsonData)) {
        echo json_encode(["message" => "Form data saved successfully!", "type" => "success"]);
    } else {
        echo json_encode(["message" => "Error saving form data.", "type" => "danger"]);
    }
}

?>