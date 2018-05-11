<?php

/**
 * Template name: News & Resources
 */

get_header();
$cat_form = filter_input( INPUT_GET, 'category' );
?>
<?php while ( have_posts() ) : the_post(); ?>
	<section class="intro-section">
		<div class="container">
			<form action="#" class="main-form search-form" method="GET">
				<div class="heading-row">
					<h1><?php the_title(); ?></h1>

					<div class="form-area">
						<select name="category" id="category-list">
							<option class="hideme" disabled selected>Select News
								Type
							</option>
							<?php $categories = get_categories( $args );
							foreach ( $categories as $categorie ) {
								if ( $categorie->name == $cat_form ) {
									$sel = 'selected';
								} else {
									$sel = '';
								}
								echo( '<option ' . $sel . ' value="' . $categorie->name . '">' . $categorie->name . '</option>' );
							}
							?>
						</select>
						<input type="submit" value="Filter">
					</div>
				</div>
			</form>
		</div>
	</section>
	<div class="twocolumns">
		<div class="container">
			<?php
			$page = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
			$args = array(
				'post_type'      => 'post',
				'paged'          => $page,
				'posts_per_page' => 25,
				'category_name'  => $cat_form
			);
			query_posts( $args ); ?>
			<div class="heading-box">
				<h3 class="title">VIEWING
					<?php if ( empty( $cat_form ) ) {
						echo( 'ALL NEWS TYPE' );
					} else {
						echo( 'NEWS TYPE - ' . $cat_form );
					} ?> </h3>
				<ul class="action-list">
					<li><a title="Print" class="print" href="#">Print</a></li>
					<li><?php if ( function_exists( "wpptopdfenh_display_icon" ) ) {
							echo wpptopdfenh_display_icon();
						} ?></li>
					<?php dpf_add_this_button() ?>
				</ul>
			</div>
			<div id="content">
				<?php if ( have_posts() ) : ?>
					<div class="table-holder">
						<table class="news-table">
							<?php
							while ( have_posts() ) : the_post();
								$post_categories = wp_get_post_categories( $post->ID );
								$volume          = get_field( 'volume', $post->ID );
								$number          = get_field( 'number', $post->ID );
								$practices       = get_field( 'related_practices', $post->ID );
								$attorneys       = get_field( 'related_attorneys', $post->ID );
								?>
								<tr>
									<td>
										<div class="title-wrap">
											<h3><?php echo get_cat_name( $post_categories['0'] ); ?></h3>
											<?php if ( ! empty( $volume ) || ! empty( $number ) ) {
												echo( '<em class="vol">' );
												if ( ! empty( $volume ) ) {
													echo( 'Vol. ' . $volume . ', ' );
												}
												if ( ! empty( $number ) ) {
													echo( 'No.' . $number . '' );
												}
												echo( '</em>' );
											} ?>
											<span
												class="date"><?php echo mysql2date( 'F d,  Y', $post->post_date ); ?></span>
										</div>
									</td>
									<td>
										<h4 class="title"><a
												href="<?php echo get_permalink( $post->ID ); ?>"><?php the_title(); ?><? ?></a>
										</h4>
										<?php
										if ( ! empty( $practices ) && get_cat_name( $post_categories['0'] ) == 'The Point' ) {
											?>
											<ul class="practice-list">
												<?php foreach ( $practices as $practice ) {
													echo( '<li><a href="' . get_the_permalink( $practice->ID ) . '">' . get_the_title( $practice->ID ) . '</a></li>' );
												} ?>

											</ul>
										<?php
										}
										if ( get_cat_name( $post_categories['0'] ) == 'Publications' ) {
											$author = get_field( 'author_name' );
											if ( ! empty( $author ) ) {
												echo( '<span class="author">' . $author . '</span>' );
											}
										}
										?>
									</td>
								</tr>
							<?php endwhile; ?>
						</table>
					</div>
					<?php wp_pagenavi(); ?>
				<?php endif; ?>
			</div>
			<?php wp_reset_query(); ?>
		</div>
	</div>
<?php endwhile; ?>
<?php get_footer(); ?>
