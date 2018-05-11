jQuery(window).load(function () {
    var page = 2;
    var postPerResponse = 6;
    var $window = jQuery(window);
    var loading = false;
    var $content1 = jQuery("ul.attorneys-list");
    var $template = '/wp-content/themes/dwk/loophandler.php';
     var load_posts_new = function () {
        jQuery.ajax({
            type: "GET",
            data: {numposts: postPerResponse, pagenumber: page},
            dataType: "html",
            url: $template,
            beforeSend: function () {
                if (page != 1) {
                    $content1.append('<div id="temp_load" style="text-align:center">\
                            <img src="/wp-content/themes/dwk/images/loading1.gif" />\
                            </div>');
                }
            },
            success: function (data) {
                $data = jQuery(data);
                if ($data.length) {
                    $data.hide();
                    $content1.append($data);
                    $data.fadeIn(500, function () {
                        jQuery("#temp_load").remove();
                        loading = false;
                        jQuery('.attorneys-list').dpSameHeight({
                            alignBlocksSelector    : '.attorney-item',
                            byRows                 : false
                        });
                    });
                } else {
                    jQuery("#temp_load").remove();
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                jQuery("#temp_load").remove();
                alert(jqXHR + " :: " + textStatus + " :: " + errorThrown);
            }

        });
    }
    jQuery(window).scroll(function () {
        if (jQuery('#scroll-block').hasClass('attorneys-list')) {
            var content_offset = $content1.offset();
            if (!loading && ($window.scrollTop() + $window.height()) > ($content1.scrollTop() + $content1.height() + content_offset.top)) {
                loading = true;
                if (page < postPerResponse) {
                    load_posts_new();
                    page++;
                }

            }
        }
    });
});