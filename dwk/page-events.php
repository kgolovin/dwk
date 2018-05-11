<?php

/**
 * Template name: Events
 */

get_header();
$type_form = filter_input( INPUT_GET, 'type' );
?>
<?php while ( have_posts() ) : the_post(); ?>
	<section class="intro-section">
		<div class="container">
			<form action="#" class="main-form search-form" method="get">
				<div class="heading-row">
					<h1><?php the_title(); ?></h1>

					<div class="form-area">
						<select name="type" id="category-list">
							<option class="hideme" disabled selected>Select
								Event Type
							</option>
							<?php
							$types = get_terms( 'type', array(
								'orderby'    => 'name',
								'order'      => 'ASC',
								'hide_empty' => FALSE
							) );
							foreach ( $types as $type ) {
								if ( $type->name == $type_form ) {
									$sel = 'selected';
								} else {
									$sel = '';
								}
								echo( '<option ' . $sel . ' value="' . $type->name . '">' . $type->name . '</option>' );
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
			$page        = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
			$currentdate = date( "Y-m-d", mktime( 0, 0, 0, date( "m" ), date( "d" ) - 1, date( "Y" ) ) );
			$args        = array(
				'meta_query'     => array(
					array(
						'key'     => 'end_events',
						'compare' => '>',
						'value'   => $currentdate,
						'type'    => 'DATE',
					)
				),
				'post_type'      => 'events',
				'paged'          => $page,
				'posts_per_page' => 10,
				'meta_key'       => 'end_events',
				'orderby'        => 'meta_value',
				'order'          => 'ASC',
			);
			if ( ! empty( $type_form ) ) {
				$args['tax_query'] = array(
					array(
						'taxonomy' => 'type',
						'field'    => 'name',
						'terms'    => $type_form
					)
				);
			}
			query_posts( $args ); ?>
			<div class="heading-box">
				<h3 class="title">VIEWING
					<?php if ( empty( $type_form ) ) {
						echo( 'ALL EVENTS' );
					} else {
						echo( 'EVENTS TYPE - ' . $type_form );
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
							$terms = array();
							while ( have_posts() ) : the_post();
								$terms         = get_the_terms( $post->ID, 'type' );
								$even_location = get_field( 'event_location' );
								$event_date    = get_field( 'event_date' );
								$start_events  = get_field( 'start_events' );
								$end_events    = get_field( 'end_events' );
								$media_pdf     = get_field( 'media_pdf', $post->ID );
								?>
								<tr>
									<td>
										<div class="title-wrap">
											<h3><?php echo( $terms[0]->name ); ?></h3>
										<span class="date">
										<?php
										if ( ! empty( $event_date ) ) {
											echo( $event_date );
										} else {
											echo( mysql2date( 'F d,  Y', $start_events ) . ' -<br />' . mysql2date( 'F d,  Y', $end_events ) );
										}
										?>
									</span>
										</div>
									</td>
									<td>
										<h4 class="title"><a
												href="<?php
												if ( ! empty( $media_pdf ) ) {
													echo $media_pdf;
												} else {
													echo get_permalink( $post->ID );
												}
												?>"><?php the_title(); ?><? ?></a>
										</h4>
										<?php
										if ( ! empty( $even_location ) ) {
											echo( '<p class="location">' . $even_location . '</p>' );
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
