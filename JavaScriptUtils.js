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
