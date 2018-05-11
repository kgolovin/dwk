<?php
/**
 * Template name: Offices
 */

get_header(); ?>
<?php while ( have_posts() ) : the_post();
	$subtitle = get_field( 'subtitle' );
	?>
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
	<div class="container">
		<?php
		$args_post = array(
			'posts_per_page' => - 1,
			'post_type'      => 'offices'
		);
		query_posts( $args_post ); ?>
		<div class="heading-box">
			<h3 class="title">Our locations</h3>
			<ul class="action-list">
				<li><a title="Print" class="print"
				       href="#">Print</a></li>
				<li><?php if ( function_exists( "wpptopdfenh_display_icon" ) ) {
						echo wpptopdfenh_display_icon();
					} ?></li>
				<?php dpf_add_this_button() ?>
			</ul>
		</div>
		<ul class="offices-list">
			<?php if ( have_posts() ) :
				$i = 0;
				?>
				<script
					src='http://maps.googleapis.com/maps/api/js?sensor=false'
					type='text/javascript'></script>
			<?php while (have_posts()) :
			the_post();
			$telephone = get_field( 'telephone', $post->ID );
			$fax       = get_field( 'fax', $post->ID );
			$location  = get_field( 'location', $post->ID );
			$address   = get_field( 'address', $post->ID );
			$i ++;
			?>
				<li>
					<article class="office-item">
						<div class="map">
							<?php if ( ! empty( $location ) ) { ?>
								<div id="map-<?php echo $i; ?>"
								     style="width: 242px; height: 129px;">
								</div>
								<script type="text/javascript">
									function load() {
										var lat = <?php echo $location['lat']; ?>;
										var lng = <?php echo $location['lng']; ?>;
										var latlng = new google.maps.LatLng(lat, lng);
										var myOptions = {
											zoom: 9,
											center: latlng,
											mapTypeId: google.maps.MapTypeId.ROADMAP
										};
										var map<?php echo $i; ?> = new google.maps.Map(document.getElementById("map-<?php echo $i; ?>"), myOptions);
										var marker = new google.maps.Marker({
											position: map<?php echo $i; ?>.getCenter(),
											map: map<?php echo $i; ?>
										});
									}
									load();
								</script>
							<?php } ?>
						</div>
						<div class="description">
							<h4>
								<?php the_title(); ?>
							</h4>
							<?php
							if ( ! empty( $address ) ) {
								echo( '<address>' . $address . '</address>' );
							} ?>
							<dl><?php
								if ( ! empty( $telephone ) ) {
									echo( '<dt>Tel</dt><dd>' . $telephone . '</dd>' );
								}
								if ( ! empty( $fax ) ) {
									echo( '<dt>Fax</dt><dd>' . $fax . '</dd>' );
								}
								?>
							</dl>
						</div>
					</article>
				</li>
			<?php endwhile; ?>
			<?php endif; ?>
		</ul>
		<?php wp_reset_query(); ?>
	</div>
<?php endwhile; ?>
<?php get_footer(); ?>
