<?php
/**
 * The template for displaying Comments.
 * @package WordPress
 * @subpackage Theme name
 */

?>
<div id="comments">
	<?php if (post_password_required()) : ?>
	<p class="nopassword">This post is password protected. Enter the password to
		view any comments.</p>
</div><!-- #comments -->
<?php

/*
 * Stop the rest of comments.php from being processed,
 * but don't kill the script entirely -- we still have
 * to fully load the template.
 */

return;
endif;
?>

<?php if ( have_comments() ) : ?>
	<ol class="commentlist">
		<?php
		wp_list_comments();
		?>
	</ol>

	<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : ?>
		<div id="comment-nav-below">
			<h1 class="assistive-text">Comment navigation</h1>

			<div
				class="nav-previous"><?php previous_comments_link( '&larr; Older Comments' ); ?></div>
			<div
				class="nav-next"><?php next_comments_link( 'Newer Comments &rarr;' ); ?></div>
		</div>
	<?php endif;

/*
 * If there are no comments and comments are closed, let's leave a little note, shall we?
 * But we don't want the note on pages or post types that do not support comments.
 */
elseif ( ! comments_open() && ! is_page() && post_type_supports( get_post_type(), 'comments' ) ) :
	?>
	<p class="nocomments">Comments are closed.</p>
<?php endif; ?>

<?php comment_form(); ?>

</div>
