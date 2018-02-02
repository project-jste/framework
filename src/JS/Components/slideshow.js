/*!
 * Slideshow
 * https://project-jste.github.io/
 *
 * Copyright 2017 Jste Team
 * Released under the GNU AGPLv3 license
 * https://project-jste.github.io/license
 *
 * Date: 2017-09-6
 */
$(function () {
    $.fn[window.slideShowTranslations[document.langID]] = function (options) {
        // Establish our default settings
        var settings = $.extend({
            [window.autoplayTranslations[document.langID]]: null,
            [window.nameTranslations[document.langID]]: null,
            [window.widthTranslations[document.langID]]: null,
            [window.lengthTranslations[document.langID]]: null,
            [window.animationTranslations[document.langID]]: null,
            [window.transparencyTranslations[document.langID]]: null,
            [window.distanceFromBottomTranslations[document.langID]]: null,
            [window.distanceFromTopTranslations[document.langID]]: null,
            [window.distanceFromLeftTranslations[document.langID]]: null,
            [window.distanceFromRightTranslations[document.langID]]: null,
            [window.positionTranslations[document.langID]]: null,
            [window.containerTranslations[document.langID]]: null,
            [window.backgroundTranslations[document.langID]]: null,
            [window.attributesTranslations[document.langID]]: null,
            [window.commandsTranslations[document.langID]]: null
        }, options);
        return this.each(function () {
            var name = settings[window.nameTranslations[document.langID]];
            var autoplay = false;
            var out = '<div id="' + name + '" class="owl-carousel owl-theme"></div>';
            window.appendComponent(settings[window.containerTranslations[document.langID]], out);
            if (settings[window.attributesTranslations[document.langID]]) {
                var propertiesArray = settings[window.attributesTranslations[document.langID]].split(' ' + window.andTranslations[document.langID] + ' ');
                for (i = 0; i < propertiesArray.length; i++) {
                    if (propertiesArray[i] == window.autoplayTranslations[document.langID]) {
                        autoplay = true;
                    }
                }
            }
            jQuery(document).ready(function ($) {
                $('#' + name + '').owlCarousel({
                    animateOut: 'slideOutDown',
                    animateIn: 'flipInX',
                    items: 1,
                    margin: 30,
                    loop: true,
                    stagePadding: 30,
                    smartSpeed: 450,
                    autoHeight: true,
                    rtl: document.isRTL,
                    autoplay: autoplay,
                    autoplayHoverPause: true,
                    URLhashListener: true,
                    autoplayTimeout: 5000
                });
            });
            if (settings[window.positionTranslations[document.langID]]) {
                $('#' + name + '').css('position', settings[window.positionTranslations[document.langID]]);
            } else {
                $('#' + name + '').css('position', 'relative');
            }
            window.propSet(name, settings);
        });
    };
});