<?php
/**
 * The template for displaying the footer.
 * Contains the closing of the id=main div and all content after
 * @package WordPress
 * @subpackage Theme name
 */

?>
</div>
</div>
<div id="footer">
	<div class="container">
		<?php wp_nav_menu( array(
			'menu'       => 'social',
			'depth'      => 0,
			'walker'     => '',
			'menu_class' => 'social-netwroks',
		) ); ?>
		<div class="footer-set">

			<nav class="footer-nav">
				<?php wp_nav_menu( array(
					'theme_location' => 'footer',
					'depth'          => 0,
					'walker'         => '',
					'menu_class'     => 'mobile-hide',
				) ); ?>
				<?php wp_nav_menu( array(
					'theme_location' => 'footer_bottom',
					'walker'         => '',
					'menu_class'     => 'separated-list',
				) ); ?>

				<?php dynamic_sidebar( 'Footer' ); ?>
			</nav>
		</div>
	</div>
</div>
</div>
<?php wp_footer(); ?>
</body>
</html>
