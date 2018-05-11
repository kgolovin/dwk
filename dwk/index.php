<?php
/**
 * The main template file.
 * @package WordPress
 * @subpackage Theme name
 */

get_header(); ?>

<div class="twocolumns">
	<div class="container">

		<?php if ( have_posts() ) : ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<?php get_template_part( 'content' ); ?>
			<?php endwhile; ?>
		<?php else : ?>
			<?php get_template_part( 'content', 'not-found' ); ?>

		<?php endif; ?>

	</div>

</div>

<?php get_footer(); ?>
