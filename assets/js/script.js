$(function () {

	// Кнопка "Увидеть все возможные поломки" 
	$(".price__row").hide();
	$(".price__row").slice(0, 7).show();
	$(".price__button").on('click', function (e) {
		e.preventDefault();
		$('.price__button').hide();
		$(".price__row:hidden").slice(0, 100).fadeIn();
	});

	// Кнопка "Показать все отзывы" 
	$(".feedback__item").hide();
	$(".feedback__item").slice(0, 4).show();
	$(".feedback__button").on('click', function (e) {
		e.preventDefault();
		$('.feedback__button').hide();
		$(".feedback__item:hidden").slice(0, 100).fadeIn();
	});


	// Фиксировоанное меню
	function fixedMenu() {
		if ($(window).width() > 991) {
			let s = $(window).scrollTop();
			if (s > 70) {
				$('.header__top-wrapper').addClass('header__top-wrapper_fixed');
				$('.nice-select-wrapper').after($('.header__menu'));
			} else {
				$('.header__top-wrapper').removeClass('header__top-wrapper_fixed');
				$('.header__bottom .container').prepend($('.header__menu'));
			}
		} else {
			$('.header__top-wrapper').removeClass('header__top-wrapper_fixed');
		}
		if ($(window).width() <= 991) {
			$('.header__bottom .container').prepend($('.header__menu'));
		}

	}
	fixedMenu();

	$(window).on('scroll', function () {
		fixedMenu();
	});

	$(window).resize(function () {
		fixedMenu();
		if ($(window).width() > 991) {
			$('.header__bottom').removeClass('header__bottom_active');
			$('.menu-link').removeClass('menu-link_active');
		}
	})

	// плавная прокрутка
	$('.menu li, .scroll').click(function () {
		var scroll_el = $(this).find('a').attr('href');
		if ($(scroll_el).length != 0) {
			$('html, body').animate({
				scrollTop: $(scroll_el).offset().top - 110
			}, 800);
			$('.header__bottom').removeClass('header__bottom_active');
			$('.menu-link').removeClass('menu-link_active');
		} else {
			$('html, body').animate({
				scrollTop: 0
			}, 800);
		}
		return false;
	});

	// Мобильное меню
	let link = $('.menu-link'),
		menu = $('.header__bottom');

	link.on('click', function (e) {
		e.preventDefault();
		link.toggleClass('menu-link_active');
		menu.toggleClass('header__bottom_active');
	});

	// Замена фона 
	$('.nice-select li').on('click', function () {
		let headerUrl = $(this).find('.img-1').attr('src');
		let offerUrl = $(this).find('.img-2').attr('src');
		let newHeaderUrl = headerUrl.replace('webp', 'jpg');
		let newOfferUrl = offerUrl.replace('webp', 'jpg');

		$('.header__main').css({
			backgroundImage: 'url(' + newHeaderUrl + ')'
		})
		$('.offer').css({
			backgroundImage: 'url(' + newOfferUrl + ')'
		});
		$('.header__main h1 .city').text($(this).find('.cities-title').val());
	})

	// Отправка модальной формы 
	$('.modal form').on('submit', function (e) {
		e.preventDefault();
		$("#popup-call").modal("hide");
		setTimeout(function () {
			$("#popup-thank").modal("show");
		}, 300);
		clearForm();

		link.toggleClass('menu-link_active');
		menu.toggleClass('header__bottom_active');
	});

	// Отправка формы 
	$('form').on('submit', function (e) {
		e.preventDefault();
		setTimeout(function () {
			$("#popup-thank").modal("show");
		}, 300);

		$(this).find('button').attr('disabled', '');
		setTimeout(function () {
			$(this).find('button').removeAttr('disabled');
		}, 5000);
		clearForm();
	});

	// Очистка скрытого поля
	$('.modal').on('hidden.bs.modal', function () {
		$('input.modal__info').val('');
	})

	// Очистка инпутов
	function clearForm() {
		$('input, textarea').val('');
	}

	// Подстанока заголовка прайса
	$('.price__row').on('click', function () {
		$('input.modal__info').val($(this).find('span:first-child').text());
	})

	// Подстанока скидки в модалку
	$('.header__form .submit').on('click', function () {
		$('input.modal__disc').val('20%');
	})




	// ie, safari
	$(document).ready(function () {
		if ((navigator.userAgent.indexOf("MSIE") != -1) || (navigator.userAgent.indexOf("Safari") != -1) || (!!document.documentMode == true)) {
			$('head').append("<link rel='stylesheet' href='assets/css/vendor.css' ><link rel='stylesheet' href='assets/css/style.css' >")

			function changeJpgToWebp(item) {
				let firstBg = $(item).attr('style');
				let newBg = firstBg.replace('webp', 'jpg');
				$(item).attr('style', newBg)
			}
			changeJpgToWebp($('.header__main'));
			changeJpgToWebp($('.features'));
			changeJpgToWebp($('.offer'));
		}

		var browser = navigator.userAgent.toLowerCase();
		if (browser.indexOf('firefox') > -1) {
			$('head').append("<link rel='stylesheet' href='assets/css/vendor.css' ><link rel='stylesheet' href='assets/css/style.css' >")
		}


		$('.feedback__item-img').each(function (i, item) {
			let firstBg = $(item).attr('style');
			let newBg = firstBg.replace('webp', 'jpg');
			$(item).attr('style', newBg)
		})
	})
});