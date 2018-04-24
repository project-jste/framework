/*!
 * Script Initialization
 * https://project-jste.github.io/
 *
 * Copyright 2018 Jste Team
 * Released under the GNU AGPLv3 license
 * https://project-jste.github.io/license
 *
 * Date: 2018-04-23
 */
window.scriptInit = async function () {
	var meta = document.createElement('meta');
	meta.name = 'viewport';
	meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	document.getElementsByTagName('head')[0].appendChild(meta);
	var componentsRegex = '(' + window.componentsDB.join('|') + ')';
	var rawCode = $(`jste`).html();
	if (navigator.onLine) {
		var isReachable = await window.isReachable('https://jste-manager.azurewebsites.net/autoCorrect');
		if (isReachable) {
			var codeChunks = rawCode.match(/^(.|[\r\n]){0,10000}(,|\.)$/gmi);
			rawCode = '';
			for (var i = 0; i < codeChunks.length; i++) {
				rawCode += '\n' + await $.ajax({
					url: window.autoCorrectionAddress,
					method: 'POST',
					data: {
						lang: document.langCode == 'arz' ? 'ar' : document.langCode,
						input: codeChunks[i]
					}
				});
			}
			console.log(rawCode);
		}
	}
	var codePrefix = 'jQuery(document).ready(\nfunction ($) {';
	var addTranslations = window.wordsTranslationsDB.Words['add'][document.langCode];
	for (var i = 0; i < addTranslations.length; i++) {
		codePrefix += '\nvar ' + addTranslations[i] + ' = $(`body`);';
	}
	var code = rawCode;
	code = code.replace(XRegExp(`((^ +| +$)|(^\\s*$(?:\\r\\n?|\\n)))`, 'gmi'), ``);
	code = code.replace(XRegExp(`^((?!^(?:\\d|[A-Z])\\. )(.*?)[^,|\\.|:])$\\s(?!^(?:\\d|[A-Z])\\. )`, 'gmi'), '$1 ');
	code = `${codePrefix}\n${code}\n});`;
	code = code.replace(XRegExp('&lt;&lt; ' + getTranslations("operator19") + ': ((?:(?:.*?&lt;&lt;.*?&gt;&gt;.*?)|.*?)+?) &gt;&gt;', 'gmi'), function (match, p1, offset, string) {
		return `NORMALTEXTPREFIX${btoa(p1.replace(XRegExp('\n', 'gmi'), ' '))}NORMALTEXTSUFFIX`;
	});
	if (document.langID == 0) {
		document.isRTL = false;
		if (Modernizr.speechrecognition) {
			annyang.setLanguage(`en-GB`);
		}
		var i = -1;
		code = code.replace(XRegExp(`^add a text`, 'gmi'), 'add a text0');
		code = code.replace(XRegExp(`^add a (.*?) text`, 'gmi'), 'add a $1 text0');
		code = code.replace(XRegExp(`^define the (${getTranslations('function')}) (.*?) with the following commands:\\n((?:(?:\\n?)^(?:[A-Z]|\\d)\\..*?(?:(?:$\\n^(?:[A-Z]|\\d)\\..*?$)|\\.$))+)`, 'gmi'), function (match, p1, p2, p3, offset, string) {
			p3 = p3.replace(XRegExp(`^[A-Z]\\. (.*?)\\.$\\n(?=^[A-Z]\\.)`, 'gmis'), '$1 &amp;&amp;&amp; ').replace(XRegExp(` &amp;&amp;&amp; [A-Z]\\. (.*?)\\.$`, 'gmi'), ' &amp;&amp;&amp; $1');
			return `add['${p1}']({\nits name is ${p2},\nits commands are ${p3}.`;
		});
		code = code.replace(XRegExp(`^define the (${getTranslations('style')}) (.*?) with the following properties:`, 'gmi'), function (match, p1, p2, offset, string) {
			return `add['${p1}']({\nits name is ${p2},`;
		});
		code = code.replace(XRegExp(`^configure this (.*?) (site|app) with the following properties:$`, 'gmi'), 'add.setup({\nits mode is $2,\nits attributes are $1,');
		code = code.replace(XRegExp(`^configure this (site|app) with the following properties:$`, 'gmi'), 'add.setup({\nits mode is $1,');
		code = code.replace(XRegExp(`^add (a|an) (.*?) ${componentsRegex} without (.*?) with the following properties:$`, 'gmi'), `add['$3']({\nits attributes are $2 and without $4,`);
		code = code.replace(XRegExp(`^add (a|an) (.*?) ${componentsRegex} with (.*?) with the following properties:$`, 'gmi'), `add['$3']({\nits attributes are $2 and with $4,`);
		code = code.replace(XRegExp(`^add (a|an) ${componentsRegex} with (.*?) with the following properties:$`, 'gmi'), `add['$2']({\nits attributes are with $3,`);
		code = code.replace(XRegExp(`^add (a|an) ${componentsRegex} without (.*?) with the following properties:$`, 'gmi'), `add['$2']({\nits attributes are without $3,`);
		code = code.replace(XRegExp(`^add (a|an) (.*?) ${componentsRegex} with the following properties:$`, 'gmi'), `add['$3']({\nits attributes are $2,`);
		code = code.replace(XRegExp(`^add (a|an) ${componentsRegex} with the following properties:$`, 'gmi'), `add['$2']({`);
		code = code.replace(XRegExp(`^assign the following properties to the element (\\S+):$`, 'gmi'), `add['properties assignor']({\nits name is $1,`);
		code = code.replace(XRegExp(`^clone (\\S+) including its commands with the following properties:$`, 'gmi'), 'add.clone0({\nits cloned element is $1,\nits attributes are with commands,');
		code = code.replace(XRegExp(`^clone (\\S+) with the following properties:$`, 'gmi'), 'add.clone0({\nits cloned element is $1,');
		code = code.replace(XRegExp(`^its (.*?) (is|are) ((?:.|[\\r\\n])*?)([\\.,])$`, 'gmi'), function (match, p1, p2, p3, p4, offset, string) {
			if (p1 == 'text') {
				p3 = p3.parseValue();
			} else if (p1 != 'commands') {
				p3 = p3.parseValue(false);
			}
			return '"' + p1 + '"' + ': `' + p3.replace(XRegExp('^(.*?)`(.*)$', 'gmi'), '$1\\`$2') + '`' + (p4 == '.' ? '\n});' : ',');
		});
		code = code.replace(XRegExp(`^the commands of the item (.*?) are that (.*?)\,$`, 'gmi'), function (match, p1, p2, offset, string) {
			i++;
			return 'commands' + i + ': `' + p1 + ':' + p2 + '`,';
		});
		code = code.replace(XRegExp(`^the commands of the item (.*?) are that (.*?)\.$`, 'gmi'), function (match, p1, p2, offset, string) {
			i++;
			return 'commands' + i + ': `' + p1 + ':' + p2 + '`\n});';
		});
		$(`jste`).remove();
	} else if (document.langID == 1) {
		document.isRTL = false;
		if (Modernizr.speechrecognition) {
			annyang.setLanguage(`en-US`);
		}
		var i = -1;
		code = code.replace(XRegExp(`^add a text`, 'gmi'), 'add a text0');
		code = code.replace(XRegExp(`^add a (.*?) text`, 'gmi'), 'add a $1 text0');
		code = code.replace(XRegExp(`^define the (${getTranslations('function')}) (.*?) with the following commands:\\n((?:(?:\\n?)^(?:[A-Z]|\\d)\\..*?(?:(?:$\\n^(?:[A-Z]|\\d)\\..*?$)|\\.$))+)`, 'gmi'), function (match, p1, p2, p3, offset, string) {
			p3 = p3.replace(XRegExp(`^[A-Z]\\. (.*?)\\.$\\n(?=^[A-Z]\\.)`, 'gmis'), '$1 &amp;&amp;&amp; ').replace(XRegExp(` &amp;&amp;&amp; [A-Z]\\. (.*?)\\.$`, 'gmi'), ' &amp;&amp;&amp; $1');
			return `add['${p1}']({\nits name is ${p2},\nits commands are ${p3}.`;
		});
		code = code.replace(XRegExp(`^define the (${getTranslations('style')}) (.*?) with the following properties:`, 'gmi'), function (match, p1, p2, offset, string) {
			return `add['${p1}']({\nits name is ${p2},`;
		});
		code = code.replace(XRegExp(`^configure this (.*?) (site|app) with the following properties:$`, 'gmi'), 'add.setup({\nits mode is $2,\nits attributes are $1,');
		code = code.replace(XRegExp(`^configure this (site|app) with the following properties:$`, 'gmi'), 'add.setup({\nits mode is $1,');
		code = code.replace(XRegExp(`^add (a|an) (.*?) ${componentsRegex} without (.*?) with the following properties:$`, 'gmi'), `add['$3']({\nits attributes are $2 and without $4,`);
		code = code.replace(XRegExp(`^add (a|an) (.*?) ${componentsRegex} with (.*?) with the following properties:$`, 'gmi'), `add['$3']({\nits attributes are $2 and with $4,`);
		code = code.replace(XRegExp(`^add (a|an) ${componentsRegex} with (.*?) with the following properties:$`, 'gmi'), `add['$2']({\nits attributes are with $3,`);
		code = code.replace(XRegExp(`^add (a|an) ${componentsRegex} without (.*?) with the following properties:$`, 'gmi'), `add['$2']({\nits attributes are without $3,`);
		code = code.replace(XRegExp(`^add (a|an) (.*?) ${componentsRegex} with the following properties:$`, 'gmi'), `add['$3']({\nits attributes are $2,`);
		code = code.replace(XRegExp(`^add (a|an) ${componentsRegex} with the following properties:$`, 'gmi'), `add['$2']({`);
		code = code.replace(XRegExp(`^assign the following properties to the element (\\S+):$`, 'gmi'), 'add.properties_assignor({\nits name is $1,');
		code = code.replace(XRegExp(`^clone (\\S+) including its commands with the following properties:$`, 'gmi'), 'add.clone0({\nits cloned element is $1,\nits attributes are with commands,');
		code = code.replace(XRegExp(`^clone (\\S+) with the following properties:$`, 'gmi'), 'add.clone0({\nits cloned element is $1,');
		code = code.replace(XRegExp(`^its (.*?) (is|are) ((?:.|[\\r\\n])*?)([\\.,])$`, 'gmi'), function (match, p1, p2, p3, p4, offset, string) {
			if (p1 == 'text') {
				p3 = p3.parseValue();
			} else if (p1 != 'commands') {
				p3 = p3.parseValue(false);
			}
			return '"' + p1 + '"' + ': `' + p3.replace(XRegExp('^(.*?)`(.*)$', 'gmi'), '$1\\`$2') + '`' + (p4 == '.' ? '\n});' : ',');
		});
		code = code.replace(XRegExp(`^the commands of the item (.*?) are that (.*?)\,$`, 'gmi'), function (match, p1, p2, offset, string) {
			i++;
			return 'commands' + i + ': `' + p1 + ':' + p2 + '`,';
		});
		code = code.replace(XRegExp(`^the commands of the item (.*?) are that (.*?)\.$`, 'gmi'), function (match, p1, p2, offset, string) {
			i++;
			return 'commands' + i + ': `' + p1 + ':' + p2 + '`\n});';
		});
		$(`jste`).remove();
	} else if (document.langID == 2) {
		document.isRTL = false;
		if (Modernizr.speechrecognition) {
			annyang.setLanguage(`fr-FR`);
		}
		var i = -1;
		code = code.replace(XRegExp(`^définir la (${getTranslations('function')}) (.*?) avec les commandes suivantes:\\n((?:(?:\\n?)^(?:[A-Z]|\\d)\\..*?(?:(?:$\\n^(?:[A-Z]|\\d)\\..*?$)|\\.$))+)`, 'gmi'), function (match, p1, p2, p3, offset, string) {
			p3 = p3.replace(XRegExp(`^[A-Z]\\. (.*?)\\.$\\n(?=^[A-Z]\\.)`, 'gmis'), '$1 &amp;&amp;&amp; ').replace(XRegExp(` &amp;&amp;&amp; [A-Z]\\. (.*?)\\.$`, 'gmi'), ' &amp;&amp;&amp; $1');
			return `add['${p1}']({\nsa nom est ${p2},\nses commandes sont ${p3}.`;
		});
		code = code.replace(XRegExp(`^définir le (${getTranslations('style')}) (.*?) avec les propriétés suivantes:`, 'gmi'), function (match, p1, p2, offset, string) {
			return `add['${p1}']({\nson nom est ${p2},`;
		});
		code = code.replace(XRegExp(`^configurez ce (site|app) (.*?) avec les propriétés suivantes:$`, 'gmi'), 'ajouter.installation({\nson mode est $1,\nses attributs sont $2,');
		code = code.replace(XRegExp(`^configurez ce (site|app) avec les propriétés suivantes:$`, 'gmi'), 'ajouter.installation({\nson mode est $1,');
		code = code.replace(XRegExp(`^ajouter (le|la|un|une) ${componentsRegex} (.*?) avec les propriétés suivantes:$`, 'gmi'), `ajouter['$2']({\nses attributs sont $3,`);
		code = code.replace(XRegExp(`^ajouter (le|la|un|une) ${componentsRegex} avec les propriétés suivantes:$`, 'gmi'), `ajouter['$2']({`);
		code = code.replace(XRegExp(`^affectez les propriétés suivantes à l'élément (\\S+):$`, 'gmi'), 'ajouter.cédant_des_propriétés({\nson nom est $1,');
		code = code.replace(XRegExp(`^cloner (.*?) y compris ses commandes avec les propriétés suivantes:$`, 'gmi'), 'ajouter.clone0({\nson élément clone est $1,\nses attributs sont avec des commandes,');
		code = code.replace(XRegExp(`^cloner (.*?) avec les propriétés suivantes:$`, 'gmi'), 'ajouter.clone0({\nson élément clone est $1,');
		code = code.replace(XRegExp(`^(son|sa|ses) (.*?) (est|sont) ((?:.|[\\r\\n])*?)([\\.,])$`, 'gmi'), function (match, p1, p2, p3, p4, p5, offset, string) {
			if (p2 == 'text') {
				p4 = p4.parseValue();
			} else if (p2 != 'commandes') {
				p4 = p4.parseValue(false);
			}
			return '"' + p2 + '"' + ': `' + p4.replace(XRegExp('^(.*?)`(.*)$', 'gmi'), '$1\\`$2') + '`' + (p5 == '.' ? '\n});' : ',');
		});
		code = code.replace(XRegExp(`^les commandes de l'élément (.*?) sont (.*?)\,$`, 'gmi'), function (match, p1, p2, offset, string) {
			i++;
			return 'commandes' + i + ': `' + p1 + ':' + p2 + '`,';
		});
		code = code.replace(XRegExp(`^les commandes de l'élément (.*?) sont (.*?)\.$`, 'gmi'), function (match, p1, p2, offset, string) {
			i++;
			return 'commandes' + i + ': `' + p1 + ':' + p2 + '`\n});';
		});
		$(`jste`).remove();
	} else if (document.langID == 3) {
		document.isRTL = true;
		$(`html`).attr(`dir`, `rtl`).attr(`document.langID`, `ar`);
		if (Modernizr.speechrecognition) {
			annyang.setLanguage(`ar-AE`);
		}
		var i = -1;
		code = code.replace(XRegExp(`^عرف ال(${getTranslations('function')}) (.*?) بالأوامر التالية:\\n((?:(?:\\n?)^(?:[A-Z]|\\d)\\..*?(?:(?:$\\n^(?:[A-Z]|\\d)\\..*?$)|\\.$))+)`, 'gmi'), function (match, p1, p2, p3, offset, string) {
			p3 = p3.replace(XRegExp(`^[A-Z]\\. (.*?)\\.$\\n(?=^[A-Z]\\.)`, 'gmis'), '$1 &amp;&amp;&amp; ').replace(XRegExp(` &amp;&amp;&amp; [A-Z]\\. (.*?)\\.$`, 'gmi'), ' &amp;&amp;&amp; $1');
			return `اضف['${p1}']({\nالاسم الخاص بها ${p2},\nالأوامر الخاصة بها ${p3}.`;
		});
		code = code.replace(XRegExp(`^عرف ال(${getTranslations('style')}) (.*?) بالخواص التالية:`, 'gmi'), function (match, p1, p2, p3, offset, string) {
			return `اضف['${p1}']({\nالاسم الخاص به ${p2},`;
		});
		code = code.replace(XRegExp(`^هيئ هذا (الموقع|التطبيق) (.*?) بالخواص التالية:$`, 'gmi'), 'اضف.الإعدادات({\nالوضعية الخاصة به $1,\nالصفات الخاصة به $2,');
		code = code.replace(XRegExp(`^هيئ هذا (الموقع|التطبيق) بالخواص التالية:$`, 'gmi'), 'اضف.الإعدادات({\nالوضعية الخاصة به $1,');
		code = code.replace(XRegExp(`^اضف ${componentsRegex} (.*?) بالخواص التالية:$`, 'gmi'), `اضف['$1']({\nالصفات الخاصة به $2,`);
		code = code.replace(XRegExp(`^اضف ${componentsRegex} بالخواص التالية:$`, 'gmi'), `اضف['$1']({`);
		code = code.replace(XRegExp(`^اضف هذه الخواص التالية إلى العنصر (\\S+):$`, 'gmi'), 'اضف.مضيف_الخواص({\nالاسم الخاص به $1,');
		code = code.replace(XRegExp(`^استنسخ (\\S+) بأوامره بالخواص التالية:$`, 'gmi'), 'اضف.استنساخ({\nالعنصر المستنسخ الخاص به $1,\nالصفات الخاصة به بالأوامر,');
		code = code.replace(XRegExp(`^استنسخ (\\S+) بالخواص دى:$`, 'gmi'), 'اضف.استنساخ({\nالعنصر المستنسخ الخاص به $1,');
		code = code.replace(XRegExp(`^(.*?) (الخاص به|الخاصة به|الخاص بها|الخاصة بها) ((?:.|[\\r\\n])*?)([\\.,])$`, 'gmi'), function (match, p1, p2, p3, p4, offset, string) {
			if (p1 == 'النص') {
				p3 = p3.parseValue();
			} else if (p1 != 'الأوامر') {
				p3 = p3.parseValue(false);
			}
			return '"' + p1.punctuationAndArticleRemover() + '"' + ': `' + p3.replace(XRegExp('^(.*?)`(.*)$', 'gmi'), '$1\\`$2') + '`' + (p4 == '.' ? '\n});' : ',');
		});
		code = code.replace(XRegExp(`^الأوامر الخاصة بالعنصر (.*?) هى أنه (.*?)\,$`, 'gmi'), function (match, p1, p2, offset, string) {
			i++;
			return 'أوامر' + i + ': `' + p1 + ':' + p2 + '`,';
		});
		code = code.replace(XRegExp(`^الأوامر الخاصة بالعنصر (.*?) هى أنه (.*?)\.$`, 'gmi'), function (match, p1, p2, offset, string) {
			i++;
			return 'أوامر' + i + ': `' + p1 + ':' + p2 + '`\n});';
		});
		$(`jste`).remove();
	} else if (document.langID == 4) {
		document.isRTL = true;
		$(`html`).attr(`dir`, `rtl`).attr(`document.langID`, `ar`);
		if (Modernizr.speechrecognition) {
			annyang.setLanguage(`ar-EG`);
		}
		var i = -1;
		code = code.replace(XRegExp(`^عرف ال(${getTranslations('function')}) (.*?) بالأوامر دى:\\n((?:(?:\\n?)^(?:[A-Z]|\\d)\\..*?(?:(?:$\\n^(?:[A-Z]|\\d)\\..*?$)|\\.$))+)`, 'gmi'), function (match, p1, p2, p3, offset, string) {
			p3 = p3.replace(XRegExp(`^[A-Z]\\. (.*?)\\.$\\n(?=^[A-Z]\\.)`, 'gmis'), '$1 &amp;&amp;&amp; ').replace(XRegExp(` &amp;&amp;&amp; [A-Z]\\. (.*?)\\.$`, 'gmi'), ' &amp;&amp;&amp; $1');
			return `ضيف['${p1}']({\nالاسم بتاعها ${p2},\nالأوامر بتاعتها ${p3}.`;
		});
		code = code.replace(XRegExp(`^عرف ال(${getTranslations('style')}) (.*?) بالخواص دى:`, 'gmi'), function (match, p1, p2, p3, offset, string) {
			return `ضيف['${p1}']({\nالاسم بتاعه ${p2},`;
		});
		code = code.replace(XRegExp(`^هيئ (السايت|الآب) (.*?) دة بالخواص دى:$`, 'gmi'), 'ضيف.الإعدادات({\nالمود بتاعه $1,\nالصفات بتاعته $2,');
		code = code.replace(XRegExp(`^هيئ (السايت|الآب) دة بالخواص دى:$`, 'gmi'), 'ضيف.الإعدادات({\nالمود بتاعه $1,');
		code = code.replace(XRegExp(`^ضيف ${componentsRegex} (.*?) بالخواص دى:$`, 'gmi'), `ضيف['$1']({\nالصفات بتاعته $2,`);
		code = code.replace(XRegExp(`^ضيف ${componentsRegex} بالخواص دى:$`, 'gmi'), `ضيف['$1']({`);
		code = code.replace(XRegExp(`^ضيف الخواص دى للعنصر (\\S+):$`, 'gmi'), 'ضيف.مضيف_الخواص({\nالاسم بتاعه $1,');
		code = code.replace(XRegExp(`^استنسخ (\\S+) بأوامره بالخواص دى:$`, 'gmi'), 'ضيف.استنساخ({\nالعنصر المستنسخ بتاعه $1,\nالصفات بتاعته بالأوامر,');
		code = code.replace(XRegExp(`^استنسخ (\\S+) بالخواص دى:$`, 'gmi'), 'ضيف.استنساخ({\nالعنصر المستنسخ بتاعه $1,');
		code = code.replace(XRegExp(`^(.*?) (بتاعه|بتاعته|بتاعها|بتاعتها) ((?:.|[\\r\\n])*?)([\\.,])$`, 'gmi'), function (match, p1, p2, p3, p4, offset, string) {
			if (p1 == 'الكلام') {
				p3 = p3.parseValue();
			} else if (p1 != 'الأوامر') {
				p3 = p3.parseValue(false);
			}
			return '"' + p1.punctuationAndArticleRemover() + '"' + ': `' + p3.replace(XRegExp('^(.*?)`(.*)$', 'gmi'), '$1\\`$2') + '`' + (p4 == '.' ? '\n});' : ',');
		});
		code = code.replace(XRegExp(`^الأوامر بتاعت العنصر (.*?) هية إنه (.*?)\,$`, 'gmi'), function (match, p1, p2, offset, string) {
			i++;
			return 'أوامر' + i + ': `' + p1 + ':' + p2 + '`,';
		});
		code = code.replace(XRegExp(`^الأوامر بتاعت العنصر (.*?) هية إنه (.*?)\.$`, 'gmi'), function (match, p1, p2, offset, string) {
			i++;
			return 'أوامر' + i + ': `' + p1 + ':' + p2 + '`\n});';
		});
		$(`jste`).remove();
	} else if (document.langID == 5) {
		document.isRTL = false;
		if (Modernizr.speechrecognition) {
			annyang.setLanguage(`ja`);
		}
		$(`jste`).remove();
	}
	console.log(code);
	eval(code);
};
$(function () {
	$(function () {
		setTimeout(function () {
			if (document.langID != null) {
				window.scriptInit();
			}
		}, 100);
	});
}(jQuery));