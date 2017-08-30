$(function () {
    $(function () {
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
        //-------------------------------------------------------------------TextBox------------------------------------------------------------------------------------------------------------------------------------------//
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
        $.fn[window.writingZoneTranslations[document.lang]] = function (options) {
            // Establish our default settings
            var settings = $.extend({
                [window.typeTranslations[document.lang]]: null,
                [window.maxTranslations[document.lang]]: null,
                [window.minTranslations[document.lang]]: null,
                [window.requirementTranslations[document.lang]]: null,
                errorMessage: null,
                [window.prefixTranslations[document.lang]]: null,
                [window.suffixTranslations[document.lang]]: null,
                [window.clearButtonTranslations[document.lang]]: null,
                required: null,
                counter: null,
                [window.dynamicSizeTranslations[document.lang]]: null,
                [window.disabledTranslations[document.lang]]: null,
                [window.rippleTranslations[document.lang]]: null,
                [window.fontColorTranslations[document.lang]]: null,
                [window.fontSizeTranslations[document.lang]]: null,
                [window.nameTranslations[document.lang]]: null,
                [window.widthTranslations[document.lang]]: null,
                [window.lengthTranslations[document.lang]]: null,
                [window.thicknessTranslations[document.lang]]: null,
                [window.fontStyleTranslations[document.lang]]: null,
                [window.animationTranslations[document.lang]]: null,
                [window.transparencyTranslations[document.lang]]: null,
                [window.distanceFromBottomTranslations[document.lang]]: null,
                [window.distanceFromTopTranslations[document.lang]]: null,
                [window.distanceFromLeftTranslations[document.lang]]: null,
                [window.distanceFromRightTranslations[document.lang]]: null,
                [window.positionTranslations[document.lang]]: null,
                [window.containerTranslations[document.lang]]: null,
                [window.backgroundTranslations[document.lang]]: null,
                [window.attributesTranslations[document.lang]]: null,
                [window.commandsTranslations[document.lang]]: null
            }, options);
            return this.each(function () {
                var name = settings[window.nameTranslations[document.lang]];
                if (settings[window.dynamicSizeTranslations[document.lang]] == window.yesTranslations[document.lang]) {
                    var out = 'paper-textarea ';
                } else {
                    var out = '<paper-input '
                }
                if (settings[window.titleTranslations[document.lang]]) {
                    out += 'label="' + settings[window.titleTranslations[document.lang]] + '" ';
                }
                if (settings[window.typeTranslations[document.lang]] == 'password') {
                    out += 'type="password" ';
                } else if (settings[window.typeTranslations[document.lang]] == 'number') {
                    out += 'type="number" ';
                }
                if (settings[window.requirementTranslations[document.lang]] == 'someText') {
                    out += 'auto-validate ';
                } else if (settings[window.requirementTranslations[document.lang]] == 'lettersOnly') {
                    out += 'auto-validate allowed-pattern="[a-zA-Z]"';
                } else if (settings[window.requirementTranslations[document.lang]]) {
                    out += 'auto-validate allowed-pattern="' + settings[window.requirementTranslations[document.lang]] + '"';
                }
                if (settings[window.maxTranslations[document.lang]]) {
                    out += 'maxlength="' + settings[window.maxTranslations[document.lang]] + '" ';
                }
                if (settings[window.minTranslations[document.lang]]) {
                    out += 'minlength="' + settings[window.minTranslations[document.lang]] + '" ';
                }
                if (settings[window.attributesTranslations[document.lang]]) {
                    var propertiesArray = settings[window.attributesTranslations[document.lang]].split(' &amp;&amp;&amp; ');
                    for (i = 0; i < propertiesArray.length; i++) {
                        if (propertiesArray[i] == window.disabledTranslations[document.lang]) {
                            out += 'disabled ';
                        } else if (propertiesArray[i] == counterTranslations[document.lang]) {
                            out += 'char-counter ';
                        }
                    }
                }
                if (settings[window.rippleTranslations[document.lang]] == window.noTranslations[document.lang]) {
                    out += 'noink ';
                }
                if (settings[window.textTranslations[document.lang]]) {
                    out += 'label="' + settings[window.textTranslations[document.lang]] + '" ';
                }
                if (settings[window.iconTranslations[document.lang]]) {
                    out += 'icon="' + settings[window.iconTranslations[document.lang]] + '" ';
                }
                if (settings[window.descriptionTranslations[document.lang]]) {
                    out += 'title="' + settings[window.descriptionTranslations[document.lang]] + '" ';
                }
                out += 'id="' + name + '">';
                if (settings[window.prefixTranslations[document.lang]]) {
                    var prefix = settings[window.prefixTranslations[document.lang]].split(' &amp;&amp;&amp; ');
                    for (i = 0; i < prefix.length; i++) {
                        if (prefix[i].split("an icon of ")[1]) {
                            out += '<iron-icon icon="' + prefix[i].split("an icon of ")[1] + '" prefix></iron-icon>';
                        } else {
                            out += '<div prefix>' + prefix[i] + '</div>';
                        }
                    }
                }
                if (settings[window.suffixTranslations[document.lang]]) {
                    var suffix = settings[window.suffixTranslations[document.lang]].split(' &amp;&amp;&amp; ');
                    for (i = 0; i < suffix.length; i++) {
                        if (suffix[i].split("an icon of ")[1]) {
                            out += '<iron-icon icon="' + suffix[i].split("an icon of ")[1] + '" suffix></iron-icon>';
                        } else {
                            out += '<div suffix>' + suffix[i] + '</div>';
                        }
                    }
                }
                if (settings[window.clearButtonTranslations[document.lang]] == window.yesTranslations[document.lang]) {
                    out += '<paper-icon-button suffix onclick="clearInput()" icon="clear" alt="clear" title="clear"></paper-icon-button>';
                }
                if (settings[window.dynamicSizeTranslations[document.lang]] == window.yesTranslations[document.lang]) {
                    out += '</paper-textarea>';
                } else {
                    out += '</paper-input>'
                }
                if (settings[window.containerTranslations[document.lang]]) {
                    if ($('#' + settings[window.containerTranslations[document.lang]] + '').hasClass('modal')) {
                        $('#' + settings[window.containerTranslations[document.lang]] + ' > .modal-content').append(out);
                    } else {
                        $('#' + settings[window.containerTranslations[document.lang]] + '').append(out);
                    }
                } else {
                    $('contents').append(out);
                }
                if (settings[window.typeTranslations[document.lang]] == 'date') {
                    if (document.lang == 0 || document.lang == 1) {
                        $('#' + name + '').attr('data-lang', 'en');
                    }else if (document.lang == 2) {
                        $('#' + name + '').attr('data-lang', 'fr');
                    } else if (document.lang == 3 || document.lang == 4) {
                        $('#' + name + '').attr('data-lang', 'ar');
                    }
                    $('#' + name + '').attr('data-modal', 'true');
                    $('#' + name + '').attr('data-large-mode', 'true');
                    $('#' + name + '').attr('data-translate-mode', 'true');
                    $('#' + name + '').dateDropper();
                } else if (settings[window.typeTranslations[document.lang]] == 'time') {
                    $('#' + name + '').timeDropper();
                }
                if (settings[window.fontColorTranslations[document.lang]]) {
                    window.setFontColour(name, settings[window.fontColorTranslations[document.lang]]);
                }
                if (settings[window.fontStyleTranslations[document.lang]]) {
                    $('#' + name + '').css('font-style', settings[window.fontStyleTranslations[document.lang]]);
                }
                if (settings[window.attributesTranslations[document.lang]]) {
                    var propertiesArray = settings[window.attributesTranslations[document.lang]].split(' &amp;&amp;&amp; ');
                    for (i = 0; i < propertiesArray.length; i++) {
                        if (propertiesArray[i] == window.disabledTranslations[document.lang]) {
                            $('#' + name + '').attr('disabled', '');
                        }
                    }
                }
                if (settings[window.rippleTranslations[document.lang]] == window.noTranslations[document.lang]) {
                    $('#' + name + '').attr('noink', '');
                }
                if (settings[window.thicknessTranslations[document.lang]]) {
                    if (settings[window.thicknessTranslations[document.lang]] == window.thickTranslations[document.lang]) {
                        $('#' + name + '').css('font-weight', 'bold');
                    } else {
                        $('#' + name + '').css('font-weight', settings[window.thicknessTranslations[document.lang]]);
                    }
                }
                if (settings[window.fontSizeTranslations[document.lang]]) {
                    $('#' + name + '').css('font-size', window.convertLengthCSS(settings[window.fontSizeTranslations[document.lang]]));
                }
                if ($('#' + settings[window.containerTranslations[document.lang]] + '').hasClass('row') == true) {
                    $('#' + name + '').addClass('col');
                }
                if (settings[window.positionTranslations[document.lang]]) {
                    $('#' + name + '').css('position', settings[window.positionTranslations[document.lang]]);
                } else {
                    $('#' + name + '').css('position', 'relative');
                }
                if (settings[window.distanceFromBottomTranslations[document.lang]]) {
                    window.setDistance(name, 'bottom', settings[window.distanceFromBottomTranslations[document.lang]]);
                }
                if (settings[window.distanceFromTopTranslations[document.lang]]) {
                    window.setDistance(name, 'top', settings[window.distanceFromTopTranslations[document.lang]]);
                }
                if (settings[window.distanceFromLeftTranslations[document.lang]]) {
                    window.setDistance(name, 'left', settings[window.distanceFromLeftTranslations[document.lang]]);
                }
                if (settings[window.distanceFromRightTranslations[document.lang]]) {
                    window.setDistance(name, 'right', settings[window.distanceFromRightTranslations[document.lang]]);
                }
                if (settings[window.commandsTranslations[document.lang]]) {
                    window.execute(name, settings[window.commandsTranslations[document.lang]]);
                }
                if (settings[window.widthTranslations[document.lang]]) {
                    window.setDimension(name, 'width', settings[window.widthTranslations[document.lang]]);
                }
                if (settings[window.lengthTranslations[document.lang]]) {
                    window.setDimension(name, 'length', settings[window.lengthTranslations[document.lang]]);
                }
                if (settings[window.animationTranslations[document.lang]]) {
                    window.setAnimation(name, settings[window.animationTranslations[document.lang]]);
                }
                if (settings[window.backgroundTranslations[document.lang]]) {
                    window.setBG(name, settings[window.backgroundTranslations[document.lang]]);
                }
                if (settings[window.transparencyTranslations[document.lang]]) {
                    $('#' + name + '').css('-webkit-filter', 'opacity(' + settings[window.transparencyTranslations[document.lang]] + '%)');
                }
            });
        };
    });
}(jQuery));