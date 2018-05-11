<?php
/**
 * Template name: Attorneys
 */

get_header();

$alpha_tax     = filter_input( INPUT_GET, 'alpha' );
$cat_form      = filter_input( INPUT_GET, 'category' );
$practice_form = filter_input( INPUT_GET, 'practice' );
$office_form   = filter_input( INPUT_GET, 'office' );
?>
<?php while ( have_posts() ) : the_post(); ?>
	<?php
	$letters   = get_terms( 'alpha', array(
		'orderby'    => 'name',
		'order'      => 'ASC',
		'hide_empty' => FALSE
	) );
	$cats      = get_terms( 'cat', array(
		'orderby'    => 'name',
		'order'      => 'ASC',
		'hide_empty' => FALSE
	) );
	$practices = get_posts( array(
		'posts_per_page' => - 1,
		'post_type'      => 'practices',
		'post_status'    => 'publish',
		'orderby'        => 'title',
		'order'          => 'ASC'
	) );
	$offices   = get_posts( array(
		'posts_per_page' => - 1,
		'post_type'      => 'offices',
		'post_status'    => 'publish',
		'orderby'        => 'title',
		'order'          => 'ASC'
	) );
	?>
	<section class="intro-section">
		<div class="container">
			<form action="/attorneys/" method="get"
			      class="main-form filter-form">
				<div class="heading-row">
					<h1><?php the_title(); ?></h1>
					<ul class="alphabet-list">
						<?php
						foreach ( $letters as $letter ) {
							if ( $letter->count > 0 ) {
								echo( '<li><a href="?alpha=' . $letter->name . '">' . $letter->name . '</a></li>' );
							} else {
								echo( '<li>' . $letter->name . '</li>' );
							}
						}
						?>
					</ul>
				</div>
				<div class="row">
					<div class="desktop-hide" style="display: none;">
						<select name="alpha">
							<option class="hideme" disabled selected>Letter
							</option>
							<?php
							foreach ( $letters as $letter ) { ?>
								<?php
								if ( $letter->count == '0' ) {
									$disabled = 'disabled';
								} else {
									$disabled = '';
								}
								if ( $letter->name == $alpha_tax ) {
									$sel = 'selected';
								} else {
									$sel = '';
								}
								echo( '<option ' . $sel . ' ' . $disabled . ' value="' . $letter->name . '">' . $letter->name . '</option>' );
							} ?>
						</select>
					</div>
					<div class="three col req">
						<select name="category">
							<option class="hideme" disabled selected>Title
							</option>
							<?php
							foreach ( $cats as $cat ) { ?>
								<?php
								if ( $cat->slug == $cat_form ) {
									$sel = 'selected';
								} else {
									$sel = '';
								}
								echo( '<option ' . $sel . ' value="' . $cat->slug . '">' . $cat->name . '</option>' );
							} ?>
						</select>
					</div>
					<div class="three col req">
						<select name="practice">
							<option class="hideme" disabled selected>Practice
							</option>
							<?php
							foreach ( $practices as $practice ) {
								if ( $practice->ID == $practice_form ) {
									$sel = 'selected';
								} else {
									$sel = '';
								}
								echo( '<option ' . $sel . ' value="' . $practice->ID . '">' . $practice->post_title . '</option>' );
							} ?>
						</select>
					</div>
					<div class="three col req">
						<select name="office">
							<option class="hideme" disabled selected>Office
							</option>
							<?php
							foreach ( $offices as $office ) {
								if ( $office->ID == $office_form ) {
									$sel = 'selected';
								} else {
									$sel = '';
								}
								echo( '<option ' . $sel . ' value="' . $office->ID . '">' . $office->post_title . '</option>' );
							} ?>
						</select>
					</div>
					<input type="submit" value="Filter">
				</div>
			</form>
		</div>
	</section>
	<div class="twocolumns">
		<div class="container">
			<?php
			$args = array(
				'post_type'      => 'attorneys',
				'posts_per_page' => 6,
				'meta_key'       => 'lastname',
				'orderby'        => 'meta_value',
				'order'          => 'ASC'
			);
			if ( ! empty( $alpha_tax ) || ! empty( $cat_form ) || ! empty( $practice_form ) || ! empty( $office_form ) ) {
				$tax_query  = array();
				$meta_query = array();

				if ( ! empty( $alpha_tax ) ) {
					$tax_query[] = array(
						'taxonomy' => 'alpha',
						'field'    => 'slug',
						'terms'    => $alpha_tax
					);
				}
				if ( ! empty( $cat_form ) ) {
					$tax_query[] = array(
						'taxonomy' => 'cat',
						'field'    => 'slug',
						'terms'    => $cat_form
					);
				}
				if ( ! empty( $practice_form ) ) {
					$meta_query[] = array(
						'key'     => 'practice_areas',
						'value'   => '"' . $practice_form . '"',
						'compare' => 'LIKE'
					);
				}
				if ( ! empty( $office_form ) ) {
					$meta_query[] = array(
						'key'     => 'offices',
						'value'   => $office_form,
						'compare' => 'LIKE'
					);
				}

				if ( ! empty( $meta_query ) ) {
					$args['meta_query'] = $meta_query;

				}
				if ( ! empty( $tax_query ) ) {
					$args['tax_query'] = $tax_query;
				}

			}
			query_posts( $args ); ?>
			<div class="heading-box">
				<h3 class="title">
					<?php
					echo( 'Viewing ' );
					if ( ! empty( $alpha_tax ) || ! empty( $cat_form ) || ! empty( $practice_form ) || ! empty( $office_form ) ) {
						if ( ! empty( $alpha_tax ) ) {
							echo( 'Letter : ' . $alpha_tax . '</br>' );
						}
						if ( ! empty( $cat_form ) ) {
							echo( 'Title : ' . $cat_form . '</br>' );
						}
						if ( ! empty( $practice_form ) ) {
							echo( 'Practice : ' . get_the_title( $practice_form ) . '</br>' );
						}
						if ( ! empty( $office_form ) ) {
							echo( 'Office : ' . get_the_title( $office_form ) . '</br>' );
						}
					} else {
						echo( 'All Attorneys' );
					}
					?>
				</h3>
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
					<ul id="scroll-block" class="attorneys-list">
						<?php
						$terms = array();
						while ( have_posts() ) : the_post();
							$email        = get_field( 'email' );
							$twitter      = get_field( 'twitter' );
							$linkedin     = get_field( 'linkedin' );
							$phone        = get_field( 'phone' );
							$office_items = get_field( 'offices' );
							$terms        = get_the_terms( $post->ID, 'cat' ); ?>
							<li>
								<article class="attorney-item">
									<div class="visual">
										<a href="<?php echo get_permalink( $post->ID ); ?>"><?php echo get_the_post_thumbnail( $post->ID, 'attorneys_list' ); ?>
									</div>
									<div class="description">
										<h4>
											<a href="<?php echo get_permalink( $post->ID ); ?>"><?php the_title(); ?></a>
										</h4>
										<?php
										if ( ! empty( $terms ) ) { ?>
											<em class="title"><?php echo( $terms[0]->name ); ?></em>
										<?php
										}
										if ( ! empty( $office_items ) ) {
											?>
											<address> <?php
												foreach ( $office_items as $office_item ) {
													echo( $office_item->post_title . '<br />' );
												}
												?></address> <?php
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
				<?php endif; ?>
			</div>
			<?php wp_reset_query(); ?>
		</div>
	</div>
<?php endwhile; ?>
<?php get_footer(); ?>
