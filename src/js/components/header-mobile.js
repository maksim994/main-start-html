document.addEventListener('DOMContentLoaded', () => {

    const slinky = $('.header-mobile-menu-top').slinky();

    //Бургер открываем
    $(".header-mobile__burger").on("click", () => {
        //меняем иконку бургера
        $(".header-burger-icon").toggleClass("active");

        $(".header-mobile-menu").toggleClass("toggle");
        $(".mobile-nav-overlay").toggleClass("open");
        $("body").toggleClass("header-open");
    });

    // закрываем мобильный хедер при клике на оверлей
    $(".mobile-nav-overlay").on("click", () => {
        $(".mobile-nav-overlay").toggleClass("open");
        $(".header-mobile-menu").toggleClass("toggle");
        $(".header-burger-icon").toggleClass("active");
        $("body").toggleClass("header-open");
    });

    // показываем, скрываем второй уровень
    $(".header-list-more").on("click", function () {
        //взяли родителя и покрасили его
        var parent = $(this).closest(".header-main-link");
        $(this).closest("li").toggleClass("selected");
        //показали\скрыли второй уровень
        parent.next(".header-list-second").toggle();
    });

});