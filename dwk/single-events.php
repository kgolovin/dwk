<?php
/*
Template Name: Single Event
*/
?>
<?php
/**
 * The Template for displaying all single posts.
 * @package WordPress
 * @subpackage Theme name
 */

get_header(); ?>

<?php while ( have_posts() ) : the_post();
	$terms          = get_the_terms( $post->ID, 'type' );
	$location       = get_field( 'location' );
	$event_location = get_field( 'event_location' );
	$event_date     = get_field( 'event_date' );
	$session_dates  = get_field( 'session_dates' );
	$time           = get_field( 'time' );
	$practices      = get_field( 'practice_areas' );
	$registration   = get_field( 'events_registration' );
	$start_events   = get_field( 'start_events' );
	$end_events     = get_field( 'end_events' );
	?>
	<section class="intro-section">
		<div class="container">
			<h1>Events</h1>
		</div>
	</section>
	<div class="twocolumns alt">
		<div class="container">
			<div class="heading-box">
				<h3 class="title"><?php echo( $terms[0]->name ); ?></h3>
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
				<em class="info">
					<?php
					if ( ! empty( $event_location ) ) {
						echo( $event_location . ' — ' );
					}
					if ( ! empty( $event_date ) ) {
						echo( $event_date );
					} else {
						echo( mysql2date( 'F d,  Y', $start_events ) . ' - ' . mysql2date( 'F d,  Y', $end_events ) );
					}
					?>
				</em>
			</div>
			<div class="columns-wrap">
				<section class="main-column">
					<?php the_content();
					if ( ! empty( $registration ) ) {
						echo( '<a href="#" class="register_button btn">Register now!</a>' );
						echo( '<div class="register-block">' . do_shortcode( '[contact-form-7 id="182" title="Register now!"]' ) . '</div>' );
					}
					?>
				</section>
				<?php if ( ! empty( $location ) || ! empty( $session_dates ) || ! empty( $time ) || ! empty( $practices ) ) { ?>
					<aside class="aside-column">
						<div class="side-box">
							<dl>
								<?php
								if ( ! empty( $location ) ) {
									?>
									<dt>Location</dt>
									<dd>
										<address><?php echo( $location ); ?></address>
									</dd>
								<?php
								}
								if ( ! empty( $session_dates ) ) {
									?>
									<dt>Session dates</dt>
									<dd>
										<address><?php echo( $session_dates ); ?></address>
									</dd>
								<?php
								}
								if ( ! empty( $time ) ) {
									?>
									<dt>Time</dt>
									<dd>
										<?php echo( $session_dates ); ?>
									</dd>
								<?php
								}
								?>
							</dl>
						</div>
						<?php
						if ( ! empty( $practices ) ) { ?>
							<div class="side-area">
								<dl>
									<dt>Practice Areas</dt>
									<dd>
										<ul>
											<?php foreach ( $practices as $practice ) {
												echo( '<li><a href="' . get_the_permalink( $practice->ID ) . '">' . get_the_title( $practice->ID ) . '</a></li>' );
											} ?>

										</ul>
									</dd>
								</dl>
							</div>
						<?php } ?>

						<?php dynamic_sidebar( 'Sidebar' ); ?>
					</aside>
				<?php } ?>
			</div>
		</div>
	</div>
<?php endwhile; ?>


<?php get_footer(); ?>
