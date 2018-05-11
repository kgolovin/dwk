<?php
/*
* Filename.......: vcard_example.php
* Author.........: Troy Wolf [troy@troywolf.com]
* Last Modified..: 2005/07/14 13:30:00
* Description....: An example of using Troy Wolf's class_vcard.
*/

/*
Modify the path according to your system.
*/
require_once( 'class_vcard.php' );

/*
Instantiate a new vcard object.
*/
$vc = new vcard();

$vcardData = array();
parse_str( $_SERVER['QUERY_STRING'], $vcardData );
$vcardData = array_map( 'strval', $vcardData );

$fullname = ( isset( $vcardData['name'] ) ? $vcardData['name'] : '' );
$email    = ( isset( $vcardData['email'] ) ? $vcardData['email'] : '' );
$phone    = ( isset( $vcardData['phone'] ) ? $vcardData['phone'] : '' );
$fax      = ( isset( $vcardData['fax'] ) ? $vcardData['fax'] : '' );
$title    = ( isset( $vcardData['title'] ) ? $vcardData['title'] : '' );
$position = ( isset( $vcardData['position'] ) ? $vcardData['position'] : '' );
$avatar   = ( isset( $vcardData['avatar'] ) ? $vcardData['avatar'] : '' );

$address = ( isset( $vcardData['address'] ) ? $vcardData['address'] : '' );
$city    = ( isset( $vcardData['city'] ) ? $vcardData['city'] : '' );
$code    = ( isset( $vcardData['code'] ) ? $vcardData['code'] : '' );
$zip     = ( isset( $vcardData['zip'] ) ? $vcardData['zip'] : '' );


if ( $title == '' ) {
	// $title = 'Attorney';
	$title = $vcardData['title'];
}

/*
filename is the name of the .vcf file that will be sent to the user if you
call the download() method. If you leave this blank, the class will
automatically build a filename using the contact's data.
*/
#$vc->filename = "";

/*
If you leave this blank, the current timestamp will be used.
*/
#$vc->revision_date = "";

/*
Possible values are PUBLIC, PRIVATE, and CONFIDENTIAL. If you leave class
blank, it will default to PUBLIC.
*/
#$vc->class = "PUBLIC";

/*
Contact's name data.
If you leave display_name blank, it will be built using the first and last name.
*/
$vc->data['display_name'] = $fullname;
$vc->data['first_name']   = $fullname;
//$vc->data['last_name'] = $fullname;
#$vc->data['additional_name'] = ""; //Middle name
#$vc->data['name_prefix'] = "";  //Mr. Mrs. Dr.
#$vc->data['name_suffix'] = ""; //DDS, MD, III, other designations.
//$vc->data['nickname'] = $fullname;

/*
Contact's company, department, title, profession
*/
$vc->data['company'] = "Dannis Woliver Kelley";
#$vc->data['department'] = $position;
$vc->data['title'] = $position;
#$vc->data['role'] = "";
$vc->data['office'] = $address;
/*
Contact's work address
*/
#$vc->data['work_po_box'] = "";
#$vc->data['work_extended_address'] = "";
#$vc->data['work_address'] = $address;
$vc->data['work_city'] = $address;
#$vc->data['work_state'] = $code;
#$vc->data['work_postal _code'] = $zip;
#$vc->data['work_country'] = "United States of America";

/*
Contact's home address
*/
#$vc->data['home_po_box'] = "";
#$vc->data['home_extended_address'] = "";
#$vc->data['home_address'] = "";
#$vc->data['home_city'] = "";
#$vc->data['home_state'] = "";
#$vc->data['home_postal_code'] = "";
#$vc->data['home_country'] = "United States of America";

/*
Contact's telephone numbers.
*/
$vc->data['office_tel'] = $phone;
#$vc->data['home_tel'] = "";
$vc->data['cell_tel'] = "";
$vc->data['fax_tel']  = $fax;
#$vc->data['pager_tel'] = "";

/*
Contact's email addresses
*/
$vc->data['email1'] = $email;
#$vc->data['email2'] = "";

/*
Contact's website
*/
$vc->data['url'] = "http://dwkesq.com";

/*
Some other contact data.
*/
$vc->data['photo']    = $avatar;  //Enter a URL.
$vc->data['birthday'] = "";
$vc->data['timezone'] = "";

/*
If you leave this blank, the class will default to using last_name or company.
*/
#$vc->data['sort_string'] = "";

/*
Notes about this contact.
*/
#$vc->data['note'] = "";

/*
Generate card and send as a .vcf file to user's browser for download.
*/
$vc->download();


?>
