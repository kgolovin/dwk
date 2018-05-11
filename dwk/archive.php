<?php
/**
 * The template for displaying Archive pages.
 * @package WordPress
 * @subpackage Theme name
 */

get_header(); ?>

<div id="primary">
	<div id="content">

		<?php if ( have_posts() ) : ?>

			<div class="page-header">
				<h1 class="page-title">
					<?php if ( is_day() ) : ?>
						<?php printf( 'Daily Archives: %s', '<span>' . get_the_date() . '</span>' ); ?>
					<?php elseif ( is_month() ) : ?>
						<?php printf( 'Monthly Archives: %s', '<span>' . get_the_date( _x( 'F Y', 'monthly archives date format' ) ) . '</span>' ); ?>
					<?php elseif ( is_year() ) : ?>
						<?php printf( 'Yearly Archives: %s', '<span>' . get_the_date( _x( 'Y', 'yearly archives date format' ) ) . '</span>' ); ?>
					<?php elseif ( is_category() ) : ?>
						<?php printf( 'Category Archive: %s', '<span>' . single_cat_title( '', false ) . '</span>' ); ?>
					<?php elseif ( is_tag() ) : ?>
						<?php printf( 'Tag Archive: %s', '<span>' . single_tag_title( '', false ) . '</span>' ); ?>
					<?php else : ?>
						Blog Archives
					<?php endif; ?>
				</h1>
			</div>

			<?php custom_content_page_nav( 'nav-above' ); ?>

			<?php /* Start the Loop */ ?>
			<?php while ( have_posts() ) : the_post(); ?>

				<?php get_template_part( 'content' ); ?>

			<?php endwhile; ?>

			<?php custom_content_page_nav( 'nav-below' ); ?>

		<?php else : ?>

			<?php get_template_part( 'content', 'not-found' ); ?>

		<?php endif; ?>

	</div>
	<!-- #content -->
</div><!-- #primary -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>
