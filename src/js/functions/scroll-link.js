const onScrollLink = () => {

    if (window.location.hash != ''){
        let href = window.location.hash;
        let headerHeight = $('.js-header').outerHeight();

        $("html, body").animate({
            scrollTop: $(href).offset().top - headerHeight - 20
        }, {
            duration: 370,   // по умолчанию «400»
            easing: "linear" // по умолчанию «swing»
        });

        return false;
    }

    $(".scroll").on("click", function () {
        let href = $(this).attr("href");
        let headerHeight = $('.js-header').outerHeight();

        $("html, body").animate({
            scrollTop: $(href).offset().top - headerHeight - 20
        }, {
            duration: 370,   // по умолчанию «400»
            easing: "linear" // по умолчанию «swing»
        });

        return false;
    });

};