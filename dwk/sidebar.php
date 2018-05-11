<?php
/**
 * The Sidebar containing the main widget area.
 * @package WordPress
 * @subpackage Theme name
 */

?>
<div id="secondary" class="widget-area">
	<?php if ( ! dynamic_sidebar( 'main-sidebar' ) ) : ?>

		<div id="archives" class="widget">
			<h3 class="widget-title">Archives</h3>
			<ul>
				<?php wp_get_archives( array( 'type' => 'monthly' ) ); ?>
			</ul>
		</div>

		<div id="meta" class="widget">
			<h3 class="widget-title">Meta</h3>
			<ul>
				<?php wp_register(); ?>
				<li><?php wp_loginout(); ?></li>
				<?php wp_meta(); ?>
			</ul>
		</div>

	<?php endif; ?>
</div><!-- #secondary .widget-area -->
