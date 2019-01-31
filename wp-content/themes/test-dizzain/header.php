<!DOCTYPE html>
<html lang="ru">
<head>
    <title><?php bloginfo('name'); ?></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="robots" content="index, follow"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=contain">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<div class="page">
    <header class="header page__header">
        <div class="wrapper">
            <a href="/" class="header__logo" title="home">
                <img src="<?= get_template_directory_uri() ?>/inc/blocks/site-header/logo.png" width="152px" alt="logo">
            </a>
            <div class="header__text-block">
                <h1 class="header__main-text">Targeted Search for Professionals in your Proximity</h1>
                <div class="header__sub-text">Beta version is available for iPhone users (By Invitation Only)</div>
                <div class="show-form">Try Beta Version</div>
            </div>
        </div>
    </header>