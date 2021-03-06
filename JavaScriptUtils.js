var $$ = $$ || {};

$$.extend = function (Child, Parent) {
	var F = function () {
	};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.superclass = Parent.prototype;
};

$$.trim = function (str, charlist) {
	charlist = !charlist ? ' \\s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
	var re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
	return str.replace(re, '');
};

$$.parseUrlParams = function (url) {
	var url = url || location.href;
	var searchParam = {};
	var regExpParams = /\?{1}.+/;

	if (regExpParams.test(url)) {
		url = url.replace(regExpParams, '');

		var urlParams = location.search.replace('?', '');
		urlParams = urlParams.split('&');

		_.each(urlParams, function (item, index, list) {
			var param = item.split('=');
			searchParam[ param[ 0 ] ] = param[ 1 ];
		});
	}
	return searchParam;
};

$$.clamp = function (value, min, max) {
	return Math.min(max, Math.max(min, value));
};

$$.getRandomInt = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

$$.makeVideoPlayerHtml = function (videoType, videoId, width, height) {
	if (videoType == 'youtube') {
		return '<iframe class="youtube-player" type="text/html"'
			+ ' width="' + width + '" height="' + height + '" src="'
			+ 'http://www.youtube.com/embed/' + videoId + '?autoplay=0&rel=0&amp;controls=0&amp;showinfo=0'
			+ '" frameborder="0" wmode="opaque" autoplay="false"></iframe>';
	} else if (videoType == 'vimeo') {
		return '<iframe wmode="opaque" width="' + width + '" height="' + height + '" src="'
			+ 'http://player.vimeo.com/video/' + videoId + '?autoplay=1'
			+ '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
	}

	return '';
};

$$.ScrollWidth = function () {
	// создадим элемент с прокруткой
	var div = document.createElement('div');

	div.style.overflowY = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';

	// при display:none размеры нельзя узнать
	// нужно, чтобы элемент был видим,
	// visibility:hidden - можно, т.к. сохраняет геометрию
	div.style.visibility = 'hidden';

	document.body.appendChild(div);
	var scrollWidth = div.offsetWidth - div.clientWidth;
	document.body.removeChild(div);

	return scrollWidth;
};

$$.FakerInfo = function (block) {
	var news = block.find('.news-block');

	news.each(function () {
		var item = $(this);
		var hasImage = item.find('img').length == 0 ? false : true;
		var hasTitle = item.find('.title').length == 0 ? false : true;

		if (hasTitle) {
			var title = item.find('.title');
			var subtitle = item.find('.subtitle');
			var description = item.find('.description');
			var date = item.find('.date');
			var rating = item.find('.rating');

			var timeDate = new Date(faker.date.between(2010, 2014));
			var curr_date = timeDate.getDate();
			var curr_month = timeDate.getMonth() + 1;
			var curr_year = timeDate.getFullYear() % 1000;
			var formatDate = curr_date + "." + numb(curr_month) + "." + curr_year;
			var formatTime = numb(timeDate.getHours()) + ":" + numb(timeDate.getMinutes());

			date.text(formatDate + ', ' + formatTime);
			title.text(faker.lorem.words(1)[ 0 ]);
			subtitle.text(faker.lorem.paragraph(1));
			description.text(faker.lorem.paragraph(1));
			rating.text($$.getRandomInt(0, 4) + '.' + $$.getRandomInt(0, 9));
		}

		if (hasImage) {
			var width = item.width();
			var height = item.height();
			item.find('img').attr('src', faker.image.imageUrl(width, height, 'transport'));
		}
	});

	function numb (number) {
		if (number < 10) {
			return '0' + number;
		} else {
			return number;
		}
	}
};

$$.number_format = function (number, decimals, dec_point, thousands_sep) {
	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function (n, prec) {
			var k = Math.pow(10, prec);
			return '' + Math.round(n * k) / k;
		};
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	if (s[ 0 ].length > 3) {
		s[ 0 ] = s[ 0 ].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[ 1 ] || '').length < prec) {
		s[ 1 ] = s[ 1 ] || '';
		s[ 1 ] += new Array(prec - s[ 1 ].length + 1).join('0');
	}
	return s.join(dec);
};

$$.getVideoID = function (url) {
	var id = '';
	url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
	if (url[ 2 ] !== undefined) {
		id = url[ 2 ].split(/[^0-9a-z_\-]/i);
		id = id[ 0 ];
	} else {
		id = url;
	}
	return id;
};

$$.secondsToTime = function (seconds) {
	"use strict";

	let allTime = seconds;
	let minutes = parseInt(seconds / 60);
	let sec = parseInt(seconds - (minutes * 60));

	if (minutes < 10) {
		minutes = `0${minutes}`
	}

	if (sec < 10) {
		sec = `0${sec}`
	}

	return {
		minutes: minutes,
		sec:     sec
	};
};


/** 7 жизненно важных функций в JavaScript **/


/*========================================================================== */
/*
 debounce

 Функция debounce может сыграть важную роль когда дело касается
 производительности событий. Если вы не используете debounce с событиями
 scroll, resize, key*, скорее всего, вы делаете что-то не так.
 Ниже приведен код функции debounce, которая поможет повысить
 производительность вашего кода:
 */
/*========================================================================== */

// Возвращает функцию, которая не будет срабатывать, пока продолжает вызываться.
// Она сработает только один раз через N миллисекунд после последнего вызова.
// Если ей передан аргумент `immediate`, то она будет вызвана один раз сразу после
// первого запуска.

/**
 *
 * @param func
 * @param wait
 * @param immediate
 * @returns {Function}
 */
$$.debounce = function (func, wait, immediate) {
	var timeout;
	return function () {
		var context = this, args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/**
 Использование
 var myEfficientFn = debounce(function () {
		//All the taxing stuff you do
	}, 250);
 window.addEventListener('resize', myEfficientFn);

 debounce не позволит обратному вызову исполняться чаще,
 чем один раз в заданный период времени. Это особенно важно
 при назначении функции обратного вызова для часто вызываемых
 событий.
 **/

/*========================================================================== */
/*
 poll

 Функцию debounce не всегда возможно подключить для обозначения желаемого
 состояния: если событие не существует — это будет не возможно.
 В этом случае вы должны проверять состояние с помощью интервалов:
 */
/*========================================================================== */

// Возвращает функцию, которая не будет срабатывать, пока продолжает вызываться.
// Она сработает только один раз через N миллисекунд после последнего вызова.
// Если ей передан аргумент `immediate`, то она будет вызвана один раз сразу после
// первого запуска.


/**
 *
 * @param fn
 * @param timeout
 * @param interval
 * @returns {*|promise.promise|Function|jQuery.promise|d.promise|promise}
 */
$$.poll = function (fn, timeout, interval) {
	var dfd = new Deferred();
	var endTime = Number(new Date()) + (timeout || 2000);
	interval = interval || 100;

	(function p () {
		// Если условие не выполнено, то мы закончили
		if (fn()) {
			dfd.resolve();
		}
		// Если условие выполнено, но таймаут ещё не наступл — повторяем
		else if (Number(new Date()) < endTime) {
			setTimeout(p, interval);
		}
		// Колбек, который будет вызван в случае успеха
		else {
			dfd.reject(new Error('timed out for ' + fn + ': ' + arguments));
		}
	})();

	return dfd.promise;
};

/**
 Использование
 poll(function() {
		return document.getElementById('lightbox').offsetWidth > 0;
	}, 2000, 150);
 **/

/*========================================================================== */
/*
 once

 Иногда бывает нужно, чтобы функция выполнилась только один раз,
 как если бы вы использовали событие onload. Функция once даёт такую
 возможность:
 */
/*========================================================================== */


/**
 *
 * @param fn
 * @param context
 * @returns {Function}
 */
$$.once = function (fn, context) {
	var result;

	return function () {
		if (fn) {
			result = fn.apply(context || this, arguments);
			fn = null;
		}

		return result;
	};
};

/**
 Использование
 var canOnlyFireOnce = once(function() {
		console.log('Запущено!');
	});

 canOnlyFireOnce(); // "Запущено!"
 canOnlyFireOnce(); // Не запущено

 once гарантирует, что заданная функция будет вызвана только один раз,
 что предотвращает повторную инициализацию.
 **/

/*========================================================================== */
/*
 getAbsoluteUrl

 Получить абсолютный URL из строчной переменной не так просто, как кажется.
 Существует конструктор URL, но он «барахлит», если вы не предоставите
 требуемые параметры (которых у вас может не быть).
 Вот хитрый способ получить абсолютный URL из строки:

 */
/*========================================================================== */

/**
 *
 */
$$.getAbsoluteUrl = (function () {
	var a;

	return function (url) {
		if (!a) a = document.createElement('a');
		a.href = url;

		return a.href;
	};
})();

/**
 Использование
 getAbsoluteUrl('/something'); // http://davidwalsh.name/something

 Передаваемый на вход href и URL не имеют значения,
 функция в любом случае вернёт надежный абсолютный URL в ответ.
 **/
