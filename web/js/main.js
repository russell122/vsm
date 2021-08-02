"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // polyfill flat
  if (!Array.prototype.flat) Array.prototype.flat = function () {
    return function f(arr) {
      return arr.reduce(function (a, v) {
        return Array.isArray(v) ? a.concat(f(v)) : a.concat(v);
      }, []);
    }(this);
  };

  var createChipsLayout = function createChipsLayout(calculateSize) {
    // Создадим макет метки.
    var Chips = ymaps.templateLayoutFactory.createClass('<div class="placemark"></div>', {
      build: function build() {
        Chips.superclass.build.call(this);
        var map = this.getData().geoObject.getMap();

        if (!this.inited) {
          this.inited = true; // Получим текущий уровень зума.

          var zoom = map.getZoom(); // Подпишемся на событие изменения области просмотра карты.

          map.events.add('boundschange', function () {
            // Запустим перестраивание макета при изменении уровня зума.
            var currentZoom = map.getZoom();

            if (currentZoom != zoom) {
              zoom = currentZoom;
              this.rebuild();
            }
          }, this);
        }

        var options = this.getData().options,
            // Получим размер метки в зависимости от уровня зума.
        size = calculateSize(map.getZoom()),
            element = this.getParentElement().getElementsByClassName('placemark')[0],
            // По умолчанию при задании своего HTML макета фигура активной области не задается,
        // и её нужно задать самостоятельно.
        // Создадим фигуру активной области "Круг".
        circleShape = {
          type: 'Circle',
          coordinates: [0, 0],
          radius: size / 2
        }; // Зададим высоту и ширину метки.

        element.style.width = element.style.height = size + 'px'; // Зададим смещение.

        element.style.marginLeft = element.style.marginTop = -size / 2 + 'px'; // Зададим фигуру активной области.

        options.set('shape', circleShape);
      }
    });
    return Chips;
  };

  ymaps.ready(function () {
    var map = new ymaps.Map('map', {
      center: [55.755249, 37.617437],
      zoom: 4
    });
    map.geoObjects.add(new ymaps.Placemark([55.755249, 36.317437], {
      balloonContent: "\n\t\t\t\t\t<div class=\"map__block\">\n\t\t\t\t\t\t<img class=\"img-cover\" src=\"web/images/content/f-1.png\">\n\t\t\t\t\t\t<h1>\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A</h1>\n\t\t\t\t\t\t<a gref=\"#\">\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043F\u0440\u043E\u0435\u043A\u0442</a>\n\t\t\t\t\t\t<p>\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</p>\n\t\t\t\t\t</div>\n\t\t\t\t",
      hintContent: 'Линейная зависимость'
    }, {
      iconLayout: createChipsLayout(function (zoom) {
        // Минимальный размер метки будет 8px, а максимальный мы ограничивать не будем.
        // Размер метки будет расти с линейной зависимостью от уровня зума.
        return 4 * zoom + 8;
      })
    }));
    map.geoObjects.add(new ymaps.Placemark([50, 30], {
      balloonContent: "\n\t\t\t\t\t<div class=\"map__block\">\n\t\t\t\t\t\t<img class=\"img-cover\" src=\"web/images/content/f-2.png\">\n\t\t\t\t\t\t<h1>\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A</h1>\n\t\t\t\t\t\t<a gref=\"#\">\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043F\u0440\u043E\u0435\u043A\u0442</a>\n\t\t\t\t\t\t<p>\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</p>\n\t\t\t\t\t</div>\n\t\t\t\t",
      hintContent: 'Квадратичная зависимость'
    }, {
      iconLayout: createChipsLayout(function (zoom) {
        // Минимальный размер метки будет 8px, а максимальный 200px.
        // Размер метки будет расти с квадратичной зависимостью от уровня зума.
        return Math.min(Math.pow(zoom, 2) + 8, 200);
      })
    }));
    map.geoObjects.add(new ymaps.Placemark([51, 0], {
      balloonContent: "\n\t\t\t\t\t<div class=\"map__block\">\n\t\t\t\t\t\t<img class=\"img-cover\" src=\"web/images/content/f-3.png\">\n\t\t\t\t\t\t<h1>\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A</h1>\n\t\t\t\t\t\t<a gref=\"#\">\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043F\u0440\u043E\u0435\u043A\u0442</a>\n\t\t\t\t\t\t<p>\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</p>\n\t\t\t\t\t</div>\n\t\t\t\t",
      hintContent: 'Квадратичная зависимость'
    }, {
      iconLayout: createChipsLayout(function (zoom) {
        // Минимальный размер метки будет 8px, а максимальный 200px.
        // Размер метки будет расти с квадратичной зависимостью от уровня зума.
        return Math.min(Math.pow(zoom, 2) + 8, 200);
      })
    }));
  }); // var mymap = L.map('mapid').setView([40, 0], 3);
  // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  // 		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  // 	}).addTo(mymap);
  // var marker = L.marker([51.5, -0.09]).addTo(mymap);
  // var circle = L.circle([51.508, -0.11], {
  // 	color: 'red',
  // 	fillColor: '#f03',
  // 	fillOpacity: 0.5,
  // 	radius: 500
  // }).addTo(mymap);
  // var polygon = L.polygon([
  // 	[51.509, -0.08],
  // 	[51.503, -0.06],
  // 	[51.51, -0.047]
  // ]).addTo(mymap);
  // Imask на мобильный телефон

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
  // tabs

  var myTabs = function myTabs() {
    var tabs = function tabs(myTargets, myContents) {
      var targets = document.querySelectorAll(myTargets);
      var contents = document.querySelectorAll(myContents);

      if (targets.length > 1 && contents.length > 1) {
        targets.forEach(function (target, i) {
          target.addEventListener('click', function (e) {
            e.preventDefault();
            targets.forEach(function (elem) {
              if (e.target == elem || e.target.parentNode == elem) {
                hideElems();
                showElems(i);
              }
            });
          });
        });

        function hideElems() {
          targets.forEach(function (target) {
            target.classList.remove('active');
          });
          contents.forEach(function (cont) {
            cont.classList.remove('show');
            cont.classList.add('hide');
          });
        }

        function showElems() {
          var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          targets[i].classList.add('active');
          contents[i].classList.remove('hide');
          contents[i].classList.add('show');
        }

        hideElems();
        showElems();
      }
    };

    tabs('.partner-el__tabs-el', '.partner__content-item');
  };

  myTabs(); //end tabs
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
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 0,
    slidesPerView: 1,
    loop: true,
    // freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    onlyExternal: false,
    allowTouchMove: false // preventClicks: true,
    // thumbs: {
    // 	swiper: swiper,
    // },

  });
  var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 30,
    slidesPerView: 10,
    loop: true,
    // freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    thumbs: {
      swiper: swiper
    },
    breakpoints: {
      320: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      576: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      767: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 8,
        spaceBetween: 30
      },
      1601: {
        slidesPerView: 10,
        spaceBetween: 30
      }
    },
    autoplay: {
      delay: 5000
    }
  });
  var swiper21 = new Swiper(".mySwiper21", {
    spaceBetween: 0,
    slidesPerView: 1,
    loop: true,
    // freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    onlyExternal: false,
    allowTouchMove: false // preventClicks: true,
    // thumbs: {
    // 	swiper: swiper,
    // },

  });
  var swiper23 = new Swiper(".mySwiper23", {
    spaceBetween: 30,
    slidesPerView: 3,
    loop: true,
    // freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    thumbs: {
      swiper: swiper21
    },
    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      576: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      767: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1601: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    },
    autoplay: {
      delay: 5000
    }
  });
  var swiper22 = new Swiper(".mySwiper22", {
    spaceBetween: 0,
    slidesPerView: 1,
    loop: true,
    // freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    onlyExternal: false,
    allowTouchMove: false // preventClicks: true,
    // thumbs: {
    // 	swiper: swiper,
    // },

  });
  var swiper24 = new Swiper(".mySwiper24", {
    spaceBetween: 30,
    slidesPerView: 3,
    loop: true,
    // freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    thumbs: {
      swiper: swiper22
    },
    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      576: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      767: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 7,
        spaceBetween: 30
      },
      1601: {
        slidesPerView: 9,
        spaceBetween: 30
      }
    },
    autoplay: {
      delay: 5000
    }
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
    },
    autoplay: {
      delay: 5000
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
    },
    autoplay: {
      delay: 4000
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
      nextEl: '.jobs-swiper-button-next',
      prevEl: '.jobs-swiper-button-prev'
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
    },
    autoplay: {
      delay: 5000
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
    },
    autoplay: {
      delay: 4000
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