(function (win, doc, $) {
    // page init
    $(function(){
        initSlideShow();
       initCustomForm();
        //initTabs();
        initOpenClose();
        initfocus();
        initImages();
        initSameHeights();
        initRegister();
    /*    $('a.print').click(function() {
         win.print();
            return false;
        });*/
        $( '.wysija-paragraph' ).wrapAll( '<div class="inputs-subscribe" />');
        $( '.wysija-checkbox-paragraph' ).wrapAll( '<div class="check-area" />');
        $(".title-row").next(".check-area").andSelf().wrapAll("<div class='check-block'>");
         if ( $( 'form' ).hasClass( "filter-form" ) ) {
            $('form').each(function() {
                $(this).find('input').keypress(function(e) {
                    if(e.which == 10 || e.which == 13) {
                        this.form.submit();
                    }
                });

            });
        }
        initResponsiveTabs();
    });
    $( window).load(function() {
        $('a.print').click(function() {
            var src1= $('.captcha img').attr('src');
//            .replace( '.png', 'Big.png' );
         //   alert(src1);
            return false;
        });
    });
    $(doc).scroll(function() {
        if ($(doc).scrollTop() >= 1) {
            $('body').addClass('scrolled');
        } else {
            $('body').removeClass('scrolled');
        }
    });

    function initfocus(){
        $(".wpcf7-text").each(function(){
            $(this).focus(function(){
                $(this).parents('.col').find('.placeholder').hide();
            });
            $(this).blur(function(){
                if($(this).val()==''){
                    $(this).parents('.col').find('.placeholder').show();
                }
            });
        });
        $(".wpcf7-form-control").each(function(){
            $(this).focus(function(){
                $(this).parents('.captcha-input').find('.placeholder').hide();
            });
            $(this).blur(function(){
                if($(this).val()==''){
                    $(this).parents('.captcha-input').find('.placeholder').show();
                }
            });
        });
         $("textarea.wpcf7-textarea").each(function(){
            $(this).focus(function(){
                $(this).parents('.row').find('.placeholder').hide();
            });
            $(this).blur(function(){
                if($(this).val()==''){
                    $(this).parents('.row').find('.placeholder').show();
                }
            });
        });
    }
    function initRegister(){
        var title_event =  $('.info-box h2').text();
        $('.name_event input').val(title_event);
          $(".add-btn").click(function () {
            $('.hidden-item:first .wpcf7-text').addClass('required');
            $( '.hidden-item:first' ).slideDown().removeClass('hidden-item');
            return false;
        });
        $(".register_button").click(function () {
            $('.register-block').slideToggle();
            return false;
        });
        if ( $('#email-subscribe' ).hasClass( "hide-email" ) ) {
            var email = $('#email-subscribe').text();
            $('.wysija-paragraph input[title="Email"]').val(email);
        }
        $('#selecctall').click(function(event) {  //on click
            if(this.checked) { // check select status
                $('.wysija-checkbox').each(function() { //loop through each checkbo
                    this.checked = true;  //select all checkboxes with class "checkbox1"
               });
            }else{
                $('.wysija-checkbox').each(function() { //loop through each checkbox
                    this.checked = false; //deselect all checkboxes with class "checkbox1"
                  });
            }
        });
        $(".close").click(function () {
            $( this).parents('.form-item').slideUp().addClass('hidden-item');
            $( this).parents('.form-item').find('.required').addClass('required');
            $('.hidden-item .wpcf7-text').addClass('required');
            return false;
        });
    }
    // initImages
    function initImages() {
        $('.intro-section .visual').children('img').each(function () {
            var image = $(this),
                parent = image.closest('.visual'),
                url = image.attr('src');

            parent.css('background-image', 'url(' + url + ')');
        });
        $('.gallery-section .image-cell').each(function () {
                var holder = $(this),
                    image = holder.find('img'),
                    url = image.attr('src');

                holder.css('background-image', 'url(' + url + ')');
            });
        }

    function initAccordion() {

        $(".accordion-item .mobile-opener").click(function () {
            //$(this).next(".slide").slideToggle("300").siblings(".slide:visible").slideUp("300");
            $(this).parents(".accordion-item").toggleClass('active');
            //$(".accordion-item .slide").not($(this).next()).slideUp('300');
            $(".accordion-item").not($(this).parents('.accordion-item')).removeClass('active');
        });
    }

    function initResponsiveTabs() {
        var itemSelector = '.accordion-item';
        var accordionItems = $(itemSelector);
        var tabsContainer = $('.tab-nav');
        var tabsHolder = $(".tabs-holder");
        var itemsTabs = tabsContainer.find(itemSelector);
        var itemsSimple = accordionItems.not(itemsTabs);
        var markerArrow = tabsContainer.children('span.arrow');
        var $win = $(win);

        itemsTabs.on('click', '.mobile-opener', function (e) {
            e.preventDefault();
            var targetItem = $(e.currentTarget).closest(itemSelector);
            var wasActive = targetItem.hasClass('active');
            var isAccordion = isAccordionView();

            if (wasActive && !isAccordion) {
                return;
            }

            // deactivate previous active item && update size
            isAccordion && switchItemState(itemsSimple.filter('.active'), false);
            switchItemState(itemsTabs.filter('.active'), false);

            // activate next item && update size && position tab arrow
            switchItemState(targetItem, !wasActive);
            positionTabArrow();
            updateTabsHolderSize();
        });

        itemsSimple.on('click', '.mobile-opener', function (e) {
            e.preventDefault();
            var targetItem = $(e.currentTarget).closest(itemSelector);
            var wasActive = targetItem.hasClass('active');
            var isAccordion = isAccordionView();

            if (!isAccordion) {
                return ;
            }

            // deactivate previous active item && update size
            switchItemState(itemsSimple.filter('.active'), false);
            switchItemState(itemsTabs.filter('.active'), false);

            // activate next item && update size
            switchItemState(targetItem, !wasActive);
        });

        $win.on('load resize.responsive-tabs.update orientationchange.responsive-tabs.update', function () {
            updateOpenedTabs();
            positionTabArrow();
            updateSlideSize();
            updateTabsHolderSize();
        });

        function updateOpenedTabs() {
            var isAccordion = isAccordionView();
            var hasActiveTab = itemsTabs.is('.active');

            if (!isAccordion) {
                switchItemState(itemsSimple.filter('.active'), false);
            }

            if (!isAccordion && !hasActiveTab) {
                switchItemState(itemsTabs.eq(0), true);
            }
        }

        function switchItemState(el, state) {
            var slide = el.find('.slide');
            el.toggleClass('active', state);
            updateSlideSize();
        }

        function positionTabArrow() {
            if (isAccordionView() || !tabsContainer.length) {
                return ;
            }

            var activeTabLink = itemsTabs.filter('.active').find('.mobile-opener');
            var left =
                activeTabLink.position().left +
                (activeTabLink.outerWidth() / 2);

            markerArrow.css('left', left);
        }

        function isAccordionView() {
            return itemsTabs
                    .children('.slide')
                    .css('position') !== 'absolute';
        }

        function updateSlideSize() {
            accordionItems.each(function () {
                var item = $(this);
                var slide = item.find('.slide');
                var openerSubHeader = item.find('.mobile-opener span');
                var isActive = item.hasClass('active');
                slide.css('height', isActive ? slide.children('.slide-holder').outerHeight() : '');

                if (openerSubHeader.length) {
                    openerSubHeader.css('height', isActive ? openerSubHeader.children('em').outerHeight() : '');
                }
            });
        }

        function updateTabsHolderSize() {
            var slideHeight = itemsTabs
                .filter('.active')
                .find('.slide > .slide-holder')
                .outerHeight();

            var isAccordion = isAccordionView();

            tabsHolder.css("padding-bottom" , !isAccordion ? slideHeight : '');
        }
    }

    // OpenClose init
    function initOpenClose() {
        $(function(){
            $('.search-form').dpOpenClose({
                controller          : '.search-opener',
                effect              : {
                    type     : 'drop',
                    showSpeed: 400,
                    hideSpeed: 400
                },
                contentMask         : '.slide',
                classBeforeAnimation: 'open',
                classOpened         : 'opened',

                bodyClose           : true
            });
            $(function(){
                $('#header').dpOpenClose({
                    controller          : '.menu-opener',
                    effect              : {
                        type     : 'drop',
                        showSpeed: 400,
                        hideSpeed: 400
                    },
                    contentMask         : '.header-set',
                    classBeforeAnimation: 'open',
                    classOpened         : 'opened',
                    bodyClose           : true
                });
            });
            $('.single-practices .full-link').click( function() {
                $('.full-content').slideToggle();
                $(this).toggleClass('active-content');
                if ($(this).hasClass('active-content')) {
                    $(this).text('Show Less');
                }else{
                    $(this).text('More');
                }
                return false;
            });
            $('.single-attorneys .full-link').click( function() {
                $('.full-content').slideToggle();
                $(this).toggleClass('active-content');
                if ($(this).hasClass('active-content')) {
                    $(this).text('Show Less');
                }else{
                    $(this).text('Full Bio');
                }
                return false;
            });
        });
    }
    // fade gallery init
    function initSlideShow() {
        var galleryContainer = $('.gallery-section');
        var switcher = galleryContainer.find('.switcher');
        var galleryInstance = galleryContainer.fadeGallery({
            slides: '.slide',
            btnPrev: '.btn-prev',
            btnNext: '.btn-next',
            generatePagination: '.switcher',
            event: 'click',
            useSwipe: true,
            autoRotation: false,
            autoHeight: true,
            switchTime: 3000,
            animSpeed: 500,
            onChange: updateSwitcherPosition
        }).data('FadeGallery');

        if (!galleryContainer.length && !galleryInstance) {
            return ;
        }

        $(win).on('load resize.gallery.update orientationchange.gallery.update', function () {
            updateSwitcherPosition();
        });

        function updateSwitcherPosition() {
            var gallery = galleryInstance;
            var currentSlideImgCell = gallery.slides
                .eq(gallery.currentIndex)
                .find('.image-cell');
            var topOffset = currentSlideImgCell.outerHeight() -
                switcher.outerHeight() -
                15; // 15px - default offset from bottom for .switcher

            switcher.css('top', topOffset);
        }
    }

    // init CustomForm
    function initCustomForm(){
        var onSelected = function (item, input) {
        var value = input.parents('.wpcf7-form-control-wrap').find('.dp-select-input span').text();
        if ( value == '') {
            input.parents('.wpcf7-form-control-wrap').addClass('hide-placeholder');
        }else{
            input.parents('.wpcf7-form-control-wrap').removeClass('hide-placeholder');
        }
        };
        //init plugin and attach handler to each select
        $('select').dpCustomSelect().each(function () {
            var plugin = $(this).data('dpCustomSelect');
            plugin.on('itemSelect', onSelected);
        });
         $('.main-form [type="checkbox"]').dpCustomCheckbox();
        if ( $( '#subscribe-form' ).hasClass( "subscribe" ) ) {
           var selectAll = $('#selecctall').data('dpCustomCheckbox');
             var allCheckboxes = $('p.wysija-checkbox-paragraph input');
             selectAll.on('selected', function() {
             allCheckboxes.each(function(object, value) {
             $(value).data('dpCustomCheckbox').updateStatus();
             });
             });
             selectAll.on('deselected', function() {
             allCheckboxes.each(function(object, value) {
             $(value).data('dpCustomCheckbox').updateStatus();
             });
             });
        }

    }

    // init SameHeights
    function initSameHeights() {
        $('.attorneys-list').dpSameHeight({
            alignBlocksSelector    : '.attorney-item',
            byRows                 : false
        });
    }

    // content tabs init
    function initTabs() {
        $('.tab-nav > ul').tabset({
            tabLinks: '.tab-link',
            addToParent: true
        });
        if(typeof tabs_set == 'function'){
            if ( $('nav').hasClass("tab-nav") ) {
                tabs_set();
            }
        }
    }

    function tabs_set() {
        var width =  $('.tab-nav li.active').width();
        $("<style type='text/css' id='dynamic' />").appendTo("head");
        if ( $( 'nav' ).hasClass( "tab-nav" ) ) {
            var offset1 = $(".tab-nav").offset();
            var offset2 = $(".tab-nav li.active").offset();
            var left = width/2;
            var position = offset2.left - offset1.left + width/2;
            $("#dynamic").text(".tab-nav > ul > li.active::before, .tab-nav > ul > li.active::after{left:" + position + "px;}");
        }
        var height_tabs = $(".tab-nav li.active .tab-box").outerHeight();
        $(".tabs-holder").css("padding-bottom" , height_tabs);
    }

    win.tabs_set = tabs_set;
})(window, document, jQuery);


/*
 * jQuery Tabs plugin
 */
;(function($, $win, win) {
    'use strict';

    function Tabset($holder, options) {
        this.$holder = $holder;
        this.options = options;

        this.init();
    }

    Tabset.prototype = {
        init: function() {
            this.$tabLinks = this.$holder.find(this.options.tabLinks);

            this.setStartActiveIndex();
            this.setActiveTab();

            if (this.options.autoHeight) {
                this.$tabHolder = $(this.$tabLinks.eq(0).attr(this.options.attrib)).parent();
            }

        },

        setStartActiveIndex: function() {

            var $activeLink = this.$tabLinks.filter('.' + this.options.activeClass);
            var $hashLink = this.$tabLinks.filter('[' + this.options.attrib + '="' + location.hash + '"]');
            var activeIndex;

            if (this.options.checkHash && $hashLink.length) {
                $activeLink = $hashLink;
            }

            activeIndex = this.$tabLinks.index($activeLink);

            this.activeTabIndex = this.prevTabIndex = (activeIndex === -1 ? 0 : activeIndex);
        },

        setActiveTab: function() {
            var self = this;
            this.$tabLinks.each(function(i, link) {
                var $link = $(link);
                var $classTarget = self.getClassTarget($link);
                var $tab = $($link.attr(self.options.attrib));

                if (i !== self.activeTabIndex) {
                    $classTarget.removeClass(self.options.activeClass);
                    $tab.addClass(self.options.tabHiddenClass).removeClass(self.options.activeClass);
                } else {
                    $classTarget.addClass(self.options.activeClass);
                    $tab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);
                }

                self.attachTabLink($link, i);
            });
        },

        attachTabLink: function($link, i) {
            var self = this;

            $link.on(this.options.event + '.tabset', function(e) {
                e.preventDefault();

                if (self.activeTabIndex === self.prevTabIndex && self.activeTabIndex !== i) {
                    self.activeTabIndex = i;
                    self.switchTabs();
                }
            });
        },

        resizeHolder: function(height) {
            var self = this;

            if (height) {
                this.$tabHolder.height(height);
                setTimeout(function() {
                    self.$tabHolder.addClass('transition');
                }, 10);
            } else {
                self.$tabHolder.removeClass('transition').height('');
            }
        },

        switchTabs: function() {

            var self = this;
            var $prevLink = this.$tabLinks.eq(this.prevTabIndex);
            var $nextLink = this.$tabLinks.eq(this.activeTabIndex);

            var $prevTab = this.getTab($prevLink);
            var $nextTab = this.getTab($nextLink);

            $prevTab.removeClass(this.options.activeClass);

            if (self.haveTabHolder()) {
                this.resizeHolder($prevTab.outerHeight());
            }

            setTimeout(function() {
                self.getClassTarget($prevLink).removeClass(self.options.activeClass);

                $prevTab.addClass(self.options.tabHiddenClass);
                $nextTab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);

                self.getClassTarget($nextLink).addClass(self.options.activeClass);

                if (self.haveTabHolder()) {
                    self.resizeHolder($nextTab.outerHeight());

                    setTimeout(function() {
                        self.resizeHolder();
                        self.prevTabIndex = self.activeTabIndex;
                    }, self.options.animSpeed);
                } else {
                    self.prevTabIndex = self.activeTabIndex;
                    if(typeof win.tabs_set == 'function'){
                        win.tabs_set();
                    }
                }
            }, this.options.autoHeight ? this.options.animSpeed : 1);

        },

        getClassTarget: function($link) {
            return this.options.addToParent ? $link.parent() : $link;
        },

        getActiveTab: function() {

            return this.getTab(this.$tabLinks.eq(this.activeTabIndex));
        },

        getTab: function($link) {
            return $($link.attr(this.options.attrib));
        },

        haveTabHolder: function() {
            return this.$tabHolder && this.$tabHolder.length;
        },

        destroy: function() {
            var self = this;

            this.$tabLinks.off('.tabset').each(function() {
                var $link = $(this);

                self.getClassTarget($link).removeClass(self.options.activeClass);
                $($link.attr(self.options.attrib)).removeClass(self.options.activeClass + ' ' + self.options.tabHiddenClass);
            });

            this.$holder.removeData('Tabset');
        }
    };

    $.fn.tabset = function(options) {
        options = $.extend({
            activeClass: 'active',
            addToParent: false,
            autoHeight: false,
            checkHash: false,
            animSpeed: 500,
            tabLinks: 'a',
            attrib: 'href',
            event: 'click',
            tabHiddenClass: 'js-tab-hidden'
        }, options);
        options.autoHeight = options.autoHeight && $.support.opacity;

        return this.each(function() {
            var $holder = $(this);

            if (!$holder.data('Tabset')) {
                $holder.data('Tabset', new Tabset($holder, options));
            }
        });
    };
})(jQuery, jQuery(window), window);

// SameHeights
(function(t,e){e.DP=e.DP||{};e.DP.Class=e.DP.Class||function(){function t(){}t.extend=function n(t,i){var s,r,o=this;i=i||{};if("function"===typeof t._constructor){s=function(){this._super=o;t._constructor.apply(this,arguments);this._super=null}}else{s=function(){o.apply(this,arguments)}}r=new Function;r.prototype=o.prototype;s.prototype=new r;for(var u in t)if(t.hasOwnProperty(u))(function(t,e){if(e==="_constructor"){return}if("function"===typeof t){s.prototype[e]=function(){var n,s;if(this._super){s=this._super}this._super=o.prototype[e];if("function"===typeof i["function"]){n=i["function"].call(this,e,t,o,arguments)}else{n=t.apply(this,arguments)}this._super=s||null;return n};return}if("function"===typeof i.other){s.prototype[e]=i.other.call(this,e,t,o);return}s.prototype[e]=t})(t[u],u);s.prototype.constructor=s;s.prototype._common={_instanceCounter:0};s.extend=n;s.extension=e;return s};function e(t,e,n){var i=this.extend(t,e);if(typeof n==="string"){n=[n]}n=(n||[]).concat("extend","extension");for(var s in this){if(this.hasOwnProperty(s)&&n.indexOf(s)===-1){i[s]=this[s]}}return i}t.extension=e;return t}();e.DP.Core=e.DP.Core||function(){var e=DP.Class.extend({name:"unnamed",_defaultSettings:{},init:function(){this._listeners=[];this.namespace="."+this.name+"-"+this._common._instanceCounter++},destroy:function(){this._unbindEvents()},_bindEvents:function(){},_applySettings:function(e){var n=this;e=t.extend(true,{},this._defaultSettings,e);t.each(this._defaultSettings,function(t){n[t]=e[t]})},_listenTo:function(){var e=t(Array.prototype.shift.apply(arguments)),n=arguments[0].split(" ");this._listeners.push(e);for(var i=0,s=n.length;i<s;i++){n[i]+=this.namespace}arguments[0]=n.join(" ");if("function"===typeof arguments[1]){arguments[1]=t.proxy(arguments[1],this)}else{arguments[2]=t.proxy(arguments[2],this)}t.fn.on.apply(e,arguments)},_unbindEvents:function(){for(var e=0,n=this._listeners.length;e<n;e++){t(this._listeners[e]).off(this.namespace)}}}),n=e.extend;e.extend=function s(e,r){var o;r=r||{};r.other=function(e,n,i){if(e==="_defaultSettings"){return t.extend(true,{},i.prototype[e],n)}return n};o=n.call(this,e,r);o.extend=s;o.defineModule=i;return o};function i(n,i){this.prototype._defaultSettings.modules={};i=i||{};i._constructor=function(e,i){if(i&&i.modules){t.extend(true,i,i.modules[n])}this._super(e,i)};return e.extension.call(this,i,{"function":function(t,e,i,s){if(n in this.modules){return e.apply(this,s)}else{if(this._super){return this._super.apply(this,s)}}}})}return e}();e.DP.Plugins=e.DP.Plugins||{};e.DP.Plugins.Core=e.DP.Plugins.Core||function(){var n=function(){var t=Array.prototype.slice.call(arguments),e=t.pop();t.push(function(){var t=Array.prototype.slice.call(arguments);t.shift();e.apply(null,t)});return t};var i=function(t){return[t[0],Array.prototype.slice.call(t,1)]};var s={on:function(){this.__observer=this.__observer||t({});this.__observer.on.apply(this.__observer,n.apply(null,arguments));return this},once:function(){this.__observer=this.__observer||t({});this.__observer.one.apply(this.__observer,n.apply(null,arguments));return this},off:function(){this.__observer=this.__observer||t({});this.__observer.off.apply(this.__observer,arguments);return this},trigger:function(){this.__observer=this.__observer||t({});this.__observer.trigger.apply(this.__observer,i(arguments));return this}};var r=DP.Core.extend(t.extend({},s,{_publicEvents:[],_constructor:function(e,n){this._container=e;var i=this._container.data(this._settingsData)||{};if(typeof i!=="object"){i={}}this._applySettings(t.extend(true,{},n,i))},init:function(){this._super();var t=this;r.messageBus.on("state:update"+this.namespace,function(e){if(t._container.parents().index(e)!==-1){t._updateState.apply(t,arguments)}})},_updateState:function(t){console.log("OVERRIDE THIS METHOD","PARENT = ",t)},destroy:function(){r.messageBus.off(this.namespace);this._super()},_checkIsMobile:function(){var t;return function(){if(t===undefined){var n="ontouchstart"in e||e.DocumentTouch&&document instanceof DocumentTouch,i=/Windows Phone/.test(navigator.userAgent);t=!!(n||i)}return t}}()}));var o=r.extend;r.extend=function a(){var t=o.apply(this,arguments);t.effects=function(){var t={},e;e=function(e){var n=e.type;if(t[(n||"").toLowerCase()]){return new(t[n.toLowerCase()])(e)}return new t["default"](e)};e.define=function(e,n){t[e]=n};return e}();t.extend=a;return t};r.messageBus=t.extend({},{},s);var u=r.prototype.trigger;r.prototype.trigger=function(e){if(t.inArray(e,this._publicEvents)!==-1){var n=Array.prototype.slice.call(arguments);n.unshift(this._container);n.unshift("state:update");r.messageBus.trigger.apply(r.messageBus,n)}u.apply(this,arguments)};return r}();DP.Plugins.SameHeight=DP.Plugins.Core.extend({_defaultSettings:{alignBlocksSelector:".block",byRows:false,calculationsClassPrefix:"same-height"},_heightCalculators:{"-half":function(t){return Math.round(t/2)},"-one-third":function(t){return Math.round(t/3)},"-double":function(t){return t*2}},name:"same-height",_constructor:function(t,e){this._super(t,e);this.init()},init:function(){this._blocks=this._container.find(this.alignBlocksSelector);if(this._blocks.length<2){return}this._super(this);this.setBlocksHeight();this._bindEvents()},destroy:function(){this._super();this.resetHeight();this._blocks=null},_bindEvents:function(){this._listenTo(t(e),"resize orientationchange load",this._onResize);this._blocks.find("img").one("load",t.proxy(this._onResize,this))},_getMaxHeight:function(e){var n=t.map(e,function(e){return t(e).outerHeight()});n.push(0);return Math.max.apply(Math,n)},setBlocksHeight:function(){var e=this,n=t(),i=this._blocks.eq(0).offset().top;if(!this.byRows){this._setBlocksHeightConsideringSuffix(this._blocks);return}this._blocks.each(function(){var s=t(this);if(s.offset().top===i){n=n.add(s);return}e._setBlocksHeightConsideringSuffix(n);n=s;i=s.offset().top});if(n.length){this._setBlocksHeightConsideringSuffix(n)}this.trigger("setHeight",this._blocks)},_setBlocksHeightConsideringSuffix:function(t){var e=this._heightCalculators,n=this._getMaxHeight(t),i,s,r;t.outerHeight(n);for(s in e){if(!e.hasOwnProperty(s)){continue}r="."+this.calculationsClassPrefix+s;i=t.filter(r);if(!i.length){continue}i.outerHeight(e[s](n))}},resetHeight:function(){this._blocks.height("")},_onResize:function(){this.resetHeight();this.setBlocksHeight()}});t.fn.dpSameHeight=function(e){return this.each(function(){var n=t(this);n.data("dpSameHeight",new DP.Plugins.SameHeight(n,e))})}})(jQuery,window);

// Custom Checkbox
(function(t,e){e.DP=e.DP||{};e.DP.Class=e.DP.Class||function(){function t(){}t.extend=function s(t,n){var i,r,o=this;n=n||{};if("function"===typeof t._constructor){i=function(){this._super=o;t._constructor.apply(this,arguments);this._super=null}}else{i=function(){o.apply(this,arguments)}}r=new Function;r.prototype=o.prototype;i.prototype=new r;for(var a in t)if(t.hasOwnProperty(a))(function(t,e){if(e==="_constructor"){return}if("function"===typeof t){i.prototype[e]=function(){var s,i;if(this._super){i=this._super}this._super=o.prototype[e];if("function"===typeof n["function"]){s=n["function"].call(this,e,t,o,arguments)}else{s=t.apply(this,arguments)}this._super=i||null;return s};return}if("function"===typeof n.other){i.prototype[e]=n.other.call(this,e,t,o);return}i.prototype[e]=t})(t[a],a);i.prototype.constructor=i;i.prototype._common={_instanceCounter:0};i.extend=s;i.extension=e;return i};function e(t,e,s){var n=this.extend(t,e);if(typeof s==="string"){s=[s]}s=(s||[]).concat("extend","extension");for(var i in this){if(this.hasOwnProperty(i)&&s.indexOf(i)===-1){n[i]=this[i]}}return n}t.extension=e;return t}();e.DP.Core=e.DP.Core||function(){var e=DP.Class.extend({name:"unnamed",_defaultSettings:{},init:function(){this._listeners=[];this.namespace="."+this.name+"-"+this._common._instanceCounter++},destroy:function(){this._unbindEvents()},_bindEvents:function(){},_applySettings:function(e){var s=this;e=t.extend(true,{},this._defaultSettings,e);t.each(this._defaultSettings,function(t){s[t]=e[t]})},_listenTo:function(){var e=t(Array.prototype.shift.apply(arguments)),s=arguments[0].split(" ");this._listeners.push(e);for(var n=0,i=s.length;n<i;n++){s[n]+=this.namespace}arguments[0]=s.join(" ");if("function"===typeof arguments[1]){arguments[1]=t.proxy(arguments[1],this)}else{arguments[2]=t.proxy(arguments[2],this)}t.fn.on.apply(e,arguments)},_unbindEvents:function(){for(var e=0,s=this._listeners.length;e<s;e++){t(this._listeners[e]).off(this.namespace)}}}),s=e.extend;e.extend=function i(e,r){var o;r=r||{};r.other=function(e,s,n){if(e==="_defaultSettings"){return t.extend(true,{},n.prototype[e],s)}return s};o=s.call(this,e,r);o.extend=i;o.defineModule=n;return o};function n(s,n){this.prototype._defaultSettings.modules={};n=n||{};n._constructor=function(e,n){if(n&&n.modules){t.extend(true,n,n.modules[s])}this._super(e,n)};return e.extension.call(this,n,{"function":function(t,e,n,i){if(s in this.modules){return e.apply(this,i)}else{if(this._super){return this._super.apply(this,i)}}}})}return e}();e.DP.Plugins=e.DP.Plugins||{};e.DP.Plugins.Core=e.DP.Plugins.Core||function(){var s=function(){var t=Array.prototype.slice.call(arguments),e=t.pop();t.push(function(){var t=Array.prototype.slice.call(arguments);t.shift();e.apply(null,t)});return t};var n=function(t){return[t[0],Array.prototype.slice.call(t,1)]};var i={on:function(){this.__observer=this.__observer||t({});this.__observer.on.apply(this.__observer,s.apply(null,arguments));return this},once:function(){this.__observer=this.__observer||t({});this.__observer.one.apply(this.__observer,s.apply(null,arguments));return this},off:function(){this.__observer=this.__observer||t({});this.__observer.off.apply(this.__observer,arguments);return this},trigger:function(){this.__observer=this.__observer||t({});this.__observer.trigger.apply(this.__observer,n(arguments));return this}};var r=DP.Core.extend(t.extend({},i,{_publicEvents:[],_constructor:function(e,s){this._container=e;var n=this._container.data(this._settingsData)||{};if(typeof n!=="object"){n={}}this._applySettings(t.extend(true,{},s,n))},init:function(){this._super();var t=this;r.messageBus.on("state:update"+this.namespace,function(e){if(t._container.parents().index(e)!==-1){t._updateState.apply(t,arguments)}})},_updateState:function(t){console.log("OVERRIDE THIS METHOD","PARENT = ",t)},destroy:function(){r.messageBus.off(this.namespace);this._super()},_checkIsMobile:function(){var t;return function(){if(t===undefined){var s="ontouchstart"in e||e.DocumentTouch&&document instanceof DocumentTouch,n=/Windows Phone/.test(navigator.userAgent);t=!!(s||n)}return t}}()}));var o=r.extend;r.extend=function h(){var t=o.apply(this,arguments);t.effects=function(){var t={},e;e=function(e){var s=e.type;if(t[(s||"").toLowerCase()]){return new(t[s.toLowerCase()])(e)}return new t["default"](e)};e.define=function(e,s){t[e]=s};return e}();t.extend=h;return t};r.messageBus=t.extend({},{},i);var a=r.prototype.trigger;r.prototype.trigger=function(e){if(t.inArray(e,this._publicEvents)!==-1){var s=Array.prototype.slice.call(arguments);s.unshift(this._container);s.unshift("state:update");r.messageBus.trigger.apply(r.messageBus,s)}a.apply(this,arguments)};return r}();(function(){var t=function(t){if("keys"in Object&&typeof Object.keys==="function"){return Object.keys(t).length===0}var e=0,s;for(s in t){if(t.hasOwnProperty(s)){++e}}return e===0};e.mixWatcher=function(t,s,n){t.watch=t.watch||e.mixWatcher.watch;t.unwatch=t.unwatch||e.mixWatcher.unwatch;if(!("hasOwnProperty"in t)){this.hasOwnProperty=function(t){return function(e){return Object.hasOwnProperty.call(t,e)}}(t)}if(s&&n){t.watch(s,n)}};e.mixWatcher.watch=function(t,e){var s=this;this.__watcherCache=this.__watcherCache||{};this.__watcherCache[t]=this[t];this.__watcherHandlers=this.__watcherHandlers||{};this.__watcherHandlers[t]=e;this.__watcher=this.__watcher||setInterval(function(){var t=s.__watcherCache,e,n,i;if(s.hasOwnProperty("parentNode")&&s.parentNode==null){s.unwatch();return}for(e in t){if(!t.hasOwnProperty(e)){continue}n=s[e];i=t[e];if(n!==i){s.__watcherHandlers[e].call(this,e,i,n);t[e]=n}}},50)};e.mixWatcher.unwatch=function(e){if(!this.__watcher){return}if(e){this.__watcherCache[e]&&delete this.__watcherCache[e];this.__watcherHandlers[e]&&delete this.__watcherHandlers[e]}if(!e||t(this.__watcherCache)){clearInterval(this.__watcher);delete this.__watcher;delete this.__watcherCache;delete this.__watcherHandlers}}})();DP.Plugins.CustomForms=DP.Plugins.CustomForms||{};DP.Plugins.CustomForms.Core=DP.Plugins.Core.extend({_defaultSettings:{inputPositionZIndex:1,focusedClass:"dp-focus",disabledClass:"dp-disabled",wrapperElement:"span",enableWatcher:false},_settingsData:"custom",_constructor:function(t,e){this._super(t,e);this._input=null},_window:t(e),_document:t(document),init:function(){this._super();this._createWrapper();this._setDisable();this._setFocus();this._bindEvents();this._switchOnWatcher()},updateStatus:function(){this._setDisable();this._setFocus()},_createWrapper:function(){var t;this._input=this._container;t=this._createElement(this.wrapperElement,this.wrapperClass);this._input.wrap(t).css({opacity:0,position:"absolute",height:"100%",width:"100%",margin:"0px",zIndex:this.inputPositionZIndex});this._container=this._input.closest("."+this.wrapperClass);if(this.inputDisableTextSelection){this._disableTextSelection(this._container)}},_removeWrapper:function(){this._container.children().not(this._input).remove();this._input.unwrap().css({opacity:"",position:"",height:"",width:"",zIndex:""})},_createElement:function(e,s){var n=t("<"+e+">");if(s){n.addClass(s)}return n},_createElementWithChild:function(t,e,s){return this._createElement(t,e).append(s)},_createElementWithText:function(t,e,s){return this._createElement(t,e).text(s)},_disableTextSelection:function(t){t.on("selectstart",false);return t.attr("unselectable","on").css("user-select","none")},_onOutsideClick:function(t){if(t.target===this._container.get(0)||this._container.has(t.target).length){return}this._clearFocused()},_setFocused:function(){this._container.addClass(this.focusedClass)},_clearFocused:function(){this._container.removeClass(this.focusedClass)},_setDisable:function(){if(this._input.is(":disabled")){this._container.addClass(this.disabledClass);this.trigger("disabled",this._input);return}this._container.removeClass(this.disabledClass);this.trigger("enabled",this._input)},_setFocus:function(){if(this._input.is(":focus")){this._setFocused();return}this._clearFocused()},destroy:function(){this._super();this._switchOffWatcher();this._removeWrapper();this._container=this._input;this._input=null},_switchOnWatcher:function(){var s;if(!(this.enableWatcher&&e.mixWatcher&&this._watcherOptions)){return}s=this._input.get(0);mixWatcher(HTMLElement.prototype);t.each(this._watcherOptions,function(){s.watch(this.key,this.handler)})},_switchOffWatcher:function(){var t=this._input.get(0);if(t.unwatch&&typeof t.unwatch==="function"){this._input.get(0).unwatch()}}});DP.Plugins.CustomForms.Checkbox=DP.Plugins.CustomForms.Core.extend({_defaultSettings:{inputPositionZIndex:999,checkElement:"span",wrapperClass:"dp-checkbox",checkedClass:"dp-checked",unCheckedClass:"dp-unchecked",labelCheckedClass:"dp-label-active"},name:"custom-forms-checkbox",_constructor:function(e,s){var n,i;this._super(e,s);i=this._container.attr("id");this._label=t();if(i){n='[for="'+i+'"]';this._label=t(n)}this._watcherOptions=[{key:"checked",handler:t.proxy(this._setCheck,this)},{key:"disabled",handler:t.proxy(this._setDisable,this)}];this.init()},init:function(){this._super();this._setCheck()},updateStatus:function(){this._super();this._setCheck()},_createWrapper:function(){this._super();this._container.prepend(this._createElement(this.checkElement))},_bindEvents:function(){this._super();this._listenTo(this._container,"click",this._onContainerClick);this._listenTo(this._document,"click",this._onOutsideClick)},_onContainerClick:function(t){if(this._container.hasClass(this.disabledClass)){return}if(!this._input.is(t.target)){this._input.prop("checked",!this._input.prop("checked"))}this._setFocused();this._setCheck()},_setCheck:function(){if(this._input.is(":checked")){this._container.addClass(this.checkedClass).removeClass(this.unCheckedClass);this._label.addClass(this.labelCheckedClass);this.trigger("selected",this._input);return}this._container.addClass(this.unCheckedClass).removeClass(this.checkedClass);this._label.removeClass(this.labelCheckedClass);this.trigger("deselected",this._input)}});t.fn.dpCustomCheckbox=function(e){return this.each(function(){var s=t(this);s.data("dpCustomCheckbox",new DP.Plugins.CustomForms.Checkbox(s,e))})};DP.Plugins.CustomForms.Checkbox.matcher=function(e){if(t(e).is('[type="checkbox"]')){return{options:"checkbox",namespace:"dpCustomCheckbox"}}return false};DP.Plugins.CustomForms.modules&&DP.Plugins.CustomForms.modules.define(DP.Plugins.CustomForms.Checkbox,DP.Plugins.CustomForms.Checkbox.matcher)})(jQuery,window);

// Custom Select
(function(t,e){e.DP=e.DP||{};e.DP.Class=e.DP.Class||function(){function t(){}t.extend=function s(t,i){var n,r,o=this;i=i||{};if("function"===typeof t._constructor){n=function(){this._super=o;t._constructor.apply(this,arguments);this._super=null}}else{n=function(){o.apply(this,arguments)}}r=new Function;r.prototype=o.prototype;n.prototype=new r;for(var a in t)if(t.hasOwnProperty(a))(function(t,e){if(e==="_constructor"){return}if("function"===typeof t){n.prototype[e]=function(){var s,n;if(this._super){n=this._super}this._super=o.prototype[e];if("function"===typeof i["function"]){s=i["function"].call(this,e,t,o,arguments)}else{s=t.apply(this,arguments)}this._super=n||null;return s};return}if("function"===typeof i.other){n.prototype[e]=i.other.call(this,e,t,o);return}n.prototype[e]=t})(t[a],a);n.prototype.constructor=n;n.prototype._common={_instanceCounter:0};n.extend=s;n.extension=e;return n};function e(t,e,s){var i=this.extend(t,e);if(typeof s==="string"){s=[s]}s=(s||[]).concat("extend","extension");for(var n in this){if(this.hasOwnProperty(n)&&s.indexOf(n)===-1){i[n]=this[n]}}return i}t.extension=e;return t}();e.DP.Core=e.DP.Core||function(){var e=DP.Class.extend({name:"unnamed",_defaultSettings:{},init:function(){this._listeners=[];this.namespace="."+this.name+"-"+this._common._instanceCounter++},destroy:function(){this._unbindEvents()},_bindEvents:function(){},_applySettings:function(e){var s=this;e=t.extend(true,{},this._defaultSettings,e);t.each(this._defaultSettings,function(t){s[t]=e[t]})},_listenTo:function(){var e=t(Array.prototype.shift.apply(arguments)),s=arguments[0].split(" ");this._listeners.push(e);for(var i=0,n=s.length;i<n;i++){s[i]+=this.namespace}arguments[0]=s.join(" ");if("function"===typeof arguments[1]){arguments[1]=t.proxy(arguments[1],this)}else{arguments[2]=t.proxy(arguments[2],this)}t.fn.on.apply(e,arguments)},_unbindEvents:function(){for(var e=0,s=this._listeners.length;e<s;e++){t(this._listeners[e]).off(this.namespace)}}}),s=e.extend;e.extend=function n(e,r){var o;r=r||{};r.other=function(e,s,i){if(e==="_defaultSettings"){return t.extend(true,{},i.prototype[e],s)}return s};o=s.call(this,e,r);o.extend=n;o.defineModule=i;return o};function i(s,i){this.prototype._defaultSettings.modules={};i=i||{};i._constructor=function(e,i){if(i&&i.modules){t.extend(true,i,i.modules[s])}this._super(e,i)};return e.extension.call(this,i,{"function":function(t,e,i,n){if(s in this.modules){return e.apply(this,n)}else{if(this._super){return this._super.apply(this,n)}}}})}return e}();e.DP.Plugins=e.DP.Plugins||{};e.DP.Plugins.Core=e.DP.Plugins.Core||function(){var s=function(){var t=Array.prototype.slice.call(arguments),e=t.pop();t.push(function(){var t=Array.prototype.slice.call(arguments);t.shift();e.apply(null,t)});return t};var i=function(t){return[t[0],Array.prototype.slice.call(t,1)]};var n={on:function(){this.__observer=this.__observer||t({});this.__observer.on.apply(this.__observer,s.apply(null,arguments));return this},once:function(){this.__observer=this.__observer||t({});this.__observer.one.apply(this.__observer,s.apply(null,arguments));return this},off:function(){this.__observer=this.__observer||t({});this.__observer.off.apply(this.__observer,arguments);return this},trigger:function(){this.__observer=this.__observer||t({});this.__observer.trigger.apply(this.__observer,i(arguments));return this}};var r=DP.Core.extend(t.extend({},n,{_publicEvents:[],_constructor:function(e,s){this._container=e;var i=this._container.data(this._settingsData)||{};if(typeof i!=="object"){i={}}this._applySettings(t.extend(true,{},s,i))},init:function(){this._super();var t=this;r.messageBus.on("state:update"+this.namespace,function(e){if(t._container.parents().index(e)!==-1){t._updateState.apply(t,arguments)}})},_updateState:function(t){console.log("OVERRIDE THIS METHOD","PARENT = ",t)},destroy:function(){r.messageBus.off(this.namespace);this._super()},_checkIsMobile:function(){var t;return function(){if(t===undefined){var s="ontouchstart"in e||e.DocumentTouch&&document instanceof DocumentTouch,i=/Windows Phone/.test(navigator.userAgent);t=!!(s||i)}return t}}()}));var o=r.extend;r.extend=function l(){var t=o.apply(this,arguments);t.effects=function(){var t={},e;e=function(e){var s=e.type;if(t[(s||"").toLowerCase()]){return new(t[s.toLowerCase()])(e)}return new t["default"](e)};e.define=function(e,s){t[e]=s};return e}();t.extend=l;return t};r.messageBus=t.extend({},{},n);var a=r.prototype.trigger;r.prototype.trigger=function(e){if(t.inArray(e,this._publicEvents)!==-1){var s=Array.prototype.slice.call(arguments);s.unshift(this._container);s.unshift("state:update");r.messageBus.trigger.apply(r.messageBus,s)}a.apply(this,arguments)};return r}();(function(){var t=function(t){if("keys"in Object&&typeof Object.keys==="function"){return Object.keys(t).length===0}var e=0,s;for(s in t){if(t.hasOwnProperty(s)){++e}}return e===0};e.mixWatcher=function(t,s,i){t.watch=t.watch||e.mixWatcher.watch;t.unwatch=t.unwatch||e.mixWatcher.unwatch;if(!("hasOwnProperty"in t)){this.hasOwnProperty=function(t){return function(e){return Object.hasOwnProperty.call(t,e)}}(t)}if(s&&i){t.watch(s,i)}};e.mixWatcher.watch=function(t,e){var s=this;this.__watcherCache=this.__watcherCache||{};this.__watcherCache[t]=this[t];this.__watcherHandlers=this.__watcherHandlers||{};this.__watcherHandlers[t]=e;this.__watcher=this.__watcher||setInterval(function(){var t=s.__watcherCache,e,i,n;if(s.hasOwnProperty("parentNode")&&s.parentNode==null){s.unwatch();return}for(e in t){if(!t.hasOwnProperty(e)){continue}i=s[e];n=t[e];if(i!==n){s.__watcherHandlers[e].call(this,e,n,i);t[e]=i}}},50)};e.mixWatcher.unwatch=function(e){if(!this.__watcher){return}if(e){this.__watcherCache[e]&&delete this.__watcherCache[e];this.__watcherHandlers[e]&&delete this.__watcherHandlers[e]}if(!e||t(this.__watcherCache)){clearInterval(this.__watcher);delete this.__watcher;delete this.__watcherCache;delete this.__watcherHandlers}}})();DP.Plugins.CustomForms=DP.Plugins.CustomForms||{};DP.Plugins.CustomForms.Core=DP.Plugins.Core.extend({_defaultSettings:{inputPositionZIndex:1,focusedClass:"dp-focus",disabledClass:"dp-disabled",wrapperElement:"span",enableWatcher:false},_settingsData:"custom",_constructor:function(t,e){this._super(t,e);this._input=null},_window:t(e),_document:t(document),init:function(){this._super();this._createWrapper();this._setDisable();this._setFocus();this._bindEvents();this._switchOnWatcher()},updateStatus:function(){this._setDisable();this._setFocus()},_createWrapper:function(){var t;this._input=this._container;t=this._createElement(this.wrapperElement,this.wrapperClass);this._input.wrap(t).css({opacity:0,position:"absolute",height:"100%",width:"100%",margin:"0px",zIndex:this.inputPositionZIndex});this._container=this._input.closest("."+this.wrapperClass);if(this.inputDisableTextSelection){this._disableTextSelection(this._container)}},_removeWrapper:function(){this._container.children().not(this._input).remove();this._input.unwrap().css({opacity:"",position:"",height:"",width:"",zIndex:""})},_createElement:function(e,s){var i=t("<"+e+">");if(s){i.addClass(s)}return i},_createElementWithChild:function(t,e,s){return this._createElement(t,e).append(s)},_createElementWithText:function(t,e,s){return this._createElement(t,e).text(s)},_disableTextSelection:function(t){t.on("selectstart",false);return t.attr("unselectable","on").css("user-select","none")},_onOutsideClick:function(t){if(t.target===this._container.get(0)||this._container.has(t.target).length){return}this._clearFocused()},_setFocused:function(){this._container.addClass(this.focusedClass)},_clearFocused:function(){this._container.removeClass(this.focusedClass)},_setDisable:function(){if(this._input.is(":disabled")){this._container.addClass(this.disabledClass);this.trigger("disabled",this._input);return}this._container.removeClass(this.disabledClass);this.trigger("enabled",this._input)},_setFocus:function(){if(this._input.is(":focus")){this._setFocused();return}this._clearFocused()},destroy:function(){this._super();this._switchOffWatcher();this._removeWrapper();this._container=this._input;this._input=null},_switchOnWatcher:function(){var s;if(!(this.enableWatcher&&e.mixWatcher&&this._watcherOptions)){return}s=this._input.get(0);mixWatcher(HTMLElement.prototype);t.each(this._watcherOptions,function(){s.watch(this.key,this.handler)})},_switchOffWatcher:function(){var t=this._input.get(0);if(t.unwatch&&typeof t.unwatch==="function"){this._input.get(0).unwatch()}}});DP.Plugins.CustomForms.SelectCore=DP.Plugins.CustomForms.Core.extend({_defaultSettings:{listMaxVisibleItems:15,listDisableTextSelection:true,listWrapperElement:"span",listClass:"dp-select-list",optionElement:"span",optionClass:"dp-option",optgroupClass:"dp-optgroup",optgroupCaptionClass:"dp-optgroup-caption",optionHoverClass:"dp-hover",optionSelectedClass:"dp-selected",activeClass:"dp-select-active",defaultSelectedClass:"dp-default-selected",wrapperClass:"dp-select"},_CONST:{listElement:"ul",listItemElement:"li",indexAttribute:"index"},name:"custom-forms-select",_constructor:function(t,e){this._super(t,e);this._listWrapper=null;this._listItemsHeight=0;this._list=null;this._listItems=null;this._currentItem=null;this._isMultiple=!!t.attr("multiple")},updateStatus:function(){this._super();this._synchronizeList();this.updateList()},updateList:function(){if(!this._list){return}this._resizeList();this._scrollList()},_createWrapper:function(){this._super();this._container.addClass(this.defaultSelectedClass)},_createList:function(){this._list=this._createElement(this._CONST.listElement,this.listClass);this._fillList(this._list,this._input);this._listWrapper=this._createElementWithChild(this.listWrapperElement,this.listWrapperClass,this._list);if(this.listDisableTextSelection){this._disableTextSelection(this._listWrapper)}this._input.css({zIndex:-999})},_fillList:function(e,s){var i=this;s.children().each(function(){var s=t(this),n;if(s.is("optgroup")){i._createOptgroup(e,s);return}if(!s.is("option")){return}n=i._createElementWithText(i.optionElement,i.optionClass,s.text()).data(i._CONST.indexAttribute,this.index);i._addIndexDataToOption(s);i._addImageToOption(s,n);e.append(i._createElementWithChild(i._CONST.listItemElement,null,n))})},_synchronizeList:function(){var e=this,s=t(e._input).find("option"),i=t(e._list).find(e._CONST.listItemElement).find(e.optionElement+"."+e.optionClass);s.each(function(s,n){var r=t(n),o=i.eq(s);e._updateOptionClass(r,o);e._setOptionSelected(r,o);e._setOptionDisabled(r,o)})},_addIndexDataToOption:function(t){t.attr("data-"+this._CONST.indexAttribute,t.get(0).index)},_setOptionSelected:function(t,e){if(t.is("[selected]")||this._input.prop("selectedIndex")===t.get(0).index){e.addClass(this.optionSelectedClass);this._currentItem=e}else{e.removeClass(this.optionSelectedClass)}},_setOptionDisabled:function(t,e){if(t.is("[disabled]")){e.addClass(this.disabledClass)}else{e.removeClass(this.disabledClass)}},_updateOptionClass:function(t,e){e.attr("class",this.optionClass+" "+(t.attr("class")||""))},_addImageToOption:function(t,e){var s=t.data("image"),i;if(s){i=this._createElement("img").attr("src",s);e.prepend(i)}},_createOptgroup:function(t,e){var s=this._createElementWithText(this.optionElement,this.optgroupCaptionClass,e.attr("label")),i=this._createElementWithChild(this._CONST.listItemElement,this.optgroupClass,s),n=this._createElement(this._CONST.listElement);this._fillList(n,e);i.append(n);t.append(i)},_bindListEvents:function(){this._listenTo(this._listWrapper,"mouseenter",this.optionElement,this._onListMouseEnter);this._listenTo(this._listWrapper,"mouseleave",this.optionElement,this._onListMouseLeave);this._listenTo(this._listWrapper,"click",this.optionElement,this._onListClick)},_unBindListEvents:function(){this._listWrapper.off("mouseenter",this.optionElement);this._listWrapper.off("mouseleave",this.optionElement);this._listWrapper.off("click",this.optionElement)},_onListMouseEnter:function(e){var s=t(e.currentTarget);if(this._container.hasClass(this.disabledClass)){return}if(!s.hasClass(this.optionClass)||s.hasClass(this.disabledClass)){return}this._listWrapper.find("."+this.optionHoverClass).removeClass(this.optionHoverClass);s.addClass(this.optionHoverClass);this.trigger("itemMouseenter",s,this._input)},_onListMouseLeave:function(e){var s=t(e.currentTarget);if(!s.hasClass(this.optionHoverClass)){return}s.removeClass(this.optionHoverClass);this.trigger("itemMouseleave",s,this._input)},_onListKeyDown:function(t){var e;if(!this._container.hasClass(this.focusedClass)||this._container.hasClass(this.disabledClass)){return}e=t.key||t.keyCode||t.which;switch(e){case 38:case"Up":this._onKeyUp(t.shiftKey);break;case 40:case"Down":this._onKeyDown(t.shiftKey);break;case 13:case"Enter":this._onKeyEnter();break;default:return}t.stopPropagation();t.preventDefault()},_onListClick:function(){},_onKeyUp:function(t){this._serveList(-1,t&&this._isMultiple);this._scrollList()},_onKeyDown:function(t){this._serveList(1,t&&this._isMultiple);this._scrollList()},_onKeyEnter:function(){},_serveList:function(t,e){var s=this._listWrapper.find("."+this.optionClass).not("."+this.disabledClass),i=s.index(this._currentItem),n=i+t,r;if(n===s.length){n=0}else if(n<0){n=s.length-1}r=s.eq(n);if(e){if(r.hasClass(this.optionSelectedClass)){this._deselectListItems(this._currentItem)}else{this._selectListItems(r)}}else{this._deselectAllListItems();this._selectListItems(r)}this._currentItem=r},_deselectAllListItems:function(){this._deselectListItems(this._listWrapper.find("."+this.optionSelectedClass))},_setDefaultOptionSelected:function(){var t=this._input.find(":selected").filter("[selected]").length;if(t){this._container.addClass(this.defaultSelectedClass);return}this._container.removeClass(this.defaultSelectedClass)},_setItemSelected:function(t,e){var s=t.data(this._CONST.indexAttribute),i="[data-"+this._CONST.indexAttribute+'="'+s+'"]';this._input.find(i).prop("selected",e)},_deselectListItems:function(e){var s=this;e.each(function(){var e=t(this);s._setItemSelected(e,false);e.removeClass(s.optionSelectedClass);s.trigger("itemDeselect",e,s._input)});this._setDefaultOptionSelected()},_selectListItems:function(e){var s=this;e.each(function(){var e=t(this);s._setItemSelected(e,true);e.addClass(s.optionSelectedClass);s.trigger("itemSelect",e,s._input)});this._setDefaultOptionSelected()},_toggleListItem:function(t){if(t.hasClass(this.optionSelectedClass)){this._deselectListItems(t);return}this._selectListItems(t)},_resizeList:function(){var t=this._list.find(this.optionElement),e=this.listMaxVisibleItems,s=e;this._listItems=this._list.find(this.optgroupCaptionClass).add(t);this._list.css({height:"",overflowY:""});this._listItemsHeight=this._list.height();if(e==0||typeof e==="number"&&this._listItems.length<=e){return}if(typeof e==="number"){s=this._getListElementsHeight(this._listItems,e)}this._list.css({height:s,overflowY:"scroll"})},_getListElementsHeight:function(e,s){var i=0;e.slice(0,s).each(function(){i+=t(this).outerHeight(true)});return i},_scrollList:function(){var t=this._list.height(),e=0;if(this._currentItem&&this._currentItem.length){e=this._getListElementsHeight(this._listItems,this._listItems.index(this._currentItem))}this._list.scrollTop(this._getScrollPosition(t,e,this._listItemsHeight))},_getScrollPosition:function(t,e,s){var i=t/2;if(i>s-e){return s-t}if(i<e){return e-i}return 0},_setDisable:function(){if(this._input.is(":disabled")){this._disable()}else{this._enable()}},_enable:function(){this._container.removeClass(this.disabledClass);this.trigger("enabled",this._input)},_disable:function(){this._container.addClass(this.disabledClass);this.trigger("disabled",this._input)}});DP.Plugins.CustomForms.Select=function(e,s){var i=DP.Plugins.CustomForms.Select.modules.get(),n=null,r="",o;for(var a=0,l=i.length;a<l;a++){n=i[a];r=n.matcher(e);if(r){o=s&&s[r]||{};return new n.construct(e,t.extend(true,{},s,o))}}};DP.Plugins.CustomForms.Select.modules=function(){var e=[],s={matcher:function(){return false},construct:function(){}};return{define:function(i,n){var r=t.extend(true,{},s,{matcher:n,construct:i});e.push(r)},get:function(){return e}}}();t.fn.dpCustomSelect=function(e){return this.each(function(){var s=t(this);s.data("dpCustomSelect",DP.Plugins.CustomForms.Select(s,e))})};DP.Plugins.CustomForms.SelectDrop=DP.Plugins.CustomForms.SelectCore.extend({_defaultSettings:{dropShowNative:false,dropShowNativeOnMobiles:true,dropAttachToBody:false,dropPosition:"auto",dropWidthFitsInput:true,dropPositionZIndex:2,listWrapperElement:"div",listWrapperClass:"dp-select-drop",listAboveClass:"dp-select-drop-above",inputElement:"span",textElement:"span",buttonElement:"span",buttonTextElement:"span",defaultButtonText:"",inputClass:"dp-select-input",buttonClass:"dp-select-opener",inputDisableTextSelection:true},_constructor:function(e,s){this._super(e,s);this._text=null;this._listContainer=null;this._listPlacedAbove=false;this._resizeHandler=t.proxy(this._onResize,this);this.init()},init:function(){this._super();if(this.dropShowNative||this.dropShowNativeOnMobiles&&this._checkIsMobile()){this._refreshText();return}this._createList();this._setListContainer();this.updateStatus();this._bindEventsIfListUsed()},updateStatus:function(){this._super();this._refreshText();this.updateList()},updateList:function(){if(!this._list){return}this._super();this._setListPosition();this._list.find("."+this.optionHoverClass).removeClass(this.optionHoverClass)},_createWrapper:function(){var t,e,s;this._super();this._text=this._createElement(this.textElement);t=this._createElementWithChild(this.inputElement,this.inputClass,this._text);s=this._createElementWithText(this.buttonTextElement,this.buttonTextClass,this.defaultButtonText);e=this._createElementWithChild(this.buttonElement,this.buttonClass,s);this._container.append(t).append(e)},_createList:function(){this._super();this._listWrapper.css({position:"absolute",zIndex:this.dropPositionZIndex,marginTop:0});this._listWrapper.addClass(this.focusedClass)},_setListContainer:function(){if(this.dropAttachToBody){this._listContainer=t("body")}else{this._listContainer=this._container.parent()}},_bindEvents:function(){this._super();this._listenTo(this._input,"change",this._onChange)},_bindEventsIfListUsed:function(){this._listenTo(this._container,"click",this._onWrapperClick);this._listenTo(this._document,"keydown",this._onListKeyDown)},_bindClickOutsideEvent:function(){var e=this;setTimeout(function(){e._document.one("click",t.proxy(e._onOutsideClick,e))},0)},_bindListEvents:function(){this._super();this._window.on("resize orientationchange",this._resizeHandler)},_unBindListEvents:function(){this._super();this._window.off("resize orientationchange",this._resizeHandler)},_onWrapperClick:function(){if(this._container.hasClass(this.disabledClass)){return}this._setFocused();this._toggleList();this._bindClickOutsideEvent()},_onOutsideClick:function(t){if(t.target===this._container.get(0)||t.target===this._listWrapper.get(0)||this._container.has(t.target).length||this._listWrapper.has(t.target).length){this._bindClickOutsideEvent();return}this._clearFocused();this._hideList()},_onChange:function(){this._refreshText()},_onResize:function(){this.updateList()},_onListClick:function(e){var s=t(e.currentTarget);if(!s.hasClass(this.optionClass)||s.hasClass(this.disabledClass)){return}this._deselectAllListItems();this._currentItem=s;this._selectListItems(s);this._hideList()},_onKeyUp:function(t){this._showList();this._super(t)},_onKeyDown:function(t){this._showList();this._super(t)},_onKeyEnter:function(){if(this._container.hasClass(this.activeClass)){this._selectListItems(this._currentItem)}this._toggleList()},_isListShouldBePlacedAbove:function(t){if(this.dropPosition==="top"){return true}if(this.dropPosition==="bottom"){return false}var e=t.top-this._window.scrollTop(),s=this._listWrapper.outerHeight(),i=e>s,n=this._window.height()-e-this._container.outerHeight(),r=n>s;return i&&!r},_setListPosition:function(){var t=this._container.offset(),e=parseInt(this._container.css("border-top-width")),s=0,i="";if(this.dropAttachToBody){e+=t.top;s+=t.left}this._listPlacedAbove=this._isListShouldBePlacedAbove(t);if(this._listPlacedAbove){e-=this._listWrapper.outerHeight()}else{e+=this._container.height()}if(this.dropWidthFitsInput){i=this._container.width()}this._listWrapper.css({top:e,left:s,width:i})},_selectListItems:function(t){this._super(t);this._refreshText();this._setListPosition()},_showList:function(){if(this._container.hasClass(this.disabledClass)||this._container.hasClass(this.activeClass)){return}this._listContainer.append(this._listWrapper);this._container.addClass(this.activeClass);this._bindListEvents();this.updateList();if(this._listPlacedAbove){this._container.addClass(this.listAboveClass)}this.trigger("dropShow",this._currentItem,this._input)},_hideList:function(){if(!this._container.hasClass(this.activeClass)){return}this._unBindListEvents();this._listWrapper.detach();this._container.removeClass(this.activeClass);if(this._listPlacedAbove){this._container.removeClass(this.listAboveClass);this._listPlacedAbove=false}this.trigger("dropHide",this._input)},_toggleList:function(){if(this._container.hasClass(this.activeClass)){this._hideList()}else{this._showList()}},_refreshText:function(){var t=this._input.prop("selectedIndex"),e;e=this._input.find("option").eq(t);this._text.text(e.text())},destroy:function(){this._super();this._text=null;this._listContainer=null;this._listPlacedAbove=null}});t.fn.dpCustomSelectDrop=function(e){return this.each(function(){var s=t(this);s.data("dpCustomSelect",new DP.Plugins.CustomForms.SelectDrop(s,e))})};DP.Plugins.CustomForms.SelectDrop.matcher=function(e){if(t(e).is("select:not([size]):not([multiple])")){return{options:"selectDrop",namespace:"dpCustomSelect"}}return false};DP.Plugins.CustomForms.modules&&DP.Plugins.CustomForms.modules.define(DP.Plugins.CustomForms.SelectDrop,DP.Plugins.CustomForms.SelectDrop.matcher);DP.Plugins.CustomForms.Select&&DP.Plugins.CustomForms.Select.modules.define(DP.Plugins.CustomForms.SelectDrop,DP.Plugins.CustomForms.SelectDrop.matcher);DP.Plugins.CustomForms.SelectStatic=DP.Plugins.CustomForms.SelectCore.extend({_defaultSettings:{staticClassSuffix:"-static"},_constructor:function(e,s){this._super(e,s);this.listWrapperClass="";this.wrapperClass+=this.staticClassSuffix;this._watcherOptions=[{key:"disabled",handler:t.proxy(this._setDisable,this)}];this.init()},init:function(){this._super();this._createList();this._container.append(this._listWrapper);this.updateStatus()},_bindListEvents:function(){this._super();this._listenTo(this._document,"click",this._onOutsideClick);this._listenTo(this._document,"keydown",this._onListKeyDown)},_unBindListEvents:function(){this._super();this._document.off("click",t.proxy(this._onOutsideClick,this));this._document.off("keydown",t.proxy(this._onListKeyDown,this))},_onListClick:function(e){var s=t(e.currentTarget),i=e.shiftKey,n=e.ctrlKey;if(this._container.hasClass(this.disabledClass)){return}this._setFocused();if(!s.hasClass(this.optionClass)||s.hasClass(this.disabledClass)){return}if(this._isMultiple&&i){this._deselectAllListItems();this._selectMultiplyListItems(this._currentItem,s);return}this._currentItem=s;if(this._isMultiple&&n){this._toggleListItem(s);return}this._deselectAllListItems();this._selectListItems(s)},_selectMultiplyListItems:function(t,e){var s=this._listWrapper.find("."+this.optionClass).not("."+this.disabledClass),i=s.index(e),n=s.index(t),r=Math.min(i,n),o=Math.max(i,n)+1;this._selectListItems(s.slice(r,o))},_enable:function(){if(!this._listWrapper){return}this._super();this._bindListEvents()},_disable:function(){this._super();this._unBindListEvents();this._clearFocused()}});t.fn.dpCustomSelectStatic=function(e){return this.each(function(){var s=t(this);s.data("dpCustomSelectStatic",new DP.Plugins.CustomForms.SelectStatic(s,e))})};DP.Plugins.CustomForms.SelectStatic.matcher=function(e){var s=t(e);if(s.is("select[size]")||s.is("select[multiple]")){return{options:"selectStatic",namespace:"dpCustomSelect"}}return false};DP.Plugins.CustomForms.modules&&DP.Plugins.CustomForms.modules.define(DP.Plugins.CustomForms.SelectStatic,DP.Plugins.CustomForms.SelectStatic.matcher);DP.Plugins.CustomForms.Select&&DP.Plugins.CustomForms.Select.modules.define(DP.Plugins.CustomForms.SelectStatic,DP.Plugins.CustomForms.SelectStatic.matcher)})(jQuery,window);

// Init OpenClose
(function(t,e){e.DP=e.DP||{};e.DP.Class=e.DP.Class||function(){function e(){}e.extend=function s(t,e){var r,o,a=this;if("function"===typeof t._constructor){r=function(){this._super=a;t._constructor.apply(this,arguments);this._super=null}}else{r=function(){a.apply(this,arguments)}}o=new Function;o.prototype=a.prototype;r.prototype=new o;for(var u in t)if(t.hasOwnProperty(u))(function(t,n){if(n==="_constructor"){return}if("function"===typeof t){r.prototype[n]=function(){var i,s;if(this._super){s=this._super}this._super=a.prototype[n];if(e&&this.modules&&!(e in this.modules)){if(this._super){i=this._super.apply(this,arguments)}}else{i=t.apply(this,arguments)}this._super=s||null;return i}}else{r.prototype[n]=t}})(t[u],u);r.prototype.constructor=r;r.prototype._common={_instanceCounter:0};r.extend=s;r.extension=n;r.loadModule=i;return r};function n(t,e){var n=this,i=this.extend(t,e);for(var s in this)if(this.hasOwnProperty(s))(function(t,e){if(e==="extend"||e==="extension"||e==="loadModule"){return}i[e]=n[e]})(t[s],s);return i}e.extension=n;function i(e,n){n=n||{};n._constructor=function(n,i){this._defaultSettings=t.extend(true,{},this._super.prototype._defaultSettings,this._defaultSettings);if(i&&i.modules){t.extend(true,i,i.modules[e])}this._super(n,i)};return this.extension(n,e)}e.loadModule=i;return e}();e.DP.Core=e.DP.Core||DP.Class.extend({name:"unnamed",_defaultSettings:{},init:function(){this._plugins={};this._listeners=[];this.namespace="."+this.name+"-"+this._common._instanceCounter++},destroy:function(){this._unbindEvents()},_bindEvents:function(){},_applySettings:function(e){var n=this;e=t.extend(true,{},this._defaultSettings,e);t.each(this._defaultSettings,function(t){n[t]=e[t]})},_listenTo:function(){var e=t(Array.prototype.shift.apply(arguments)),n=arguments[0].split(" ");this._listeners.push(e);for(var i=0,s=n.length;i<s;i++){n[i]+=this.namespace}arguments[0]=n.join(" ");t.fn.on.apply(e,arguments)},_unbindEvents:function(){for(var e=0,n=this._listeners.length;e<n;e++){t(this._listeners[e]).off(this.namespace)}}});e.DP.Plugins=e.DP.Plugins||{};e.DP.Plugins.Core=e.DP.Plugins.Core||function(){var n=function(){var t=Array.prototype.slice.call(arguments),e=t.pop();t.push(function(){var t=Array.prototype.slice.call(arguments);t.shift();e.apply(null,t)});return t};var i=function(t){return[t[0],Array.prototype.slice.call(t,1)]};var s={on:function(){this.__observer=this.__observer||t({});this.__observer.on.apply(this.__observer,n.apply(null,arguments));return this},once:function(){this.__observer=this.__observer||t({});this.__observer.one.apply(this.__observer,n.apply(null,arguments));return this},off:function(){this.__observer=this.__observer||t({});this.__observer.off.apply(this.__observer,arguments);return this},trigger:function(){this.__observer=this.__observer||t({});this.__observer.trigger.apply(this.__observer,i(arguments));return this}};var r=DP.Core.extend(t.extend({},s,{_publicEvents:[],_constructor:function(){},init:function(){this._super();this._plugins={};var t=this;r.messageBus.on("state:update"+this.namespace,function(e){if(t._container.parents().index(e)!==-1){t._updateState.apply(t,arguments)}})},_updateState:function(t){console.log("OVERRIDE THIS METHOD","PARENT = ",t)},destroy:function(){this._destroyPlugins();r.messageBus.off(this.namespace);this._unbindEvents()},_destroyPlugins:function(){for(var t in this._plugins){this._plugins[t].destroy()}},_initPlugins:function(){for(var t in this._plugins){this._plugins[t].init()}},_checkIsMobile:function(){var t;return function(){if(t===undefined){var n="ontouchstart"in e||e.DocumentTouch&&document instanceof DocumentTouch,i=/Windows Phone/.test(navigator.userAgent);t=!!(n||i)}return t}}()}));var o=r.extend;r.extend=function u(){var t=o.apply(this,arguments);t.effects=function(){var t={},e;e=function(e){var n=e.type;if(t[(n||"").toLowerCase()]){return new(t[n.toLowerCase()])(e)}return new t["default"](e)};e.define=function(e,n){t[e]=n};return e}();t.extend=u;return t};r.messageBus=t.extend({},{},s);var a=r.prototype.trigger;r.prototype.trigger=function(e){if(t.inArray(e,this._publicEvents)!==-1){var n=Array.prototype.slice.call(arguments);n.unshift(this._container);n.unshift("state:update");r.messageBus.trigger.apply(r.messageBus,n)}a.apply(this,arguments)};return r}();e.DP.Effects=e.DP.Effects||{};e.DP.Effects.Core=e.DP.Effects.Core||DP.Core.extend({_constructor:function(t){this._applySettings(t)}});DP.Plugins.OpenClose=DP.Plugins.Core.extend({_defaultSettings:{controller:".open-link",effect:{type:"",showSpeed:400,hideSpeed:400},contentMask:".mask",classBeforeAnimation:"open",classOpened:"opened",bodyClose:true},name:"open-close",_dataName:"state",_constructor:function(t,e){this._container=t;this._applySettings(e);this._mask=null;this._controlElement=null;this._effect=DP.Plugins.OpenClose.effects(this.effect);this.init()},init:function(){this._mask=this._container.find(this.contentMask).first();this._controlElement=this._container.find(this.controller).first();this._super();this._setInitState();this._bindEvents()},destroy:function(){this._super();this._mask=null;this._controlElement=null},closeBlock:function(){var e=this;if(this._container.data(this._dataName)==="close"){return t.when(true)}this._container.data(this._dataName,"close");this._container.removeClass(this.classBeforeAnimation);var n=this._effect.hide({container:this._mask});n.then(function(){e._container.removeClass(e.classOpened);e.trigger("itemClosed",e._container)});return n},openBlock:function(){var e=this;if(this._container.data(this._dataName)==="open"){return t.when(true)}this._container.data(this._dataName,"open");this._container.addClass(this.classBeforeAnimation);var n=this._effect.show({container:this._mask});n.then(function(){e._container.addClass(e.classOpened);e.trigger("itemOpened",e._container)});return n},setOpenClose:function(){if(this._container.data(this._dataName)==="open"){this.closeBlock()}else{this.openBlock()}},_bindEvents:function(){this._listenTo(this._controlElement,"click",t.proxy(this._onClick,this));this._listenTo(t("body"),"click",t.proxy(this._onOutsideClick,this))},_onClick:function(t){t.preventDefault();this.setOpenClose()},_setInitState:function(){if(this._container.hasClass(this.classOpened)){this.openBlock()}else{this.closeBlock()}},_onOutsideClick:function(e){if(!this.bodyClose){return}if(t(e.target).has(this._container).length){this.closeBlock()}}});t.fn.dpOpenClose=function(e){return this.each(function(){var n=t(this);n.data("dpOpenClose",new DP.Plugins.OpenClose(n,e))})};DP.Effects.VerticalDrop=DP.Effects.Core.extend({_defaultSettings:{showSpeed:200,hideSpeed:200},show:function(e){var n=t.Deferred(),i=e.container,s=e.height,r=this.showSpeed;if(!i){return}i.stop().animate({opacity:1,height:s},{duration:r,complete:n.resolve});return n.promise()},hide:function(e){var n=t.Deferred(),i=e.container,s=this.hideSpeed;if(!i){return}i.stop().animate({opacity:0,height:0},{duration:s,complete:n.resolve});return n.promise()}});DP.Effects.HeightDrop=DP.Effects.VerticalDrop.extend({show:function(e){var n=e.container,i;n.stop().height("");i=n.height();n.height(0).show();return this._super(t.extend({},e,{height:i})).done(function(){e.container.height("")})},hide:function(t){return this._super(t).done(function(){t.container.hide().height("")})}});DP.Effects.VerticalSize=DP.Effects.Core.extend({_defaultSettings:{showSpeed:200,hideSpeed:200},show:function(e){var n=t.Deferred(),i=e.container,s=e.height,r=this.showSpeed;if(!i){return}i.stop().animate({height:s},{duration:r,complete:n.resolve});return n.promise()},hide:function(e){var n=t.Deferred(),i=e.container,s=this.hideSpeed;if(!i){return}i.stop().animate({height:0},{duration:s,complete:n.resolve});return n.promise()}});DP.Effects.HeightDrop&&DP.Plugins.OpenClose.effects.define("drop",DP.Effects.HeightDrop);DP.Effects.HeightDrop&&DP.Plugins.OpenClose.effects.define("default",DP.Effects.HeightDrop);(function(){if(!DP.Effects.VerticalSize){return}var e=DP.Effects.VerticalSize.extend({show:function(e){var n=e.container,i=n.height();n.height(0).show();return this._super(t.extend({},e,{height:i})).done(function(){e.container.height("auto")})},hide:function(t){return this._super(t).done(function(){t.container.hide().height("auto")})}});DP.Plugins.OpenClose.effects.define("size",e)})()})(jQuery,window);

// Init SlideShow
;(function($){
    function FadeGallery(options) {
        this.options = $.extend({
            slides: 'ul.slideset > li',
            activeClass:'active',
            disabledClass:'disabled',
            btnPrev: 'a.btn-prev',
            btnNext: 'a.btn-next',
            generatePagination: false,
            pagerList: '<ul>',
            pagerListItem: '<li><a href="#"></a></li>',
            pagerListItemText: 'a',
            pagerLinks: '.pagination li',
            currentNumber: 'span.current-num',
            totalNumber: 'span.total-num',
            btnPlay: '.btn-play',
            btnPause: '.btn-pause',
            btnPlayPause: '.btn-play-pause',
            galleryReadyClass: 'gallery-js-ready',
            autorotationActiveClass: 'autorotation-active',
            autorotationDisabledClass: 'autorotation-disabled',
            autorotationStopAfterClick: false,
            circularRotation: true,
            switchSimultaneously: true,
            disableWhileAnimating: false,
            disableFadeIE: false,
            autoRotation: false,
            pauseOnHover: true,
            autoHeight: false,
            useSwipe: false,
            swipeThreshold: 15,
            switchTime: 4000,
            animSpeed: 600,
            event:'click'
        }, options);
        this.init();
    }
    FadeGallery.prototype = {
        init: function() {
            if(this.options.holder) {
                this.findElements();
                this.attachEvents();
                this.refreshState(true);
                this.autoRotate();
                this.makeCallback('onInit', this);
            }
        },
        findElements: function() {
            // control elements
            this.gallery = $(this.options.holder).addClass(this.options.galleryReadyClass);
            this.slides = this.gallery.find(this.options.slides);
            this.slidesHolder = this.slides.eq(0).parent();
            this.stepsCount = this.slides.length;
            var number = 1 + Math.floor(Math.random() * this.stepsCount);
            var current_index = number-1;
            this.btnPrev = this.gallery.find(this.options.btnPrev);
            this.btnNext = this.gallery.find(this.options.btnNext);
            this.currentIndex = current_index;


            // disable fade effect in old IE
            if(this.options.disableFadeIE && !$.support.opacity) {
                this.options.animSpeed = 0;
            }

            // create gallery pagination
            if(typeof this.options.generatePagination === 'string') {
                this.pagerHolder = this.gallery.find(this.options.generatePagination).empty();
                this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
                for(var i = 0; i < this.stepsCount; i++) {
                    $(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(i+1);
                }
                this.pagerLinks = this.pagerList.children();
            } else {
                this.pagerLinks = this.gallery.find(this.options.pagerLinks);
            }

            // get start index
            var activeSlide = this.slides.filter('.'+this.options.activeClass);
            if(activeSlide.length) {
                this.currentIndex = this.slides.index(activeSlide);
            }
            this.prevIndex = this.currentIndex;

            // autorotation control buttons
            this.btnPlay = this.gallery.find(this.options.btnPlay);
            this.btnPause = this.gallery.find(this.options.btnPause);
            this.btnPlayPause = this.gallery.find(this.options.btnPlayPause);

            // misc elements
            this.curNum = this.gallery.find(this.options.currentNumber);
            this.allNum = this.gallery.find(this.options.totalNumber);

            // handle flexible layout
            this.slides.css({display:'block',opacity:0}).eq(this.currentIndex).css({
                opacity:''
            });
        },
        attachEvents: function() {
            var self = this;

            // flexible layout handler
            this.resizeHandler = function() {
                self.onWindowResize();
            };
            $(window).bind('load resize orientationchange', this.resizeHandler);

            if(this.btnPrev.length) {
                this.btnPrevHandler = function(e){
                    e.preventDefault();
                    self.prevSlide();
                    if(self.options.autorotationStopAfterClick) {
                        self.stopRotation();
                    }
                };
                this.btnPrev.bind(this.options.event, this.btnPrevHandler);
            }
            if(this.btnNext.length) {
                this.btnNextHandler = function(e) {
                    e.preventDefault();
                    self.nextSlide();
                    if(self.options.autorotationStopAfterClick) {
                        self.stopRotation();
                    }
                };
                this.btnNext.bind(this.options.event, this.btnNextHandler);
            }
            if(this.pagerLinks.length) {
                this.pagerLinksHandler = function(e) {
                    e.preventDefault();
                    self.numSlide(self.pagerLinks.index(e.currentTarget));
                    if(self.options.autorotationStopAfterClick) {
                        self.stopRotation();
                    }
                };
                this.pagerLinks.bind(self.options.event, this.pagerLinksHandler);
            }

            // autorotation buttons handler
            if(this.btnPlay.length) {
                this.btnPlayHandler = function(e) {
                    e.preventDefault();
                    self.startRotation();
                };
                this.btnPlay.bind(this.options.event, this.btnPlayHandler);
            }
            if(this.btnPause.length) {
                this.btnPauseHandler = function(e) {
                    e.preventDefault();
                    self.stopRotation();
                };
                this.btnPause.bind(this.options.event, this.btnPauseHandler);
            }
            if(this.btnPlayPause.length) {
                this.btnPlayPauseHandler = function(e){
                    e.preventDefault();
                    if(!self.gallery.hasClass(self.options.autorotationActiveClass)) {
                        self.startRotation();
                    } else {
                        self.stopRotation();
                    }
                };
                this.btnPlayPause.bind(this.options.event, this.btnPlayPauseHandler);
            }

            // swipe gestures handler
            if(this.options.useSwipe && window.Hammer && isTouchDevice) {
                this.swipeHandler = new Hammer.Manager(this.gallery[0]);
                this.swipeHandler.add(new Hammer.Swipe({
                    direction: Hammer.DIRECTION_HORIZONTAL,
                    threshold: self.options.swipeThreshold
                }));
                this.swipeHandler.on('swipeleft', function() {
                    self.nextSlide();
                }).on('swiperight', function() {
                    self.prevSlide();
                });
            }

            // pause on hover handling
            if(this.options.pauseOnHover) {
                this.hoverHandler = function() {
                    if(self.options.autoRotation) {
                        self.galleryHover = true;
                        self.pauseRotation();
                    }
                };
                this.leaveHandler = function() {
                    if(self.options.autoRotation) {
                        self.galleryHover = false;
                        self.resumeRotation();
                    }
                };
                this.gallery.bind({mouseenter: this.hoverHandler, mouseleave: this.leaveHandler});
            }
        },
        onWindowResize: function(){
            if(this.options.autoHeight) {
                this.slidesHolder.css({height: this.slides.eq(this.currentIndex).outerHeight(true) });
            }
        },
        prevSlide: function() {
            if(!(this.options.disableWhileAnimating && this.galleryAnimating)) {
                this.prevIndex = this.currentIndex;
                if(this.currentIndex > 0) {
                    this.currentIndex--;
                    this.switchSlide();
                } else if(this.options.circularRotation) {
                    this.currentIndex = this.stepsCount - 1;
                    this.switchSlide();
                }
            }
        },
        nextSlide: function(fromAutoRotation) {
            if(!(this.options.disableWhileAnimating && this.galleryAnimating)) {
                this.prevIndex = this.currentIndex;
                if(this.currentIndex < this.stepsCount - 1) {
                    this.currentIndex++;
                    this.switchSlide();
                } else if(this.options.circularRotation || fromAutoRotation === true) {
                    this.currentIndex = 0;
                    this.switchSlide();
                }
            }
        },
        numSlide: function(c) {
            if(this.currentIndex != c) {
                this.prevIndex = this.currentIndex;
                this.currentIndex = c;
                this.switchSlide();
            }
        },
        switchSlide: function() {
            var self = this;
            if(this.slides.length > 1) {
                this.galleryAnimating = true;
                if(!this.options.animSpeed) {
                    this.slides.eq(this.prevIndex).css({opacity:0});
                } else {
                    this.slides.eq(this.prevIndex).stop().animate({opacity:0},{duration: this.options.animSpeed});
                }

                this.switchNext = function() {
                    if(!self.options.animSpeed) {
                        self.slides.eq(self.currentIndex).css({opacity:''});
                    } else {
                        self.slides.eq(self.currentIndex).stop().animate({opacity:1},{duration: self.options.animSpeed});
                    }
                    clearTimeout(this.nextTimer);
                    this.nextTimer = setTimeout(function() {
                        self.slides.eq(self.currentIndex).css({opacity:''});
                        self.galleryAnimating = false;
                        self.autoRotate();

                        // onchange callback
                        self.makeCallback('onChange', self);
                    }, self.options.animSpeed);
                };

                if(this.options.switchSimultaneously) {
                    self.switchNext();
                } else {
                    clearTimeout(this.switchTimer);
                    this.switchTimer = setTimeout(function(){
                        self.switchNext();
                    }, this.options.animSpeed);
                }
                this.refreshState();

                // onchange callback
                this.makeCallback('onBeforeChange', this);
            }
        },
        refreshState: function(initial) {
            this.slides.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);
            this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);
            this.curNum.html(this.currentIndex+1);
            this.allNum.html(this.stepsCount);

            // initial refresh
            if(this.options.autoHeight) {
                if(initial) {
                    this.slidesHolder.css({height: this.slides.eq(this.currentIndex).outerHeight(true) });
                } else {
                    this.slidesHolder.stop().animate({height: this.slides.eq(this.currentIndex).outerHeight(true)}, {duration: this.options.animSpeed});
                }
            }

            // disabled state
            if(!this.options.circularRotation) {
                this.btnPrev.add(this.btnNext).removeClass(this.options.disabledClass);
                if(this.currentIndex === 0) this.btnPrev.addClass(this.options.disabledClass);
                if(this.currentIndex === this.stepsCount - 1) this.btnNext.addClass(this.options.disabledClass);
            }

            // add class if not enough slides
            this.gallery.toggleClass('not-enough-slides', this.stepsCount === 1);
        },
        startRotation: function() {
            this.options.autoRotation = true;
            this.galleryHover = false;
            this.autoRotationStopped = false;
            this.resumeRotation();
        },
        stopRotation: function() {
            this.galleryHover = true;
            this.autoRotationStopped = true;
            this.pauseRotation();
        },
        pauseRotation: function() {
            this.gallery.addClass(this.options.autorotationDisabledClass);
            this.gallery.removeClass(this.options.autorotationActiveClass);
            clearTimeout(this.timer);
        },
        resumeRotation: function() {
            if(!this.autoRotationStopped) {
                this.gallery.addClass(this.options.autorotationActiveClass);
                this.gallery.removeClass(this.options.autorotationDisabledClass);
                this.autoRotate();
            }
        },
        autoRotate: function() {
            var self = this;
            clearTimeout(this.timer);
            if(this.options.autoRotation && !this.galleryHover && !this.autoRotationStopped) {
                this.gallery.addClass(this.options.autorotationActiveClass);
                this.timer = setTimeout(function(){
                    self.nextSlide(true);
                }, this.options.switchTime);
            } else {
                this.pauseRotation();
            }
        },
        makeCallback: function(name) {
            if(typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        },
        destroy: function() {
            // navigation buttons handler
            this.btnPrev.unbind(this.options.event, this.btnPrevHandler);
            this.btnNext.unbind(this.options.event, this.btnNextHandler);
            this.pagerLinks.unbind(this.options.event, this.pagerLinksHandler);
            $(window).unbind('load resize orientationchange', this.resizeHandler);

            // remove autorotation handlers
            this.stopRotation();
            this.btnPlay.unbind(this.options.event, this.btnPlayHandler);
            this.btnPause.unbind(this.options.event, this.btnPauseHandler);
            this.btnPlayPause.unbind(this.options.event, this.btnPlayPauseHandler);
            this.gallery.unbind('mouseenter', this.hoverHandler);
            this.gallery.unbind('mouseleave', this.leaveHandler);

            // remove swipe handler if used
            if(this.swipeHandler) {
                this.swipeHandler.destroy();
            }
            if(typeof this.options.generatePagination === 'string') {
                this.pagerHolder.empty();
            }

            // remove unneeded classes and styles
            var unneededClasses = [this.options.galleryReadyClass, this.options.autorotationActiveClass, this.options.autorotationDisabledClass];
            this.gallery.removeClass(unneededClasses.join(' '));
            this.slidesHolder.add(this.slides).removeAttr('style');
        }
    };

    // detect device type
    var isTouchDevice = /Windows Phone/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

    // jquery plugin
    $.fn.fadeGallery = function(opt){
        return this.each(function(){
            $(this).data('FadeGallery', new FadeGallery($.extend(opt,{holder:this})));
        });
    };
}(jQuery));

/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
if(Object.create){!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==kb?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ib.length;){if(c=ib[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return ob++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:rb?N:sb?Q:qb?S:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&yb&&d-e===0,g=b&(Ab|Bb)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=nb(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===yb||f.eventType===Ab)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Bb&&(i>xb||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=mb(l.x)>mb(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:lb(a.pointers[c].clientX),clientY:lb(a.pointers[c].clientY)},c++;return{timeStamp:nb(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:lb(a[0].clientX),y:lb(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:lb(c/b),y:lb(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Cb:mb(a)>=mb(b)?a>0?Db:Eb:b>0?Fb:Gb}function I(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],Lb)-J(a[1],a[0],Lb)}function L(a,b){return I(b[0],b[1],Lb)/I(a[0],a[1],Lb)}function M(){this.evEl=Nb,this.evWin=Ob,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Rb,this.evWin=Sb,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Ub,this.evWin=Vb,this.started=!1,y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=t(a.changedTouches);return b&(Ab|Bb)&&(c=u(c.concat(d),"identifier",!0)),[c,d]}function Q(){this.evTarget=Xb,this.targetIds={},y.apply(this,arguments)}function R(a,b){var c=t(a.touches),d=this.targetIds;if(b&(yb|zb)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return p(a.target,i)}),b===yb)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ab|Bb)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function S(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new Q(this.manager,a),this.mouse=new M(this.manager,a)}function T(a,b){this.manager=a,this.set(b)}function U(a){if(q(a,bc))return bc;var b=q(a,cc),c=q(a,dc);return b&&c?cc+" "+dc:b||c?b?cc:dc:q(a,ac)?ac:_b}function V(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=ec,this.simultaneous={},this.requireFail=[]}function W(a){return a&jc?"cancel":a&hc?"end":a&gc?"move":a&fc?"start":""}function X(a){return a==Gb?"down":a==Fb?"up":a==Db?"left":a==Eb?"right":""}function Y(a,b){var c=b.manager;return c?c.get(a):a}function Z(){V.apply(this,arguments)}function $(){Z.apply(this,arguments),this.pX=null,this.pY=null}function _(){Z.apply(this,arguments)}function ab(){V.apply(this,arguments),this._timer=null,this._input=null}function bb(){Z.apply(this,arguments)}function cb(){Z.apply(this,arguments)}function db(){V.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function eb(a,b){return b=b||{},b.recognizers=m(b.recognizers,eb.defaults.preset),new fb(a,b)}function fb(a,b){b=b||{},this.options=i(b,eb.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new T(this,this.options.touchAction),gb(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function gb(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function hb(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var ib=["","webkit","moz","MS","ms","o"],jb=b.createElement("div"),kb="function",lb=Math.round,mb=Math.abs,nb=Date.now,ob=1,pb=/mobile|tablet|ip(ad|hone|od)|android/i,qb="ontouchstart"in a,rb=v(a,"PointerEvent")!==d,sb=qb&&pb.test(navigator.userAgent),tb="touch",ub="pen",vb="mouse",wb="kinect",xb=25,yb=1,zb=2,Ab=4,Bb=8,Cb=1,Db=2,Eb=4,Fb=8,Gb=16,Hb=Db|Eb,Ib=Fb|Gb,Jb=Hb|Ib,Kb=["x","y"],Lb=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Mb={mousedown:yb,mousemove:zb,mouseup:Ab},Nb="mousedown",Ob="mousemove mouseup";j(M,y,{handler:function(a){var b=Mb[a.type];b&yb&&0===a.button&&(this.pressed=!0),b&zb&&1!==a.which&&(b=Ab),this.pressed&&this.allow&&(b&Ab&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:vb,srcEvent:a}))}});var Pb={pointerdown:yb,pointermove:zb,pointerup:Ab,pointercancel:Bb,pointerout:Bb},Qb={2:tb,3:ub,4:vb,5:wb},Rb="pointerdown",Sb="pointermove pointerup pointercancel";a.MSPointerEvent&&(Rb="MSPointerDown",Sb="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Pb[d],f=Qb[a.pointerType]||a.pointerType,g=f==tb,h=s(b,a.pointerId,"pointerId");e&yb&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ab|Bb)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Tb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Ub="touchstart",Vb="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Tb[a.type];if(b===yb&&(this.started=!0),this.started){var c=P.call(this,a,b);b&(Ab|Bb)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}});var Wb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Xb="touchstart touchmove touchend touchcancel";j(Q,y,{handler:function(a){var b=Wb[a.type],c=R.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}),j(S,y,{handler:function(a,b,c){var d=c.pointerType==tb,e=c.pointerType==vb;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Ab|Bb)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Yb=v(jb.style,"touchAction"),Zb=Yb!==d,$b="compute",_b="auto",ac="manipulation",bc="none",cc="pan-x",dc="pan-y";T.prototype={set:function(a){a==$b&&(a=this.compute()),Zb&&(this.manager.element.style[Yb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),U(a.join(" "))},preventDefaults:function(a){if(!Zb){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,bc),f=q(d,dc),g=q(d,cc);return e||f&&c&Hb||g&&c&Ib?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var ec=1,fc=2,gc=4,hc=8,ic=hc,jc=16,kc=32;V.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=Y(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=Y(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=Y(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=Y(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?W(d):""),a)}var c=this,d=this.state;hc>d&&b(!0),b(),d>=hc&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=kc)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(kc|ec)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(ic|jc|kc)&&(this.state=ec),this.state=this.process(b),void(this.state&(fc|gc|hc|jc)&&this.tryEmit(b))):(this.reset(),void(this.state=kc))},process:function(){},getTouchAction:function(){},reset:function(){}},j(Z,V,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(fc|gc),e=this.attrTest(a);return d&&(c&Bb||!e)?b|jc:d||e?c&Ab?b|hc:b&fc?b|gc:fc:kc}}),j($,Z,{defaults:{event:"pan",threshold:10,pointers:1,direction:Jb},getTouchAction:function(){var a=this.options.direction,b=[];return a&Hb&&b.push(dc),a&Ib&&b.push(cc),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Hb?(e=0===f?Cb:0>f?Db:Eb,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Cb:0>g?Fb:Gb,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return Z.prototype.attrTest.call(this,a)&&(this.state&fc||!(this.state&fc)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(_,Z,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&fc)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j(ab,V,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[_b]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ab|Bb)&&!f)this.reset();else if(a.eventType&yb)this.reset(),this._timer=e(function(){this.state=ic,this.tryEmit()},b.time,this);else if(a.eventType&Ab)return ic;return kc},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===ic&&(a&&a.eventType&Ab?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=nb(),this.manager.emit(this.options.event,this._input)))}}),j(bb,Z,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&fc)}}),j(cb,Z,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Hb|Ib,pointers:1},getTouchAction:function(){return $.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Hb|Ib)?b=a.velocity:c&Hb?b=a.velocityX:c&Ib&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&mb(b)>this.options.velocity&&a.eventType&Ab},emit:function(a){var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(db,V,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[ac]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&yb&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ab)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=ic,this.tryEmit()},b.interval,this),fc):ic}return kc},failTimeout:function(){return this._timer=e(function(){this.state=kc},this.options.interval,this),kc},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==ic&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),eb.VERSION="2.0.4",eb.defaults={domEvents:!1,touchAction:$b,enable:!0,inputTarget:null,inputClass:null,preset:[[bb,{enable:!1}],[_,{enable:!1},["rotate"]],[cb,{direction:Hb}],[$,{direction:Hb},["swipe"]],[db],[db,{event:"doubletap",taps:2},["tap"]],[ab]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var lc=1,mc=2;fb.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?mc:lc},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&ic)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===mc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(fc|gc|hc)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof V)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&hb(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&gb(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(eb,{INPUT_START:yb,INPUT_MOVE:zb,INPUT_END:Ab,INPUT_CANCEL:Bb,STATE_POSSIBLE:ec,STATE_BEGAN:fc,STATE_CHANGED:gc,STATE_ENDED:hc,STATE_RECOGNIZED:ic,STATE_CANCELLED:jc,STATE_FAILED:kc,DIRECTION_NONE:Cb,DIRECTION_LEFT:Db,DIRECTION_RIGHT:Eb,DIRECTION_UP:Fb,DIRECTION_DOWN:Gb,DIRECTION_HORIZONTAL:Hb,DIRECTION_VERTICAL:Ib,DIRECTION_ALL:Jb,Manager:fb,Input:y,TouchAction:T,TouchInput:Q,MouseInput:M,PointerEventInput:N,TouchMouseInput:S,SingleTouchInput:O,Recognizer:V,AttrRecognizer:Z,Tap:db,Pan:$,Swipe:cb,Pinch:_,Rotate:bb,Press:ab,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==kb&&define.amd?define(function(){return eb}):"undefined"!=typeof module&&module.exports?module.exports=eb:a[c]=eb}(window,document,"Hammer");}
