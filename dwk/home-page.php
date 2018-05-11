<?php
/**
 * Template name: Home
 */

get_header();
?>

<section class="gallery-section">
	<div class="container">
		<div class="gmask">
			<div class="slideset">
				<?php
				if ( get_field( 'slider' ) ) {
					$slides = get_field( 'slider' );
					//	shuffle( $slides );
					foreach ( $slides as $slide ) { ?>
						<div class="slide">
							<div class="slide-holder">
								<div class="slide-table">
									<div class="image-cell">
										<a href="<?php echo( $slide['slide_url'] ); ?>"><img
												src="<?php echo( $slide['slide_image'] ); ?>"/></a>
									</div>
									<div class="description-cell">
										<div class="holder">
											<h2>
												<a href="<?php echo( $slide['slide_url'] ); ?>"><?php echo( $slide['slide_title'] ); ?></a>
											</h2>

											<p><?php echo( $slide['slide_description'] ); ?></p>
										</div>
									</div>
								</div>
							</div>
						</div>
					<?php
					}
				}
				?>
			</div>
			<a class="btn-prev" href="#">Previous</a>
			<a class="btn-next" href="#">Next</a>

			<div class="switcher"></div>
		</div>
	</div>
</section>
<?php
$title_events     = get_field( 'events_title', $post->ID );
$show_events      = get_field( 'show_events', $post->ID );
$title_news       = get_field( 'news_title', $post->ID );
$show_news        = get_field( 'show_news', $post->ID );
$points_title     = get_field( 'points_title', $post->ID );
$points_sub_title = get_field( 'points_sub_title', $post->ID );
$title_spotlight  = get_field( 'title_spotlight', $post->ID );
$video            = get_field( 'video', $post->ID );
$image            = get_field( 'image', $post->ID );
$related_content  = get_field( 'related_content', $post->ID );
$type             = get_field( 'type', $post->ID );
$type1            = get_field( 'type_1', $post->ID );
$subscribe_text   = get_field( 'subscribe_text', $post->ID );
$subscribe_title  = get_field( 'subscribe_title', $post->ID );
$show_subscribe   = get_field( 'show_subscribe', $post->ID );
$currentdate      = date( "Y-m-d", mktime( 0, 0, 0, date( "m" ), date( "d" ) - 1, date( "Y" ) ) );
if ( ! empty( $show_events ) ) { ?>
	<section class="events-section accordion-item">
		<div class="container">
			<?php
			if ( ! empty( $title_events ) ) {
				echo( '<h2 class="mobile-opener">' . $title_events . '</h2>' );
			}
			if ( post_type_exists( $type ) ) {
				$args = array(
					'meta_query'     => array(
						array(
							'key'     => 'end_events',
							'compare' => '>',
							'value'   => $currentdate,
							'type'    => 'DATE',
						)
					),
					'post_type'      => $type,
					'posts_per_page' => 3,
					'meta_key'       => 'start_events',
					'orderby'        => 'meta_value',
					'order'          => 'ASC'

				);
			} else {
				$args = array(
					'post_type'      => 'post',
					'category_name'  => $type,
					'posts_per_page' => 3
				);
			}

			$events = new WP_Query( $args );
			?>
			<div class="slide">
				<div class="slide-holder">
					<div class="threecolumns">
						<?php while ( $events->have_posts() ) : $events->the_post();
							$even_location = get_field( 'event_location' );
							$event_date    = get_field( 'event_date' );
							$start_events  = get_field( 'start_events' );
							$end_events    = get_field( 'end_events' );
							?>
							<div class="column">
								<article class="article-box">
									<h3>
										<a href="<?php echo get_permalink( $post->ID ); ?>"><?php the_title(); ?></a>
									</h3>
									<?php if ( $post->post_type == 'events' ) { ?>
										<time>
											<?php
											if ( ! empty( $event_date ) ) {
												echo( $event_date );
											} else {
												echo( mysql2date( 'F d,  Y', $start_events ) . ' -<br />' . mysql2date( 'F d,  Y', $end_events ) );
											}
											?>
										</time>
									<?php
									} else {
										?>
										<time
											datatime="<?php echo mysql2date( 'Y-M-D', $post->post_date ); ?>"><?php echo mysql2date( 'F d,  Y', $post->post_date ); ?></time>
									<?php
									}
									if ( ! empty( $even_location ) ) {
										echo( '<address>' . $even_location . '</address>' );
									}
									?>
								</article>
							</div>
						<?php endwhile; ?>
					</div>
				</div>
			</div>
		</div>
	</section>
<?php
}
?>
<div class="twocolumns">
	<div class="container">
		<div class="columns-holder">
			<section class="main-column accordion-item">
				<div class="main-column-holder">
					<?php
					if ( ! empty( $points_title ) ) {
						echo( '<h1 class="mobile-opener">' . $points_title . '<span><em>' . $points_sub_title . '</em><span></h1>' );
					}
					?>
					<div class="slide">
						<div class="slide-holder">
							<?php $args = array(
								'post_type'      => 'post',
								'posts_per_page' => 3,
								'orderby'        => 'date',
								'order'          => 'DESC',
								'category_name'  => 'the-point'
							);
							$points     = new WP_Query( $args );
							?>
							<?php while ( $points->have_posts() ) : $points->the_post();
								$volume    = get_field( 'volume', $post->ID );
								$number    = get_field( 'number', $post->ID );
								$practices = get_field( 'related_practices', $post->ID );
								?>
								<article class="article-box">
									<ul class="data-list">
										<?php if ( ! empty( $volume ) || ! empty( $number ) ) {
											echo( '<li>' );
											if ( ! empty( $volume ) ) {
												echo( 'Vol. ' . $volume . ', ' );
											}
											if ( ! empty( $number ) ) {
												echo( 'No.' . $number . '' );
											}
											echo( '</li>' );
										} ?>

										<li><?php echo mysql2date( 'F d,  Y', $post->post_date ); ?></li>
									</ul>
									<h3>
										<a href="<?php echo get_permalink( $post->ID ); ?>"><?php the_title(); ?></a>
									</h3>
									<?php
									if ( ! empty( $practices ) ) {
										?>
										<ul class="practice-list">
											<?php foreach ( $practices as $practice ) {
												echo( '<li><a href="' . get_the_permalink( $practice->ID ) . '">' . get_the_title( $practice->ID ) . '</a></li>' );
											} ?>

										</ul>
									<?php
									}
									?>
								</article>
							<?php endwhile; ?>
						</div>
					</div>
				</div>
			</section>
			<?php
			if ( ! empty( $title_spotlight ) && ! empty( $related_content ) ) {
				?>
				<aside class="aside-column accordion-item">
					<div class="aside-column-holder">
						<?php
						if ( ! empty( $title_spotlight ) ) {
							echo( '<h2 class="mobile-opener">' . $title_spotlight . '</h2>' );
						}
						?>
						<div class="slide">
							<div class="slide-holder">
								<article class="article-box">
									<?php
									if ( ! empty( $video ) ) {
										player_box( $video );
									} else {
										if ( ! empty( $image ) ) {
											echo( '<div class="visual"><img src="' . $image['sizes']['home-img'] . '"  alt="" /></div>' );
										}
									}

									if ( ! empty( $related_content ) ) {
										echo( '<h3><a href="' . get_permalink( $related_content->ID ) . '">' . get_the_title( $related_content->ID ) . '</a></h3>' );
										if ( ! empty( $related_content->post_excerpt ) ) {
											echo( '<p>' . $related_content->post_excerpt . '</p>' );
										}
									}
									?>

								</article>
							</div>
						</div>
					</div>
				</aside>
			<?php
			}
			?>
		</div>
	</div>
</div>
<?php
if ( ! empty( $show_news ) ) {
	?>
	<section class="news-section accordion-item">
		<div class="container">
			<?php
			if ( ! empty( $title_news ) ) {
				echo( '<h2 class="mobile-opener">' . $title_news . '</h2>' );
			}
			if ( post_type_exists( $type1 ) ) {
				$args = array(
					'meta_query'     => array(
						array(
							'key'     => 'end_events',
							'compare' => '>',
							'value'   => $currentdate,
							'type'    => 'DATE',
						)
					),
					'post_type'      => $type,
					'posts_per_page' => 3,
					'meta_key'       => 'start_events',
					'orderby'        => 'meta_value',
					'order'          => 'ASC'
				);
			} else {
				$args = array(
					'post_type'      => 'post',
					'posts_per_page' => 3,
					'orderby'        => 'date',
					'order'          => 'DESC',
					'category_name'  => $type1
				);
			}
			$news = new WP_Query( $args );
			?>
			<div class="slide">
				<div class="slide-holder">
					<div class="threecolumns">
						<?php while ( $news->have_posts() ) : $news->the_post();
							$event_date   = get_field( 'event_date' );
							$start_events = get_field( 'start_events' );
							$end_events   = get_field( 'end_events' );
							?>
							<div class="column">
								<article class="article-box">
									<?php if ( $post->post_type == 'events' ) { ?>
										<span class="date">
									<?php
									if ( ! empty( $event_date ) ) {
										echo( $event_date );
									} else {
										echo( mysql2date( 'F d,  Y', $start_events ) . ' -<br />' . mysql2date( 'F d,  Y', $end_events ) );
									}
									?>
									</span>
									<?php
									} else {
										?>
										<time
											datatime="<?php echo mysql2date( 'Y-M-D', $post->post_date ); ?>"><?php echo mysql2date( 'F d,  Y', $post->post_date ); ?></time>
									<?php
									} ?>

									<h3>
										<a href="<?php echo get_permalink( $post->ID ); ?>"><?php the_title(); ?></a>
									</h3>
									<?php echo get_excerpt( 100 ); ?>
								</article>
							</div>
						<?php endwhile; ?>
					</div>
				</div>
			</div>

		</div>
	</section>
<?php
}
?>
<?php
if ( ! empty( $show_subscribe ) ) {
	?>
	<div class="subscribe-block accordion-item">
		<div class="container">
			<?php
			if ( ! empty( $subscribe_title ) ) {
				echo( '<h2 class="mobile-opener">' . $subscribe_title . '</h2>' );
			}
			?>
			<div class="slide">
				<div class="slide-holder">
					<form action="/subscribe/" method="post">
						<?php
						if ( ! empty( $subscribe_text ) ) {
							echo( '<div class="description">' . $subscribe_text . '</div>' );
						}
						?>
						<div class="form-wrap">
							<input type="submit" value="Go">
							<input type="email" name="email"
							       placeholder="Enter email">
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
<?php
}
?>

<?php get_footer(); ?>
