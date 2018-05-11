<?php
/**
 * Template name: Practices
 */

get_header(); ?>
<?php while ( have_posts() ) : the_post();
	$subtitle = get_field( 'subtitle' ); ?>
	<section class="intro-section">
		<div class="container">
			<h1><?php the_title(); ?></h1>
			<?php
			if ( ! empty( $subtitle ) ) {
				echo( '<p>' . $subtitle . '</p>' );
			}
			?>
		</div>
	</section>
<?php endwhile; ?>

<div class="container">
	<?php
	$args_post = array(
		'posts_per_page' => - 1,
		'post_type'      => 'practices'
	);
	query_posts( $args_post ); ?>
	<div class="heading-box">
		<h3 class="title">Our practice areas</h3>
	</div>
	<ul class="practices-list">
		<?php if ( have_posts() ) :
			$i = 0;
			?>
			<?php while ( have_posts() ) : the_post(); ?>
			<li>
				<a href="<?php echo get_permalink( $post->ID ); ?>"><?php echo get_the_post_thumbnail( $post->ID, 'practice' ); ?>
					<span class="name"><a
							href="<?php echo get_permalink( $post->ID ); ?>"><?php the_title(); ?></a></span>
			</li>
		<?php endwhile; ?>
		<?php endif; ?>
	</ul>
	<?php wp_reset_query(); ?>

</div>

<?php get_footer(); ?>

