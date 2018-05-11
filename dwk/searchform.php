<?php
/**
 * The template for displaying search forms
 * @package WordPress
 * @subpackage Theme name
 */

?>
<form method="get" id="searchform"
      action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<input type="search" class="field" name="s" id="s" placeholder="Search"/>
	<input type="submit" class="submit" name="submit" id="searchsubmit"
	       value="Search"/>
</form>
