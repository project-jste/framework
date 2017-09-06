/*!
 * Tooltip
 * https://project-jste.github.com/
 *
 * Copyright 2017 Jste Team
 * Released under the GNU AGPLv3 license
 * https://project-jste.github.com/license
 *
 * Date: 2017-09-6
 */
$(function () {
    $(function () {
        var uniqueID = document.uniqueID();
        document[uniqueID + 'checker'] = setInterval(function () {
            if (document.lang == 0 || document.lang == 1 || document.lang == 2 || document.lang == 3 || document.lang == 4 || document.lang == 5) {
                //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
                //-------------------------------------------------------------------ToolTip------------------------------------------------------------------------------------------------------------------------------------------//
                //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
                $.fn[window.tooltipTranslations[document.lang]] = function (options) {
                    // Establish our default settings
                    var settings = $.extend({
                        [window.textTranslations[document.lang]]: 'It seems that you have typed nothing',
                        [window.titleTranslations[document.lang]]: null,
                        [window.fontColorTranslations[document.lang]]: null,
                        [window.fontSizeTranslations[document.lang]]: null,
                        [window.nameTranslations[document.lang]]: null,
                        [window.widthTranslations[document.lang]]: null,
                        [window.lengthTranslations[document.lang]]: null,
                        [window.thicknessTranslations[document.lang]]: null,
                        [window.fontStyleTranslations[document.lang]]: null,
                        [window.emitterTranslations[document.lang]]: null,
                        [window.directionTranslations[document.lang]]: window.fromTheTopTranslations[document.lang],
                        [window.animationTranslations[document.lang]]: null,
                        [window.backgroundTranslations[document.lang]]: null,
                        [window.transparencyTranslations[document.lang]]: null,
                        [window.containerTranslations[document.lang]]: null,
                        [window.commandsTranslations[document.lang]]: null
                    }, options);
                    return this.each(function () {
                        if (settings[window.directionTranslations[document.lang]] == window.fromTheRightTranslations[document.lang]) {
                            var position = 'right';
                        } else if (settings[window.directionTranslations[document.lang]] == window.fromTheLeftTranslations[document.lang]) {
                            var position = 'left';
                        } else if (settings[window.directionTranslations[document.lang]] == window.fromTheTopTranslations[document.lang]) {
                            var position = 'top';
                        } else if (settings[window.directionTranslations[document.lang]] == window.fromTheBottomTranslations[document.lang]) {
                            var position = 'bottom';
                        }
                        if (settings[window.titleTranslations[document.lang]]) {
                            $('#' + settings[window.emitterTranslations[document.lang]]).tipso({
                                titleContent: settings[window.titleTranslations[document.lang]],
                                content: settings[window.textTranslations[document.lang]],
                                position: position,
                                background: '#FE5970'
                            });
                        } else {
                            $('#' + settings[window.emitterTranslations[document.lang]]).tipso({
                                content: settings[window.textTranslations[document.lang]],
                                position: position,
                                background: '#FE5970'
                            });
                        }
                        if (settings[window.transparencyTranslations[document.lang]]) {
                            $('#' + name + '').css('-webkit-filter', 'opacity(' + settings[window.transparencyTranslations[document.lang]] + '%)');
                        }
                    });
                };

                clearInterval(document[uniqueID + 'checker']);
            }
        }, 1);
    });
}(jQuery));