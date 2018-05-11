<?php
/**
 * The template for displaying content not found
 * @package WordPress
 * @subpackage Theme name
 */

?>
<div class="heading-box post no-results not-found">
	<h2 class="title"><?php printf( 'Nothing Found' ); ?></h2>
	<ul class="action-list">
		<li><a title="Print" class="print"
		       href="#">Print</a></li>
		<li><?php if ( function_exists( "wpptopdfenh_display_icon" ) ) {
				echo wpptopdfenh_display_icon();
			} ?></li>
		<?php dpf_add_this_button() ?>
	</ul>
</div>
<div class="entry-content">
	<p>Apologies, but no results were found for the requested archive.
		Perhaps searching will help find a related
		post.</p>
</div>