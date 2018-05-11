<?php
/**
 * The template for displaying 404 pages (Not Found).
 * @package WordPress
 * @subpackage Theme name
 */

get_header(); ?>
<section class="intro-section">
	<div class="container">
		<h1>Error 404 - Page Not found</h1>
	</div>
</section>
<div class="twocolumns">
	<div class="container">
		<div class="entry-content">
			<p>It seems we can&rsquo;t find what you&rsquo;re looking for.
				Perhaps searching, or one of the links below, can help.</p>

			<div class="form-area">
				<?php get_search_form(); ?>
			</div>
		</div>
	</div>
</div>

<?php get_footer(); ?>
