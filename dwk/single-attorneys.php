<?php
/**
 * The Template for displaying all single posts.
 * @package WordPress
 * @subpackage Theme name
 */

get_header(); ?>
<?php while ( have_posts() ) : the_post();
	$email             = get_field( 'email' );
	$offices           = get_field( 'offices' );
	$twitter           = get_field( 'twitter' );
	$linkedin          = get_field( 'linkedin' );
	$phone             = get_field( 'phone' );
	$post_thumbnail_id = get_post_thumbnail_id();
	$ava               = wp_get_attachment_url( $post_thumbnail_id );
	$terms             = get_the_terms( $post->ID, 'cat' );
	$office_loc        = '';

	?>
	<section class="intro-section">
		<div class="intro-area">
			<div class="container">
				<div class="intro-holder">
					<div class="description">
						<div class="description-holder">
							<h1><?php the_title(); ?></h1>
							<strong	class="title"><?php echo( $terms[0]->name ); ?></strong>
							<?php
							if ( ! empty( $offices ) ) {
							?><address> <?php
							foreach ( $offices as $office ) {
								echo ($office->post_title. '<br />');
							}
							?></address> <?php
							} ?>

							<ul class="data-list">
								<?php if ( ! empty( $phone ) ) { ?>
									<li>
										<dl>
											<dt>TEL</dt>
											<dd>
												<span
													class="phone"><?php echo( $phone ); ?></span>
												<a class="phone"
												   href="callto:<?php echo( $phone ); ?>"><?php echo( $phone ); ?></a>
											</dd>
										</dl>
									</li>
								<?php
								} ?>

								<li>
									<ul class="social-netwroks">
										<?php
										if ( ! empty( $email ) ) {
											echo( '<li class="email"><a href="mailto:' . $email . '">Email</a></li>' );
										}
										?>


										<li class="vcard"><a
												href="/wp-content/themes/dwk/vcard/download_vcard.php?name=<?php the_title(); ?>&title=<?php the_title(); ?>&email=<?php echo( $email ); ?>&phone=<?php echo( $phone ); ?>&address=<?php echo( $office_loc ); ?>&position=<?php echo( $terms[0]->name ); ?>&avatar=<?php echo( $ava ); ?>">vCard</a>
										</li>
										<?php
										if ( ! empty( $twitter ) ) {
											echo( '<li class="twitter"><a  target="_blank" href="' . $twitter . '">Twitter</a></li>' );
										}
										if ( ! empty( $linkedin ) ) {
											echo( '<li class="linkedin"><a target="_blank"	href="' . $linkedin . '">Linkedin</a></li>' );
										}
										?>
									</ul>
								</li>
							</ul>
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
					<p><a href="#" class="full-link">Full Bio</a></p>' );
					} ?>

				</section>
				<aside class="aside-column">
					<div class="side-info">
						<?php
						if ( get_field( 'sidebar_box' ) ) {
							$i = 0;
							while ( has_sub_field( 'sidebar_box' ) ) {
								$title   = get_sub_field( 'title' );
								$content = get_sub_field( 'content' );
								if ( ! empty( $title ) && ! empty( $content ) ) {
									echo( '<div class="accordion-item"><span class="title mobile-opener">' . $title . '</span>' );
									echo( '<div class="slide"><div class="slide-holder">' . $content . '</div></div></div>' );
								}
							}
						}
						?>
					</div>
				</aside>
			</div>
		</div>
	</div>
	<?php
	$practices    = get_field( 'practice_areas' );
	$tab2_content = get_field( 'content_tabs' );
	$tab3         = get_field( 'title_tabs_3' );
	$publications = get_field( 'media_publications' );
	$tab4         = get_field( 'title_tabs_4' );
	$tab4_content = get_field( 'content_tab_4' );
	$medias       = get_field( 'media' );
	if ( ! empty( $practices ) || ! empty( $tab2_content ) || ! empty( $publications ) || ! empty( $tab4 ) ) { ?>
		<div class="tabs-section">
			<div class="container">
				<div class="tabs-holder">
					<nav class="tab-nav">
						<ul>
							<?php
							if ( ! empty( $practices ) ) { ?>
								<li class="accordion-item">
									<a href="#tab1"
									   class="tab-link mobile-opener">Practice
										Areas</a>

									<div class="tab-box slide" id="tab1">
										<div class="slide-holder">
											<ul>
												<?php
												foreach ( $practices as $practice ) {
													echo( '<li><a href="' . get_the_permalink( $practice ) . '">' . get_the_title( $practice ) . '</a></li>' );
												}
												?>
											</ul>
										</div>
									</div>
								</li>
							<?php
							}
							if ( ! empty( $tab2_content ) ) {
								?>
								<li class="accordion-item"><a href="#tab2"
								                              class="tab-link mobile-opener">Representative
										Cases</a>

									<div class="tab-box slide" id="tab2">
										<div class="slide-holder">
											<?php echo( $tab2_content ); ?>
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
							if ( ! empty( $tab4 ) ) {
								if ( ! empty( $tab4_content ) || ! empty( $medias ) ) { ?>
									<li class="accordion-item">
										<a href="#tab4"
										   class="tab-link mobile-opener"><?php echo( $tab4 ); ?></a>

										<div class="tab-box slide" id="tab4">
											<div class="slide-holder">
												<?php echo( $tab4_content ); ?>
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
	<?php
	}
	?>

<?php endwhile; ?>
<?php get_footer(); ?>
