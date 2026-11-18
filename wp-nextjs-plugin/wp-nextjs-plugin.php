<?php
/*
Plugin Name: Aplikasi Next.js Custom
Description: Menampilkan aplikasi Next.js (TSX) melalui shortcode.
Version: 1.0
*/

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function render_aplikasi_nextjs_shortcode( $atts ) {
    $atts = shortcode_atts( array(
        'height' => '700px',
    ), $atts );

    $app_url = plugin_dir_url( __FILE__ ) . 'app/index.html';

    return '<iframe src="' . esc_url( $app_url ) . '" style="width: 100%; height: ' . esc_attr( $atts['height'] ) . '; border: none; overflow: hidden;" loading="lazy"></iframe>';
}
add_shortcode( 'aplikasi_nextjs', 'render_aplikasi_nextjs_shortcode' );
