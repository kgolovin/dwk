<?php
/**
 * The template for loophandler
 * @package WordPress
 * @subpackage Clickongolf
 */

define( 'WP_USE_THEMES', FALSE );
require_once( '../../../wp-load.php' );

$numposts      = filter_input( INPUT_GET, 'numposts' );
$pagenumber    = filter_input( INPUT_GET, 'pagenumber' );
$alpha_tax     = filter_input( INPUT_GET, 'alpha' );
$cat_form      = filter_input( INPUT_GET, 'category' );
$practice_form = filter_input( INPUT_GET, 'practice' );
$office_form   = filter_input( INPUT_GET, 'office' );

$args = array(
	'post_type'      => 'attorneys',
	'meta_key'       => 'lastname',
	'orderby'        => 'meta_value',
	'posts_per_page' => $numposts,
	'paged'          => $pagenumber,
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
query_posts( $args );
while ( have_posts() ) : the_post();
	$email        = get_field( 'email' );
	$twitter      = get_field( 'twitter' );
	$linkedin     = get_field( 'linkedin' );
	$phone        = get_field( 'phone' );
	$office_items = get_field( 'offices' );
	$terms        = get_the_terms( $post->ID, 'cat' );
	?>
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
<?php
endwhile;
wp_reset_postdata(); ?>
