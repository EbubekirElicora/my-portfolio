<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"):
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"):
        header("Access-Control-Allow-Origin: *");
        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $email   = $params->email ?? '';
        $name    = $params->name ?? '';
        $message = $params->message ?? '';
        $recipient = 'ebubekir.elicora@gmx.de';
        $subject = "Contact Form <$email>";
        $message = "From: " . htmlspecialchars($name) . "<br><br>" .
                   nl2br(htmlspecialchars($message));
        $headers   = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = 'From: noreply@ebubekir-elicora.de';
        mail($recipient, $subject, $message, implode("\r\n", $headers));
        break;
    default:
        header("Allow: POST", true, 405);
        exit;
}