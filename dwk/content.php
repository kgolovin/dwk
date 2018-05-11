<?php
/**
 * The default template for displaying content
 * @package WordPress
 * @subpackage Theme name
 */

?>
<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-header">
		<h1 class="entry-title"><a href="<?php the_permalink(); ?>"
		                           title="<?php printf( esc_attr( 'Permalink to %s' ), the_title_attribute( 'echo=0' ) ); ?>"
		                           rel="bookmark"><?php the_title(); ?></a></h1>

		<?php if ( 'post' === get_post_type() ) : ?>
		<?php endif; ?>
	</div>
	<!-- .entry-header -->
	<div class="entry-content">
		<?php
		if ( is_search() ) :
			the_excerpt();
		else :
			the_content( 'Continue reading <span class="meta-nav">&rarr;</span>' );
		endif;
		?>
	</div>
	<!-- .entry-content -->

	<div class="entry-footer">
		<?php edit_post_link( '[Edit]', '<span class="edit-link">', '</span>' ); ?>
	</div>
	<!-- .entry-footer -->
</div><!-- #post-<?php the_ID(); ?> -->
