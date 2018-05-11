<?php
/**
 * CUSTOM THEME function definitions
 * @package WordPress
 * @subpackage Theme name
 */

/**
 * Sets up theme defaults and registers support for various WordPress features.
 * @uses add_theme_support() To add support for post thumbnails, automatic feed links, and Post Formats.
 * @uses set_post_thumbnail_size() To set a custom post thumbnail size.
 */
define( 'THEME_URL', get_template_directory_uri() . '/' );
function custom_theme_setup() {
	register_nav_menu( 'header_top', 'Header Top' );
	register_nav_menu( 'navigation', 'Navigation' );
	register_nav_menu( 'footer', 'Footer Menu' );
	register_nav_menu( 'footer_bottom', 'Footer Menu bottom' );

	add_theme_support( 'post-thumbnails' );
	$content_width = 580;
	$half_width    = (int) ( $content_width / 2 );
	$quater_width  = (int) ( $content_width / 4 );
	set_post_thumbnail_size( $quater_width, $quater_width, $crop = TRUE );

	add_image_size( 'thumbnail', $quater_width, $quater_width, $crop = TRUE );
	add_image_size( 'medium', $half_width, (int) ( $half_width * 0.75 ) );
	add_image_size( 'large', $content_width, (int) ( $content_width * 0.75 ) );
	add_image_size( 'attorneys', 277, 345, TRUE );
	add_image_size( 'practice', 193, 129, TRUE );
	add_image_size( 'attorneys_list', 55, 63, TRUE );
	add_image_size( 'home-img', 262, 162, TRUE );
}

add_action( 'after_setup_theme', 'custom_theme_setup' );


/**
 * Sets the post excerpt length to 60 words.
 *
 * @param int $length length.
 */
function custom_excerpt_length( $length ) {
	return 35;
}

add_filter( 'excerpt_length', 'custom_excerpt_length' );

/**
 * Custom_continue_reading_link.
 */
function custom_continue_reading_link() {
	return '<a href="' . esc_url( get_permalink() ) . '">Continue reading <span class="meta-nav">&rarr;</span></a>';
}

/**
 * Adds a pretty "Continue Reading" link to custom post excerpts.
 */
function theme_name_scripts() {
	wp_enqueue_style( 'my-theme-style', get_template_directory_uri() . '/css/all.css', FALSE, filemtime( get_template_directory() . '/css/all.css' ) );
	wp_enqueue_style( 'print', get_template_directory_uri() . '/css/print.css', FALSE, filemtime( get_template_directory() . '/css/print.css' ), 'print' );
}

add_action( 'wp_enqueue_scripts', 'theme_name_scripts' );


if ( ! function_exists( 'co_js_init' ) ) {

	/**
	 * Include custom theme javascript files
	 */
	function co_js_init() {
		if ( ! is_admin() ) {
			wp_enqueue_script( 'ajax-script', get_template_directory_uri() . '/js/ajaxloop.js', array( 'jquery' ), filemtime( get_template_directory() . '/js/ajaxloop.js' ), TRUE );
			wp_enqueue_script( 'main-script', get_template_directory_uri() . '/js/jquery.main.js', array( 'jquery' ), filemtime( get_template_directory() . '/js/jquery.main.js' ), TRUE );

		}
	}

	add_action( 'wp_print_scripts', 'co_js_init' );
}


/**
 * Replaces "[...]" (appended to automatically generated excerpts) with an ellipsis and continue_reading_link.
 */
function custom_excerpt_more( $more ) {
	return sprintf( '... <a class="link-more" href="%1$s">%2$s</a>',
		get_permalink( get_the_ID() ),
		__( 'MORE', 'textdomain' )
	);
}

add_filter( 'excerpt_more', 'custom_excerpt_more' );

/**
 * Get our wp_nav_menu() fallback, wp_page_menu(), to show a home link.
 *
 * @param array $args args.
 */
function custom_page_menu_args( $args ) {
	$args['show_home'] = TRUE;

	return $args;
}

add_filter( 'wp_page_menu_args', 'custom_page_menu_args' );

add_filter( 'nav_menu_css_class', 'special_nav_class', 10, 2 );
function special_nav_class( $classes, $item ) {
	if ( in_array( 'current-menu-item', $classes ) ) {
		$classes[] = 'active ';
	}

	return $classes;
}

function alphaindex_alpha_tax() {
	register_taxonomy( 'alpha', array(
		0 => 'attorneys',
	),
		array(
			'hierarchical'      => FALSE,
			'label'             => 'Alpha',
			'show_ui'           => TRUE,
			'query_var'         => TRUE,
			'show_admin_column' => FALSE
		) );
}

add_action( 'init', 'alphaindex_alpha_tax' );
function split_full_name( $full_name ) {
	$full_name             = trim( $full_name );
	$unfiltered_name_parts = explode( ' ', $full_name );
	foreach ( $unfiltered_name_parts as $word ) {
		if ( $word{0} != '(' ) {
			$name_parts[] = $word;
		}
	}
	$num_words = sizeof( $name_parts );
	$fname     = '';
	$initials  = '';
	$lname     = '';
// is the first word a title? (Mr. Mrs, etc)
	$salutation = is_salutation( $name_parts[0] );
	$suffix     = is_suffix( $name_parts[ sizeof( $name_parts ) - 1 ] );

// set the range for the middle part of the name (trim prefixes & suffixes)
	$start = ( $salutation ) ? 1 : 0;
	$end   = ( $suffix ) ? $num_words - 1 : $num_words;

// concat the first name
	for ( $i = $start; $i < $end - 1; $i ++ ) {
		$word = $name_parts[ $i ];
		/*
		 * move on to parsing the last name if we find an indicator of a compound last name (Von, Van, etc)
		 * we use $i != $start to allow for rare cases where an indicator is actually the first name (like "Von Fabella")
		 */
		if ( is_compound_lname( $word ) && $i != $start ) {
			break;
		}
		/*
		 * is it a middle initial or part of their first name?
		 * if we start off with an initial, we'll call it the first name
		 */
		if ( is_initial( $word ) ) {
			if ( $i == $start ) {
				/*
				 * if so, do a look-ahead to see if they go by their middle name
				 * for ex: "R. Jason Smith" => "Jason Smith" & "R." is stored as an initial
				 * but "R. J. Smith" => "R. Smith" and "J." is stored as an initial
				 */
				if ( is_initial( $name_parts[ $i + 1 ] ) ) {
					$fname .= ' ' . strtoupper( $word );
				} else {
					$initials .= ' ' . strtoupper( $word );
				}
				// otherwise, just go ahead and save the initial
			} else {
				$initials .= ' ' . strtoupper( $word );
			}
		} else {
			$fname .= ' ' . fix_case( $word );
		}
	}

// check that we have more than 1 word in our string
	if ( $end - $start > 1 ) {
// concat the last name
		for ( $i; $i < $end; $i ++ ) {
			$lname .= ' ' . fix_case( $name_parts[ $i ] );
		}
	} else {
// otherwise, single word strings are assumed to be first names
		$fname = fix_case( $name_parts[ $i ] );
	}

// return the various parts in an array
	$name['salutation'] = $salutation;
	$name['fname']      = trim( $fname );
	$name['initials']   = trim( $initials );
	$name['lname']      = trim( $lname );
	$name['suffix']     = $suffix;

	return $name;
}

// detect and format standard salutations
// I'm only considering english honorifics for now & not words like
function is_salutation( $word ) {
	$word = str_replace( '.', '', strtolower( $word ) );
	if ( $word == 'mr' || $word == 'master' || $word == 'mister' ) {
		return 'Mr.';
	} else if ( $word == 'mrs' ) {
		return 'Mrs.';
	} else if ( $word == 'miss' || $word == 'ms' ) {
		return 'Ms.';
	} else if ( $word == 'dr' ) {
		return 'Dr.';
	} else if ( $word == 'rev' ) {
		return 'Rev.';
	} else if ( $word == 'fr' ) {
		return 'Fr.';
	} else {
		return FALSE;
	}
}

/*
 * detect and format common suffixes
 */
function is_suffix( $word ) {
	$word         = str_replace( '.', '', $word );
	$suffix_array = array(
		'I',
		'II',
		'III',
		'IV',
		'V',
		'Senior',
		'Junior',
		'Jr',
		'Sr',
		'PhD',
		'APR',
		'RPh',
		'PE',
		'MD',
		'MA',
		'DMD',
		'CME'
	);
	foreach ( $suffix_array as $suffix ) {
		if ( strtolower( $suffix ) == strtolower( $word ) ) {
			return $suffix;
		}
	}

	return FALSE;
}

function is_compound_lname( $word ) {
	$word  = strtolower( $word );
	$words = array(
		'vere',
		'von',
		'van',
		'de',
		'del',
		'della',
		'di',
		'da',
		'pietro',
		'vanden',
		'du',
		'st.',
		'st',
		'la',
		'ter'
	);

	return array_search( $word, $words );
}

function is_initial( $word ) {
	return ( ( strlen( $word ) == 1 ) || ( strlen( $word ) == 2 && $word{1} == '.' ) );
}

function is_camel_case( $word ) {
	if ( preg_match( '|[A-Z]+|s', $word ) && preg_match( '|[a-z]+|s', $word ) ) {
		return TRUE;
	}

	return FALSE;
}

/*
 * ucfirst words split by dashes or periods
 * ucfirst all upper/lower strings, but leave camelcase words alone
 */
function fix_case( $word ) {
	$word = safe_ucfirst( '-', $word );
	$word = safe_ucfirst( '.', $word );

	return $word;
}

function safe_ucfirst( $seperator, $word ) {
	$parts = explode( $seperator, $word );
	foreach ( $parts as $word ) {
		$words[] = ( is_camel_case( $word ) ) ? $word : ucfirst( strtolower( $word ) );
	}

	return implode( $seperator, $words );
}

function alphaindex_save_alpha( $post_id ) {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	$slug   = 'attorneys';
	$letter = '';
	if ( isset( $_POST['post_type'] ) && ( $slug != $_POST['post_type'] ) ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$taxonomy = 'alpha';
	if ( isset( $_POST['post_type'] ) ) {
		$title_post = strtolower( $_POST['post_title'] );
		$name       = split_full_name( $title_post );
		if ( ! empty( $name['lname'] ) ) {
			$title = $name['lname'];
		} else {
			$title = strtolower( $_POST['post_title'] );
		}
		$splitTitle    = explode( ' ', $title );
		$blacklist     = array();
		$splitTitle[0] = str_replace( $blacklist, '', strtolower( $splitTitle[0] ) );
		$title         = implode( ' ', $splitTitle );
		$letter        = substr( $title, 0, 1 );
		if ( is_numeric( $letter ) ) {

		}
	}
	wp_set_post_terms( $post_id, $letter, $taxonomy );
	update_post_meta( $post_id, 'lastname', $name['lname'] );


}

add_action( 'save_post_attorneys', 'alphaindex_save_alpha', 10, 3 );
add_action( 'update_post_attorneys', 'alphaindex_save_alpha', 10, 3 );

function relation_field_update( $post_id ) {
	if ( get_post_type( $post_id ) == 'attorneys' ) {
		$practices    = get_field( 'practice_areas', $post_id );
		$practices_id = array();
		if ( ! empty( $practices ) ) {
			foreach ( $practices as $practice ) {
				$practices_id[ $practice ] = $practice;
			}
		}
		$old_practices = get_post_meta( $post_id, 'practices', TRUE );
		$serialize_id  = maybe_serialize( $practices_id );
		update_post_meta( $post_id, 'practices', $serialize_id );
		if ( ! empty( $practices_id ) ) {
			$add_practices = array_diff_assoc( $practices_id, unserialize( $old_practices ) );
		} else {
			$add_practices = array();
		}
		if ( ! empty( $old_practices ) ) {
			$delete_practices = array_diff_assoc( unserialize( $old_practices ), $practices_id );
		} else {
			$delete_practices = array();
		}
		if ( ! empty( $add_practices ) ) {
			foreach ( $add_practices as $add_practice ) {
				$attorneys = get_field( 'attorneys', $add_practice );
				if ( ! empty( $attorneys ) ) {
					$attorneys[ $post_id ] = $post_id;
				} else {
					$attorneys             = array();
					$attorneys[ $post_id ] = $post_id;
				}
				update_field( 'attorneys', $attorneys, $add_practice );
			}
		}
		if ( ! empty( $delete_practices ) ) {
			foreach ( $delete_practices as $delete_practice ) {
				$attorneys = get_field( 'attorneys', $delete_practice );
				if ( ! empty( $attorneys ) ) {
					$key = array_search( $post_id, $attorneys );
					if ( $key !== FALSE ) {
						unset( $attorneys[ $key ] );
					}
				}

				update_field( 'attorneys', $attorneys, $delete_practice );
			}
		}

	} elseif ( get_post_type( $post_id ) == 'practices' ) {
		$attorneys    = get_field( 'attorneys', $post_id );
		$attorneys_id = array();
		if ( ! empty( $attorneys ) ) {
			foreach ( $attorneys as $attorney ) {
				$attorneys_id[ $attorney ] = $attorney;
			}
		}
		$old_attorneys = get_post_meta( $post_id, 'old_attorneys', TRUE );
		$serialize_id  = maybe_serialize( $attorneys_id );
		update_post_meta( $post_id, 'old_attorneys', $serialize_id );
		if ( ! empty( $attorneys_id ) ) {
			$add_attorneys = array_diff_assoc( $attorneys_id, unserialize( $old_attorneys ) );
		} else {
			$add_attorneys = array();
		}
		if ( ! empty( $old_attorneys ) ) {
			$delete_attorneys = array_diff_assoc( unserialize( $old_attorneys ), $attorneys_id );
		} else {
			$delete_attorneys = array();
		}
		if ( ! empty( $add_attorneys ) ) {
			foreach ( $add_attorneys as $add_attorney ) {
				$attorneys = get_field( 'attorneys', $add_attorney );
				if ( ! empty( $attorneys ) ) {
					$attorneys[ $post_id ] = $post_id;
				} else {
					$attorneys             = array();
					$attorneys[ $post_id ] = $post_id;
				}
				update_field( 'practice_areas', $attorneys, $add_attorney );
			}
		}
		if ( ! empty( $delete_attorneys ) ) {
			foreach ( $delete_attorneys as $delete_attorney ) {
				$attorneys = get_field( 'practice_areas', $delete_attorney );
				if ( ! empty( $attorneys ) ) {
					$key = array_search( $post_id, $attorneys );
					if ( $key !== FALSE ) {
						unset( $attorneys[ $key ] );
					}
				}

				update_field( 'practice_areas', $attorneys, $delete_attorney );
			}
		}
	}

}

add_action( 'update_post_attorneys', 'relation_field_update', 10, 3 );
add_action( 'acf/save_post', 'relation_field_update', 10, 3 );
/**
 * Register our sidebars and widget areas.
 */
function custom_widgets_init() {
	register_sidebar( array(
		'name'          => 'Home',
		'id'            => 'home-block',
		'before_widget' => '<div class="slide %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h2 class="mobile-opener">',
		'after_title'   => '</h2>',
	) );
	register_sidebar( array(
		'name'          => 'Footer',
		'id'            => 'footer-block',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	) );
	register_sidebar( array(
		'name'          => 'Sidebar',
		'id'            => 'sidebar-right',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	) );

}

add_action( 'widgets_init', 'custom_widgets_init' );

/**
 * Display navigation to next/previous pages when applicable
 *
 * @param int  $nav_id nav_id.
 * @param bool $query_class = null.
 */
function custom_content_page_nav( $nav_id, $query_class = NULL ) {
	if ( is_null( $query_class ) ) {
		global $wp_query;
		$query_class = $wp_query;
	}

	if ( $query_class->max_num_pages > 1 ) : ?>
		<div id="<?php echo esc_attr( $nav_id ); ?>">
			<h3 class="assistive-text">Post navigation</h3>

			<div
				class="nav-previous"><?php next_posts_link( '<span class="meta-nav">&larr;</span> Older posts' ); ?></div>
			<div
				class="nav-next"><?php previous_posts_link( 'Newer posts <span class="meta-nav">&rarr;</span>' ); ?></div>
		</div>
	<?php endif;
}


/**
 * Custom_the_content
 *
 * @param string $content content.
 */
function custom_the_content( $content ) {
	$content = str_replace( '"~images/', '"' . theme( 'images/', 0 ), $content );

	return $content;
}


if ( ! function_exists( 'pa' ) ) :
	/**
	 * Pa
	 *
	 * @param string $mixed mixed.
	 * @param bool   $stop = false.
	 */
	function pa( $mixed, $stop = FALSE ) {
		$ar    = debug_backtrace();
		$key   = pathinfo( $ar[0]['file'] );
		$key   = $key['basename'] . ':' . $ar[0]['line'];
		$print = array( $key => $mixed );
		echo( '<pre>' . ( print_r( $print, 1 ) ) . '</pre>' );
		if ( 1 === $stop ) {
			exit();
		}
	}
endif;

/**
 * Url
 *
 * @param string $path path.
 * @param bool   $echo = 1.
 */
function theme( $path, $echo = 1 ) {
	$path = get_template_directory_uri() . '/' . $path;
	if ( $echo ) {
		echo esc_attr( $path );
	}

	return $path;
}

/**
 * Url
 *
 * @param string $uri uri.
 * @param bool   $echo echo = 1.
 */
function url( $uri, $echo = 1 ) {
	$url = home_url( '/' ) . $uri;
	if ( $echo ) {
		echo esc_attr( $url );
	}

	return $url;
}

function dpf_add_this_button() {
	global $addthis_settings;
	$addthis_options = get_option( 'addthis_settings', $addthis_settings );
	$profile         = ( ! empty( $addthis_options['profile'] ) ) ? $addthis_options['profile'] : 'xa-52b228444d1aac53';

	echo '<li><a class=\"addthis_button share\" href=\"http://www.addthis.com/bookmark.php?v=300&amp;pubid={$profile}\">Share</a></li>';
	echo '<script type=\"text/javascript\" src=\"//s7.addthis.com/js/300/addthis_widget.js#pubid={$profile}\"></script>';

}

function my_wpcf7_form_elements( $html ) {
	function ov3rfly_replace_include_blank( $name, $text, &$html ) {
		$matches = FALSE;
		preg_match( '/<select name="' . $name . '"[^>]*>(.*)<\/select>/iU', $html, $matches );
		if ( $matches ) {
			$select = str_replace( '<option value="">---</option>', '<option class="first" value="">' . $text . '</option>', $matches[0] );
			$html   = preg_replace( '/<select name="' . $name . '"[^>]*>(.*)<\/select>/iU', $select, $html );
		}
	}

	ov3rfly_replace_include_blank( 'city', 'City', $html );
	ov3rfly_replace_include_blank( 'state', 'State', $html );
	ov3rfly_replace_include_blank( 'zip', 'Zip', $html );
	ov3rfly_replace_include_blank( 'city1', '', $html );
	ov3rfly_replace_include_blank( 'state1', '', $html );
	ov3rfly_replace_include_blank( 'zip1', '', $html );

	return $html;
}

add_filter( 'wpcf7_form_elements', 'my_wpcf7_form_elements' );

add_filter( 'wpcf7_use_really_simple_captcha', '__return_true' );
function attorneys_list() {
	$item_params  = array(
		'post_type' => 'attorneys',
		'showposts' => 20
	);
	$service_boxs = query_posts( $item_params );
	$attorneys_pdf  = '';
	$attorneys_pdf .= '<table cellpadding="10" cellspacing="10">';
	foreach ( $service_boxs as $service_box ) {
		$terms    = get_the_terms( $service_box->ID, 'cat' );
		$offices           = get_field( 'offices', $service_box->ID );
		$phone    = get_field( 'phone', $service_box->ID );
		$attorneys_pdf .= '<tr><td width="130"><a href="' . post_permalink( $service_box->ID ) . '">' . get_the_post_thumbnail( $service_box->ID, 'attorneys' ) . '</a></td>';
		$attorneys_pdf .= '<td><a href="' . post_permalink( $service_box->ID ) . '">' . get_the_title( $service_box->ID ) . '</a><br /><em>' . $terms[0]->name . '</em>';
		if ( ! empty( $offices ) ) {
			foreach ( $offices as $office ) {
				$attorneys_pdf .= '<br /><strong>'. $office->post_title .'</strong> ';
			}
		}
		if ( ! empty( $phone ) ) {
			$attorneys_pdf .= '<br />'. $phone .' ';
		}
		$attorneys_pdf .= '</td>';
		$attorneys_pdf .= '</tr>';
	}
	wp_reset_query();
	$attorneys_pdf .= '</table>';

	return $attorneys_pdf;
	?>

<?php
}

add_shortcode( 'attorneys_pdf', 'attorneys_list' );
/**
 * Get_excerpt
 *
 * @param string $count count.
 */
function get_excerpt( $count ) {
	global $post;
	$permalink = get_permalink( $post->ID );
	$excerpt   = get_the_content();
	$excerpt   = strip_tags( $excerpt );
	$excerpt   = substr( $excerpt, 0, $count );
	$excerpt   = substr( $excerpt, 0, strripos( $excerpt, ' ' ) );
	if ( ! empty( $excerpt ) ) {
		$excerpt = '<p>' . $excerpt . '... <a class="link-more" href="' . $permalink . '">MORE</a></p>';
	}

	return $excerpt;
}

/**
 * Player_box
 *
 * @param string $url_video url_video.
 */
function player_box( $url_video ) { ?>
	<div id='player' class="visual"></div>
	<script>
		var tag = document.createElement('script');
		tag.src = "http://www.youtube.com/player_api";
		var firstScriptTag = document.getElementsByTagName('script')[ 0 ];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	</script>
	<script>
		var videoUrl = "<?php  echo $url_video; ?>";
		var youEmbed = '<iframe class="youtube-player" type="text/html" width="262" height="166" src="http://www.youtube' + '.com/embed/$1" allowfullscreen frameborder="0" hd=1 showinfo=0 ></iframe>';
		var vimeoEmbed = '<iframe src="//player.vimeo.com/video/$1" width="262" height="166" frameborder="0" ' + 'webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
		videoUrl = videoUrl.replace(/(?:http:\/\/)?(?:https:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, youEmbed).replace(/(?:http:\/\/)?(?:https:\/\/)(?:www\.)?(?:vimeo\.com)\/(.+)/g, vimeoEmbed);
		jQuery('#player').html(videoUrl);
		jQuery(window).load(function () {
			jQuery('#embed-text').val(videoUrl);
		});

	</script>
<?php

}

function revcon_change_post_label() {
	global $menu;
	global $submenu;
	$menu[5][0]                 = 'News';
	$submenu['edit.php'][5][0]  = 'News';
	$submenu['edit.php'][10][0] = 'Add News';
	$submenu['edit.php'][16][0] = 'News Tags';
	echo '';
}

function revcon_change_post_object() {
	global $wp_post_types;
	$labels                     = &$wp_post_types['post']->labels;
	$labels->name               = 'News';
	$labels->singular_name      = 'News';
	$labels->add_new            = 'Add News';
	$labels->add_new_item       = 'Add News';
	$labels->edit_item          = 'Edit News';
	$labels->new_item           = 'News';
	$labels->view_item          = 'View News';
	$labels->search_items       = 'Search News';
	$labels->not_found          = 'No News found';
	$labels->not_found_in_trash = 'No News found in Trash';
	$labels->all_items          = 'All News';
	$labels->menu_name          = 'News';
	$labels->name_admin_bar     = 'News';
}

add_action( 'admin_menu', 'revcon_change_post_label' );
add_action( 'init', 'revcon_change_post_object' );
function add_custom_translate_scripts(){ ?>
	<script type="text/javascript">
		jQuery(document).ready(function($){
			// setTimeout(function(){
			$('.upfront-contact-form .realperson-regen').html('Custom click to change');
			// }, 3000);
		});
	</script>
<?php }
add_action('wp_footer', 'add_custom_translate_scripts', 99);