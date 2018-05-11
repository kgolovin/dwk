<?php
/**
 * The Header for our theme.
 * Displays all of the <head> section and everything up till <div id="main">
 * @package WordPress
 * @subpackage Theme name
 */

?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type"
	      content="text/html; charset=<?php bloginfo( 'charset' ); ?>"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link type="text/css" rel="stylesheet"
	      href="http://fast.fonts.net/cssapi/cb05b59c-833a-4deb-aa97-5ae2f75fba47.css"/>
	<title>
		<?php
		/*
		 * Print the <title> tag based on what is being viewed.
		 */
		global $page, $paged;
		wp_title( '|', true, 'right' );
		bloginfo( 'name' );
		$site_description = get_bloginfo( 'description', 'display' );
		if ( $site_description && ( is_home() || is_front_page() ) ) {
			echo esc_attr( " | $site_description" );
		}
		?></title>

	<link rel="profile" href="http://gmpg.org/xfn/11"/>
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>"/>
	<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE"/>
	<?php
	if ( is_singular() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
	wp_head();
	?>
</head>
<body <?php body_class(); ?>>
<div id="wrapper">
	<header id="header">
		<div class="container">
			<a href="" class="menu-opener"><span>Menu</span></a>
			<a href="#" class="share-btn">Share</a>
			<strong class="logo"><a
					href="<?php echo esc_url( home_url( '/' ) ); ?>">DWK Dannis
					Woliver Kelley Attorneys at Law</a></strong>

			<div class="header-set">
				<div class="header-holder">
					<nav class="additional-nav">
						<?php wp_nav_menu( array(
							'theme_location'  => 'header_top',
							'container'       => '',
							'container_class' => '',
						) ); ?>
						<div class="search-form">
							<a href="#" class="search-opener">Search</a>

							<div class="slide">
								<div class="form-area">
									<?php get_search_form(); ?>
								</div>

							</div>
						</div>
					</nav>
					<?php wp_nav_menu( array(
						'theme_location'  => 'navigation',
						'container'       => 'nav',
						'container_class' => 'main-nav',
						'depth'           => 0,
						'walker'          => ''
					) ); ?>
				</div>

			</div>
		</div>
	</header>
	<div id="main">
		<div class="main-holder">
