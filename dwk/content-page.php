<?php
/**
 * The template used for displaying page content in page.php
 * @package WordPress
 * @subpackage Theme name
 */

?>
<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-header">
		<h1 class="entry-title"><?php the_title(); ?></h1>
	</div>

	<div class="entry-content">
		<?php the_content(); ?>
		<?php wp_link_pages( array(
			'before' => '<div class="page-link"><span>Pages:</span>',
			'after'  => '</div>',
		) ); ?>
	</div>

	<div class="entry-footer">
		<?php edit_post_link( '[Edit]', '<span class="edit-link">', '</span>' ); ?>
	</div>

</div><!-- #post-<?php the_ID(); ?> -->
