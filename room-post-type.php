<?php
/**
 * Plugin Name:       Room Post Type
 * Description:       Room custom post type with meta fields
 * Requires at least: 5.9
 * Requires PHP:      8.0
 * Version:           0.1.0
 * Author:            Future Northants
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       room-post-type
 *
 * @package           create-block
 */

function register_room_custom_post_type() {
	register_post_type('room',[
			'labels'      => [
				'name'          => __('Rooms', 'room-post-type'),
				'singular_name' => __('Room', 'room-post-type'),
			],
				'public'      => true,
				'has_archive' => true,
				'show_in_rest' => true,
				'menu_icon' => 'dashicons-index-card',
				'supports' => ['title', 'editor', 'author', 'excerpt', 'thumbnail', 'custom-fields'],
		]
	);
}
add_action('init', 'register_room_custom_post_type');

/**
 * Register custom meta fields
 */
function register_room_post_meta() {
    register_post_meta( 'room', 'theatre_occupancy', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'number',
    ]);

	register_post_meta( 'room', 'boardroom_occupancy', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'number',
    ]);

	register_post_meta( 'room', 'induction_occupancy', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'number',
    ]);

	register_post_meta( 'room', 'classroom_occupancy', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'number',
    ]);

	register_post_meta( 'room', 'banquet_occupancy', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'number',
    ]);

	register_post_meta( 'room', 'cabaret_6ft_occupancy', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'number',
    ]);

	register_post_meta( 'room', 'cabaret_4ft_occupancy', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'number',
    ]);

	register_post_meta('room', 'audio_equipment', [
		'single' => false,
		'type' => 'array',
		'show_in_rest' => [
			'schema' => [
				'type' => 'array',
				'items' => [
					'type' => 'string',
				]
			]
		]
	]);

	register_post_meta('room', 'presentation_equipment', [
		'single' => false,
		'type' => 'array',
		'show_in_rest' => [
			'schema' => [
				'type' => 'array',
				'items' => [
					'type' => 'string',
				]
			]
		]
	]);
}
add_action( 'init', 'register_room_post_meta' );

/**
 * Custom render method for the room meta block
 */
function render_room_meta_field($block_attributes, $content) {
    $meta = get_post_meta(get_the_ID(), $block_attributes['key'], false);
	$list = $block_attributes['list'] ?? false;

	if (!$meta) {
		return null;
	}

	if ($list) {
		$html = "<ul>";
		foreach($meta as $item) {
			$html .= "<li>" . esc_html(implode(' ', $item)) . "</li>";
		}
		$html .= "</ul>";
		return sprintf("%s", $html);
	}

    if ( is_array($meta) ) {
        return sprintf("%s", esc_html(implode(', ', $meta)));
    } else {
        return sprintf("%s", esc_html($meta));
    }
}


/**
 * Register the block which will be added to the sidebar
 */
function create_block_room_post_type_block_init() {
	register_block_type( __DIR__ . '/build' );

	register_block_type( 'room-post-type/meta-field', [
		'api_version' => 2,
		'render_callback' => 'render_room_meta_field',
	]);
}
add_action( 'init', 'create_block_room_post_type_block_init' );
