<?php
/**
 * Plugin Name: SIGA Production CMS
 * Description: WordPress content types for the SIGA Next.js frontend.
 * Version: 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function siga_register_content_types() {
	register_post_type(
		'siga_product',
		array(
			'labels'       => array(
				'name'          => 'Products',
				'singular_name' => 'Product',
				'add_new_item'  => 'Add New Product',
				'edit_item'     => 'Edit Product',
			),
			'public'       => true,
			'show_in_rest' => true,
			'has_archive'  => true,
			'menu_icon'    => 'dashicons-products',
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
			'rewrite'      => array( 'slug' => 'catalog' ),
		)
	);

	register_post_type(
		'siga_service',
		array(
			'labels'       => array(
				'name'          => 'Services',
				'singular_name' => 'Service',
				'add_new_item'  => 'Add New Service',
				'edit_item'     => 'Edit Service',
			),
			'public'       => true,
			'show_in_rest' => true,
			'has_archive'  => true,
			'menu_icon'    => 'dashicons-admin-tools',
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
			'rewrite'      => array( 'slug' => 'service-catalog' ),
		)
	);

	register_post_type(
		'siga_service_group',
		array(
			'labels'       => array(
				'name'          => 'Service Categories',
				'singular_name' => 'Service Category',
				'add_new_item'  => 'Add New Service Category',
				'edit_item'     => 'Edit Service Category',
			),
			'public'       => true,
			'show_in_rest' => true,
			'has_archive'  => false,
			'menu_icon'    => 'dashicons-category',
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
			'rewrite'      => array( 'slug' => 'service-categories' ),
		)
	);

	register_post_type(
		'siga_property',
		array(
			'labels'       => array(
				'name'          => 'Rental Properties',
				'singular_name' => 'Rental Property',
				'add_new_item'  => 'Add New Rental Property',
				'edit_item'     => 'Edit Rental Property',
			),
			'public'       => true,
			'show_in_rest' => true,
			'has_archive'  => true,
			'menu_icon'    => 'dashicons-admin-home',
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'page-attributes' ),
			'rewrite'      => array( 'slug' => 'rental-catalog' ),
		)
	);
}
add_action( 'init', 'siga_register_content_types' );

function siga_register_product_meta() {
	$fields = array(
		'siga_price'     => 'number',
		'siga_rating'    => 'number',
		'siga_badge'     => 'string',
		'siga_category'  => 'string',
		'siga_shopee_url' => 'string',
	);

	foreach ( $fields as $key => $type ) {
		register_post_meta(
			'siga_product',
			$key,
			array(
				'type'              => $type,
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => 'siga_shopee_url' === $key
					? 'esc_url_raw'
					: 'sanitize_text_field',
			)
		);
	}
}
add_action( 'init', 'siga_register_product_meta' );

function siga_register_service_meta() {
	$fields = array(
		'siga_group'         => 'string',
		'siga_price'         => 'number',
		'siga_price_unit'    => 'string',
		'siga_rating'        => 'number',
		'siga_action_label'  => 'string',
		'siga_action_url'    => 'string',
	);

	foreach ( $fields as $key => $type ) {
		register_post_meta(
			'siga_service',
			$key,
			array(
				'type'              => $type,
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => 'siga_action_url' === $key
					? 'esc_url_raw'
					: 'sanitize_text_field',
			)
		);
	}
}
add_action( 'init', 'siga_register_service_meta' );

function siga_register_service_group_meta() {
	$fields = array(
		'siga_page_title'        => 'string',
		'siga_route_url'         => 'string',
		'siga_hero_title'        => 'string',
		'siga_hero_description'  => 'string',
		'siga_hero_cta_one_label' => 'string',
		'siga_hero_cta_one_url'  => 'string',
		'siga_hero_cta_two_label' => 'string',
		'siga_hero_cta_two_url'  => 'string',
		'siga_hero_cta_three_label' => 'string',
		'siga_hero_cta_three_url' => 'string',
	);

	foreach ( $fields as $key => $type ) {
		register_post_meta(
			'siga_service_group',
			$key,
			array(
				'type'              => $type,
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => false !== strpos( $key, '_url' )
					? 'esc_url_raw'
					: 'sanitize_text_field',
			)
		);
	}
}
add_action( 'init', 'siga_register_service_group_meta' );

function siga_register_property_meta() {
	$fields = array(
		'siga_price'     => 'number',
		'siga_price_type' => 'string',
		'siga_type'      => 'string',
		'siga_category'  => 'string',
		'siga_location'  => 'string',
		'siga_address'   => 'string',
		'siga_featured'  => 'boolean',
	);

	foreach ( $fields as $key => $type ) {
		register_post_meta(
			'siga_property',
			$key,
			array(
				'type'              => $type,
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => 'siga_featured' === $key
					? 'rest_sanitize_boolean'
					: ( 'siga_price' === $key ? 'siga_sanitize_number' : 'sanitize_text_field' ),
			)
		);
	}
}
add_action( 'init', 'siga_register_property_meta' );

function siga_sanitize_number( $value ) {
	return is_numeric( $value ) ? (float) $value : '';
}

function siga_register_footer_meta() {
	$fields = array(
		'siga_footer_subtitle',
		'siga_footer_address',
		'siga_footer_phone',
		'siga_footer_email',
		'siga_footer_facebook',
		'siga_footer_twitter',
		'siga_footer_instagram',
		'siga_footer_youtube',
		'siga_footer_home_url',
		'siga_footer_about_url',
		'siga_footer_services_url',
		'siga_footer_rent_url',
		'siga_footer_gallery_url',
		'siga_footer_map_embed_url',
	);
	$url_fields = array(
		'siga_footer_facebook',
		'siga_footer_twitter',
		'siga_footer_instagram',
		'siga_footer_youtube',
		'siga_footer_gallery_url',
		'siga_footer_map_embed_url',
	);

	foreach ( $fields as $key ) {
		register_post_meta(
			'page',
			$key,
			array(
				'type'         => 'string',
				'single'       => true,
				'show_in_rest' => true,
				'sanitize_callback' => in_array( $key, $url_fields, true )
					? 'esc_url_raw'
					: ( 'siga_footer_email' === $key ? 'sanitize_email' : 'sanitize_text_field' ),
			)
		);
	}
}
add_action( 'init', 'siga_register_footer_meta' );

function siga_register_navigation_and_contact_meta() {
	$navigation_fields = array(
		'siga_nav_brand_name',
		'siga_nav_logo_alt',
		'siga_nav_home_label',
		'siga_nav_home_url',
		'siga_nav_products_label',
		'siga_nav_products_url',
		'siga_nav_services_label',
		'siga_nav_services_dropdown_label',
		'siga_nav_rent_label',
		'siga_nav_rent_url',
		'siga_nav_about_label',
		'siga_nav_about_url',
		'siga_nav_contact_label',
		'siga_nav_contact_url',
		'siga_nav_account_label',
		'siga_nav_account_url',
		'siga_nav_signin_label',
		'siga_nav_signin_url',
	);
	$contact_fields    = array(
		'siga_contact_hero_title',
		'siga_contact_hero_description',
		'siga_contact_legal_title',
		'siga_contact_company_name',
		'siga_contact_director',
		'siga_contact_deputy_director',
		'siga_contact_office_label',
		'siga_contact_office_address',
		'siga_contact_npwp',
		'siga_contact_nib',
		'siga_contact_kemenkumham',
		'siga_contact_notary',
		'siga_contact_section_title',
		'siga_contact_email',
		'siga_contact_phone',
		'siga_contact_whatsapp',
		'siga_contact_address',
		'siga_contact_hours',
		'siga_contact_email_button',
		'siga_contact_whatsapp_button',
		'siga_contact_form_title',
		'siga_contact_form_description',
		'siga_contact_map_title',
		'siga_contact_map_description',
		'siga_contact_map_embed_url',
	);
	$url_fields        = array(
		'siga_nav_home_url',
		'siga_nav_products_url',
		'siga_nav_rent_url',
		'siga_nav_about_url',
		'siga_nav_contact_url',
		'siga_nav_account_url',
		'siga_nav_signin_url',
		'siga_contact_map_embed_url',
	);

	foreach ( array_merge( $navigation_fields, $contact_fields ) as $key ) {
		register_post_meta(
			'page',
			$key,
			array(
				'type'              => 'string',
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => in_array( $key, $url_fields, true )
					? 'esc_url_raw'
					: ( 'siga_contact_email' === $key ? 'sanitize_email' : 'sanitize_textarea_field' ),
			)
		);
	}
}
add_action( 'init', 'siga_register_navigation_and_contact_meta' );

function siga_register_product_rest_field() {
	register_rest_field(
		'siga_product',
		'siga_product_data',
		array(
			'get_callback' => function ( $post ) {
				$post_id = $post['id'];
				return array(
					'siga_price'      => get_post_meta( $post_id, 'siga_price', true ),
					'siga_rating'     => get_post_meta( $post_id, 'siga_rating', true ),
					'siga_badge'      => get_post_meta( $post_id, 'siga_badge', true ),
					'siga_category'   => get_post_meta( $post_id, 'siga_category', true ),
					'siga_shopee_url' => get_post_meta( $post_id, 'siga_shopee_url', true ),
				);
			},
			'schema'       => array(
				'description' => 'Product fields used by the SIGA frontend.',
				'type'        => 'object',
				'context'     => array( 'view', 'edit' ),
				'properties'  => array(
					'siga_price'      => array( 'type' => 'number' ),
					'siga_rating'     => array( 'type' => 'number' ),
					'siga_badge'      => array( 'type' => 'string' ),
					'siga_category'   => array( 'type' => 'string' ),
					'siga_shopee_url' => array( 'type' => 'string' ),
				),
			),
		)
	);
}
add_action( 'rest_api_init', 'siga_register_product_rest_field' );

function siga_register_service_rest_field() {
	register_rest_field(
		'siga_service',
		'siga_service_data',
		array(
			'get_callback' => function ( $post ) {
				$post_id = $post['id'];
				$price   = get_post_meta( $post_id, 'siga_price', true );
				$rating  = get_post_meta( $post_id, 'siga_rating', true );

				return array(
					'siga_group'        => get_post_meta( $post_id, 'siga_group', true ),
					'siga_price'        => '' === $price ? null : (float) $price,
					'siga_price_unit'   => get_post_meta( $post_id, 'siga_price_unit', true ),
					'siga_rating'       => '' === $rating ? null : (float) $rating,
					'siga_action_label' => get_post_meta( $post_id, 'siga_action_label', true ),
					'siga_action_url'   => get_post_meta( $post_id, 'siga_action_url', true ),
				);
			},
			'schema'       => array(
				'description' => 'Service fields used by the SIGA frontend.',
				'type'        => 'object',
				'context'     => array( 'view', 'edit' ),
				'properties'  => array(
					'siga_group'        => array( 'type' => 'string' ),
					'siga_price'        => array( 'type' => array( 'number', 'null' ) ),
					'siga_price_unit'   => array( 'type' => 'string' ),
					'siga_rating'       => array( 'type' => array( 'number', 'null' ) ),
					'siga_action_label' => array( 'type' => 'string' ),
					'siga_action_url'   => array( 'type' => 'string' ),
				),
			),
		)
	);
}
add_action( 'rest_api_init', 'siga_register_service_rest_field' );

function siga_register_service_group_rest_field() {
	$fields = array(
		'siga_page_title',
		'siga_route_url',
		'siga_hero_title',
		'siga_hero_description',
		'siga_hero_cta_one_label',
		'siga_hero_cta_one_url',
		'siga_hero_cta_two_label',
		'siga_hero_cta_two_url',
		'siga_hero_cta_three_label',
		'siga_hero_cta_three_url',
	);

	register_rest_field(
		'siga_service_group',
		'siga_service_group_data',
		array(
			'get_callback' => function ( $post ) use ( $fields ) {
				$data = array();
				foreach ( $fields as $key ) {
					$data[ $key ] = get_post_meta( $post['id'], $key, true );
				}
				return $data;
			},
			'schema'       => array(
				'description' => 'Service category page fields for the SIGA frontend.',
				'type'        => 'object',
				'context'     => array( 'view', 'edit' ),
				'properties'  => array_fill_keys( $fields, array( 'type' => 'string' ) ),
			),
		)
	);
}
add_action( 'rest_api_init', 'siga_register_service_group_rest_field' );

function siga_register_property_rest_field() {
	$fields = array(
		'siga_price',
		'siga_price_type',
		'siga_type',
		'siga_category',
		'siga_location',
		'siga_address',
		'siga_featured',
	);

	register_rest_field(
		'siga_property',
		'siga_property_data',
		array(
			'get_callback' => function ( $post ) use ( $fields ) {
				$data = array();
				foreach ( $fields as $key ) {
					$value      = get_post_meta( $post['id'], $key, true );
					$data[ $key ] = 'siga_price' === $key
						? (float) $value
						: ( 'siga_featured' === $key ? (bool) $value : $value );
				}
				return $data;
			},
			'schema'       => array(
				'description' => 'Rental property fields used by the SIGA frontend.',
				'type'        => 'object',
				'context'     => array( 'view', 'edit' ),
				'properties'  => array(
					'siga_price'      => array( 'type' => 'number' ),
					'siga_price_type' => array( 'type' => 'string' ),
					'siga_type'       => array( 'type' => 'string' ),
					'siga_category'   => array( 'type' => 'string' ),
					'siga_location'   => array( 'type' => 'string' ),
					'siga_address'    => array( 'type' => 'string' ),
					'siga_featured'   => array( 'type' => 'boolean' ),
				),
			),
		)
	);
}
add_action( 'rest_api_init', 'siga_register_property_rest_field' );

function siga_register_footer_rest_field() {
	$fields = array(
		'siga_footer_subtitle',
		'siga_footer_address',
		'siga_footer_phone',
		'siga_footer_email',
		'siga_footer_facebook',
		'siga_footer_twitter',
		'siga_footer_instagram',
		'siga_footer_youtube',
		'siga_footer_home_url',
		'siga_footer_about_url',
		'siga_footer_services_url',
		'siga_footer_rent_url',
		'siga_footer_gallery_url',
		'siga_footer_map_embed_url',
	);

	register_rest_field(
		'page',
		'siga_footer_data',
		array(
			'get_callback' => function ( $page ) use ( $fields ) {
				$data = array();
				foreach ( $fields as $key ) {
					$data[ $key ] = get_post_meta( $page['id'], $key, true );
				}
				return $data;
			},
			'schema'       => array(
				'description' => 'Footer settings used by the SIGA frontend.',
				'type'        => 'object',
				'context'     => array( 'view', 'edit' ),
				'properties'  => array_fill_keys(
					$fields,
					array( 'type' => 'string' )
				),
			),
		)
	);
}
add_action( 'rest_api_init', 'siga_register_footer_rest_field' );

function siga_register_navigation_and_contact_rest_fields() {
	$fields = array(
		'navigation' => array(
			'siga_nav_brand_name',
			'siga_nav_logo_alt',
			'siga_nav_home_label',
			'siga_nav_home_url',
			'siga_nav_products_label',
			'siga_nav_products_url',
			'siga_nav_services_label',
			'siga_nav_services_dropdown_label',
			'siga_nav_rent_label',
			'siga_nav_rent_url',
			'siga_nav_about_label',
			'siga_nav_about_url',
			'siga_nav_contact_label',
			'siga_nav_contact_url',
			'siga_nav_account_label',
			'siga_nav_account_url',
			'siga_nav_signin_label',
			'siga_nav_signin_url',
		),
		'contact'    => array(
			'siga_contact_hero_title',
			'siga_contact_hero_description',
			'siga_contact_legal_title',
			'siga_contact_company_name',
			'siga_contact_director',
			'siga_contact_deputy_director',
			'siga_contact_office_label',
			'siga_contact_office_address',
			'siga_contact_npwp',
			'siga_contact_nib',
			'siga_contact_kemenkumham',
			'siga_contact_notary',
			'siga_contact_section_title',
			'siga_contact_email',
			'siga_contact_phone',
			'siga_contact_whatsapp',
			'siga_contact_address',
			'siga_contact_hours',
			'siga_contact_email_button',
			'siga_contact_whatsapp_button',
			'siga_contact_form_title',
			'siga_contact_form_description',
			'siga_contact_map_title',
			'siga_contact_map_description',
			'siga_contact_map_embed_url',
		),
	);

	foreach ( $fields as $name => $keys ) {
		register_rest_field(
			'page',
			'siga_' . $name . '_data',
			array(
				'get_callback' => function ( $page ) use ( $keys ) {
					$data = array();
					foreach ( $keys as $key ) {
						$data[ $key ] = get_post_meta( $page['id'], $key, true );
					}
					return $data;
				},
				'schema'       => array(
					'description' => ucfirst( $name ) . ' settings used by the SIGA frontend.',
					'type'        => 'object',
					'context'     => array( 'view', 'edit' ),
					'properties'  => array_fill_keys( $keys, array( 'type' => 'string' ) ),
				),
			)
		);
	}
}
add_action( 'rest_api_init', 'siga_register_navigation_and_contact_rest_fields' );

function siga_add_product_meta_box() {
	add_meta_box(
		'siga_product_details',
		'Product Details',
		'siga_render_product_meta_box',
		'siga_product',
		'normal',
		'default'
	);
}
add_action( 'add_meta_boxes_siga_product', 'siga_add_product_meta_box' );

function siga_render_product_meta_box( $post ) {
	wp_nonce_field( 'siga_save_product_details', 'siga_product_details_nonce' );

	$fields = array(
		'siga_price'      => 'Price (IDR)',
		'siga_rating'     => 'Rating',
		'siga_badge'      => 'Badge',
		'siga_category'   => 'Category',
		'siga_shopee_url' => 'Shopee URL',
	);

	foreach ( $fields as $key => $label ) {
		$value = get_post_meta( $post->ID, $key, true );
		printf(
			'<p><label for="%1$s"><strong>%2$s</strong></label><br><input class="widefat" id="%1$s" name="%1$s" value="%3$s"></p>',
			esc_attr( $key ),
			esc_html( $label ),
			esc_attr( $value )
		);
	}
}

function siga_save_product_details( $post_id ) {
	if (
		! isset( $_POST['siga_product_details_nonce'] ) ||
		! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['siga_product_details_nonce'] ) ), 'siga_save_product_details' ) ||
		( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) ||
		! current_user_can( 'edit_post', $post_id )
	) {
		return;
	}

	$fields = array(
		'siga_price'      => 'sanitize_text_field',
		'siga_rating'     => 'sanitize_text_field',
		'siga_badge'      => 'sanitize_text_field',
		'siga_category'   => 'sanitize_text_field',
		'siga_shopee_url' => 'esc_url_raw',
	);

	foreach ( $fields as $key => $sanitizer ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta(
				$post_id,
				$key,
				call_user_func( $sanitizer, wp_unslash( $_POST[ $key ] ) )
			);
		}
	}
}
add_action( 'save_post_siga_product', 'siga_save_product_details' );

function siga_add_service_meta_box() {
	add_meta_box(
		'siga_service_details',
		'Service Details',
		'siga_render_service_meta_box',
		'siga_service',
		'normal',
		'default'
	);
}
add_action( 'add_meta_boxes_siga_service', 'siga_add_service_meta_box' );

function siga_render_service_meta_box( $post ) {
	wp_nonce_field( 'siga_save_service_details', 'siga_service_details_nonce' );

	$fields = array(
		'siga_group'        => array( 'Service group', 'text' ),
		'siga_price'        => array( 'Price (IDR)', 'number' ),
		'siga_price_unit'   => array( 'Price unit', 'text' ),
		'siga_rating'       => array( 'Rating', 'number' ),
		'siga_action_label' => array( 'Button label', 'text' ),
		'siga_action_url'   => array( 'Button URL', 'url' ),
	);

	foreach ( $fields as $key => $field ) {
		$value = get_post_meta( $post->ID, $key, true );
		printf(
			'<p><label for="%1$s"><strong>%2$s</strong></label><br><input class="widefat" type="%3$s" id="%1$s" name="%1$s" value="%4$s"></p>',
			esc_attr( $key ),
			esc_html( $field[0] ),
			esc_attr( $field[1] ),
			esc_attr( $value )
		);
	}
}

function siga_save_service_details( $post_id ) {
	if (
		! isset( $_POST['siga_service_details_nonce'] ) ||
		! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['siga_service_details_nonce'] ) ), 'siga_save_service_details' ) ||
		( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) ||
		! current_user_can( 'edit_post', $post_id )
	) {
		return;
	}

	$fields = array(
		'siga_group'        => 'sanitize_text_field',
		'siga_price'        => 'absint',
		'siga_price_unit'   => 'sanitize_text_field',
		'siga_rating'       => 'sanitize_text_field',
		'siga_action_label' => 'sanitize_text_field',
		'siga_action_url'   => 'esc_url_raw',
	);

	foreach ( $fields as $key => $sanitizer ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta(
				$post_id,
				$key,
				call_user_func( $sanitizer, wp_unslash( $_POST[ $key ] ) )
			);
		}
	}
}
add_action( 'save_post_siga_service', 'siga_save_service_details' );

function siga_add_service_group_meta_box() {
	add_meta_box(
		'siga_service_group_details',
		'Frontend Details',
		'siga_render_service_group_meta_box',
		'siga_service_group',
		'normal',
		'default'
	);
}
add_action( 'add_meta_boxes_siga_service_group', 'siga_add_service_group_meta_box' );

function siga_render_service_group_meta_box( $post ) {
	wp_nonce_field( 'siga_save_service_group_details', 'siga_service_group_details_nonce' );
	$fields = array(
		'siga_page_title'           => array( 'Service page heading', 'text' ),
		'siga_route_url'            => array( 'Frontend URL', 'text' ),
		'siga_hero_title'           => array( 'Hero title', 'text' ),
		'siga_hero_description'     => array( 'Hero description', 'textarea' ),
		'siga_hero_cta_one_label'   => array( 'CTA 1 label', 'text' ),
		'siga_hero_cta_one_url'     => array( 'CTA 1 URL', 'text' ),
		'siga_hero_cta_two_label'   => array( 'CTA 2 label', 'text' ),
		'siga_hero_cta_two_url'     => array( 'CTA 2 URL', 'text' ),
		'siga_hero_cta_three_label' => array( 'CTA 3 label', 'text' ),
		'siga_hero_cta_three_url'   => array( 'CTA 3 URL', 'text' ),
	);

	foreach ( $fields as $key => $field ) {
		$value = get_post_meta( $post->ID, $key, true );
		printf(
			'<p><label for="%1$s"><strong>%2$s</strong></label><br>',
			esc_attr( $key ),
			esc_html( $field[0] )
		);
		if ( 'textarea' === $field[1] ) {
			printf(
				'<textarea class="widefat" rows="3" id="%1$s" name="%1$s">%2$s</textarea></p>',
				esc_attr( $key ),
				esc_textarea( $value )
			);
		} else {
			printf(
				'<input class="widefat" type="%1$s" id="%2$s" name="%2$s" value="%3$s"></p>',
				esc_attr( $field[1] ),
				esc_attr( $key ),
				esc_attr( $value )
			);
		}
	}
}

function siga_save_service_group_details( $post_id ) {
	if (
		! isset( $_POST['siga_service_group_details_nonce'] ) ||
		! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['siga_service_group_details_nonce'] ) ), 'siga_save_service_group_details' ) ||
		( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) ||
		! current_user_can( 'edit_post', $post_id )
	) {
		return;
	}

	$fields = array(
		'siga_page_title',
		'siga_route_url',
		'siga_hero_title',
		'siga_hero_description',
		'siga_hero_cta_one_label',
		'siga_hero_cta_one_url',
		'siga_hero_cta_two_label',
		'siga_hero_cta_two_url',
		'siga_hero_cta_three_label',
		'siga_hero_cta_three_url',
	);

	foreach ( $fields as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			$value = wp_unslash( $_POST[ $key ] );
			update_post_meta(
				$post_id,
				$key,
				false !== strpos( $key, '_url' )
					? esc_url_raw( $value )
					: ( 'siga_hero_description' === $key
						? sanitize_textarea_field( $value )
						: sanitize_text_field( $value ) )
			);
		}
	}
}
add_action( 'save_post_siga_service_group', 'siga_save_service_group_details' );

function siga_add_property_meta_box() {
	add_meta_box(
		'siga_property_details',
		'Rental Property Details',
		'siga_render_property_meta_box',
		'siga_property',
		'normal',
		'default'
	);
}
add_action( 'add_meta_boxes_siga_property', 'siga_add_property_meta_box' );

function siga_render_property_meta_box( $post ) {
	wp_nonce_field( 'siga_save_property_details', 'siga_property_details_nonce' );
	$fields = array(
		'siga_price'      => array( 'Price (IDR)', 'number' ),
		'siga_price_type' => array( 'Price unit (day, week, event)', 'text' ),
		'siga_type'       => array( 'Listing type (Rent or Sale)', 'text' ),
		'siga_category'   => array( 'Category', 'text' ),
		'siga_location'   => array( 'Location', 'text' ),
		'siga_address'    => array( 'Address', 'text' ),
	);

	foreach ( $fields as $key => $field ) {
		$value = get_post_meta( $post->ID, $key, true );
		printf(
			'<p><label for="%1$s"><strong>%2$s</strong></label><br><input class="widefat" type="%3$s" id="%1$s" name="%1$s" value="%4$s"></p>',
			esc_attr( $key ),
			esc_html( $field[0] ),
			esc_attr( $field[1] ),
			esc_attr( $value )
		);
	}

	printf(
		'<p><label><input type="checkbox" name="siga_featured" value="1" %s> Featured property</label></p>',
		checked( get_post_meta( $post->ID, 'siga_featured', true ), '1', false )
	);
	echo '<p>Set the Featured Image using the standard WordPress panel to control the card image.</p>';
}

function siga_save_property_details( $post_id ) {
	if (
		! isset( $_POST['siga_property_details_nonce'] ) ||
		! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['siga_property_details_nonce'] ) ), 'siga_save_property_details' ) ||
		( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) ||
		! current_user_can( 'edit_post', $post_id )
	) {
		return;
	}

	$text_fields = array(
		'siga_price_type',
		'siga_type',
		'siga_category',
		'siga_location',
		'siga_address',
	);
	foreach ( $text_fields as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) );
		}
	}
	if ( isset( $_POST['siga_price'] ) ) {
		update_post_meta( $post_id, 'siga_price', max( 0, (float) wp_unslash( $_POST['siga_price'] ) ) );
	}
	update_post_meta( $post_id, 'siga_featured', isset( $_POST['siga_featured'] ) ? '1' : '0' );
}
add_action( 'save_post_siga_property', 'siga_save_property_details' );

function siga_add_footer_meta_box( $post ) {
	if ( 'site-footer' !== $post->post_name ) {
		return;
	}

	add_meta_box(
		'siga_footer_details',
		'Frontend Footer Details',
		'siga_render_footer_meta_box',
		'page',
		'normal',
		'default'
	);
}
add_action( 'add_meta_boxes_page', 'siga_add_footer_meta_box' );

function siga_render_footer_meta_box( $post ) {
	wp_nonce_field( 'siga_save_footer_details', 'siga_footer_details_nonce' );

	$fields = array(
		'siga_footer_subtitle'     => array( 'Subtitle', 'text' ),
		'siga_footer_address'      => array( 'Address', 'text' ),
		'siga_footer_phone'        => array( 'Phone', 'text' ),
		'siga_footer_email'        => array( 'Email', 'email' ),
		'siga_footer_facebook'     => array( 'Facebook URL', 'url' ),
		'siga_footer_twitter'      => array( 'Twitter URL', 'url' ),
		'siga_footer_instagram'    => array( 'Instagram URL', 'url' ),
		'siga_footer_youtube'      => array( 'YouTube URL', 'url' ),
		'siga_footer_home_url'     => array( 'Home link', 'text' ),
		'siga_footer_about_url'    => array( 'About link', 'text' ),
		'siga_footer_services_url' => array( 'Services link', 'text' ),
		'siga_footer_rent_url'     => array( 'Rent link', 'text' ),
		'siga_footer_gallery_url'  => array( 'Gallery URL', 'url' ),
		'siga_footer_map_embed_url' => array( 'Map embed URL', 'url' ),
	);

	foreach ( $fields as $key => $field ) {
		$value = get_post_meta( $post->ID, $key, true );
		printf(
			'<p><label for="%1$s"><strong>%2$s</strong></label><br><input class="widefat" type="%3$s" id="%1$s" name="%1$s" value="%4$s"></p>',
			esc_attr( $key ),
			esc_html( $field[0] ),
			esc_attr( $field[1] ),
			esc_attr( $value )
		);
	}
}

function siga_save_footer_details( $post_id ) {
	$post = get_post( $post_id );
	if (
		! $post ||
		'site-footer' !== $post->post_name ||
		! isset( $_POST['siga_footer_details_nonce'] ) ||
		! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['siga_footer_details_nonce'] ) ), 'siga_save_footer_details' ) ||
		( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) ||
		! current_user_can( 'edit_post', $post_id )
	) {
		return;
	}

	$url_fields = array(
		'siga_footer_facebook',
		'siga_footer_twitter',
		'siga_footer_instagram',
		'siga_footer_youtube',
		'siga_footer_gallery_url',
		'siga_footer_map_embed_url',
	);
	$fields     = array(
		'siga_footer_subtitle',
		'siga_footer_address',
		'siga_footer_phone',
		'siga_footer_email',
		'siga_footer_home_url',
		'siga_footer_about_url',
		'siga_footer_services_url',
		'siga_footer_rent_url',
	);

	foreach ( $url_fields as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, esc_url_raw( wp_unslash( $_POST[ $key ] ) ) );
		}
	}
	foreach ( $fields as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) );
		}
	}
}
add_action( 'save_post_page', 'siga_save_footer_details' );

function siga_get_page_settings_fields( $slug ) {
	if ( 'site-navigation' === $slug ) {
		return array(
			'siga_nav_brand_name'       => array( 'Brand name', 'text' ),
			'siga_nav_logo_alt'         => array( 'Logo alt text', 'text' ),
			'siga_nav_home_label'       => array( 'Home label', 'text' ),
			'siga_nav_home_url'         => array( 'Home URL', 'text' ),
			'siga_nav_products_label'   => array( 'Products label', 'text' ),
			'siga_nav_products_url'     => array( 'Products URL', 'text' ),
			'siga_nav_services_label'   => array( 'Services label', 'text' ),
			'siga_nav_services_dropdown_label' => array( 'Service categories menu heading', 'text' ),
			'siga_nav_rent_label'       => array( 'Rent label', 'text' ),
			'siga_nav_rent_url'         => array( 'Rent URL', 'text' ),
			'siga_nav_about_label'      => array( 'About label', 'text' ),
			'siga_nav_about_url'        => array( 'About URL', 'text' ),
			'siga_nav_contact_label'    => array( 'Contact label', 'text' ),
			'siga_nav_contact_url'      => array( 'Contact URL', 'text' ),
			'siga_nav_account_label'    => array( 'Account label', 'text' ),
			'siga_nav_account_url'      => array( 'Account URL', 'text' ),
			'siga_nav_signin_label'     => array( 'Sign-in label', 'text' ),
			'siga_nav_signin_url'       => array( 'Sign-in URL', 'text' ),
		);
	}

	if ( 'contact' === $slug ) {
		return array(
			'siga_contact_hero_title'       => array( 'Page title', 'text' ),
			'siga_contact_hero_description' => array( 'Page introduction', 'textarea' ),
			'siga_contact_legal_title'      => array( 'Legal section title', 'text' ),
			'siga_contact_company_name'     => array( 'Company name', 'text' ),
			'siga_contact_director'         => array( 'Director', 'text' ),
			'siga_contact_deputy_director'  => array( 'Deputy director', 'text' ),
			'siga_contact_office_label'     => array( 'Office label', 'text' ),
			'siga_contact_office_address'   => array( 'Office address', 'textarea' ),
			'siga_contact_npwp'             => array( 'NPWP', 'text' ),
			'siga_contact_nib'              => array( 'NIB', 'text' ),
			'siga_contact_kemenkumham'      => array( 'SK Kemenkumham', 'text' ),
			'siga_contact_notary'           => array( 'Notary', 'text' ),
			'siga_contact_section_title'    => array( 'Contact section title', 'text' ),
			'siga_contact_email'            => array( 'Email', 'email' ),
			'siga_contact_phone'            => array( 'Phone', 'text' ),
			'siga_contact_whatsapp'         => array( 'WhatsApp number (international digits)', 'text' ),
			'siga_contact_address'           => array( 'Contact address', 'textarea' ),
			'siga_contact_hours'             => array( 'Opening hours', 'text' ),
			'siga_contact_email_button'     => array( 'Email button label', 'text' ),
			'siga_contact_whatsapp_button'  => array( 'WhatsApp button label', 'text' ),
			'siga_contact_form_title'       => array( 'Form title', 'text' ),
			'siga_contact_form_description' => array( 'Form introduction', 'textarea' ),
			'siga_contact_map_title'        => array( 'Map title', 'text' ),
			'siga_contact_map_description'  => array( 'Map introduction', 'textarea' ),
			'siga_contact_map_embed_url'    => array( 'Google Maps embed URL', 'url' ),
		);
	}

	return array();
}

function siga_add_navigation_and_contact_meta_boxes( $post ) {
	$fields = siga_get_page_settings_fields( $post->post_name );
	if ( empty( $fields ) ) {
		return;
	}

	$box_id = 'site-navigation' === $post->post_name
		? 'siga_navigation_details'
		: 'siga_contact_page_details';
	$title  = 'site-navigation' === $post->post_name
		? 'Frontend Navigation Details'
		: 'Frontend Contact Page Details';

	add_meta_box(
		$box_id,
		$title,
		'siga_render_navigation_and_contact_meta_box',
		'page',
		'normal',
		'default',
		array( 'slug' => $post->post_name )
	);
}
add_action( 'add_meta_boxes_page', 'siga_add_navigation_and_contact_meta_boxes' );

function siga_render_navigation_and_contact_meta_box( $post, $box ) {
	$slug     = $box['args']['slug'];
	$nonce_id = 'site-navigation' === $slug
		? 'siga_navigation_details_nonce'
		: 'siga_contact_page_details_nonce';
	$nonce_action = 'site-navigation' === $slug
		? 'siga_save_navigation_details'
		: 'siga_save_contact_page_details';
	wp_nonce_field( $nonce_action, $nonce_id );

	foreach ( siga_get_page_settings_fields( $slug ) as $key => $field ) {
		$value = get_post_meta( $post->ID, $key, true );
		printf(
			'<p><label for="%1$s"><strong>%2$s</strong></label><br>',
			esc_attr( $key ),
			esc_html( $field[0] )
		);
		if ( 'textarea' === $field[1] ) {
			printf(
				'<textarea class="widefat" rows="3" id="%1$s" name="%1$s">%2$s</textarea></p>',
				esc_attr( $key ),
				esc_textarea( $value )
			);
		} else {
			printf(
				'<input class="widefat" type="%1$s" id="%2$s" name="%2$s" value="%3$s"></p>',
				esc_attr( $field[1] ),
				esc_attr( $key ),
				esc_attr( $value )
			);
		}
	}

	if ( 'site-navigation' === $slug ) {
		echo '<p>Set the Featured Image in the WordPress page editor to change the header logo.</p>';
	}
}

function siga_save_navigation_and_contact_meta( $post_id ) {
	$post = get_post( $post_id );
	if ( ! $post || ! in_array( $post->post_name, array( 'site-navigation', 'contact' ), true ) ) {
		return;
	}

	$is_navigation = 'site-navigation' === $post->post_name;
	$nonce_id      = $is_navigation
		? 'siga_navigation_details_nonce'
		: 'siga_contact_page_details_nonce';
	$nonce_action  = $is_navigation
		? 'siga_save_navigation_details'
		: 'siga_save_contact_page_details';
	if (
		! isset( $_POST[ $nonce_id ] ) ||
		! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST[ $nonce_id ] ) ), $nonce_action ) ||
		( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) ||
		! current_user_can( 'edit_post', $post_id )
	) {
		return;
	}

	foreach ( siga_get_page_settings_fields( $post->post_name ) as $key => $field ) {
		if ( ! isset( $_POST[ $key ] ) ) {
			continue;
		}
		$value = wp_unslash( $_POST[ $key ] );
		if ( 'url' === $field[1] || false !== strpos( $key, '_url' ) ) {
			$value = esc_url_raw( $value );
		} elseif ( 'email' === $field[1] ) {
			$value = sanitize_email( $value );
		} elseif ( 'textarea' === $field[1] ) {
			$value = sanitize_textarea_field( $value );
		} else {
			$value = sanitize_text_field( $value );
		}
		update_post_meta( $post_id, $key, $value );
	}
}
add_action( 'save_post_page', 'siga_save_navigation_and_contact_meta' );

function siga_import_source_image( $filename, $parent_id ) {
	$existing = get_posts(
		array(
			'post_type'      => 'attachment',
			'post_status'    => 'inherit',
			'meta_key'       => '_siga_source_filename',
			'meta_value'     => $filename,
			'posts_per_page' => 1,
			'fields'         => 'ids',
		)
	);
	if ( ! empty( $existing ) ) {
		return (int) $existing[0];
	}

	$source = plugin_dir_path( __FILE__ ) . 'source-images/' . basename( $filename );
	if ( ! is_readable( $source ) ) {
		error_log( 'SIGA CMS could not read source image: ' . $source );
		return 0;
	}

	$upload = wp_upload_bits( basename( $filename ), null, file_get_contents( $source ) );
	if ( ! empty( $upload['error'] ) ) {
		error_log( 'SIGA CMS image upload failed: ' . $upload['error'] );
		return 0;
	}

	$filetype   = wp_check_filetype( $upload['file'] );
	$attachment = wp_insert_attachment(
		array(
			'post_mime_type' => $filetype['type'],
			'post_title'     => sanitize_text_field( pathinfo( $filename, PATHINFO_FILENAME ) ),
			'post_status'    => 'inherit',
		),
		$upload['file'],
		$parent_id,
		true
	);
	if ( is_wp_error( $attachment ) ) {
		error_log( 'SIGA CMS attachment creation failed: ' . $attachment->get_error_message() );
		return 0;
	}

	require_once ABSPATH . 'wp-admin/includes/image.php';
	wp_update_attachment_metadata(
		$attachment,
		wp_generate_attachment_metadata( $attachment, $upload['file'] )
	);
	update_post_meta( $attachment, '_siga_source_filename', $filename );
	return (int) $attachment;
}

function siga_ensure_seed_page( $slug, $title ) {
	$page = get_page_by_path( $slug, OBJECT, 'page' );
	if ( $page ) {
		return (int) $page->ID;
	}

	$page_id = wp_insert_post(
		array(
			'post_type'   => 'page',
			'post_status' => 'publish',
			'post_title'  => $title,
			'post_name'   => $slug,
		),
		true
	);
	if ( is_wp_error( $page_id ) ) {
		error_log( 'SIGA CMS page seed failed: ' . $page_id->get_error_message() );
		return 0;
	}
	return (int) $page_id;
}

function siga_seed_meta_if_missing( $post_id, $key, $value ) {
	if ( ! metadata_exists( 'post', $post_id, $key ) ) {
		update_post_meta( $post_id, $key, $value );
	}
}

function siga_seed_cms_content() {
	if ( get_option( 'siga_cms_content_seeded' ) ) {
		return;
	}
	$lock_time = (int) get_option( 'siga_cms_content_seed_lock', 0 );
	if ( $lock_time && time() - $lock_time < 300 ) {
		return;
	}
	if ( $lock_time ) {
		delete_option( 'siga_cms_content_seed_lock' );
	}
	if ( ! add_option( 'siga_cms_content_seed_lock', time(), '', 'no' ) ) {
		return;
	}

	$navigation_id = siga_ensure_seed_page( 'site-navigation', 'Site Navigation' );
	$navigation    = array(
		'siga_nav_brand_name'     => 'Sigaproduction',
		'siga_nav_logo_alt'       => 'sigaproeo',
		'siga_nav_home_label'     => 'Home',
		'siga_nav_home_url'       => '/',
		'siga_nav_products_label' => 'Products',
		'siga_nav_products_url'   => '/products',
		'siga_nav_services_label' => 'Services',
		'siga_nav_services_dropdown_label' => 'Service Categories',
		'siga_nav_rent_label'     => 'Rent',
		'siga_nav_rent_url'       => '/properties',
		'siga_nav_about_label'    => 'About',
		'siga_nav_about_url'      => '/about',
		'siga_nav_contact_label'  => 'Contact',
		'siga_nav_contact_url'    => '/contact',
		'siga_nav_account_label'  => 'Account',
		'siga_nav_account_url'    => '/dashboard/account',
		'siga_nav_signin_label'   => 'Sign In',
		'siga_nav_signin_url'     => '/signin',
	);
	if ( $navigation_id ) {
		foreach ( $navigation as $key => $value ) {
			siga_seed_meta_if_missing( $navigation_id, $key, $value );
		}
		if ( ! has_post_thumbnail( $navigation_id ) ) {
			$logo_id = siga_import_source_image( 'sigaproeo.jpeg', $navigation_id );
			if ( $logo_id ) {
				set_post_thumbnail( $navigation_id, $logo_id );
				update_post_meta( $logo_id, '_wp_attachment_image_alt', 'SIGA Production logo' );
			}
		}
	}

	$contact_id = siga_ensure_seed_page( 'contact', 'Kontak CV.Sigaproductions' );
	$contact    = array(
		'siga_contact_hero_title'       => 'Kontak CV.Sigaproductions',
		'siga_contact_hero_description' => 'Butuh proposal, konsultasi, atau ingin berdiskusi proyek? Tim kami siap membantu Anda.',
		'siga_contact_legal_title'      => 'LEGALITAS',
		'siga_contact_company_name'     => 'CV. SIGA PRODUCTION',
		'siga_contact_director'         => 'M. W. SENA SUBRATA',
		'siga_contact_deputy_director'  => 'BERLIANDA OKTAVIANI Y.',
		'siga_contact_office_label'     => 'OUR OFFICE',
		'siga_contact_office_address'  => "BANYUWANGI\nJL. KARIMUNJAWA NO.15 A\nLATENG, BANYUWANGI\nJAWA TIMUR\n68413",
		'siga_contact_npwp'             => '66.078.407.5-627.000',
		'siga_contact_nib'              => '9120312031076',
		'siga_contact_kemenkumham'      => 'AHU-0082481-AH.01.15',
		'siga_contact_notary'           => 'DIAN PERTIWI S.H., M.Kn.',
		'siga_contact_section_title'    => 'Informasi Kontak',
		'siga_contact_email'            => 'Sigaproduction03@gmail.com',
		'siga_contact_phone'            => '+62 819-3487-2954',
		'siga_contact_whatsapp'         => '6281934872954',
		'siga_contact_address'          => 'Jl. Karimun Jawa No. 15 Lateng, Kec. Banyuwangi Kabpaten Banyuwangi, Jawa Timur 68413',
		'siga_contact_hours'            => 'Senin–Minggu, 10.00–23.00 WIB',
		'siga_contact_email_button'     => 'Kirim Email',
		'siga_contact_whatsapp_button'  => 'Chat WhatsApp',
		'siga_contact_form_title'       => 'Kirim Pesan',
		'siga_contact_form_description' => 'Isi formulir di bawah ini. Kami akan segera membalas melalui email atau WhatsApp.',
		'siga_contact_map_title'        => 'Lokasi Kantor',
		'siga_contact_map_description'  => 'Kunjungi kami di alamat yang tertera pada peta berikut.',
		'siga_contact_map_embed_url'    => 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d987.2620995697481!2d114.3766804!3d-8.1978794!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1451edf736e05%3A0x5f862c984e83a149!2sStudio%203%20Banyuwangi!5e0!3m2!1sen!2sid!4v1759616877830!5m2!1sen!2sid',
	);
	if ( $contact_id ) {
		foreach ( $contact as $key => $value ) {
			siga_seed_meta_if_missing( $contact_id, $key, $value );
		}
	}

	$groups = array(
		'studiomusic' => array( 'Studio 3 Music Studio', 'Welcome to Studio Tiga Music', 'Your one-stop destination for local musicians, artists, and creative services', 'studio3.jpg', '/services/studiomusic' ),
		'sigaproeo'   => array( 'SIGAPRO EO', 'Welcome to Sigaproductions', 'Your one-stop destination for local products, EO, Movie Art, and Music Studio', 'sigaproeo.jpeg', '/services/sigaproEO' ),
		'merch'       => array( 'SIGAMERCH', 'Welcome to SigaMerch', 'Your one-stop destination for local products and international art', 'sigamerch.jpg', '/services/merch' ),
		'sigma'       => array( 'SIGMA', 'Welcome to Sigma Bwx', 'Your one-stop destination for local products, EO, Movie Art, and Music Studio', 'SIGMA.jpg', '/services/SIGMA' ),
		'areatiga'    => array( 'AREATIGA', 'Welcome to AREATIGA', 'Your one-stop destination for Music Encyclopedia', 'areatiga.jpg', '/services/areatiga' ),
	);
	foreach ( $groups as $slug => $group ) {
		$posts = get_posts(
			array(
				'post_type'      => 'siga_service_group',
				'name'           => $slug,
				'post_status'    => 'publish',
				'posts_per_page' => 1,
			)
		);
		if ( empty( $posts ) ) {
			continue;
		}

		$post_id = $posts[0]->ID;
		$values  = array(
			'siga_route_url'             => $group[4],
			'siga_hero_title'            => $group[1],
			'siga_hero_description'      => $group[2],
			'siga_hero_cta_one_label'    => 'Shop Sigamerch Products',
			'siga_hero_cta_one_url'      => '/products',
			'siga_hero_cta_two_label'    => 'Book a Sigaproduction',
			'siga_hero_cta_two_url'      => '/contact',
			'siga_hero_cta_three_label'  => 'Find Your Offer',
			'siga_hero_cta_three_url'   => '/',
		);
		foreach ( $values as $key => $value ) {
			siga_seed_meta_if_missing( $post_id, $key, $value );
		}
		if ( ! has_post_thumbnail( $post_id ) ) {
			$image_id = siga_import_source_image( $group[3], $post_id );
			if ( $image_id ) {
				set_post_thumbnail( $post_id, $image_id );
			}
		}
	}

	$properties = array(
		array( 'gitar', 'Gitar', 'Studio 3 Banyuwangi', 450000, 'Guitar', 'gitar1.jpg', true, 'Sewa gitar untuk latihan studio, event, atau konser kecil.' ),
		array( 'bass', 'Bass', 'Studio 3 Banyuwangi', 750000, 'Bass', 'bass1.jpg', false, 'Bass elektrik untuk latihan band, recording, maupun performance live.' ),
		array( 'drum-set', 'Drum Set', 'Studio 3 Banyuwangi', 350000, 'Drum Set', 'drum1.jpg', true, 'Drum set lengkap untuk latihan band, acara musik, atau konser kecil.' ),
		array( 'keyboard', 'Keyboard', 'Studio 3 Banyuwangi', 125000, 'Keyboard', 'keyboard1.jpg', true, 'Keyboard untuk acara, latihan, atau recording.' ),
		array( 'amplifier-for-events', 'Amplifier for Event', 'Studio 3 Banyuwangi', 180000, 'Amplifier for Event', 'ampli1.jpg', false, 'Amplifier untuk berbagai acara, konser kecil, dan kebutuhan sound system.' ),
		array( 'effect', 'Effect', 'Studio 3 Banyuwangi', 550000, 'Effect', 'effect1.jpg', false, 'Audio effect processor untuk event dan live performance.' ),
		array( 'fullset', 'Fullset', 'Studio 3 Banyuwangi', 1000000, 'Fullset', '', false, 'Paket lengkap alat musik untuk kebutuhan studio atau acara.' ),
	);
	foreach ( $properties as $property ) {
		$existing = get_posts(
			array(
				'post_type'      => 'siga_property',
				'name'           => $property[0],
				'post_status'    => array( 'publish', 'draft', 'pending' ),
				'posts_per_page' => 1,
			)
		);
		$post_id = ! empty( $existing )
			? (int) $existing[0]->ID
			: wp_insert_post(
				array(
					'post_type'    => 'siga_property',
					'post_status'  => 'publish',
					'post_title'   => $property[1],
					'post_name'    => $property[0],
					'post_content' => $property[7],
				),
				true
			);
		if ( is_wp_error( $post_id ) ) {
			error_log( 'SIGA CMS property seed failed: ' . $post_id->get_error_message() );
			continue;
		}

		$values = array(
			'siga_price'      => $property[3],
			'siga_price_type' => 'day',
			'siga_type'       => 'Rent',
			'siga_category'   => $property[4],
			'siga_location'   => $property[2],
			'siga_address'    => 'Jl. Wijaya Kusuma No.21, Banyuwangi, Jawa Timur',
			'siga_featured'   => $property[6] ? '1' : '0',
		);
		foreach ( $values as $key => $value ) {
			siga_seed_meta_if_missing( $post_id, $key, $value );
		}
		if ( $property[5] && ! has_post_thumbnail( $post_id ) ) {
			$image_id = siga_import_source_image( $property[5], $post_id );
			if ( $image_id ) {
				set_post_thumbnail( $post_id, $image_id );
			}
		}
	}

	update_option( 'siga_cms_content_seeded', 1 );
	delete_option( 'siga_cms_content_seed_lock' );
}
add_action( 'init', 'siga_seed_cms_content', 99 );
