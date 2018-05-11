<?php
/**
 * The template for displaying all pages.
 * @package WordPress
 * @subpackage Theme name
 */

get_header(); ?>

<?php while ( have_posts() ) : the_post();
	$title_spotlight = get_field( 'title_spotlight', $post->ID );
	$video           = get_field( 'video', $post->ID );
	$image           = get_field( 'image', $post->ID );
	$related_content = get_field( 'related_content', $post->ID );
	$tagline         = get_field( 'tagline' );
	?>
	<section class="intro-section">
		<div class="container">
			<h1><?php the_title(); ?></h1>
		</div>
	</section>
	<div class="twocolumns">
		<div class="container">
			<div class="heading-box">
				<?php
				if ( ! empty( $tagline ) ) {
					echo( '<h2 class="title">' . $tagline . '</h2>' );
				}
				?>
				<ul class="action-list">
					<li><a title="Print" class="print"
					       href="#">Print</a></li>
					<li><?php if ( function_exists( 'wpptopdfenh_display_icon' ) ) {
							echo wpptopdfenh_display_icon();
						} ?></li>
					<?php dpf_add_this_button() ?>
				</ul>
			</div>
			<div class="columns-wrap">
				<section class="main-column">
					<?php the_content(); ?>
				</section>
				<?php
				if ( is_page() ) {
					if ( $post->post_parent ) {
						$parent = wp_list_pages( 'title_li=&include=' . $post->post_parent . '&echo=0' );
						$pages  = wp_list_pages( 'title_li=&include=' . $post->post_parent . '&echo=0' );
						$pages .= wp_list_pages( 'title_li=&child_of=' . $post->post_parent . '&echo=0' );
					} else {
						$pages = wp_list_pages( 'title_li=&include=' . $post->ID . '&echo=0' );
						$pages .= wp_list_pages( 'title_li=&child_of=' . $post->ID . '&echo=0' );
						$parent = wp_list_pages( 'title_li=&child_of=' . $post->ID . '&echo=0' );
					}
				}
				if ( ! empty( $related_content ) && ! empty ( $parent ) ) {
					?>
					<aside class="aside-column">
						<?php
						if ( ! empty( $parent ) ) {
							?>
							<nav class="aside-nav">
								<ul class="about-menu">
									<?php echo $pages; ?>
								</ul>
							</nav>
						<?php
						}
						if ( ! empty( $related_content ) && ! empty ( $title_spotlight ) ) {
							?>
							<article class="article-box">
								<?php
								if ( ! empty( $title_spotlight ) ) {
									echo( '<div class="heading"><h2>' . $title_spotlight . '</h2></div>' );
								}
								?>
								<?php
								if ( ! empty( $image ) ) {
									echo( '<div class="visual"><img src="' . $image['sizes']['home-img'] . '"  alt="" /></div>' );
								}
								if ( ! empty( $related_content ) ) {
									echo( '<h3><a href="' . get_permalink( $related_content->ID ) . '">' . get_the_title( $related_content->ID ) . '</a></h3>' );
									if ( ! empty( $related_content->post_excerpt ) ) {
										echo( '<p>' . $related_content->post_excerpt . '</p>' );
									}
								}
								?>


							</article>

						<?php
						}
						?>
					</aside>
				<?php
				}
				?>

			</div>

		</div>
	</div>
<?php endwhile; ?>
<?php get_footer(); ?>
