<?php
/**
 * Template name: Subscribe
 */

get_header();
$email_subscribe = filter_input( INPUT_POST, 'email' ); ?>

<?php while ( have_posts() ) : the_post();
	$tagline = get_field( 'tagline' ); ?>
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
					<li><?php if ( function_exists( "wpptopdfenh_display_icon" ) ) {
							echo wpptopdfenh_display_icon();
						} ?></li>
					<?php dpf_add_this_button() ?>
				</ul>
			</div>
			<div class="columns-wrap">
				<section class="main-column">
					<div id="subscribe-form" class="subscribe">
						<?php
						the_content();
						if ( ! empty( $email_subscribe ) ) {
							echo( '<span id="email-subscribe" class="hide-email">' . $email_subscribe . '</span>' );
						}
						?>
					</div>
				</section>

			</div>

		</div>
	</div>
<?php endwhile; ?>
<?php get_footer(); ?>
