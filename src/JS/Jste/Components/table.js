/*!
 * Table
 * https://project-jste.github.com/
 *
 * Copyright 2017 Jste Team
 * Released under the GNU AGPLv3 license
 * https://project-jste.github.com/license
 *
 * Date: 2017-09-6
 */
$(function () {
    $.fn[window.tableTranslations[document.lang]] = function (options) {
        // Establish our default settings
        var settings = $.extend({
            [window.fontColorTranslations[document.lang]]: null,
            [window.fontSizeTranslations[document.lang]]: null,
            [window.dataTranslations[document.lang]]: null,
            [window.nameTranslations[document.lang]]: null,
            [window.widthTranslations[document.lang]]: null,
            [window.lengthTranslations[document.lang]]: null,
            [window.fontThicknessTranslations[document.lang]]: null,
            [window.fontStyleTranslations[document.lang]]: null,
            [window.animationTranslations[document.lang]]: null,
            [window.transparencyTranslations[document.lang]]: null,
            [window.distanceFromBottomTranslations[document.lang]]: null,
            [window.distanceFromTopTranslations[document.lang]]: null,
            [window.distanceFromLeftTranslations[document.lang]]: null,
            [window.distanceFromRightTranslations[document.lang]]: null,
            [window.positionTranslations[document.lang]]: null,
            [window.containerTranslations[document.lang]]: null,
            [window.attributesTranslations[document.lang]]: null,
            [window.backgroundTranslations[document.lang]]: null,
            [window.commandsTranslations[document.lang]]: null
        }, options);
        return this.each(function () {
            var name = settings[window.nameTranslations[document.lang]];
            var out = '<table id="' + name + '" class="responsive-table centered highlight"><thead></thead><tbody class="list"></tbody></table>';
            window.appendComponent(settings[window.containerTranslations[document.lang]], out);
            if (settings[window.dataTranslations[document.lang]]) {
                var inputDataPlainA = settings[window.dataTranslations[document.lang]].split(' &amp;&amp;&amp;&amp; ');
                var inputDataRaw = '[';
                for (var a = 0; a < inputDataPlainA.length; a++) {
                    var inputDataPlainB = inputDataPlainA[a].split(' &amp;&amp;&amp; ');
                    inputDataRaw += '{';
                    for (var i = 0; i < inputDataPlainB.length; i++) {
                        if (i == inputDataPlainB.length - 1) {
                            var cellData = inputDataPlainB[i].split(' ' + window.inTheCellTranslations[document.lang] + ' ')[0];
                            var cellName = inputDataPlainB[i].split(' ' + window.inTheCellTranslations[document.lang] + ' ')[1];
                            inputDataRaw += '"' + cellName + '": "' + cellData + '"';
                        } else {
                            var cellData = inputDataPlainB[i].split(' ' + window.inTheCellTranslations[document.lang] + ' ')[0];
                            var cellName = inputDataPlainB[i].split(' ' + window.inTheCellTranslations[document.lang] + ' ')[1];
                            inputDataRaw += '"' + cellName + '": "' + cellData + '", ';
                        }
                    }
                    if (a == inputDataPlainA.length - 1) {
                        inputDataRaw += '}';
                    } else {
                        inputDataRaw += '}, ';
                    }
                }
                inputDataRaw += ']';
            }
            console.log(inputDataRaw)
            var inputData = JSON.parse(inputDataRaw);
            var keys = [];
            for (var i = 0; i < inputData.length; i++) {
                Object.keys(inputData[i]).forEach(function (key) {
                    if (keys.indexOf(key) == -1) {
                        keys.push(key);
                    }
                });
            }
            var template = '<tr>';
            for (i = 0; i < keys.length; i++) {
                $('#' + name + ' > thead').append('<th>' + keys[i] + '</th>');
                template += '<td class="' + keys[i] + '"></td>';
            }
            template += '</tr>';
            var options = {
                valueNames: keys,
                item: template
            };
            var userList = new List(name, options, inputData);
            if (settings[window.attributesTranslations[document.lang]]) {
                var propertiesArray = settings[window.attributesTranslations[document.lang]].split(' ' + window.andTranslations[document.lang] + ' ');
                for (i = 0; i < propertiesArray.length; i++) {
                    if (propertiesArray[i] == window.gridTranslations[document.lang]) {
                        $('#' + name + '').addClass('row');
                    }
                }
            }
            if ($('#' + settings[window.containerTranslations[document.lang]] + '').hasClass('row') == true) {
                $('#' + name + '').addClass('col');
            }
            if (settings[window.positionTranslations[document.lang]]) {
                $('#' + name + '').css('position', settings[window.positionTranslations[document.lang]]);
            } else {
                $('#' + name + '').css('position', 'relative');
            }
            window.propSet(name, settings);
        });
    };
});