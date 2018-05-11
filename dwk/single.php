<?php
/**
 * The Template for displaying all single posts.
 * @package WordPress
 * @subpackage Theme name
 */

get_header(); ?>

<?php while ( have_posts() ) : the_post();
	$post_categories = wp_get_post_categories( $post->ID );
	$practices       = get_field( 'related_practices' );
	$attorneys       = get_field( 'related_attorneys' );
	$author          = get_field( 'author_name' );
	?>
	<section class="intro-section">
		<div class="container">
			<h1>News &amp; Resources</h1>
		</div>
	</section>
	<div class="twocolumns alt">
		<div class="container">
			<div class="heading-box">
				<h3 class="title"><?php echo get_cat_name( $post_categories['0'] ); ?></h3>
				<ul class="action-list">
					<li><a title="Print" class="print"
					       href="#">Print</a></li>
					<li><?php if ( function_exists( "wpptopdfenh_display_icon" ) ) {
							echo wpptopdfenh_display_icon();
						} ?></li>
					<?php dpf_add_this_button() ?>
				</ul>
			</div>
			<div class="info-box">
				<h2><?php the_title(); ?></h2>
				<ul class="data-list">
					<li><?php echo mysql2date( 'F d,  Y', $post->post_date ); ?></li>
					<?php
					if ( ! empty( $author ) ) {
						echo( '<li>' . $author . '</li>' );
					}
					?>
				</ul>
			</div>
			<div class="columns-wrap">
				<section class="main-column">
					<?php the_content(); ?>
				</section>
				<aside class="aside-column">
					<?php if ( ! empty( $practices ) || ! empty( $attorneys ) ) { ?>
						<div class="side-area">
							<dl>
								<?php
								if ( ! empty( $practices ) ) {
									?>
									<dt>Related practices</dt>
									<dd>
										<ul>
											<?php foreach ( $practices as $practice ) {
												echo( '<li><a href="' . get_the_permalink( $practice->ID ) . '">' . get_the_title( $practice->ID ) . '</a></li>' );
											} ?>

										</ul>
									</dd>
								<?php
								}
								if ( ! empty( $attorneys ) ) {
									?>
									<dt>Related attorneys</dt>
									<dd>
										<ul>
											<?php foreach ( $attorneys as $attorney ) {
												echo( '<li><a href="' . get_the_permalink( $attorney->ID ) . '">' . get_the_title( $attorney->ID ) . '</a></li>' );
											} ?>
										</ul>
									</dd>
								<?php
								}
								?>
							</dl>
						</div>
					<?php } ?>
					<?php dynamic_sidebar( 'Sidebar' ); ?>
				</aside>
			</div>
		</div>
	</div>
<?php endwhile; ?>
<?php get_footer(); ?>
