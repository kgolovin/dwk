<?php
/**
 * The template for displaying content in the single.php template
 * @package WordPress
 * @subpackage Theme name
 */

?>
<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-header">
		<h1 class="entry-title"><?php the_title(); ?></h1>

		<?php if ( 'post' === get_post_type() ) : ?>
			<div class="entry-meta">
				<?php the_posted_on(); ?>
			</div><!-- .entry-meta -->
		<?php endif; ?>
	</div>
	<!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
		<?php wp_link_pages( array(
			'before' => '<div class="page-link"><span>Pages:</span>',
			'after'  => '</div>',
		) ); ?>
	</div>


	<div class="entry-footer">
		<?php the_posted_in(); ?>
		<?php edit_post_link( '[Edit]', '<span class="edit-link">', '</span>' ); ?>
	</div>
	<!-- .entry-footer -->
</div><!-- #post-<?php the_ID(); ?> -->
