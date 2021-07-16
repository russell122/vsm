"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // polyfill flat
  if (!Array.prototype.flat) Array.prototype.flat = function () {
    return function f(arr) {
      return arr.reduce(function (a, v) {
        return Array.isArray(v) ? a.concat(f(v)) : a.concat(v);
      }, []);
    }(this);
  }; // Imask на мобильный телефон

  var telInputs = document.querySelectorAll('input[type="tel"]');

  var crateMaskForTel = function crateMaskForTel(inp) {
    return IMask(inp, {
      mask: '+{7}(000)000-00-00'
    });
  };

  telInputs === null || telInputs === void 0 ? void 0 : telInputs.forEach(crateMaskForTel); // Вызовы модалок

  var modalElem;
  document.addEventListener('click', function (e) {
    // console.log(e.target)
    if (e.target.closest('[data-btn-modal]')) {
      e.preventDefault();
      var datTarget = e.target.closest('[data-btn-modal]').dataset.btnModal;

      switch (datTarget) {
        case 'getConsultation':
          modalElem = $plugins.modal({
            title: ' ',
            closable: true,
            width: '585px',
            content: $globalHtmlElements.getConsultation
          });
          setTimeout(function () {
            var _parentModalBody = document.querySelector('.vmodal__body');

            var _inputSearch = _parentModalBody.querySelector('input[type="tel"]');

            crateMaskForTel(_inputSearch);
            modalElem.open(), 300;
          }); // countItemsBasket();

          break;

        default:
          return;
      }
    }
  });
  var $globalHtmlElements = {};
  window.$globalHtmlElements = $globalHtmlElements; // Модальное окно для Развернутого отзыва
  // Модальное окно для получения консультации

  $globalHtmlElements.getConsultation = "\n\t\t\t<div class=\"getConsult\">\n\t\t\t\t<div class=\"questions\">\n\t\t\t\t\t<form class=\"questions__right\"> \n\t\t\t\t\t\t<h2>\u041D\u0443\u0436\u043D\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F?</h2>\n\t\t\t\t\t\t<input class=\"g-input\" type=\"text\" placeholder=\"\u0412\u0430\u0448\u0435 \u0438\u043C\u044F\" name=\"name\" required>\n\t\t\t\t\t\t<input class=\"g-input\" type=\"tel\" placeholder=\"\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430\" name=\"phone\" required>\n\t\t\t\t\t\t<div class=\"questions__check myInp\">\n\t\t\t\t\t\t<input type=\"checkbox\" id=\"check1\">\n\t\t\t\t\t\t<label for=\"check1\">\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u044F \u0444\u043E\u0440\u043C\u0443 \u0432\u044B \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 <a class=\"g-link g-link-black\" href=\"#\">\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445</a></label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"questions__btn\"> \n\t\t\t\t\t\t<button class=\"button button-accent\">\u041F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u043C\u043D\u0435</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t"; // end modal

  var header = document.querySelector('.header');
  window.addEventListener('scroll', function (e) {
    // console.log(window.pageYOffset)
    if (header) {
      if (window.pageYOffset > 80 && screen.width <= 991) {
        header.classList.add('act');
      } else {
        header.classList.remove('act');
      }
    }
  }); // accordion

  var myProlapse = function myProlapse() {
    var prolapse = function prolapse(myTargets, myContents) {
      var myClose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var targets = document.querySelectorAll(myTargets);
      var contents = document.querySelectorAll(myContents);
      var close = document.querySelector(myClose); // console.log(myTargets)
      // console.log(myContents)

      targets.forEach(function (target) {
        target.addEventListener('click', function (e) {
          e.preventDefault();
          contents.forEach(function (cont) {
            if (target.getAttribute('data-linkValue') == cont.getAttribute('data-ulValue')) {
              if (cont.style.maxHeight) {
                cont.style.maxHeight = null;
                target.classList.remove('active');
                cont.classList.remove('active');
              } else {
                cont.style.maxHeight = cont.scrollHeight + "px";
                target.classList.add('active');
                cont.classList.add('active');
              }
            }

            if (close) {
              close.addEventListener('click', function (e) {
                cont.style.maxHeight = null;
              });
            }
          });
        });
      });
    };

    prolapse('.header__right2-targ', '.header__right2-sub');
  };

  myProlapse(); // end accordion
});
$(document).ready(function () {
  // Мобильное меню
  $('.header__burger').click(function (event) {
    $('.header__burger, .header__right2, .header').toggleClass('active');
    $('body').toggleClass('lock');
  });
  $(".js-scroll-to-form").click(function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault(); //забираем идентификатор бока с атрибута href

    var id = $(this).attr('href'),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
    top = $(id).offset().top; //анимируем переход на расстояние - top за 1000 мс

    $('body,html').animate({
      scrollTop: top
    }, 1000);
    $('.header__burger, .header__menu').removeClass('active');
    $('body').removeClass('lock');
  });
  var swiper3 = new Swiper('.top__slider-sl', {
    autoHeight: true,
    slidesPerView: 4,
    spaceBetween: 0,
    // loop: true,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    // pagination: {
    // 	el: ".swiper-pagination",
    // 	clickable: true,
    // },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      576: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 0
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 0
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 0
      },
      1601: {
        slidesPerView: 4,
        spaceBetween: 0
      }
    }
  });
  var swiper4 = new Swiper('.foto__gal-sl', {
    autoHeight: true,
    slidesPerView: 4,
    spaceBetween: 0,
    // loop: true,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    // pagination: {
    // 	el: ".swiper-pagination",
    // 	clickable: true,
    // },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      576: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 0
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 0
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 0
      },
      1601: {
        slidesPerView: 4,
        spaceBetween: 0
      }
    }
  });
  var swiper5 = new Swiper('.jobs__slider', {
    autoHeight: true,
    slidesPerView: 2,
    spaceBetween: 90,
    // loop: true,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      576: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 90
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 90
      },
      1601: {
        slidesPerView: 2,
        spaceBetween: 90
      }
    }
  });
  var swiper6 = new Swiper('.partners__slider', {
    autoHeight: true,
    slidesPerView: 4,
    spaceBetween: 80,
    // loop: true,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    // pagination: {
    // 	el: ".swiper-pagination",
    // 	clickable: true,
    // },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      1601: {
        slidesPerView: 4,
        spaceBetween: 80
      }
    }
  });
  $('.open-magn').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom',
    // class to remove default margin from left and right side
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS

    }
  });
});