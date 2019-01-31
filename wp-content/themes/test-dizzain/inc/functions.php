<?php

function theme_setup()
{
    // Clean up the <head>
    function remove_head_links()
    {
        remove_action('wp_head', 'rsd_link');
        remove_action('wp_head', 'wlwmanifest_link');
        remove_action('wp_head', 'wp_generator');
    }

    add_action('init', 'remove_head_links');

}

add_action('init', 'theme_setup', 0);

add_filter('wp_mail_content_type', 'set_html_content_type');
function set_html_content_type()
{
    return 'text/html';
}

add_action('wp_ajax_sendPost', 'sendPost');
add_action('wp_ajax_nopriv_sendPost', 'sendPost');

function sendPost()
{
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $platform = $_POST['platform'];
    $message_optional = $_POST['message'];

    $toEmail = "test@example.com";
    $subject = 'Test send';

    $message = "";

    if(!empty($name)){
        $message .= "<strong>Full Name:</strong> " . $name . "<br>";
    }
    if(!empty($email)){
        $message .= "<strong>Email Address:</strong> " . $email . "<br>";
    }
    if(!empty($phone)){
        $message .= "<strong>Phone Number:</strong> " . $phone . "<br>";
    }
    if(!empty($platform)){
        $message .= "<strong>Selected Platform:</strong> " . $platform . "<br>";
    }
    if(!empty($message_optional)){
        $message .= "<strong>Message:</strong> " . $message_optional . "<br>";
    }


    $headers = 'From: test <no-reply@example.com>' . "\r\n";
    wp_mail($toEmail, $subject, $message, $headers);
    die(wp_send_json(array('status' => 'success')));
}

add_action('wp_ajax_newsletterSubmit', 'newsletterSubmit');
add_action('wp_ajax_nopriv_newsletterSubmit', 'newsletterSubmit');

function newsletterSubmit()
{
    $email = $_POST['email'];

    $toEmail = "test@example.com";
    $subject = 'Test newsletter';

    $message = "";

    if(!empty($email)){
        $message .= "<strong>Email Address:</strong> " . $email . "<br>";
    }


    $headers = 'From: test <no-reply@example.com>' . "\r\n";
    wp_mail($toEmail, $subject, $message, $headers);
    die(wp_send_json(array('status' => 'success')));
}






