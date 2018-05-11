<?php
/**
 * The template for displaying Search Results pages.
 * @package WordPress
 * @subpackage Theme name
 */

get_header(); ?>

<section class="intro-section">
	<div class="container">
		<form action="#" class="main-form search-form">
			<div class="heading-row">
				<h1>Search</h1>

				<div class="form-area">
					<form method="get" id="searchform"
					      action="<?php echo esc_url( home_url( '/' ) ); ?>">
						<input type="search" class="field" name="s" id="s"
						       placeholder="<?php echo get_search_query() ?>"/>
						<input type="submit" class="submit" name="submit"
						       id="searchsubmit"
						       value="Search"/>
					</form>
				</div>
			</div>
		</form>
	</div>
</section>
<div class="twocolumns">
	<div class="container">

		<div class="search-result">

			<?php if ( have_posts() ) : ?>
				<div class="heading-box">
					<h2 class="title"><?php printf( 'Results' ); ?></h2>
					<ul class="action-list">
						<li><a title="Print" class="print"
						       href="#">Print</a></li>
						<li><?php if ( function_exists( "wpptopdfenh_display_icon" ) ) {
								echo wpptopdfenh_display_icon();
							} ?></li>
						<?php dpf_add_this_button() ?>
					</ul>
				</div>
				<?php
				global $wp_query;
				echo '<span class="info">' . $wp_query->found_posts . ' results found for ', '<span class="search-value">' . get_search_query() . '</span></span>'; ?>
				<ul class="search-list">
					<?php while ( have_posts() ) : the_post(); ?>
						<li>
							<h3>
								<a href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a>
							</h3>
							<?php the_excerpt(); ?>
						</li>
					<?php endwhile; ?>
				</ul>
				<?php wp_pagenavi(); ?>
			<?php else : ?>

				<?php get_template_part( 'content', 'not-found' ); ?>

			<?php endif; ?>
		</div>
	</div>

</div>


<?php get_footer(); ?>
