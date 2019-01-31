<?php
 

function _scripts_and_styles() {

	wp_register_script( 'jquery', get_template_directory_uri() . '/inc/assets/js/jquery.min.js', array(), '310119', true );
	wp_register_script( 'polyfill', get_template_directory_uri() . '/inc/assets/js/polyfill.js', array(), '310119', true );
	wp_register_script( 'template', get_template_directory_uri() . '/inc/assets/js/template.min.js', array(), '310119', true );
	wp_register_script( 'select2', get_template_directory_uri() . '/inc/assets/js/select2.min.js', array(), '310119', true );
	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'polyfill' );
	wp_enqueue_script( 'template' );
	wp_enqueue_script( 'select2' );


	wp_register_style( 'style', get_template_directory_uri() .'/inc/assets/css/style.min.css', array(), '310119' );
	wp_enqueue_style( 'style' );

	if (!is_admin()){
		remove_action( 'wp_head',             'print_emoji_detection_script',     7    );
		remove_action( 'wp_print_styles',     'print_emoji_styles'                     );
		remove_action( 'wp_head',                    'rest_output_link_wp_head', 10 );
		remove_action( 'wp_head',             'wp_resource_hints',               2     );
		wp_deregister_script('wp-embed');
		remove_action( 'wp_head', 'feed_links', 2 );
		remove_action( 'wp_head', 'feed_links_extra', 3 );
	}
}

add_action( 'wp_enqueue_scripts', '_scripts_and_styles' );
function wpb_disable_feed() {
	wp_die( __('No feed available,please visit our <a href="'. get_bloginfo('url') .'">homepage</a>!') );
}

add_action('do_feed', 'wpb_disable_feed', 1);
add_action('do_feed_rdf', 'wpb_disable_feed', 1);
add_action('do_feed_rss', 'wpb_disable_feed', 1);
add_action('do_feed_rss2', 'wpb_disable_feed', 1);
add_action('do_feed_atom', 'wpb_disable_feed', 1);
add_action('do_feed_rss2_comments', 'wpb_disable_feed', 1);
add_action('do_feed_atom_comments', 'wpb_disable_feed', 1);