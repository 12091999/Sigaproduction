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
    $iframe_id = wp_unique_id( 'aplikasi-nextjs-' );

    return '<iframe id="' . esc_attr( $iframe_id ) . '" src="' . esc_url( $app_url ) . '" style="width: 100%; height: ' . esc_attr( $atts['height'] ) . '; border: none; overflow: hidden;" loading="lazy"></iframe>'
        . '<script>(function(){'
        . 'var iframe=document.getElementById(' . wp_json_encode( $iframe_id ) . ');'
        . 'if(!iframe)return;'
        . 'function resizeIframe(){'
        . 'var frameDocument=iframe.contentDocument;'
        . 'if(!frameDocument||!frameDocument.body||!frameDocument.documentElement)return;'
        . 'var body=frameDocument.body;'
        . 'var documentElement=frameDocument.documentElement;'
        . 'iframe.style.height=Math.max(body.scrollHeight,body.offsetHeight,documentElement.clientHeight,documentElement.scrollHeight,documentElement.offsetHeight)+"px";'
        . '}'
        . 'iframe.addEventListener("load",function(){'
        . 'resizeIframe();'
        . 'var frameDocument=iframe.contentDocument;'
        . 'if(!frameDocument||!frameDocument.documentElement)return;'
        . 'var observer=new ResizeObserver(resizeIframe);'
        . 'observer.observe(frameDocument.documentElement);'
        . 'if(frameDocument.body)observer.observe(frameDocument.body);'
        . 'frameDocument.fonts.ready.then(resizeIframe);'
        . '});'
        . 'window.addEventListener("resize",resizeIframe);'
        . '})();</script>';
}
add_shortcode( 'aplikasi_nextjs', 'render_aplikasi_nextjs_shortcode' );
