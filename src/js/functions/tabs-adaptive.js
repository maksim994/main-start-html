$(function () {
  let currentWidth = $(".tabs-wrapper").outerWidth();

  const arrow =
    '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8"><rect width="12" height="8" fill="#333" fill-opacity="0"></rect><path d="M1015.69,507.693a0.986,0.986,0,0,1-1.4,0l-4.31-4.316-4.3,4.316a0.993,0.993,0,0,1-1.4-1.408l4.99-5.009a1.026,1.026,0,0,1,1.43,0l4.99,5.009A0.993,0.993,0,0,1,1015.69,507.693Z" fill="#333" transform="translate(-1004 -501)"></path></svg>';
  // оболочка для стрелок
  const arrow_wrapper =
    '<div class="tabs-arrows">' +
    '<div class="tabs-arrow-left arrow">' +
    arrow +
    "</div>" +
    '<div class="tabs-arrow-right arrow">' +
    arrow +
    "</div>" +
    "</div>";
  const tabs_wrapper = $(".tabs-wrapper");
  const tabs_nav = $(".tabs-nav");
  // будем менять это значение динамически
  // добавили стрелочки. Стили уже заданы заранее в css, ничего более не нужно для них
  tabs_wrapper.append(arrow_wrapper);
  const right_arrow = $(".tabs-arrow-right");
  const left_arrow = $(".tabs-arrow-left");

  //   изначально их уберём
  left_arrow.addClass("disabled");
  right_arrow.addClass("disabled");

  // переменная, которая будет менять transform
  let transformPX = 0;

  const tabs = $(".tabs-nav");
  // расстояние между двумя табами
  const gap = 5;

  // функция по обновлению положений стрелок
  function updateArrow(tab_width, tabElem_width) {
    // если у нас мобилка, тогда нам не нужны стрелки, будем через drag листать
    // if (window.innerWidth <= 550) {
    //   left_arrow.addClass("disabled");
    //   right_arrow.addClass("disabled");
    //   return;
    // }
    if (transformPX === 0) {
      left_arrow.addClass("disabled");
    } else {
      left_arrow.removeClass("disabled");
    }
    // разбираемся с правой стрелкой
    if (transformPX < tab_width - tabElem_width) {
      right_arrow.addClass("disabled");
    } else {
      right_arrow.removeClass("disabled");
    }
  }
  //   для фикса проблем с интервалами при ресайзе
  let intervalId = null;
  tabs_nav.css("transform", `translateX(${transformPX}px)`);

  //   тут мы обновляем всю инфу
  function checkTabsWidth() {
    tab_width = $(".tabs-nav").outerWidth();
    tabElem_width = 0;

    // находим общую ширину всех табов + ьрасстояние между ними
    $.each(tabs.find("li"), function (i, elem) {
      let elem_width = $(elem).outerWidth();
      tabElem_width += elem_width + gap;
    });

    // если мы вышли за грань, то нам нужно вернуться в ноль
    if (transformPX > 0) {
      transformPX = 0;
    }

    if (tabElem_width > tab_width) {
      // изначально обнавляем стрелки
      updateArrow(tab_width, tabElem_width);
      let touchStart = 0;

      // мобилка
      tabs_nav.on("touchstart", (e) => {
        // e.preventDefault();
        let originalEvent = e.originalEvent;
        touchStart = originalEvent.touches[0].pageX;
      });

      tabs_nav.on("touchmove", function (event) {
        event.preventDefault();
        let originalEvent = event.originalEvent;
        let pageX = originalEvent.touches[0].pageX;

        if (pageX < touchStart) {
          if (-transformPX < -(tab_width - tabElem_width)) {
            transformPX -= 7;
            tabs_nav.css("transform", `translateX(${transformPX}px)`);
            tabs_nav.css("transform", `-webkit-translateX(${transformPX}px)`);
            updateArrow(tab_width, tabElem_width);
          } else {
            right_arrow.addClass("disabled");
          }
          touchStart = pageX;
        }

        if (pageX > touchStart) {
          if (transformPX < 0) {
            transformPX += 7;
            tabs_nav.css("transform", `translateX(${transformPX}px)`);
            tabs_nav.css("transform", `-webkit-translateX(${transformPX}px)`);
            updateArrow(tab_width, tabElem_width);
          } else {
            left_arrow.addClass("disabled");
          }
          touchStart = pageX;
        }
      });

      // true, false - возвращает
      var isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      if (!isMobile) {
        // для правой стрелки
        right_arrow.on("mouseover", function () {
          if (!intervalId) {
            intervalId = setInterval(function () {
              if (-transformPX < -(tab_width - tabElem_width)) {
                transformPX -= 5;
                tabs_nav.css("transform", `translateX(${transformPX}px)`);
              } else {
                right_arrow.addClass("disabled");
              }
              updateArrow(tab_width, tabElem_width);
            }, 16);
          }
        });

        right_arrow.on("mouseout", function () {
          clearInterval(intervalId);
          intervalId = null;
        });

        // для левой стрелки
        left_arrow.on("mouseover", function () {
          if (!intervalId) {
            intervalId = setInterval(function () {
              if (transformPX < 0) {
                transformPX += 5;
                tabs_nav.css("transform", `translateX(${transformPX}px)`);
              } else {
                right_arrow.addClass("disabled");
              }
              updateArrow(tab_width, tabElem_width);
            }, 16);
          }
        });

        left_arrow.on("mouseout", function () {
          clearInterval(intervalId);
          intervalId = null;
        });
      } else {
        // для правой стрелки
        right_arrow.on("click", function () {
          if (!intervalId) {
            intervalId = setInterval(function () {
              if (-transformPX < -(tab_width - tabElem_width)) {
                transformPX -= 5;
                tabs_nav.css("transform", `translateX(${transformPX}px)`);
                updateArrow(tab_width, tabElem_width);
              } else {
                right_arrow.addClass("disabled");
              }
            }, 16);
            // чтобы не до конца листалось
            timeoutId = setTimeout(function () {
              clearInterval(intervalId);
              intervalId = null;
            }, 500);
          }
        });

        // для левой стрелки
        left_arrow.on("click", function () {
          if (!intervalId) {
            intervalId = setInterval(function () {
              if (transformPX < 0) {
                transformPX += 5;
                tabs_nav.css("transform", `translateX(${transformPX}px)`);
                updateArrow(tab_width, tabElem_width);
              } else {
                left_arrow.addClass("disabled");
              }
            }, 16);
            // чтобы не до конца листалось
            timeoutId = setTimeout(function () {
              clearInterval(intervalId);
              intervalId = null;
            }, 500);
          }
        });
      }
    }
  }

  // вызываем функцию при стартовой загрузке страницы
  checkTabsWidth();

  // вызываем функцию при изменении ширины экрана
  window.onresize = function () {
    let newWidth = $(".tabs-wrapper").outerWidth();
    // обновляем стрелки
    updateArrow(tab_width, tabElem_width);
    // это для того, чтобы ничего не дергалось при изменении размера экрана
    clearInterval(intervalId);

    // очищаем наш ивент, иначе при любом разрешении экрана начинается ужас, тк начинается дублирование этого события
    tabs_nav.off("touchstart");
    tabs_nav.off("touchmove");

    // если у нас увеличивается ширина, то нужно наши табы смещать
    if (newWidth > currentWidth) {
      // console.log("Ширина увеличилась");
      if (transformPX < 0) {
        transformPX += 20;
        tabs_nav.css("transform", `translateX(${transformPX}px)`);
      }
    }
    // запускаем функцию
    checkTabsWidth();
    // обновляем
    currentWidth = newWidth;
  };
});
