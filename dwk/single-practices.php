<?php
/**
 * The Template for displaying all single posts.
 * @package WordPress
 * @subpackage Theme name
 */

get_header(); ?>
<?php while ( have_posts() ) : the_post();
	$post_thumbnail_id = get_post_thumbnail_id();
	$ava               = wp_get_attachment_url( $post_thumbnail_id ); ?>
	<section class="intro-section">
		<div class="intro-area">
			<div class="container">
				<div class="intro-holder">
					<div class="description">
						<div class="description-holder">
							<h1><?php the_title(); ?></h1>
							<?php if ( ! empty( $office ) ) {
								?>
								<address><?php echo get_the_title( $office->ID ) ?></address>
							<?php
							} ?>
						</div>
					</div>
					<div class="visual">
						<?php echo get_the_post_thumbnail( $post->ID, 'large' ); ?>
					</div>
				</div>
			</div>
		</div>
	</section>
	<div class="twocolumns alt">
		<div class="container">
			<div class="heading-box">
				<ul class="action-list">
					<li><a title="Print" class="print"
					       href="#">Print</a></li>
					<li><?php if ( function_exists( "wpptopdfenh_display_icon" ) ) {
							echo wpptopdfenh_display_icon();
						} ?></li>
					<?php dpf_add_this_button() ?>
				</ul>
			</div>
			<div class="columns-wrap">
				<section class="main-column">
					<div class="excerpt-content">
						<?php the_content(); ?>
					</div>
					<?php
					$excerpt = get_field( 'full_content' );
					if ( ! empty( $excerpt ) ) {
						echo( '<div class="full-content">' . $excerpt . '</div>
					<p><a href="#" class="full-link">More</a></p>' );
					} ?>
				</section>
				<aside class="aside-column">
					<div class="side-info">
						<?php
						if ( get_field( 'key_contact' ) ) {
							$i = 0;
							?>
							<div class="accordion-item">
								<span
									class="title mobile-opener">Key contact</span>

								<div class="slide">
									<div class="slide-holder">
										<div class="contact-info">
											<?php
											while ( has_sub_field( 'key_contact' ) ) {
												$title  = get_sub_field( 'title' );
												$attorn = get_sub_field( 'attorneys_contact' );
												$email  = get_field( 'email', $attorn->ID );
												$phone  = get_field( 'phone', $attorn->ID );

												if ( ! empty( $attorn ) ) { ?>
													<div class="contact-item">
														<h3>
															<a href="<?php echo get_permalink( $attorn->ID ); ?>"><?php echo get_the_title( $attorn->ID ); ?></a>
														</h3>
														<?php
														if ( ! empty( $title ) ) { ?>
															<em class="position"><?php echo( $title ); ?></em>
														<?php
														}
														?>
														<ul class="data-list">
															<?php
															if ( ! empty( $phone ) ) {
																?>
																<li>
																	<a href="callto:<?php echo( $phone ); ?>"><?php echo( $phone ); ?></a>
																</li>
															<?php
															}
															if ( ! empty( $email ) ) {
																?>
																<li>
																	<a href="mailto:<?php echo( $email ); ?>">email</a>
																</li>
															<?php
															}
															?></ul>
													</div>
												<?php

												}
											}
											?>
										</div>
									</div>
								</div>
							</div>
						<?php
						}
						?>
					</div>
				</aside>
			</div>
		</div>
	</div>
	<?php
	$content_tab_1 = get_field( 'content_tab_1' );
	$tab2_content  = get_field( 'content_tabs' );
	$tab3          = get_field( 'title_tabs_3' );
	$publications  = get_field( 'media' );
	$tab5          = get_field( 'title_tab' );
	$tab5_content  = get_field( 'content_tab' );
	$medias        = get_field( 'media_tabs' );
	$attorneys     = get_field( 'attorneys' );
	$events        = get_field( 'events' );
	$currentdate      = date( "Y-m-d", mktime( 0, 0, 0, date( "m" ), date( "d" ) - 1, date( "Y" ) ) );
	if ( ! empty( $content_tab_1 ) || ! empty( $attorneys ) || ! empty( $publications ) || ! empty( $events ) || ! empty( $tab5 ) ) { ?>
		<div class="tabs-section">
			<div class="container">
				<div class="tabs-holder">
					<nav class="tab-nav">
						<ul>
							<?php

							if ( ! empty( $content_tab_1 ) ) { ?>
								<li class="accordion-item">
									<a href="#tab1"
									   class="tab-link mobile-opener">Representative
										Cases</a>

									<div class="tab-box slide" id="tab1">
										<div class="slide-holder">
											<?php echo( $content_tab_1 ); ?>
										</div>
									</div>
								</li>
							<?php
							}
							if ( ! empty( $attorneys ) ) {
								$attorn_query = new WP_Query( array(
									'post_type'      => 'attorneys',
									'posts_per_page' => - 1,
									'post__in'       => $attorneys,
									'post_status'    => 'publish',
									'meta_key'       => 'lastname',
									'orderby'        => 'meta_value',
									'order'          => 'ASC'
								) );
								?>
								<li class="accordion-item"><a href="#tab2" class="tab-link mobile-opener">Related Attorneys</a>
									<div class="tab-box slide" id="tab2">
										<div class="slide-holder">
											<ul class="attorneys-list">
												<?php

												while ( $attorn_query->have_posts() ) : $attorn_query->the_post();
													$email    = get_field( 'email' );
													$twitter  = get_field( 'twitter' );
													$linkedin = get_field( 'linkedin' );
													$phone    = get_field( 'phone' );
													$offices  = get_field( 'offices' );
													$terms    = get_the_terms( $post->ID, 'cat' );
													?>
													<li>
														<article
															class="attorney-item">

															<div class="visual">
																<a href="<?php echo get_permalink( $post->ID ); ?>"><?php echo get_the_post_thumbnail( $post->ID, 'attorneys_list' ); ?>
															</div>
															<div
																class="description">
																<h4>
																	<a href="<?php echo get_permalink( $post->ID ); ?>"><?php the_title(); ?></a>
																</h4>
																<?php
																if ( ! empty( $terms ) ) { ?>
																	<em class="title"><?php echo( $terms[0]->name ); ?></em>
																<?php
																}
																if ( ! empty( $offices ) ) { ?>
																	<address><?php echo get_the_title( $offices->ID ); ?></address>
																<?php
																}
																?>
																<ul class="data-list">
																	<?php
																	if ( ! empty( $phone ) ) {
																		?>
																		<li>
																			<a href="callto:<?php echo( $phone ); ?>"><?php echo( $phone ); ?></a>
																		</li>
																	<?php
																	}
																	if ( ! empty( $email ) ) {
																		?>
																		<li>
																			<a href="mailto:<?php echo( $email ); ?>">email</a>
																		</li>
																	<?php
																	}
																	?>
																</ul>
															</div>
														</article>
													</li>
												<?php endwhile; ?>
											</ul>
										</div>
									</div>
								</li>
							<?php
							}
							if ( ! empty( $publications ) ) {
								$the_query = new WP_Query( array(
									'posts_per_page' => - 1,
									'post__in'       => $publications,
									'orderby'        => 'date',
									'order'          => 'DESC',
									'post_status'    => 'publish'
								) );
								?>
								<li class="accordion-item">
									<a href="#tab3"
									   class="tab-link mobile-opener">Media/Publications</a>

									<div class="tab-box slide" id="tab3">
										<div class="slide-holder">
											<table class="news-table">
												<?php
												while ( $the_query->have_posts() ) : $the_query->the_post();
													$post_categories = wp_get_post_categories( $post->ID );
													?>
													<tr>
														<td>
															<div
																class="title-wrap">
																<h3><?php echo get_cat_name( $post_categories['0'] ); ?></h3>
														<span
															class="date"><?php echo get_the_date( 'F j, Y', $post->ID ); ?></span>
															</div>
														</td>
														<td>
															<h4 class="title"><a
																	href="<?php echo( get_the_permalink( $post->ID ) ) ?>"><?php echo( get_the_title( $post->ID ) ) ?></a>
															</h4>
														</td>
													</tr>
												<?php
												endwhile;
												?>
											</table>
										</div>
									</div>
								</li>
							<?php
							}
							if ( ! empty( $events ) ) {
								$the_query = new WP_Query( array(
									'post_type'      => 'events',
									'posts_per_page' => - 1,
									'post__in'       => $events,
									'meta_query'     => array(
										array(
											'key'     => 'end_events',
											'compare' => '>',
											'value'   => $currentdate,
											'type'    => 'DATE',
										)
									),
									'post_status'    => 'publish'
								) );
								?>
								<li class="accordion-item">
									<a href="#tab4"
									   class="tab-link mobile-opener">Events</a>

									<div class="tab-box slide" id="tab4">
										<div class="slide-holder">
											<table class="news-table">
												<?php
												while ( $the_query->have_posts() ) : $the_query->the_post();
													$post_categories = wp_get_post_categories( $post->ID );
													$terms           = get_the_terms( $post->ID, 'type' );
													$even_location   = get_field( 'event_location' );
													$event_date      = get_field( 'event_date' );
													?>
													<tr>
														<td>
															<div
																class="title-wrap">
																<h3><?php echo( $terms[0]->name ); ?></h3>
																<?php
																if ( ! empty( $event_date ) ) {
																	echo( '<span class="date">' . $event_date . '</span>' );
																}
																?>
															</div>
														</td>
														<td>
															<h4 class="title"><a
																	href="<?php echo get_permalink( $post->ID ); ?>"><?php the_title(); ?><? ?></a>
															</h4>
															<?php
															if ( ! empty( $even_location ) ) {
																echo( '<p class="location">' . $even_location . '</p>' );
															}
															?>
														</td>
													</tr>
												<?php
												endwhile;
												?>
											</table>
										</div>
									</div>
								</li>
							<?php
							}
							if ( ! empty( $tab5 ) ) {
								if ( ! empty( $tab5_content ) || ! empty( $medias ) ) { ?>
									<li class="accordion-item">
										<a href="#tab5"
										   class="tab-link mobile-opener"><?php echo( $tab5 ); ?></a>

										<div class="tab-box slide" id="tab5">
											<div class="slide-holder">
												<?php echo( $tab5_content ); ?>
												<table class="news-table">
													<?php
													$the_query = new WP_Query( array(
														'posts_per_page' => - 1,
														'post__in'       => $medias,
														'orderby'        => 'date',
														'order'          => 'DESC',
														'post_status'    => 'publish'
													) );
													while ( $the_query->have_posts() ) : $the_query->the_post();
														$post_categories = wp_get_post_categories( $post->ID );
														?>
														<tr>
															<td>
																<div
																	class="title-wrap">
																	<h3><?php echo get_cat_name( $post_categories['0'] ); ?></h3>
															<span
																class="date"><?php echo get_the_date( 'F j, Y', $post->ID ); ?></span>
																</div>
															</td>
															<td>
																<h4 class="title">
																	<a
																		href="<?php echo( get_the_permalink( $post->ID ) ) ?>"><?php echo( get_the_title( $post->ID ) ) ?></a>
																</h4>
															</td>
														</tr>
													<?php
													endwhile;
													?>
												</table>
											</div>
										</div>
									</li>
								<?php
								}
							}
							?>
						</ul>
						<span class="arrow"></span>
					</nav>
				</div>
			</div>
		</div>
	<?php } ?>
<?php endwhile; ?>
<?php get_footer(); ?>
